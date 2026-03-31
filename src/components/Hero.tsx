import { Button } from "@/components/ui/button";
import { ArrowRight, Zap, Shield, Battery } from "lucide-react";
import ImageCarousel from "@/components/ui/ImageCarousel";
import { Link } from "react-router-dom";
import logo from "@/assets/Rotulo-3-03-junto-azul-1.png";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";

import heroScooter1 from "../assets/hero/real_scooter_1.png";
import heroScooter2 from "../assets/hero/real_scooter_2.png";
import heroScooter3 from "../assets/hero/real_scooter_3.png";

const Hero = () => {
  const { data: dbProducts } = useQuery({
    queryKey: ["hero-featured-images"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("products")
        .select("id, name, image_url")
        .eq("active", true)
        .not("image_url", "is", null)
        .limit(5);
      if (error) throw error;
      return data || [];
    }
  });

  const defaultImages = [
    { src: heroScooter1, alt: "Patinete eléctrico Evolution Mobility ciudad" },
    { src: heroScooter2, alt: "Patinete eléctrico Evolution Mobility detalle studio" },
    { src: heroScooter3, alt: "Patinete eléctrico Evolution Mobility en movimiento" }
  ];

  const dbImages = dbProducts?.filter(p => p.image_url).map(p => ({
    src: p.image_url!,
    alt: `Evolution Mobility - ${p.name}`
  }));

  const carouselImages = dbImages && dbImages.length > 0 ? dbImages : defaultImages;

  return (
    <section id="home" className="relative pt-24 pb-16 md:pt-32 md:pb-24 overflow-hidden bg-gradient-to-b from-background via-muted/30 to-background border-b border-border">

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          
          {/* Content Block */}
          <div className="animate-fade-in flex flex-col justify-center">
            {/* Main Logo instead of Text Title */}
            <div className="mb-8">
              <img 
                src={logo} 
                alt="Evolution Mobility Logo" 
                className="w-full max-w-[400px] md:max-w-[500px] h-auto object-contain"
              />
              <h1 className="sr-only">Evolution Mobility - Lleva tu movilidad al límite</h1>
            </div>
            
            <p className="text-lg md:text-xl text-muted-foreground font-medium mb-8 max-w-lg border-l-4 border-primary pl-4">
              Patinetes eléctricos de alto rendimiento, recambios originales y servicio técnico especializado para que nada te frene.
            </p>

            {/* Solid Feature highlights */}
            <div className="flex flex-wrap gap-4 mb-10">
              <div className="flex items-center space-x-2 bg-card border border-border px-4 py-2">
                <Zap className="w-5 h-5 text-primary" />
                <span className="text-sm font-medium uppercase tracking-wide">Potencia extrema</span>
              </div>
              <div className="flex items-center space-x-2 bg-card border border-border px-4 py-2">
                <Battery className="w-5 h-5 text-primary" />
                <span className="text-sm font-medium uppercase tracking-wide">Gran autonomía</span>
              </div>
              <div className="flex items-center space-x-2 bg-card border border-border px-4 py-2">
                <Shield className="w-5 h-5 text-primary" />
                <span className="text-sm font-medium uppercase tracking-wide">Garantía oficial</span>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/catalog" className="w-full sm:w-auto">
                <Button 
                  size="lg" 
                  className="w-full h-14 bg-primary text-primary-foreground hover:bg-primary/90 text-lg uppercase font-bold tracking-wider rounded-none"
                >
                  Ver Catálogo
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/repairs" className="w-full sm:w-auto">
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="w-full h-14 border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground text-lg uppercase font-bold tracking-wider rounded-none"
                >
                  Taller Especializado
                </Button>
              </Link>
            </div>
          </div>

          {/* Hero Image Block */}
          <div className="relative animate-scale-in flex items-center justify-center">
            {/* Elemento de diseño de fondo asimétrico típico de industrial/racing */}
            <div className="absolute inset-0 bg-card border border-border transform skew-x-[-10deg] -z-10 hidden md:block" />
            
            <div className="relative z-10 w-full max-w-lg p-4">
              <ImageCarousel 
                images={carouselImages}
                autoPlay={true}
                autoPlayInterval={5000}
                className="w-full"
              />
            </div>
            
            <div className="absolute top-4 right-4 bg-primary text-primary-foreground font-black text-2xl p-4 rounded-full w-24 h-24 flex flex-col items-center justify-center shadow-lg transform rotate-12 z-20">
              <span>Nº 1</span>
              <span className="text-xs uppercase">Ventas</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;