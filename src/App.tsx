import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "./contexts/CartContext";
import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";

import Index from "./pages/Index";
import Catalog from "./pages/Catalog";
import Repairs from "./pages/Repairs";
import NotFound from "./pages/NotFound";
import Financing from "./pages/Financing";
import Contact from "./pages/Contact";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import CookieConsent from "./components/CookieConsent";

import Admin from "./pages/Admin";

// Product pages
import SmartGyroK2Terra from "./pages/products/SmartGyroK2Terra";
import SmartGyroExplorer2 from "./pages/products/SmartGyroExplorer2";
import SmartGyroSpeedWay from "./pages/products/SmartGyroSpeedWay";
import SmartGyroSpeedWayPro from "./pages/products/SmartGyroSpeedWayPro";

// Content pages
import MaintenanceGuide from "./pages/MaintenanceGuide";
import RegulationNews from "./pages/RegulationNews";

const queryClient = new QueryClient();

const SeoBridge = () => {
  const settingsQuery = useQuery<{ key: string; value: string | null }[]>({
    queryKey: ["public-seo-settings"],
    queryFn: async () => {
      const keys = ["seo_site_title", "seo_site_description"];
      const { data, error } = await supabase.from("settings").select("key,value").in("key", keys);
      if (error) throw error;
      return data || [];
    },
  });

  const map = new Map((settingsQuery.data || []).map((r) => [r.key, r.value || ""]));
  const title = map.get("seo_site_title") || "";
  const description = map.get("seo_site_description") || "";

  useEffect(() => {
    if (title.trim()) document.title = title.trim();
  }, [title]);

  useEffect(() => {
    if (!description.trim()) return;
    const content = description.trim();
    let meta = document.querySelector('meta[name="description"]') as HTMLMetaElement | null;
    if (!meta) {
      meta = document.createElement("meta");
      meta.name = "description";
      document.head.appendChild(meta);
    }
    meta.content = content;
  }, [description]);

  return null;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <CartProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <SeoBridge />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/catalog" element={<Catalog />} />
            <Route path="/catalogo" element={<Catalog />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/repairs" element={<Repairs />} />
            <Route path="/financing" element={<Financing />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/admin" element={<Admin />} />

            {/* Product pages */}
            <Route path="/products/smartgyro-k2-terra" element={<SmartGyroK2Terra />} />
            <Route path="/products/smartgyro-explorer-2" element={<SmartGyroExplorer2 />} />
            <Route path="/products/smartgyro-speedway" element={<SmartGyroSpeedWay />} />
            <Route path="/products/smartgyro-speedway-pro" element={<SmartGyroSpeedWayPro />} />

            {/* Content pages */}
            <Route path="/maintenance-guide" element={<MaintenanceGuide />} />
            <Route path="/regulation-news" element={<RegulationNews />} />

            {/* catch-all */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
        <CookieConsent />
      </TooltipProvider>
    </CartProvider>
  </QueryClientProvider>
);

export default App;
