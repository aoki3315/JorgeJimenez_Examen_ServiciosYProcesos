import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";

interface Product {
  id: string;
  name: string;
  sku: string;
  description?: string;
  price: number;
  stock: number;
  image_url?: string;
  category: string | null;
  active: boolean;
}

const FeaturedProducts = () => {
  const { addItem } = useCart();

  const { data: featured = [], isLoading, error } = useQuery<Product[]>({
    queryKey: ["featuredProducts"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('active', true)
        .order('price', { ascending: false })
        .limit(3);
        
      if (error) throw error;
      return data || [];
    },
  });

  return (
    <section className="py-20 bg-background text-foreground border-b border-border">
      <div className="container mx-auto px-4 text-center">
        <div className="mb-4 inline-block px-3 py-1 bg-primary/10 border border-primary text-primary text-xs font-bold uppercase tracking-widest">
          Lo más vendido
        </div>
        <h2 className="text-4xl md:text-5xl font-black mb-6 uppercase tracking-tight">
          Productos Destacados
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto mb-12 text-lg">
          Descubre algunos de nuestros modelos más populares. Encuentra el patinete eléctrico o recambio perfecto con un rendimiento extremo.
        </p>

        {isLoading ? (
          <p className="mb-10 text-muted-foreground uppercase tracking-widest animate-pulse">Cargando arsenal...</p>
        ) : error ? (
          <p className="mb-10 text-destructive font-bold uppercase">Error al cargar productos.</p>
        ) : featured.length === 0 ? (
          <p className="mb-10 text-muted-foreground">NO HAY PRODUCTOS DISPONIBLES EN ESTE MOMENTO.</p>
        ) : (
          <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {featured.map((product) => (
              <div
                key={product.id}
                className="bg-card text-card-foreground border border-border group hover:border-primary transition-all duration-300 flex flex-col relative"
              >
                {/* Sale / Popular badge placeholder */}
                <div className="absolute top-0 right-0 bg-primary text-primary-foreground text-[10px] font-black uppercase px-2 py-1 z-10">
                  Top Ventas
                </div>

                <Link to={`/product/${product.id}`} className="relative overflow-hidden bg-black/5 p-4 border-b border-border aspect-square flex items-center justify-center block">
                  <img
                    src={product.image_url || "/placeholder.svg"}
                    alt={product.name}
                    className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500"
                  />
                </Link>
                
                <div className="p-5 flex flex-col flex-1 text-left">
                  <Link to={`/product/${product.id}`}>
                    <h3 className="text-lg font-bold mb-2 line-clamp-2 uppercase tracking-tight group-hover:text-primary transition-colors">
                      {product.name}
                    </h3>
                  </Link>
                  
                  <div className="mt-auto pt-4 flex items-center justify-between">
                    <p className="text-2xl font-black text-foreground">
                      {product.price.toFixed(2)} €
                    </p>
                  </div>
                </div>

                {/* Aggressive action buttons */}
                <div className="flex border-t border-border">
                  <Link
                    to={`/product/${product.id}`}
                    className="flex-1 py-3 bg-muted hover:bg-muted-foreground/20 text-foreground text-xs font-black uppercase tracking-widest transition-colors text-center flex items-center justify-center border-r border-border"
                  >
                    Detalles
                  </Link>
                  <Button
                    size="icon"
                    onClick={() => {
                      addItem({
                        id: product.id,
                        name: product.name,
                        price: product.price,
                        image: product.image_url || "/placeholder.svg",
                        slug: product.id
                      });
                    }}
                    className="h-auto w-16 rounded-none bg-primary text-primary-foreground hover:bg-primary-glow transition-colors"
                  >
                    <ShoppingCart className="w-5 h-5" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}

        <Link
          to="/catalog"
          className="inline-flex items-center justify-center px-8 py-4 bg-transparent border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground font-black text-sm uppercase tracking-widest transition-all"
        >
          Ver Catálogo Completo
        </Link>
      </div>
    </section>
  );
};

export default FeaturedProducts;
