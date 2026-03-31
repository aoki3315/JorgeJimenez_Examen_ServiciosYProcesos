import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CatalogSection from "@/components/ui/CatalogSection";

const Catalog = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-20">
        <CatalogSection />
      </main>
      <Footer />
    </div>
  );
};

export default Catalog;
