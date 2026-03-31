import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Users, Target, Zap, Award, ArrowRight, Check } from "lucide-react";
import cityBackground from "@/assets/city-background.jpg";
import { Link } from "react-router-dom"; // 👈 Importamos Link

const About = () => {
  const features = [
    {
      icon: Users,
      title: "Equipo Experto",
      description: "Profesionales especializados en movilidad eléctrica con años de experiencia."
    },
    {
      icon: Target,
      title: "Misión Clara",
      description: "Revolucionar el transporte urbano con soluciones sostenibles y eficientes."
    },
    {
      icon: Zap,
      title: "Innovación",
      description: "Tecnología de vanguardia en cada producto y servicio que ofrecemos."
    },
    {
      icon: Award,
      title: "Calidad Premium",
      description: "Productos certificados con los más altos estándares de calidad y seguridad."
    }
  ];

  return (
    <section id="about" className="py-24 lg:py-32 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 opacity-10">
        <img 
          src={cityBackground} 
          alt="Sustainable City" 
          className="w-full h-full object-cover"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-br from-background/90 to-background/70" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <div className="animate-fade-in">
            <div className="mb-6">
              <span className="inline-flex items-center px-4 py-1 text-sm font-bold bg-primary text-primary-foreground uppercase tracking-wider">
                Nosotros
              </span>
            </div>

            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="gradient-text">Somos el futuro</span>
              <br />
              <span className="text-foreground">del transporte ecológico</span>
            </h2>

            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              En Evolution Mobility, somos pioneros en la revolución de la movilidad sostenible. 
              Nuestra pasión por la innovación y el compromiso con el medio ambiente nos impulsan 
              a ofrecer las mejores soluciones de transporte eléctrico.
            </p>

            <div className="space-y-4 mb-8">
              <div className="flex items-center space-x-3">
                <Check className="w-5 h-5 text-primary flex-shrink-0" />
                <span className="text-foreground font-medium">+5 años de experiencia en movilidad eléctrica</span>
              </div>
              <div className="flex items-center space-x-3">
                <Check className="w-5 h-5 text-primary flex-shrink-0" />
                <span className="text-foreground font-medium">+1000 clientes satisfechos</span>
              </div>
              <div className="flex items-center space-x-3">
                <Check className="w-5 h-5 text-primary flex-shrink-0" />
                <span className="text-foreground font-medium">Servicio técnico especializado</span>
              </div>
            </div>

            {/* Botón que lleva a la página /about */}
            <Link to="/about">
              <Button 
                size="lg" 
                className="bg-primary text-primary-foreground hover:bg-primary/90 hover:scale-105 transition-all duration-300 group font-bold px-8 h-12 rounded-none uppercase tracking-wider"
              >
                Conoce más sobre nosotros
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>

          {/* Features Grid */}
          <div className="grid sm:grid-cols-2 gap-6 animate-scale-in">
            {features.map((feature, index) => (
              <Card 
                key={index} 
                className="bg-card p-6 border border-border hover:border-primary/50 shadow-sm hover:shadow-md transition-all"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="mb-4">
                  <div className="w-12 h-12 rounded-none bg-primary/10 flex items-center justify-center">
                    <feature.icon className="w-6 h-6 text-primary" />
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-3 text-foreground uppercase tracking-tight">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground font-medium leading-relaxed">
                  {feature.description}
                </p>
              </Card>
            ))}
          </div>
        </div>

        {/* Stats Section */}
        <div className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="text-center animate-fade-in">
            <div className="text-3xl md:text-4xl font-bold gradient-text mb-2">5+</div>
            <div className="text-muted-foreground">Años de experiencia</div>
          </div>
          <div className="text-center animate-fade-in" style={{ animationDelay: '0.1s' }}>
            <div className="text-3xl md:text-4xl font-bold gradient-text mb-2">1000+</div>
            <div className="text-muted-foreground">Clientes satisfechos</div>
          </div>
          <div className="text-center animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <div className="text-3xl md:text-4xl font-bold gradient-text mb-2">50+</div>
            <div className="text-muted-foreground">Modelos disponibles</div>
          </div>
          <div className="text-center animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <div className="text-3xl md:text-4xl font-bold gradient-text mb-2">24/7</div>
            <div className="text-muted-foreground">Soporte técnico</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
