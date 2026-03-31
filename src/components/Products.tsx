import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Star, Battery, Gauge, Shield } from "lucide-react";

type Product = {
  id: number;
  name: string;
  category: string;
  price: string;
  originalPrice?: string | null;
  image: string;
  rating: number;
  reviews: number;
  features: string[];
  isNew?: boolean;
  isPopular?: boolean;
  discount?: number;
};

const Products = () => {
  const products: Product[] = [
    {
      id: 1,
      name: "SmartGyro Raptor Dual",
      category: "Patinetes Eléctricos",
      price: "€1.490",
      originalPrice: null,
      image: "/placeholder.svg",
      rating: 4.9,
      reviews: 42,
      features: ["Doble motor", "Batería 60V", "Suspensión completa"],
      isNew: true,
      isPopular: true,
      discount: 0,
    },
    {
      id: 2,
      name: "SmartGyro K2 Terra",
      category: "Patinetes Eléctricos",
      price: "€899",
      originalPrice: null,
      image: "/placeholder.svg",
      rating: 4.8,
      reviews: 30,
      features: ["800 W", "Batería 13.000 mAh", "Autonomía ~45 km"],
      isPopular: true,
      discount: 0,
    },
    {
      id: 3,
      name: "SmartGyro e-Xplorer-2",
      category: "Patinetes Eléctricos",
      price: "€749",
      originalPrice: null,
      image: "/placeholder.svg",
      rating: 4.7,
      reviews: 20,
      features: ["Plegable", "Estructura robusta", "Gran estabilidad"],
      discount: 0,
    },
    {
      id: 4,
      name: "SmartGyro SpeedWay",
      category: "Patinetes Eléctricos",
      price: "€900",
      originalPrice: null,
      image: "/placeholder.svg",
      rating: 4.7,
      reviews: 25,
      features: ["Alta potencia", "Diseño elegante", "Buen rendimiento"],
      discount: 0,
    },
  ];

  return (
    <section id="catalog" className="py-24 bg-muted border-b border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 animate-fade-in border-b border-border pb-6">
          <div>
            <div className="mb-4 inline-block px-3 py-1 bg-primary/10 border border-primary text-primary text-xs font-bold uppercase tracking-widest">
              Equipamiento Top
            </div>
            <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tight">
              Modelos Premium
            </h2>
          </div>
          <p className="text-muted-foreground max-w-md mt-4 md:mt-0 text-right text-sm">
            Descubre nuestra selección de patinetes de alta gama diseñados para dominar el asfalto.
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {products.map((product, index) => (
            <div
              key={product.id}
              className="bg-card border border-border group hover:border-primary transition-all duration-300 flex flex-col relative animate-scale-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="relative overflow-hidden bg-black/5 border-b border-border aspect-square flex items-center justify-center p-4">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />

                {/* Industrial Badges */}
                <div className="absolute top-0 left-0 flex flex-col gap-1 w-full">
                  {product.isNew && (
                    <div className="bg-primary text-primary-foreground text-[10px] font-black uppercase px-2 py-1 w-fit">
                      Nuevo
                    </div>
                  )}
                  {product.discount && product.discount > 0 && (
                    <div className="bg-destructive text-destructive-foreground text-[10px] font-black uppercase px-2 py-1 w-fit">
                      -{product.discount}%
                    </div>
                  )}
                </div>

                {/* Rating Block */}
                <div className="absolute bottom-0 right-0 bg-background border-t border-l border-border px-2 py-1 flex items-center space-x-1">
                  <Star className="w-3 h-3 fill-primary text-primary" />
                  <span className="text-xs font-bold text-foreground">
                    {product.rating}
                  </span>
                </div>
              </div>

              <div className="p-5 flex flex-col flex-1">
                <div className="mb-2 uppercase text-[10px] font-bold text-primary tracking-wider">
                  {product.category}
                </div>

                <h3 className="text-lg font-black mb-3 uppercase tracking-tight group-hover:text-primary transition-colors line-clamp-2">
                  {product.name}
                </h3>

                {/* Features (Solid blocks instead of soft tags) */}
                <div className="flex flex-col gap-1 mb-6">
                  {product.features.map((feature, i) => (
                    <span
                      key={i}
                      className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider flex items-center before:content-[''] before:w-1 before:h-1 before:bg-primary before:mr-2"
                    >
                      {feature}
                    </span>
                  ))}
                </div>

                {/* Price block */}
                <div className="mt-auto pt-4 border-t border-border flex items-center justify-between">
                  <div className="flex flex-col">
                    {product.originalPrice && (
                      <span className="text-[10px] text-muted-foreground line-through">
                        {product.originalPrice}
                      </span>
                    )}
                    <span className="text-2xl font-black text-foreground">
                      {product.price}
                    </span>
                  </div>
                  <Button className="rounded-none bg-primary hover:bg-primary-glow text-primary-foreground w-10 h-10 p-0 flex items-center justify-center">
                    <ArrowRight className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Industrial Highlights Section */}
        <div className="grid md:grid-cols-3 gap-1 grid-cols-1 bg-border">
          <div className="bg-card p-8 flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-muted border border-border mb-6 flex items-center justify-center transform -skew-x-[10deg]">
              <Battery className="w-8 h-8 text-primary transform skew-x-[10deg]" />
            </div>
            <h3 className="text-lg font-black uppercase tracking-tight mb-2">Máxima Autonomía</h3>
            <p className="text-sm text-muted-foreground">Hasta 80 km con baterías LG de alta capacidad.</p>
          </div>

          <div className="bg-card p-8 flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-muted border border-border mb-6 flex items-center justify-center transform -skew-x-[10deg]">
              <Gauge className="w-8 h-8 text-primary transform skew-x-[10deg]" />
            </div>
            <h3 className="text-lg font-black uppercase tracking-tight mb-2">Alto Rendimiento</h3>
            <p className="text-sm text-muted-foreground">Motores duales de hasta 2000W para superar cualquier cuesta.</p>
          </div>

          <div className="bg-card p-8 flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-muted border border-border mb-6 flex items-center justify-center transform -skew-x-[10deg]">
              <Shield className="w-8 h-8 text-primary transform skew-x-[10deg]" />
            </div>
            <h3 className="text-lg font-black uppercase tracking-tight mb-2">Seguridad Extrema</h3>
            <p className="text-sm text-muted-foreground">Frenos hidráulicos NUTT y chasis de aleación de aluminio 6061.</p>
          </div>
        </div>

        {/* Global Action CTA */}
        <div className="mt-16 text-center">
          <Button
            size="lg"
            variant="outline"
            className="rounded-none border-2 border-foreground bg-transparent text-foreground hover:bg-foreground hover:text-background font-black uppercase tracking-widest text-sm h-14 px-8"
          >
            Explorar todo el equipamiento
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Products;
