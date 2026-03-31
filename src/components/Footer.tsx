import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  MapPin,
  Phone,
  Mail,
  Facebook,
  Instagram,
  Youtube,
  ArrowRight,
  Clock,
  CheckCircle
} from "lucide-react";
import logo from "../assets/Rotulo-3-03-junto-azul-1.png";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";

const Footer = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const settingsQuery = useQuery<{ key: string; value: string | null }[]>({
    queryKey: ["public-settings-footer"],
    queryFn: async () => {
      const keys = ["contact_address", "contact_phone", "contact_email", "contact_hours"];
      const { data, error } = await supabase.from("settings").select("key,value").in("key", keys);
      if (error) throw error;
      return data || [];
    },
  });

  const settings = new Map((settingsQuery.data || []).map((r) => [r.key, r.value || ""]));
  const address = settings.get("contact_address") || "Avenida Horchata, 13, 46120 Alboraia, Valencia";
  const phone = settings.get("contact_phone") || "+34 621 14 33 27";
  const contactEmail = settings.get("contact_email") || "Evolutionmobility.tienda@gmail.com";
  const hours =
    settings.get("contact_hours") || "Lun-Vie: 10:00-14:00 / 16:30-20:00\\nSáb: 10:30-14:00\\nDom: Cerrado";

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email.trim()) {
      setError('Por favor, introduce tu email');
      return;
    }

    if (!validateEmail(email)) {
      setError('Por favor, introduce un email válido');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const normalizedEmail = email.trim().toLowerCase();

      const { error } = await supabase.from("newsletter_subscribers").insert([
        {
          email: normalizedEmail,
        },
      ]);

      if (error) {
        const code = (error as unknown as { code?: string }).code;
        const msg = (error as unknown as { message?: string }).message || "";
        const isDuplicate = code === "23505" || msg.toLowerCase().includes("duplicate");
        if (!isDuplicate) throw error;
      }

      setIsSubscribed(true);
      setEmail('');

      setTimeout(() => {
        setIsSubscribed(false);
      }, 3000);

    } catch (error) {
      setError('Error al procesar la suscripción. Inténtalo de nuevo.');
    } finally {
      setIsLoading(false);
    }
  };

  const quickLinks = [
    { name: "Inicio", href: "#home" },
    { name: "Catálogo", href: "#catalog" },
    { name: "Reparación", href: "#repairs" },
  ];

  const services = [
    { name: "Venta de Patinetes", href: "#" },
    { name: "Reparación", href: "#" },
    { name: "Mantenimiento", href: "#" },
    { name: "Financiación", href: "#" },
  ];

  const support = [
    { name: "Centro de Ayuda", href: "#" },
    { name: "Garantías", href: "#" },
    { name: "Devoluciones", href: "#" },
    { name: "Contacto", href: "#" },
  ];

  return (
    <footer className="bg-muted border-t-4 border-primary text-foreground">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Newsletter Section */}
        <div className="py-16 border-b border-border flex flex-col items-center text-center">
          <div className="mb-4 inline-block px-3 py-1 bg-primary/10 border border-primary text-primary text-[10px] font-black uppercase tracking-widest">
            Newsletter
          </div>
          <h3 className="text-3xl md:text-5xl font-black mb-4 uppercase tracking-tight text-foreground">
            No pierdas pista
          </h3>
          <p className="text-muted-foreground mb-8 max-w-xl mx-auto text-lg">
            Aceleramos a fondo con las últimas novedades y piezas de alto rendimiento. Únete a nosotros.
          </p>
          
          <div className="w-full max-w-lg">
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-0">
              <Input
                type="email"
                placeholder="Introducir dirección de correo..."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLoading || isSubscribed}
                className="flex-1 bg-card border-2 border-border focus-visible:border-primary text-foreground rounded-none h-14 px-4 uppercase text-sm font-bold"
              />
              <Button
                type="submit"
                disabled={isLoading || isSubscribed}
                className="bg-primary text-primary-foreground hover:bg-primary-glow font-black uppercase tracking-wider rounded-none h-14 px-8 mt-2 sm:mt-0 transition-colors"
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin h-4 w-4 border-b-2 border-white mr-2"></div>
                    Procesando
                  </>
                ) : isSubscribed ? (
                  <>
                    <CheckCircle className="mr-2 w-4 h-4" />
                    ¡Dentro!
                  </>
                ) : (
                  <>
                    Apuntarse
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </>
                )}
              </Button>
            </form>
            {error && <p className="text-destructive font-bold text-sm mt-4 uppercase">{error}</p>}
            {isSubscribed && <p className="text-primary font-bold text-sm mt-4 uppercase">Suscripción completada con éxito.</p>}
          </div>
        </div>

        {/* Main Footer Content */}
        <div className="py-16 grid lg:grid-cols-5 gap-12 lg:gap-8">
          
          {/* Company Info */}
          <div className="lg:col-span-2">
            <div className="mb-8">
              <img src={logo} alt="Evolution Mobility" className="h-10 w-auto" />
            </div>
            <p className="text-muted-foreground font-medium mb-8 pr-4">
              Patinetes eléctricos de máximo rendimiento y recambios originales. Comprometidos con el asfalto.
            </p>
            <div className="space-y-4 font-bold text-sm uppercase tracking-wide">
              <a 
                href="https://www.google.com/maps/search/Avenida+Horchata,+13,+46120+Alboraia,+Valencia"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-3 hover:text-primary transition-colors"
              >
                <MapPin className="w-5 h-5 text-primary flex-shrink-0" />
                <span>{address}</span>
              </a>
              <a 
                href={`tel:${phone.replace(/\\s+/g, '')}`}
                className="flex items-center space-x-3 hover:text-primary transition-colors"
              >
                <Phone className="w-5 h-5 text-primary flex-shrink-0" />
                <span>{phone}</span>
              </a>
              <a 
                href={`mailto:${contactEmail}`}
                className="flex items-center space-x-3 hover:text-primary transition-colors"
              >
                <Mail className="w-5 h-5 text-primary flex-shrink-0" />
                <span className="break-all">{contactEmail}</span>
              </a>
              <div className="flex flex-col space-y-1 mt-6">
                <div className="flex items-center space-x-3">
                  <Clock className="w-5 h-5 text-primary flex-shrink-0" />
                  <span>Horario taller</span>
                </div>
                <span className="whitespace-pre-line pl-8 text-muted-foreground">{hours}</span>
              </div>
            </div>
          </div>

          {/* Links Columns */}
          <div className="space-y-8">
            <h4 className="font-black text-xl uppercase tracking-tight pb-4 border-b border-border">Navegación</h4>
            <ul className="space-y-4">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a href={link.href} className="text-muted-foreground hover:text-primary transition-colors text-sm font-bold uppercase">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-8">
            <h4 className="font-black text-xl uppercase tracking-tight pb-4 border-b border-border">Servicios</h4>
            <ul className="space-y-4">
              {services.map((service) => (
                <li key={service.name}>
                  <a href={service.href} className="text-muted-foreground hover:text-primary transition-colors text-sm font-bold uppercase">
                    {service.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-8">
            <h4 className="font-black text-xl uppercase tracking-tight pb-4 border-b border-border">Soporte</h4>
            <ul className="space-y-4">
              {support.map((item) => (
                <li key={item.name}>
                  <a href={item.href} className="text-muted-foreground hover:text-primary transition-colors text-sm font-bold uppercase">
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-xs uppercase font-bold text-muted-foreground">
            © {new Date().getFullYear()} Evolution Mobility. All systems operational.
          </div>

          <div className="flex items-center space-x-4">
            <a href="https://www.facebook.com/evolutionmobilityvalencia" target="_blank" rel="noopener noreferrer" className="bg-card border border-border p-3 hover:bg-primary hover:border-primary hover:text-primary-foreground transition-all">
              <Facebook className="w-5 h-5" />
            </a>
            <a href="https://www.instagram.com/evolutionmobility" target="_blank" rel="noopener noreferrer" className="bg-card border border-border p-3 hover:bg-primary hover:border-primary hover:text-primary-foreground transition-all">
              <Instagram className="w-5 h-5" />
            </a>
            <a href="https://www.youtube.com/@evolutionmobility" target="_blank" rel="noopener noreferrer" className="bg-card border border-border p-3 hover:bg-primary hover:border-primary hover:text-primary-foreground transition-all">
              <Youtube className="w-5 h-5" />
            </a>
          </div>

          <div className="flex flex-wrap justify-center md:justify-end gap-6 text-xs uppercase font-bold text-muted-foreground">
            <a href="#" className="hover:text-primary transition-colors">Privacidad</a>
            <a href="#" className="hover:text-primary transition-colors">Términos Legales</a>
            <a href="#" className="hover:text-primary transition-colors">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
