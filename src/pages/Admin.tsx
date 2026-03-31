import { useEffect, useMemo, useRef, useState } from "react";
import AdminHeader from "@/components/AdminHeader";
import AdminDashboard from "@/components/AdminDashboard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import type { Session } from "@supabase/supabase-js";
import { MD5 } from "crypto-js";
import { encryptData, decryptData } from "@/lib/crypto";

type Product = {
  id: string;
  name: string;
  slug?: string | null;
  sku?: string | null;
  description?: string | null;
  price?: number | null;
  stock?: number | null;
  image_url?: string | null;
  category?: string | null;
  category_id?: string | null;
  active?: boolean | null;
  featured?: boolean | null;
  created_at?: string | null;
  updated_at?: string | null;
};

type Category = {
  id: string;
  name: string;
  slug: string;
  description?: string | null;
  created_at?: string | null;
};

type ContactMessage = {
  id: string;
  name: string;
  email: string;
  phone?: string | null;
  message: string;
  created_at?: string | null;
};

type NewsletterSubscriber = {
  id: string;
  email: string;
  created_at?: string | null;
};

type SettingRow = {
  id: string;
  key: string;
  value: string | null;
  updated_at?: string | null;
};

type ProductImage = {
  id: string;
  product_id: string;
  image_url: string;
  alt?: string | null;
  is_main?: boolean | null;
  sort_order?: number | null;
  created_at?: string | null;
};

type ProductSpec = {
  id: string;
  product_id: string;
  name: string;
  value: string;
  sort_order?: number | null;
  created_at?: string | null;
};

type ProfileRow = {
  id: string;
  email?: string | null;
  name?: string | null;
  role?: string | null;
  created_at?: string | null;
};

const slugify = (input: string) => {
  return input
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
};

const downloadTextFile = (content: string, filename: string, mime: string) => {
  const blob = new Blob([content], { type: mime });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
};

const getSetting = (rows: SettingRow[] | undefined, key: string) => {
  return rows?.find((r) => r.key === key)?.value ?? "";
};

