import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Eye } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { supabase } from "@/lib/supabase";
import { UiverseButton } from "@/components/ui/UiverseButton";

type Product = {
  id: string;
  name: string;
  sku: string;
  description?: string | null;
  price: number;
  stock: number;
  image_url?: string | null;
  active: boolean;
  category: string;
};

const CatalogSection = () => {
  const { addItem } = useCart();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"patinete" | "equipamiento">("patinete");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const { data, error } = await supabase
          .from('products')
          .select('*')
          .eq('active', true);
          
        if (error) throw error;
        
        setProducts(data || []);
      } catch (e) {
        console.error("Error fetching products:", e);
        setError("No se pudo cargar el catálogo. Por favor, inténtalo de nuevo más tarde.");
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const formatPrice = (value: number) => `${value.toFixed(2)} €`;

  return (
    <section className="py-12 md:py-24 bg-background text-foreground relative overflow-hidden">
      {/* Industrial brutalist background elements */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-zinc-950/[0.02] transform skew-x-[-20deg] translate-x-1/4 pointer-events-none" />
      <div className="absolute top-20 left-10 w-64 h-64 border border-border rounded-full animate-spin-slow pointer-events-none opacity-20 border-dashed" />

      <div className="container mx-auto px-4 relative z-10 max-w-7xl">
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between mb-16 border-b-2 border-border pb-8">
          <div className="text-left">
            <div className="inline-block px-3 py-1 bg-primary/10 border border-primary text-primary text-[10px] font-black uppercase tracking-[0.2em] mb-4">
              Inventario Oficial
            </div>
            <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter text-foreground mb-4 leading-none">
              Catálogo <br/>
              <span className="text-primary text-stroke-primary">Táctico</span>
            </h1>
            <p className="text-muted-foreground max-w-xl text-lg mt-6 border-l-4 border-primary pl-6 py-2 bg-gradient-to-r from-primary/5 to-transparent">
              Explora nuestra selección de patinetes de alto rendimiento y equipamiento 
              técnico. Máxima fiabilidad y control en cada ruta.
            </p>
          </div>
        </div>

        {/* Tabs - Brutalist Toggle */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          <button
            onClick={() => setActiveTab("patinete")}
            className={`px-8 py-4 text-xs font-black uppercase tracking-[0.2em] transition-all duration-300 border-2 flex items-center gap-2 ${
              activeTab === "patinete"
                ? "bg-primary text-primary-foreground border-primary shadow-[4px_4px_0px_0px_currentColor]"
                : "bg-transparent text-foreground border-border hover:border-primary hover:text-primary hover:-translate-y-1 hover:shadow-[4px_4px_0px_0px_hsl(var(--primary))]"
            }`}
          >
            Patinetes
          </button>
          <button
            onClick={() => setActiveTab("equipamiento")}
            className={`px-8 py-4 text-xs font-black uppercase tracking-[0.2em] transition-all duration-300 border-2 flex items-center gap-2 ${
              activeTab === "equipamiento"
                ? "bg-primary text-primary-foreground border-primary shadow-[4px_4px_0px_0px_currentColor]"
                : "bg-transparent text-foreground border-border hover:border-primary hover:text-primary hover:-translate-y-1 hover:shadow-[4px_4px_0px_0px_hsl(var(--primary))]"
            }`}
          >
            Equipamiento
          </button>
        </div>

        {loading && <p className="text-sm text-muted-foreground">Cargando catálogo...</p>}
        {error && <p className="text-sm text-red-600">{error}</p>}
        {!loading && !error && products.length === 0 && (
          <p className="text-sm text-muted-foreground">No hay productos disponibles todavía.</p>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-0 border-t border-l border-border bg-border/20">
          {products.filter(p => {
            const cat = p.category?.toLowerCase() || "";
            if (activeTab === "patinete") return cat.includes("patinete");
            if (activeTab === "equipamiento") return cat.includes("equip") || cat.includes("accesorio");
            return false;
          }).map((product) => (
            <div
              key={product.id}
              className="bg-card text-card-foreground border-b border-r border-border hover:border-primary hover:bg-primary/5 transition-all group flex flex-col relative"
            >
              {/* Product Type Tag */}
              <div className="absolute top-4 right-4 bg-muted px-2 py-1 text-[10px] font-black uppercase tracking-widest z-10 border border-border group-hover:border-primary transition-colors">
                {product.category}
              </div>

              <div className="w-full aspect-square bg-black/5 flex items-center justify-center p-8 relative overflow-hidden">
                {product.image_url ? (
                  <img
                    src={product.image_url}
                    alt={product.name}
                    className="w-full h-full object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-500"
                  />
                ) : (
                  <span className="text-muted-foreground text-xs font-bold tracking-widest uppercase">Sin Imagen</span>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              <div className="p-6 flex-1 flex flex-col border-t border-border">
                <div className="text-xs text-muted-foreground uppercase tracking-[0.2em] font-bold mb-2">SKU: {product.sku}</div>
                <Link to={`/product/${product.id}`}>
                  <h3 className="text-xl font-black uppercase tracking-tight mb-2 group-hover:text-primary transition-colors line-clamp-2 leading-none">{product.name}</h3>
                </Link>
                
                <div className="mt-auto pt-6 flex flex-col gap-4">
                  <span className="text-3xl font-black tracking-tighter">{formatPrice(product.price)}</span>
                  <div className="flex gap-0 border border-border w-full">
                    <Link to={`/product/${product.id}`} className="flex-1">
                      <Button
                        variant="ghost"
                        className="w-full h-12 rounded-none hover:bg-muted/40 text-xs font-semibold uppercase tracking-widest text-muted-foreground hover:text-foreground border-r border-border transition-colors"
                      >
                        <Eye className="w-4 h-4 mr-2 opacity-60" />
                        Info
                      </Button>
                    </Link>
                    <Button
                      variant="ghost"
                      onClick={() => {
                        addItem({
                          id: product.id,
                          name: product.name,
                          price: product.price,
                          image: product.image_url || "/placeholder.svg",
                          slug: product.id,
                        });
                      }}
                      className="w-16 h-12 rounded-none hover:bg-primary hover:text-primary-foreground text-foreground transition-colors"
                    >
                      <ShoppingCart className="w-5 h-5" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CatalogSection;
