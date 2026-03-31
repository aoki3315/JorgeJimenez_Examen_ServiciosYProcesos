import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle, Target, Shield, Users, Lightbulb, Zap } from "lucide-react";
import { Card } from "@/components/ui/card";
import cityBackground from "@/assets/city-background.jpg";

const About = () => {
  return (
    <div className="bg-background text-foreground min-h-screen flex flex-col pt-20">
      <Header />

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="py-20 md:py-32 bg-muted/20 border-b border-border">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="max-w-2xl">
                <div className="flex items-center gap-2 text-primary font-bold text-sm uppercase tracking-widest mb-6">
                  <Zap className="w-5 h-5" />
                  Nuestra Historia
                </div>
                <h1 className="text-4xl md:text-6xl font-black mb-6 uppercase tracking-tight">
                  Revolucionando la <br />
                  <span className="text-primary">Movilidad Urbana</span>
                </h1>
                <p className="text-xl text-muted-foreground leading-relaxed mb-10">
                  En Evolution Mobility no solo vendemos patinetes; diseñamos el futuro del transporte 
                  sostenible. Creemos en ciudades más limpias, silenciosas y eficientes.
                </p>
                
                <div className="flex flex-wrap gap-4">
                  <Button size="lg" className="h-14 px-8 font-bold uppercase tracking-wider" onClick={() => window.open('tel:+34621143327', '_self')}>
                    Conoce el Equipo
                  </Button>
                  <Link to="/catalog">
                    <Button variant="outline" size="lg" className="h-14 px-8 font-bold uppercase tracking-wider group">
                      Nuestro Catálogo
                      <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </div>
              </div>
              
              <div className="relative h-[500px] w-full hidden lg:block rounded-3xl overflow-hidden border border-border shadow-2xl">
                <div className="absolute inset-0 bg-primary/10 mix-blend-overlay z-10" />
                <img
                  src={cityBackground}
                  alt="Ciudad Sostenible"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="border-b border-border bg-card py-16">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x-0 md:divide-x divide-border">
              <div className="flex flex-col items-center">
                <div className="text-5xl font-black text-primary mb-2">5+</div>
                <div className="text-sm font-bold tracking-widest uppercase text-muted-foreground">Años Innovando</div>
              </div>
              <div className="flex flex-col items-center">
                <div className="text-5xl font-black text-primary mb-2">1k</div>
                <div className="text-sm font-bold tracking-widest uppercase text-muted-foreground">Clientes</div>
              </div>
              <div className="flex flex-col items-center">
                <div className="text-5xl font-black text-primary mb-2">50</div>
                <div className="text-sm font-bold tracking-widest uppercase text-muted-foreground">Modelos</div>
              </div>
              <div className="flex flex-col items-center">
                <div className="text-5xl font-black text-primary mb-2">24/7</div>
                <div className="text-sm font-bold tracking-widest uppercase text-muted-foreground">Soporte</div>
              </div>
            </div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="py-24 bg-background border-b border-border">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="grid lg:grid-cols-2 gap-16">
              <div className="flex flex-col justify-center">
                <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight mb-8">
                  Nuestra <span className="text-primary">Misión</span>
                </h2>
                <p className="text-xl text-muted-foreground leading-relaxed mb-8">
                  "Proporcionar soluciones de movilidad eléctrica innovadoras y sostenibles 
                  que mejoren la calidad de vida de las personas."
                </p>
                <ul className="space-y-6">
                  <li className="flex items-start gap-4">
                    <CheckCircle className="w-6 h-6 text-primary shrink-0" />
                    <span className="font-medium text-lg">Máxima calidad y tecnología avanzada en cada producto.</span>
                  </li>
                  <li className="flex items-start gap-4">
                    <CheckCircle className="w-6 h-6 text-primary shrink-0" />
                    <span className="font-medium text-lg">Servicio técnico especializado y personalizado.</span>
                  </li>
                  <li className="flex items-start gap-4">
                    <CheckCircle className="w-6 h-6 text-primary shrink-0" />
                    <span className="font-medium text-lg">Compromiso absoluto con la sostenibilidad ambiental.</span>
                  </li>
                </ul>
              </div>

              <Card className="p-10 md:p-14 bg-muted/30 border-border relative overflow-hidden flex flex-col justify-center">
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
                <Target className="w-16 h-16 text-primary mb-8" />
                <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight mb-8">Visión 2025</h2>
                <p className="text-xl leading-relaxed text-muted-foreground">
                  Ser la empresa líder en movilidad eléctrica nacional, reconocida por nuestra excelencia,
                  expandiendo nuestros servicios y transformando activamente el ecosistema urbano 
                  hacia un modelo 100% libre de emisiones.
                </p>
              </Card>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-24 bg-muted/10">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="text-center mb-16">
              <span className="text-primary font-bold tracking-widest uppercase text-sm mb-4 block">
                Pilares Fundamentales
              </span>
              <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tight">
                Nuestros Valores
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                { icon: Shield, title: "Calidad y Seguridad", desc: "Rigurosos controles normativos y técnicos en cada vehículo." },
                { icon: Lightbulb, title: "Innovación", desc: "A la vanguardia tecnológica del sector VMP con cada novedad." },
                { icon: Users, title: "Atención Especializada", desc: "Respuesta humana y experta adaptada a cada necesidad." }
              ].map((val, i) => (
                <Card key={i} className="p-10 text-center hover:border-primary transition-colors bg-card">
                  <div className="w-20 h-20 mx-auto bg-primary/10 rounded-full flex items-center justify-center mb-8 text-primary">
                    <val.icon className="w-10 h-10" />
                  </div>
                  <h3 className="text-2xl font-bold uppercase tracking-tight mb-4">{val.title}</h3>
                  <p className="text-lg text-muted-foreground leading-relaxed">{val.desc}</p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-24 bg-primary text-primary-foreground text-center">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-4xl md:text-6xl font-black tracking-tight uppercase mb-8">
              El futuro se mueve contigo
            </h2>
            <p className="text-xl md:text-2xl opacity-90 mb-12 font-medium">
              Únete a la evolución de la movilidad urbana hoy mismo.
            </p>
            <Button size="lg" variant="secondary" className="h-16 px-10 text-lg font-black uppercase tracking-widest hover:scale-105 transition-transform" onClick={() => window.open('tel:+34621143327', '_self')}>
              Habla con un Experto
            </Button>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
};

export default About;
