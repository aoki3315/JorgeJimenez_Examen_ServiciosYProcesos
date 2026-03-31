import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Phone, CheckCircle, Wrench, Shield, Zap, Settings, ShieldCheck } from "lucide-react";

const processSteps = [
  {
    title: "Recepción y Diagnóstico",
    desc: "Recibimos tu patinete en el taller y realizamos un análisis completo de electrónica, batería y mecánica.",
    icon: Wrench
  },
  {
    title: "Presupuesto Sin Compromiso",
    desc: "Te presentamos un informe detallado con las piezas y mano de obra necesarias de forma totalmente transparente.",
    icon: CheckCircle
  },
  {
    title: "Reparación Especializada",
    desc: "Nuestros técnicos certificados proceden a solucionar la avería usando exclusivamente recambios originales.",
    icon: Settings
  },
  {
    title: "Testeo Final",
    desc: "Probamos el patinete a fondo en nuestras instalaciones para que te lo lleves funcionando al 100%, con máxima seguridad.",
    icon: ShieldCheck
  }
];

const services = [
  {
    title: "Batería y Autonomía",
    description: "Diagnóstico de voltaje, reparación de celdas dañadas y ampliaciones de batería a medida para mayor autonomía.",
    icon: Zap,
    price: "Consultar"
  },
  {
    title: "Electrónica y Centralita",
    description: "Sustitución o reparación de placas madre (controladoras), displays y cableado interno defectuoso.",
    icon: Wrench,
    price: "Desde 45€"
  },
  {
    title: "Neumáticos y Frenos",
    description: "Servicio rápido de cambio de ruedas neumáticas o macizas, purgado de frenos hidráulicos y ajuste de pastillas.",
    icon: Settings,
    price: "Desde 15€"
  },
  {
    title: "Matriculación y Normativa VMP",
    description: "Gestionamos la matriculación oficial, emitimos el certificado de circulación y adaptamos tu patinete a la nueva normativa de la DGT.",
    icon: Shield,
    price: "Consultar"
  }
];

const Repairs = () => {
  return (
    <div className="bg-background text-foreground min-h-screen flex flex-col pt-20">
      <Header />
      
      <main className="flex-grow">
        <section className="relative py-20 md:py-32 border-b border-slate-800 bg-slate-950 text-slate-50 overflow-hidden">
          {/* Dark Industrial Background */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-slate-950 to-black"></div>
          
          <div className="container relative z-10 mx-auto px-4 text-center max-w-4xl animate-fade-in">
            <div className="mb-6 inline-flex px-4 py-1.5 bg-primary/20 border border-primary/50 text-primary text-sm font-bold uppercase tracking-widest rounded-none shadow-[0_0_15px_rgba(0,150,255,0.3)]">
              Servicio Técnico
            </div>
            <h1 className="text-4xl md:text-6xl font-black mb-6 uppercase tracking-tight text-white drop-shadow-lg">
              Taller Especializado <br/>
              <span className="text-primary">Multi-Marca</span>
            </h1>
            <p className="text-xl text-slate-300 leading-relaxed font-medium">
              No dejes tu vehículo en manos inexpertas. Contamos con el equipo y conocimiento 
              para resolver cualquier incidencia electrónica o mecánica.
            </p>
          </div>
        </section>

        <section className="py-24 bg-background">
          <div className="container mx-auto px-4 max-w-6xl">
            <h2 className="text-3xl font-bold uppercase tracking-widest mb-12 text-center">Nuestro Proceso</h2>
            
            <div className="grid md:grid-cols-4 gap-8">
              {processSteps.map((step, idx) => (
                <div key={idx} className="flex flex-col items-center text-center group">
                  <div className="w-16 h-16 rounded-none bg-muted border border-border flex items-center justify-center mb-6 text-primary group-hover:scale-110 transition-transform shadow-md">
                    <step.icon className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-24 bg-muted/30 border-t border-b border-border">
          <div className="container mx-auto px-4 max-w-6xl">
            <h2 className="text-3xl font-bold uppercase tracking-widest mb-12 text-center">Servicios Destacados</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {services.map((srv, idx) => (
                <Card key={idx} className="p-8 hover:border-primary transition-colors bg-card flex flex-col justify-between">
                  <div>
                    <div className="w-12 h-12 bg-primary/10 rounded-none flex items-center justify-center text-primary mb-6">
                      <srv.icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-2xl font-bold mb-4 uppercase">{srv.title}</h3>
                    <p className="text-muted-foreground mb-8 leading-relaxed">
                      {srv.description}
                    </p>
                  </div>
                  <div className="flex items-center justify-between border-t border-border pt-6 mt-auto">
                    <span className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Precio estimado</span>
                    <span className="text-lg font-black text-primary">{srv.price}</span>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="py-24 bg-background text-center">
          <div className="container mx-auto px-4 max-w-2xl">
            <h2 className="text-3xl font-bold uppercase tracking-widest mb-6">Pide Cita en el Taller</h2>
            <p className="text-lg text-muted-foreground mb-10">
              Ponte en contacto con nuestro equipo para describir tu avería y agendar la reparación de tu patinete en nuestro centro especializado.
            </p>
            <div className="flex justify-center gap-4">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold h-14 px-8" onClick={() => window.open('tel:+34621143327', '_self')}>
                <Phone className="w-5 h-5 mr-3" />
                Llamar Ahora
              </Button>
            </div>
          </div>
        </section>

      </main>
      
      <Footer />
    </div>
  );
};

export default Repairs;
