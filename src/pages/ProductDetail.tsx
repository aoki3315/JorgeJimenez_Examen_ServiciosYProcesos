import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/contexts/CartContext";
import { supabase } from "@/lib/supabase";
import {
  ArrowLeft,
  Star,
  Heart,
  Share2,
  ShoppingCart,
  CreditCard,
  Truck,
  Shield,
  Battery,
  Gauge,
  Weight,
  Zap,
  Phone,
  MessageCircle,
  CheckCircle,
  Clock
} from "lucide-react";

interface Product {
  id: string;
  name: string;
  sku: string;
  description?: string;
  price: number;
  stock: number;
  image_url?: string;
  active: boolean;
  category: string | null;
}

const ProductDetail = () => {
  const { id } = useParams();
  const { addItem } = useCart();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        
        const { data, error } = await supabase
          .from('products')
          .select('*')
          .eq('id', id)
          .single();
          
        if (error) throw error;
        setProduct(data);
      } catch (err) {
        console.error("Error fetching product:", err);
        setError("Producto no encontrado");
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Header />
        <div className="flex-grow flex items-center justify-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Header />
        <div className="flex-grow flex flex-col items-center justify-center gap-4">
          <h1 className="text-2xl font-bold">Producto no encontrado</h1>
          <p className="text-muted-foreground">Lo sentimos, no hemos podido encontrar el producto que buscas.</p>
          <Link to="/catalog">
            <Button>Volver al catálogo</Button>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("es-ES", {
      style: "currency",
      currency: "EUR",
    }).format(price);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8 mt-20">
        <Link to="/catalog" className="inline-flex items-center text-muted-foreground hover:text-primary mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Volver al catálogo
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Product Image */}
          <div className="space-y-4">
            <div className="aspect-square bg-white rounded-none border border-border overflow-hidden p-8 flex items-center justify-center shadow-sm">
              {product.image_url ? (
                <img
                  src={product.image_url}
                  alt={product.name}
                  className="w-full h-full object-contain hover:scale-105 transition-transform duration-500"
                />
              ) : (
                <div className="text-muted-foreground">Sin imagen</div>
              )}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Badge variant="secondary" className="bg-primary/10 text-primary hover:bg-primary/20 transition-colors">
                  {product.category}
                </Badge>
                {product.stock > 0 ? (
                  <Badge variant="outline" className="text-green-600 border-green-600">
                    En Stock
                  </Badge>
                ) : (
                  <Badge variant="outline" className="text-red-600 border-red-600">
                    Agotado
                  </Badge>
                )}
              </div>
              
              <h1 className="text-4xl font-bold text-foreground mb-4 leading-tight">{product.name}</h1>
              
              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                  <span className="ml-2 text-sm text-muted-foreground font-medium">(4.8 - 24 reseñas)</span>
                </div>
              </div>

              <div className="flex items-baseline gap-4 mb-8">
                <span className="text-4xl font-bold text-primary">{formatPrice(product.price)}</span>
              </div>

              <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                {product.description || "Sin descripción disponible."}
              </p>

              <div className="flex flex-col sm:flex-row gap-4 pt-8 border-t border-border">
                <Button 
                  size="lg" 
                  className="flex-1 text-lg h-14 bg-primary hover:bg-primary/90 transition-all shadow-lg hover:shadow-xl hover:-translate-y-1"
                  onClick={() => addItem({
                    id: product.id,
                    name: product.name,
                    price: product.price,
                    image: product.image_url || "",
                    slug: product.id
                  })}
                  disabled={product.stock <= 0}
                >
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  {product.stock > 0 ? "Añadir al Carrito" : "Agotado"}
                </Button>
                <Button size="lg" variant="outline" className="h-14 px-6 hover:bg-secondary/50 transition-colors">
                  <Heart className="w-5 h-5" />
                </Button>
              </div>
            </div>

            {/* Extra Info Cards */}
            <div className="grid grid-cols-1 gap-4">
              <Card className="p-4 flex items-center gap-3 bg-muted/30 border-none">
                <div className="p-2 bg-background rounded-full shadow-sm">
                  <Shield className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="font-semibold text-sm">Garantía</p>
                  <p className="text-xs text-muted-foreground">3 años oficial</p>
                </div>
              </Card>
            </div>
          </div>
        </div>

        {/* Features/Specs Tabs would go here if we had that data */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-6">Especificaciones</h2>
          <div className="bg-card border border-border rounded-none p-6">
            <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
              <div className="flex justify-between py-3 border-b border-border">
                <dt className="text-muted-foreground">SKU</dt>
                <dd className="font-medium">{product.sku}</dd>
              </div>
              <div className="flex justify-between py-3 border-b border-border">
                <dt className="text-muted-foreground">Categoría</dt>
                <dd className="font-medium">{product.category}</dd>
              </div>
              <div className="flex justify-between py-3 border-b border-border">
                <dt className="text-muted-foreground">Disponibilidad</dt>
                <dd className="font-medium">{product.stock > 0 ? "En Stock" : "Agotado"}</dd>
              </div>
            </dl>
          </div>
        </div>

      </main>
      <Footer />
    </div>
  );
};

export default ProductDetail;
