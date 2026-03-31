import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MapPin, Phone, Mail, Clock, ArrowRight, CheckCircle, Zap } from "lucide-react";
import { toast } from "sonner";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isSent, setIsSent] = useState(false);
  
  const settingsQuery = useQuery<{ key: string; value: string | null }[]>({
    queryKey: ["public-settings-contact"],
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
  const email = settings.get("contact_email") || "Evolutionmobility.tienda@gmail.com";
  const hours = settings.get("contact_hours") || "Lun-Vie: 10:00-14:00 / 16:30-20:00\\nSáb: 10:30-14:00\\nDom: Cerrado";

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const message =
        formData.subject.trim() !== ""
          ? `Asunto: ${formData.subject.trim()}\n\n${formData.message.trim()}`
          : formData.message.trim();

      const { error } = await supabase.from("contact_messages").insert([
        {
          name: formData.name.trim(),
          email: formData.email.trim(),
          message,
        },
      ]);

      if (error) throw error;
      setIsSent(true);
      toast.success("Mensaje enviado con éxito. Te responderemos en breve.");
      setFormData({ name: "", email: "", subject: "", message: "" });
      setTimeout(() => setIsSent(false), 5000);
    } catch (error) {
      toast.error("Error al enviar el mensaje. Por favor, intenta de nuevo.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-background text-foreground min-h-screen flex flex-col font-sans">
      <Header />

      <main className="flex-1 mt-20 flex flex-col lg:flex-row h-auto lg:h-[calc(100vh-80px)]">
        
        {/* Left Side - Interactive Map */}
        <section className="lg:w-1/2 h-[50vh] lg:h-full relative order-2 lg:order-1 flex flex-col border-t lg:border-t-0 lg:border-r border-border">
          {/* Info Overlay (Mobile only, or integrated gracefully) */}
          <div className="absolute top-8 left-8 right-8 z-10 bg-background/90 backdrop-blur-xl p-6 border border-border shadow-xl lg:hidden">
            <h2 className="text-xl font-bold uppercase tracking-widest mb-4">Ubicación</h2>
            <div className="flex items-start gap-4 text-sm">
              <MapPin className="w-5 h-5 text-primary shrink-0" />
              <p className="font-medium">{address}</p>
            </div>
          </div>

          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3079.8659103592676!2d-0.3535349!3d39.498!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd604753d3ac42af%3A0xb1da5e404b9c47a7!2sEvolution%20Mobility!5e0!3m2!1ses!2ses!4v1709841234567!5m2!1ses!2ses"
            className="absolute inset-0 w-full h-full border-0"
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Evolution Mobility Map"
          />
        </section>

        {/* Right Side - Content & Form */}
        <section className="lg:w-1/2 h-full overflow-y-auto order-1 lg:order-2 p-8 md:p-12 lg:p-16 flex flex-col justify-start bg-background custom-scrollbar">
          
          <div className="max-w-xl mx-auto w-full pb-16">
            <div className="inline-flex items-center gap-2 text-primary font-bold text-sm uppercase tracking-widest mb-6 px-4 py-1.5 bg-primary/10 border border-primary/20 rounded-full w-fit">
              <Zap className="w-4 h-4" /> Soporte Especializado
            </div>
            
            <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-4 text-foreground leading-none">
              Contacto
              <span className="text-primary block mt-1">Directo</span>
            </h1>
            
            <p className="text-muted-foreground text-lg mb-12 font-medium leading-relaxed">
              ¿Dudas sobre modelos, reparaciones o envíos? Escríbenos y nuestro equipo te responderá en tiempo récord.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 mb-16">
              <div className="space-y-6">
                <a href={`tel:${phone.replace(/\s/g, "")}`} className="flex items-start gap-4 group">
                  <div className="w-12 h-12 rounded-none bg-card border border-border group-hover:border-primary group-hover:bg-primary/10 flex items-center justify-center transition-all shrink-0">
                    <Phone className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <div className="text-xs uppercase tracking-widest text-muted-foreground font-bold mb-1">Teléfono</div>
                    <div className="font-bold text-base group-hover:text-primary transition-colors">{phone}</div>
                  </div>
                </a>

                <a href={`mailto:${email}`} className="flex items-start gap-4 group">
                  <div className="w-12 h-12 rounded-none bg-card border border-border group-hover:border-primary group-hover:bg-primary/10 flex items-center justify-center transition-all shrink-0">
                    <Mail className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <div className="text-xs uppercase tracking-widest text-muted-foreground font-bold mb-1">Email</div>
                    <div className="font-bold text-base group-hover:text-primary transition-colors break-all leading-tight">
                      Evolutionmobility.tienda<br/>@gmail.com
                    </div>
                  </div>
                </a>
              </div>

              <div className="space-y-6">
                <div className="flex items-start gap-4 group">
                  <div className="w-12 h-12 rounded-none bg-card border border-border flex items-center justify-center shrink-0">
                    <Clock className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <div className="text-xs uppercase tracking-widest text-muted-foreground font-bold mb-1">Horario</div>
                    <div className="font-medium whitespace-pre-line text-sm leading-relaxed">{hours}</div>
                  </div>
                </div>
                
                <div className="flex items-start gap-4 group">
                  <div className="w-12 h-12 rounded-none bg-card border border-border flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <div className="text-xs uppercase tracking-widest text-muted-foreground font-bold mb-1">Dirección</div>
                    <div className="font-medium text-sm leading-relaxed">{address}</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-card p-8 rounded-none border border-border shadow-sm">
              <h3 className="text-xl font-bold uppercase tracking-tight mb-8">Envíanos tu consulta</h3>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Nombre</label>
                    <Input
                      id="name"
                      name="name"
                      placeholder="Tu nombre completo"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="h-12 bg-background border-border focus-visible:ring-primary/50"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="email" className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Email</label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="correo@ejemplo.com"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="h-12 bg-background border-border focus-visible:ring-primary/50"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="subject" className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Asunto</label>
                  <Input
                    id="subject"
                    name="subject"
                    placeholder="Ej. Reparación de neumático"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="h-12 bg-background border-border focus-visible:ring-primary/50"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Mensaje</label>
                  <Textarea
                    id="message"
                    name="message"
                    placeholder="Detalla tu consulta..."
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    required
                    className="bg-background border-border focus-visible:ring-primary/50 resize-none py-3"
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full h-14 text-sm font-bold uppercase tracking-widest bg-primary hover:bg-primary/90 text-primary-foreground transition-all mt-4 group"
                  disabled={isLoading || isSent}
                >
                  {isLoading ? (
                    <span className="flex items-center">
                      Enviando <span className="animate-pulse ml-2">...</span>
                    </span>
                  ) : isSent ? (
                    <span className="flex items-center">
                      Enviado Correctamente <CheckCircle className="ml-2 w-5 h-5" />
                    </span>
                  ) : (
                    <span className="flex items-center justify-center w-full">
                      Enviar Mensaje
                      <ArrowRight className="ml-3 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </span>
                  )}
                </Button>
              </form>
            </div>

          </div>
        </section>
      </main>
      
      {/* 
        A clean split screen usually hides the footer or places it completely below the 100vh fold.
        We'll just place it at the very bottom where it would naturally flow if the layout is not full 100vh.
        Since main is flex-1 and the layout takes `h-auto lg:h-[calc(100vh-80px)]`, the footer will sit right below it.
      */}
      <Footer />
    </div>
  );
};

export default Contact;