const Admin = () => {
  const queryClient = useQueryClient();
  const [session, setSession] = useState<Session | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState("dashboard");

  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const categoryFormRef = useRef<HTMLFormElement>(null);

  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const productFormRef = useRef<HTMLFormElement>(null);

  const [openMessageId, setOpenMessageId] = useState<string | null>(null);
  const [editingSettingKey, setEditingSettingKey] = useState<string | null>(null);
  const [editingSettingValue, setEditingSettingValue] = useState<string>("");

  const [newSpecName, setNewSpecName] = useState("");
  const [newSpecValue, setNewSpecValue] = useState("");
  const [newImageAlt, setNewImageAlt] = useState("");
  const productImageInputRef = useRef<HTMLInputElement>(null);

  // Estados para demostración de criptografía de ida y vuelta
  const [plainTextData, setPlainTextData] = useState("");
  const [encryptedDataResult, setEncryptedDataResult] = useState("");
  const [decryptedDataResult, setDecryptedDataResult] = useState("");
  const [testCiphertext, setTestCiphertext] = useState("");

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Generar el hash MD5 de la contraseña
    const hashedPassword = MD5(password).toString();
    console.log("Contraseña original:", password);
    console.log("MD5 Hash generado:", hashedPassword);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password: hashedPassword,
    });
    if (error) alert(error.message);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  const uploadImage = async (file: File): Promise<string | null> => {
    try {
      const fileExt = file.name.split(".").pop() || "jpg";
      const fileName = `${crypto.randomUUID()}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from("products")
        .upload(filePath, file);

      if (uploadError) return null;

      const { data } = supabase.storage.from("products").getPublicUrl(filePath);
      return data.publicUrl;
    } catch {
      return null;
    }
  };

  const categoriesQuery = useQuery<Category[]>({
    queryKey: ["admin-categories"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("categories")
        .select("id,name,slug,description,created_at")
        .order("name", { ascending: true });
      if (error) throw error;
      return data || [];
    },
    enabled: !!session,
  });

  const productsQuery = useQuery<Product[]>({
    queryKey: ["admin-products"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("products")
        .select(
          "id,name,slug,sku,description,price,stock,image_url,category,category_id,active,featured,created_at,updated_at",
        )
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data || [];
    },
    enabled: !!session,
  });

  const contactMessagesQuery = useQuery<ContactMessage[]>({
    queryKey: ["admin-contact-messages"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("contact_messages")
        .select("id,name,email,phone,message,created_at")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data || [];
    },
    enabled: !!session,
  });

  const newsletterQuery = useQuery<NewsletterSubscriber[]>({
    queryKey: ["admin-newsletter"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("newsletter_subscribers")
        .select("id,email,created_at")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data || [];
    },
    enabled: !!session,
  });

  const settingsQuery = useQuery<SettingRow[]>({
    queryKey: ["admin-settings"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("settings")
        .select("id,key,value,updated_at")
        .order("key", { ascending: true });
      if (error) throw error;
      return data || [];
    },
    enabled: !!session,
  });

  const profilesQuery = useQuery<ProfileRow[]>({
    queryKey: ["admin-profiles"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("profiles")
        .select("id,email,name,role,created_at")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data || [];
    },
    enabled: !!session,
  });

  const productImagesQuery = useQuery<ProductImage[]>({
    queryKey: ["admin-product-images", editingProduct?.id],
    queryFn: async () => {
      const productId = editingProduct?.id;
      if (!productId) return [];
      const { data, error } = await supabase
        .from("product_images")
        .select("id,product_id,image_url,alt,is_main,sort_order,created_at")
        .eq("product_id", productId)
        .order("is_main", { ascending: false })
        .order("sort_order", { ascending: true })
        .order("created_at", { ascending: true });
      if (error) throw error;
      return data || [];
    },
    enabled: !!session && !!editingProduct?.id,
  });

  const productSpecsQuery = useQuery<ProductSpec[]>({
    queryKey: ["admin-product-specs", editingProduct?.id],
    queryFn: async () => {
      const productId = editingProduct?.id;
      if (!productId) return [];
      const { data, error } = await supabase
        .from("product_specs")
        .select("id,product_id,name,value,sort_order,created_at")
        .eq("product_id", productId)
        .order("sort_order", { ascending: true })
        .order("created_at", { ascending: true });
      if (error) throw error;
      return data || [];
    },
    enabled: !!session && !!editingProduct?.id,
  });

  const categoriesById = useMemo(() => {
    const map = new Map<string, Category>();
    (categoriesQuery.data || []).forEach((c) => map.set(c.id, c));
    return map;
  }, [categoriesQuery.data]);

  const featuredProducts = useMemo(() => {
    return (productsQuery.data || []).filter((p) => !!p.featured);
  }, [productsQuery.data]);

  const featuredOrder = useMemo(() => {
    const raw = getSetting(settingsQuery.data, "home_featured_order");
    try {
      const parsed = JSON.parse(raw || "[]");
      if (Array.isArray(parsed)) return parsed.filter((x) => typeof x === "string");
      return [];
    } catch {
      return [];
    }
  }, [settingsQuery.data]);

  const featuredOrderResolved = useMemo(() => {
    const byId = new Map<string, Product>();
    featuredProducts.forEach((p) => byId.set(p.id, p));
    const ordered: Product[] = [];
    featuredOrder.forEach((id) => {
      const p = byId.get(id);
      if (p) ordered.push(p);
    });
    featuredProducts.forEach((p) => {
      if (!featuredOrder.includes(p.id)) ordered.push(p);
    });
    return ordered;
  }, [featuredOrder, featuredProducts]);

  const upsertCategoryMutation = useMutation({
    mutationFn: async (payload: { name: string; slug?: string; description?: string }) => {
      const name = payload.name.trim();
      const slug = (payload.slug?.trim() || slugify(name) || `cat-${Date.now()}`).toLowerCase();
      const description = payload.description?.trim() || null;

      if (editingCategory) {
        const { data, error } = await supabase
          .from("categories")
          .update({ name, slug, description })
          .eq("id", editingCategory.id)
          .select()
          .single();
        if (error) throw error;
        return data as Category;
      }

      const { data, error } = await supabase
        .from("categories")
        .insert([{ name, slug, description }])
        .select()
        .single();
      if (error) throw error;
      return data as Category;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-categories"] });
      setEditingCategory(null);
      categoryFormRef.current?.reset();
    },
  });

  const deleteCategoryMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("categories").delete().eq("id", id);
      if (error) throw error;
      return id;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-categories"] });
    },
  });

  const createProductMutation = useMutation({
    mutationFn: async (formData: FormData) => {
      const name = String(formData.get("name") || "").trim();
      const rawSlug = String(formData.get("slug") || "").trim();
      const slug = (rawSlug || slugify(name) || `product-${Date.now()}`).toLowerCase();
      const price = Number(formData.get("price") || 0);
      const stock = Number(formData.get("stock") || 0);
      const description = String(formData.get("description") || "").trim() || null;
      const categoryId = String(formData.get("category_id") || "").trim() || null;
      const active = formData.get("active") === "on";
      const featured = formData.get("featured") === "on";
      const imageFile = formData.get("image") as File | null;
      let image_url: string | null = null;

      if (imageFile && imageFile.size > 0) {
        image_url = await uploadImage(imageFile);
      }

      const category = categoryId ? categoriesById.get(categoryId)?.name ?? null : null;

      const { data, error } = await supabase
        .from("products")
        .insert([
          {
            name,
            slug,
            price,
            stock,
            description,
            category_id: categoryId,
            category,
            active,
            featured,
            image_url,
            sku: `SKU-${Date.now()}`,
          },
        ])
        .select()
        .single();

      if (error) throw error;
      return data as Product;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-products"] });
      setEditingProduct(null);
      productFormRef.current?.reset();
    },
  });

  const updateProductMutation = useMutation({
    mutationFn: async (payload: {
      id: string;
      name: string;
      slug: string;
      price: number;
      stock: number;
      description: string | null;
      category_id: string | null;
      category: string | null;
      active: boolean;
      featured: boolean;
      imageFile?: File | null;
    }) => {
      const { id, imageFile, ...rest } = payload;
      const updates: Partial<Product> = { ...rest };

      if (imageFile && imageFile.size > 0) {
        const url = await uploadImage(imageFile);
        if (url) updates.image_url = url;
      }

      const { data, error } = await supabase
        .from("products")
        .update(updates)
        .eq("id", id)
        .select()
        .single();

      if (error) throw error;
      return data as Product;
    },
    onSuccess: () => {
      window.alert("¡Producto actualizado correctamente en la base de datos!");
      queryClient.invalidateQueries({ queryKey: ["admin-products"] });
      setEditingProduct(null);
    },
    onError: (error) => {
      window.alert("Error al actualizar el producto: " + error.message);
    }
  });

  const deleteProductMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("products").delete().eq("id", id);
      if (error) throw error;
      return id;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-products"] });
    },
  });

  const upsertSettingMutation = useMutation({
    mutationFn: async (payload: { key: string; value: string }) => {
      const key = payload.key.trim();
      const value = payload.value;
      const { data, error } = await supabase
        .from("settings")
        .upsert([{ key, value }], { onConflict: "key" })
        .select()
        .single();
      if (error) throw error;
      return data as SettingRow;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-settings"] });
      setEditingSettingKey(null);
      setEditingSettingValue("");
    },
  });

  const deleteSettingMutation = useMutation({
    mutationFn: async (key: string) => {
      const { error } = await supabase.from("settings").delete().eq("key", key);
      if (error) throw error;
      return key;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-settings"] });
    },
  });

  const deleteMessageMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("contact_messages").delete().eq("id", id);
      if (error) throw error;
      return id;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-contact-messages"] });
    },
  });

  const deleteNewsletterMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("newsletter_subscribers").delete().eq("id", id);
      if (error) throw error;
      return id;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-newsletter"] });
    },
  });

  const updateProfileRoleMutation = useMutation({
    mutationFn: async (payload: { id: string; role: string }) => {
      const { data, error } = await supabase
        .from("profiles")
        .update({ role: payload.role })
        .eq("id", payload.id)
        .select()
        .single();
      if (error) throw error;
      return data as ProfileRow;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-profiles"] });
    },
  });

  const addProductImageMutation = useMutation({
    mutationFn: async (payload: { productId: string; file: File; alt?: string }) => {
      const url = await uploadImage(payload.file);
      if (!url) throw new Error("No se pudo subir la imagen");
      const { data, error } = await supabase
        .from("product_images")
        .insert([
          {
            product_id: payload.productId,
            image_url: url,
            alt: payload.alt?.trim() || null,
            is_main: false,
          },
        ])
        .select()
        .single();
      if (error) throw error;
      return data as ProductImage;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["admin-product-images", editingProduct?.id] });
      if (productImageInputRef.current) productImageInputRef.current.value = "";
      setNewImageAlt("");
    },
  });

  const setMainProductImageMutation = useMutation({
    mutationFn: async (payload: { productId: string; imageId: string; imageUrl: string }) => {
      const { error: clearError } = await supabase
        .from("product_images")
        .update({ is_main: false })
        .eq("product_id", payload.productId);
      if (clearError) throw clearError;

      const { error: setError } = await supabase
        .from("product_images")
        .update({ is_main: true })
        .eq("id", payload.imageId);
      if (setError) throw setError;

      const { error: productError } = await supabase
        .from("products")
        .update({ image_url: payload.imageUrl })
        .eq("id", payload.productId);
      if (productError) throw productError;

      return payload.imageId;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["admin-product-images", editingProduct?.id] });
      await queryClient.invalidateQueries({ queryKey: ["admin-products"] });
    },
  });

  const deleteProductImageMutation = useMutation({
    mutationFn: async (payload: { id: string; productId: string }) => {
      const { error } = await supabase.from("product_images").delete().eq("id", payload.id);
      if (error) throw error;
      return payload.id;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["admin-product-images", editingProduct?.id] });
    },
  });

  const addProductSpecMutation = useMutation({
    mutationFn: async (payload: { productId: string; name: string; value: string }) => {
      const name = payload.name.trim();
      const value = payload.value.trim();
      const { data, error } = await supabase
        .from("product_specs")
        .insert([{ product_id: payload.productId, name, value }])
        .select()
        .single();
      if (error) throw error;
      return data as ProductSpec;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["admin-product-specs", editingProduct?.id] });
      setNewSpecName("");
      setNewSpecValue("");
    },
  });

  const updateProductSpecMutation = useMutation({
    mutationFn: async (payload: { id: string; name: string; value: string }) => {
      const { data, error } = await supabase
        .from("product_specs")
        .update({ name: payload.name, value: payload.value })
        .eq("id", payload.id)
        .select()
        .single();
      if (error) throw error;
      return data as ProductSpec;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["admin-product-specs", editingProduct?.id] });
    },
  });

  const deleteProductSpecMutation = useMutation({
    mutationFn: async (payload: { id: string }) => {
      const { error } = await supabase.from("product_specs").delete().eq("id", payload.id);
      if (error) throw error;
      return payload.id;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["admin-product-specs", editingProduct?.id] });
    },
  });

  const saveFeaturedOrderMutation = useMutation({
    mutationFn: async (ids: string[]) => {
      const value = JSON.stringify(ids);
      const { error } = await supabase
        .from("settings")
        .upsert([{ key: "home_featured_order", value }], { onConflict: "key" });
      if (error) throw error;
      return ids;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-settings"] });
    },
  });

  const handleSubmitCategory = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const name = String(formData.get("name") || "");
    const slug = String(formData.get("slug") || "");
    const description = String(formData.get("description") || "");
    upsertCategoryMutation.mutate({ name, slug, description });
  };

  const handleSubmitProduct = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    if (!editingProduct) {
      createProductMutation.mutate(formData);
      return;
    }

    const name = String(formData.get("name") || "").trim();
    const rawSlug = String(formData.get("slug") || "").trim();
    const slug = (rawSlug || slugify(name) || `product-${Date.now()}`).toLowerCase();
    const price = Number(formData.get("price") || 0);
    const stock = Number(formData.get("stock") || 0);
    const description = String(formData.get("description") || "").trim() || null;
    const categoryId = String(formData.get("category_id") || "").trim() || null;
    const category = categoryId ? categoriesById.get(categoryId)?.name ?? null : null;
    const active = formData.get("active") === "on";
    const featured = formData.get("featured") === "on";
    const imageFile = formData.get("image") as File | null;

    updateProductMutation.mutate({
      id: editingProduct.id,
      name,
      slug,
      price,
      stock,
      description,
      category_id: categoryId,
      category,
      active,
      featured,
      imageFile,
    });
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Cargando...</div>;
  }

  if (!session) {
    return (
      <div className="min-h-screen flex flex-col bg-muted/30">
        <AdminHeader />
        <main className="flex-1 flex items-center justify-center px-4 pt-24 pb-12">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle>Acceso administrador</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Contraseña</Label>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <Button type="submit" className="w-full">
                  Iniciar sesión
                </Button>
                <p className="text-xs text-center text-muted-foreground mt-4">
                  Si no tienes cuenta, debes crear un usuario en el{" "}
                  <a
                    href="https://app.supabase.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    panel de Supabase
                  </a>
                  .
                </p>
              </form>
            </CardContent>
          </Card>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <AdminHeader onLogout={handleLogout} />
      <main className="flex-1 container mx-auto px-4 pt-24 pb-12">
        <Tabs value={tab} onValueChange={setTab} className="w-full">
          <div className="flex items-start gap-6">
            <aside className="hidden md:block w-60 shrink-0">
              <div className="sticky top-24">
                <div className="mb-6">
                  <h1 className="text-xl font-bold leading-tight">Admin</h1>
                  <p className="text-sm text-muted-foreground">Evolution Mobility</p>
                </div>
                <TabsList className="flex h-auto w-full flex-col items-stretch gap-1 bg-transparent p-0">
                  <TabsTrigger value="dashboard" className="w-full justify-start">
                    Dashboard
                  </TabsTrigger>
                  <TabsTrigger value="products" className="w-full justify-start">
                    Productos
                  </TabsTrigger>
                  <TabsTrigger value="categories" className="w-full justify-start">
                    Categorías
                  </TabsTrigger>
                  <TabsTrigger value="security" className="w-full justify-start">
                    Seguridad (Examen)
                  </TabsTrigger>
                </TabsList>
              </div>
            </aside>

            <section className="min-w-0 flex-1">
              <div className="md:hidden mb-6">
                <TabsList className="w-full flex flex-wrap">
                  <TabsTrigger value="dashboard" className="flex-1">
                    Dashboard
                  </TabsTrigger>
                  <TabsTrigger value="products" className="flex-1">
                    Productos
                  </TabsTrigger>
                  <TabsTrigger value="categories" className="flex-1">
                    Categorías
                  </TabsTrigger>
                  <TabsTrigger value="security" className="flex-1">
                    Seguridad
                  </TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value="dashboard">
                <AdminDashboard />
              </TabsContent>

              <TabsContent value="products" className="space-y-6">
                <section className="grid lg:grid-cols-[2fr,3fr] gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>{editingProduct ? "Editar producto" : "Nuevo producto"}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <form
                        key={editingProduct?.id || 'new_product'}
                        ref={productFormRef}
                        onSubmit={handleSubmitProduct}
                        className="space-y-4"
                      >
                        <div className="space-y-2">
                          <Label htmlFor="name">Nombre</Label>
                          <Input
                            id="name"
                            name="name"
                            defaultValue={editingProduct?.name ?? ""}
                            required
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="price">Precio (€)</Label>
                            <Input
                              id="price"
                              name="price"
                              type="number"
                              step="0.01"
                              min="0"
                              defaultValue={editingProduct?.price ?? ""}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="stock">Stock</Label>
                            <Input
                              id="stock"
                              name="stock"
                              type="number"
                              min="0"
                              defaultValue={editingProduct?.stock ?? ""}
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="slug">Slug</Label>
                          <Input
                            id="slug"
                            name="slug"
                            defaultValue={editingProduct?.slug ?? ""}
                            placeholder="auto-si-se-deja-vacio"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="category_id">Categoría</Label>
                          <select
                            id="category_id"
                            name="category_id"
                            defaultValue={editingProduct?.category_id ?? ""}
                            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                          >
                            <option value="">Sin categoría</option>
                            {(categoriesQuery.data || []).map((c) => (
                              <option key={c.id} value={c.id}>
                                {c.name}
                              </option>
                            ))}
                          </select>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="image">Imagen principal</Label>
                          <input
                            id="image"
                            name="image"
                            type="file"
                            accept="image/*"
                            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                          />
                          {!!editingProduct?.image_url && (
                            <div className="mt-2">
                              <img
                                src={editingProduct.image_url}
                                alt={editingProduct.name}
                                className="h-20 w-20 object-contain rounded-md border bg-white"
                              />
                            </div>
                          )}
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="description">Descripción</Label>
                          <Textarea
                            id="description"
                            name="description"
                            defaultValue={editingProduct?.description ?? ""}
                            className="min-h-[120px]"
                          />
                        </div>

                        <div className="flex flex-wrap items-center gap-6">
                          <div className="flex items-center space-x-2">
                            <input
                              id="active"
                              name="active"
                              type="checkbox"
                              defaultChecked={editingProduct?.active ?? true}
                              className="h-4 w-4"
                            />
                            <Label htmlFor="active">Activo</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <input
                              id="featured"
                              name="featured"
                              type="checkbox"
                              defaultChecked={editingProduct?.featured ?? false}
                              className="h-4 w-4"
                            />
                            <Label htmlFor="featured">Destacado</Label>
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-3">
                          <Button
                            type="submit"
                            disabled={createProductMutation.isPending || updateProductMutation.isPending}
                          >
                            {editingProduct ? "Guardar cambios" : "Crear producto"}
                          </Button>
                          {editingProduct && (
                            <Button
                              type="button"
                              variant="outline"
                              onClick={() => {
                                setEditingProduct(null);
                                productFormRef.current?.reset();
                              }}
                            >
                              Cancelar
                            </Button>
                          )}
                        </div>

                        {(createProductMutation.isError || updateProductMutation.isError) && (
                          <p className="text-sm text-red-600">
                            {(
                              (createProductMutation.error || updateProductMutation.error) as Error
                            ).message.toString()}
                          </p>
                        )}
                      </form>

                      {editingProduct && (
                        <div className="space-y-8">
                          <div className="space-y-3">
                            <div className="flex items-center justify-between">
                              <h3 className="text-sm font-semibold">Imágenes</h3>
                            </div>

                            <div className="grid gap-3">
                              <div className="grid grid-cols-1 sm:grid-cols-[1fr,auto] gap-3">
                                <div className="space-y-2">
                                  <Label htmlFor="product_image">Subir nueva</Label>
                                  <input
                                    id="product_image"
                                    ref={productImageInputRef}
                                    type="file"
                                    accept="image/*"
                                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                                  />
                                  <Input
                                    value={newImageAlt}
                                    onChange={(e) => setNewImageAlt(e.target.value)}
                                    placeholder="Alt (opcional)"
                                  />
                                </div>
                                <div className="flex items-end">
                                  <Button
                                    type="button"
                                    disabled={addProductImageMutation.isPending}
                                    onClick={() => {
                                      const file = productImageInputRef.current?.files?.[0];
                                      if (!file) return;
                                      addProductImageMutation.mutate({
                                        productId: editingProduct.id,
                                        file,
                                        alt: newImageAlt,
                                      });
                                    }}
                                  >
                                    Añadir
                                  </Button>
                                </div>
                              </div>

                              {productImagesQuery.isError && (
                                <p className="text-sm text-red-600">
                                  {(productImagesQuery.error as Error).message}
                                </p>
                              )}

                              {(productImagesQuery.data || []).length === 0 ? (
                                <p className="text-sm text-muted-foreground">Sin imágenes extra.</p>
                              ) : (
                                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                                  {(productImagesQuery.data || []).map((img) => (
                                    <div key={img.id} className="border rounded-md overflow-hidden">
                                      <div className="aspect-square bg-muted/30 flex items-center justify-center">
                                        <img
                                          src={img.image_url}
                                          alt={img.alt || editingProduct.name}
                                          className="max-h-full max-w-full object-contain bg-white"
                                        />
                                      </div>
                                      <div className="p-2 space-y-2">
                                        <div className="flex items-center justify-between gap-2">
                                          <span className="text-xs text-muted-foreground truncate">
                                            {img.is_main ? "Principal" : "Extra"}
                                          </span>
                                          <div className="flex items-center gap-2">
                                            {!img.is_main && (
                                              <Button
                                                type="button"
                                                size="sm"
                                                variant="outline"
                                                onClick={() =>
                                                  setMainProductImageMutation.mutate({
                                                    productId: editingProduct.id,
                                                    imageId: img.id,
                                                    imageUrl: img.image_url,
                                                  })
                                                }
                                                disabled={setMainProductImageMutation.isPending}
                                              >
                                                Principal
                                              </Button>
                                            )}
                                            <Button
                                              type="button"
                                              size="sm"
                                              variant="destructive"
                                              onClick={() =>
                                                deleteProductImageMutation.mutate({
                                                  id: img.id,
                                                  productId: editingProduct.id,
                                                })
                                              }
                                              disabled={deleteProductImageMutation.isPending}
                                            >
                                              Eliminar
                                            </Button>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              )}
                            </div>
                          </div>

                          <div className="space-y-3">
                            <h3 className="text-sm font-semibold">Especificaciones</h3>

                            <div className="grid grid-cols-1 md:grid-cols-[1fr,1fr,auto] gap-3">
                              <Input
                                value={newSpecName}
                                onChange={(e) => setNewSpecName(e.target.value)}
                                placeholder="Nombre"
                              />
                              <Input
                                value={newSpecValue}
                                onChange={(e) => setNewSpecValue(e.target.value)}
                                placeholder="Valor"
                              />
                              <Button
                                type="button"
                                disabled={addProductSpecMutation.isPending || !newSpecName.trim() || !newSpecValue.trim()}
                                onClick={() => {
                                  if (!newSpecName.trim() || !newSpecValue.trim()) return;
                                  addProductSpecMutation.mutate({
                                    productId: editingProduct.id,
                                    name: newSpecName,
                                    value: newSpecValue,
                                  });
                                }}
                              >
                                Añadir
                              </Button>
                            </div>

                            {productSpecsQuery.isError && (
                              <p className="text-sm text-red-600">
                                {(productSpecsQuery.error as Error).message}
                              </p>
                            )}

                            {(productSpecsQuery.data || []).length === 0 ? (
                              <p className="text-sm text-muted-foreground">Sin especificaciones.</p>
                            ) : (
                              <div className="overflow-x-auto">
                                <table className="w-full text-sm">
                                  <thead>
                                    <tr className="border-b">
                                      <th className="py-2 text-left">Nombre</th>
                                      <th className="py-2 text-left">Valor</th>
                                      <th className="py-2 text-right">Acciones</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {(productSpecsQuery.data || []).map((spec) => (
                                      <tr key={spec.id} className="border-b last:border-0">
                                        <td className="py-2 pr-2">
                                          <Input
                                            defaultValue={spec.name}
                                            onBlur={(e) => {
                                              const name = e.target.value.trim();
                                              if (name && name !== spec.name) {
                                                updateProductSpecMutation.mutate({
                                                  id: spec.id,
                                                  name,
                                                  value: spec.value,
                                                });
                                              }
                                            }}
                                          />
                                        </td>
                                        <td className="py-2 pr-2">
                                          <Input
                                            defaultValue={spec.value}
                                            onBlur={(e) => {
                                              const value = e.target.value.trim();
                                              if (value && value !== spec.value) {
                                                updateProductSpecMutation.mutate({
                                                  id: spec.id,
                                                  name: spec.name,
                                                  value,
                                                });
                                              }
                                            }}
                                          />
                                        </td>
                                        <td className="py-2 text-right">
                                          <Button
                                            type="button"
                                            size="sm"
                                            variant="destructive"
                                            onClick={() => deleteProductSpecMutation.mutate({ id: spec.id })}
                                            disabled={deleteProductSpecMutation.isPending}
                                          >
                                            Eliminar
                                          </Button>
                                        </td>
                                      </tr>
                                    ))}
                                  </tbody>
                                </table>
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>

                  <Card className="overflow-hidden">
                    <CardHeader>
                      <CardTitle>Productos</CardTitle>
                    </CardHeader>
                    <CardContent>
                      {productsQuery.isLoading && <p>Cargando productos...</p>}
                      {productsQuery.isError && (
                        <p className="text-sm text-red-600">{(productsQuery.error as Error).message}</p>
                      )}
                      {productsQuery.data && productsQuery.data.length === 0 && (
                        <p className="text-sm text-muted-foreground">No hay productos todavía.</p>
                      )}
                      {productsQuery.data && productsQuery.data.length > 0 && (
                        <div className="overflow-x-auto">
                          <table className="w-full text-sm">
                            <thead>
                              <tr className="border-b">
                                <th className="py-2 text-left">Nombre</th>
                                <th className="py-2 text-left">Categoría</th>
                                <th className="py-2 text-right">Precio</th>
                                <th className="py-2 text-center">Activo</th>
                                <th className="py-2 text-center">Destacado</th>
                                <th className="py-2 text-right">Acciones</th>
                              </tr>
                            </thead>
                            <tbody>
                              {productsQuery.data.map((product) => (
                                <tr key={product.id} className="border-b last:border-0 hover:bg-muted/40">
                                  <td className="py-2 pr-2 font-medium">{product.name}</td>
                                  <td className="py-2 pr-2">
                                    {product.category_id ? categoriesById.get(product.category_id)?.name : product.category}
                                  </td>
                                  <td className="py-2 pr-2 text-right">
                                    {(product.price ?? 0).toFixed(2)} €
                                  </td>
                                  <td className="py-2 pr-2 text-center">{product.active ? "Sí" : "No"}</td>
                                  <td className="py-2 pr-2 text-center">{product.featured ? "Sí" : "No"}</td>
                                  <td className="py-2 text-right space-x-2">
                                    <Button
                                      size="sm"
                                      variant="outline"
                                      onClick={() => {
                                        setEditingProduct(product);
                                        setTab("products");
                                        setTimeout(() => productFormRef.current?.scrollIntoView({ behavior: "smooth" }), 0);
                                      }}
                                    >
                                      Editar
                                    </Button>
                                    <Button
                                      size="sm"
                                      variant="destructive"
                                      onClick={() => deleteProductMutation.mutate(product.id)}
                                      disabled={deleteProductMutation.isPending}
                                    >
                                      Eliminar
                                    </Button>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </section>
              </TabsContent>

              <TabsContent value="categories" className="space-y-6">
                <section className="grid lg:grid-cols-[2fr,3fr] gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>{editingCategory ? "Editar categoría" : "Nueva categoría"}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <form 
                        key={editingCategory?.id || 'new_category'}
                        ref={categoryFormRef} 
                        onSubmit={handleSubmitCategory} 
                        className="space-y-4"
                      >
                        <div className="space-y-2">
                          <Label htmlFor="cat_name">Nombre</Label>
                          <Input
                            id="cat_name"
                            name="name"
                            defaultValue={editingCategory?.name ?? ""}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="cat_slug">Slug</Label>
                          <Input
                            id="cat_slug"
                            name="slug"
                            defaultValue={editingCategory?.slug ?? ""}
                            placeholder="auto-si-se-deja-vacio"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="cat_desc">Descripción</Label>
                          <Textarea
                            id="cat_desc"
                            name="description"
                            defaultValue={editingCategory?.description ?? ""}
                            className="min-h-[120px]"
                          />
                        </div>
                        <div className="flex flex-wrap gap-3">
                          <Button type="submit" disabled={upsertCategoryMutation.isPending}>
                            {editingCategory ? "Guardar cambios" : "Crear categoría"}
                          </Button>
                          {editingCategory && (
                            <Button
                              type="button"
                              variant="outline"
                              onClick={() => {
                                setEditingCategory(null);
                                categoryFormRef.current?.reset();
                              }}
                            >
                              Cancelar
                            </Button>
                          )}
                        </div>
                        {upsertCategoryMutation.isError && (
                          <p className="text-sm text-red-600">
                            {(upsertCategoryMutation.error as Error).message}
                          </p>
                        )}
                      </form>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Categorías</CardTitle>
                    </CardHeader>
                    <CardContent>
                      {categoriesQuery.isLoading && <p>Cargando categorías...</p>}
                      {categoriesQuery.isError && (
                        <p className="text-sm text-red-600">{(categoriesQuery.error as Error).message}</p>
                      )}
                      {(categoriesQuery.data || []).length === 0 ? (
                        <p className="text-sm text-muted-foreground">No hay categorías todavía.</p>
                      ) : (
                        <div className="overflow-x-auto">
                          <table className="w-full text-sm">
                            <thead>
                              <tr className="border-b">
                                <th className="py-2 text-left">Nombre</th>
                                <th className="py-2 text-left">Slug</th>
                                <th className="py-2 text-right">Acciones</th>
                              </tr>
                            </thead>
                            <tbody>
                              {(categoriesQuery.data || []).map((cat) => (
                                <tr key={cat.id} className="border-b last:border-0 hover:bg-muted/40">
                                  <td className="py-2 pr-2 font-medium">{cat.name}</td>
                                  <td className="py-2 pr-2 text-muted-foreground">{cat.slug}</td>
                                  <td className="py-2 text-right space-x-2">
                                    <Button size="sm" variant="outline" onClick={() => setEditingCategory(cat)}>
                                      Editar
                                    </Button>
                                    <Button
                                      size="sm"
                                      variant="destructive"
                                      onClick={() => deleteCategoryMutation.mutate(cat.id)}
                                      disabled={deleteCategoryMutation.isPending}
                                    >
                                      Eliminar
                                    </Button>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </section>
              </TabsContent>
              <TabsContent value="security" className="space-y-6">
                <section className="grid lg:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Criptografía de ida (Encriptar)</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <Label>Texto original</Label>
                        <Input 
                          placeholder="Introduce un secreto..."
                          value={plainTextData}
                          onChange={(e) => setPlainTextData(e.target.value)}
                        />
                      </div>
                      <Button onClick={() => setEncryptedDataResult(encryptData(plainTextData))}>
                        Encriptar (AES)
                      </Button>
                      {encryptedDataResult && (
                        <div className="p-3 bg-muted rounded-md break-all">
                          <p className="text-xs font-mono">{encryptedDataResult}</p>
                        </div>
                      )}
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Criptografía de vuelta (Desencriptar)</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <Label>Cifrado (Ciphertext)</Label>
                        <Input 
                          placeholder="Pega aquí el código cifrado..."
                          value={testCiphertext}
                          onChange={(e) => setTestCiphertext(e.target.value)}
                        />
                      </div>
                      <Button onClick={() => setDecryptedDataResult(decryptData(testCiphertext))}>
                        Desencriptar (AES)
                      </Button>
                      {decryptedDataResult && (
                        <div className="p-3 bg-success/20 border border-success/30 rounded-md">
                          <p className="font-semibold text-success">{decryptedDataResult}</p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </section>
                
                <Card>
                    <CardHeader>
                      <CardTitle>Demostración de Hasheado (No reversible)</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-sm text-muted-foreground mb-4">
                            El login ahora utiliza <strong>MD5</strong> para hashear la contraseña en el cliente. 
                            Este proceso es de "un solo sentido".
                        </p>
                        <div className="p-4 border rounded-md">
                            <p className="text-xs font-mono">MD5("evolucion") = 25b045151b7470bf764f697475f48356</p>
                        </div>
                    </CardContent>
                </Card>
              </TabsContent>

            </section>
          </div>
        </Tabs>
      </main>
    </div>
  );
};

export default Admin;
