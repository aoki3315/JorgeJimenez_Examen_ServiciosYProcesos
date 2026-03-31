import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import FeaturedProducts from "@/components/FeaturedProducts";
import WorkshopBackground from "@/components/WorkshopBackground";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        
        <WorkshopBackground 
          image="https://images.unsplash.com/photo-1589792923962-537704632910?auto=format&fit=crop&q=80"
          title="Nuestro Taller"
          subtitle="Donde la magia sucede. Especialistas en movilidad eléctrica."
        />
        
        <FeaturedProducts />
        
        <WorkshopBackground 
          image="https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&q=80"
          title="Servicios Profesionales"
          subtitle="Mantenimiento, reparación y personalización de máxima calidad."
        />
        
        <Services />
      </main>
      <Footer />
    </div>
  );
};

export default Index;