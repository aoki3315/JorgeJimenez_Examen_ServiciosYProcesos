import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { UiverseButton } from "@/components/ui/UiverseButton";
import {
  Wrench,
  Shield,
  Truck,
  Clock,
  CheckCircle,
  ArrowRight,
  Phone,
  Zap
} from "lucide-react";
import { Link } from "react-router-dom";

const Services = () => {
  const services = [
    {
      icon: Wrench,
      title: "Taller Multimarca",
      description: "Diagnóstico electrónico y reparaciones avanzadas para cualquier modelo de patinete.",
      features: ["Recuperación de centralitas", "Cambio de controladoras", "Software y firmware"],
      price: "Presupuesto gratuito",
      color: "primary",
      link: "/repairs"
    },
    {
      icon: Shield,
      title: "Matriculación y Normativa",
      description: "Gestionamos la matriculación oficial y certificamos tu patinete VMP según la DGT.",
      features: ["Trámites de matrícula", "Certificado de circulación", "Limitación certificada"],
      price: "Desde €25",
      color: "secondary",
      link: "/repairs"
    },
    {
      icon: Zap, // Zap for electric power/batteries
      title: "Personalización y Baterías",
      description: "Mejora la autonomía, potencia y estética de tu vehículo.",
      features: ["Baterías a medida", "Suspensiones deportivas", "Vinilado exclusivo"],
      price: "Consultar",
      color: "primary",
      link: "/repairs" // Redirecting to repairs as it's the main service page
    }
  ];

  const guarantees = [
    {
      icon: Shield,
      title: "Recambios Originales",
      description: "Solo utilizamos componentes certificados de máxima calidad."
    },
    {
      icon: Clock,
      title: "24-48h Reparación",
      description: "La mayoría de reparaciones completadas en menos de 48 horas."
    },
    {
      icon: CheckCircle,
      title: "Garantía Extendida",
      description: "6 meses de garantía en todas nuestras reparaciones."
    }
  ];

  return (
    <section id="repairs" className="pt-16 pb-24 lg:pt-20 lg:pb-32 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">

        {/* Services Grid */}
        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {services.map((service, index) => (
            <Card
              key={index}
              className="glass-card p-6 pt-6 animate-scale-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <h3 className="text-2xl font-bold mb-4 mt-2">
                {service.title}
              </h3>

              <p className="text-muted-foreground mb-6 leading-relaxed">
                {service.description}
              </p>

              <ul className="space-y-3 mb-6">
                {service.features.map((feature, i) => (
                  <li key={i} className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-secondary flex-shrink-0" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>

              <div className="flex items-center justify-between">
                <div className="text-2xl font-bold text-primary">
                  {service.price}
                </div>
                <Link to={service.link} onClick={(e) => { e.preventDefault(); window.location.href = service.link; }}>
                  <Button variant="outline" size="sm" className="hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-colors">
                    Solicitar
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </Link>
              </div>
            </Card>
          ))}
        </div>

        {/* Guarantees */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {guarantees.map((guarantee, index) => (
            <div
              key={index}
              className="text-center animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <guarantee.icon className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{guarantee.title}</h3>
              <p className="text-muted-foreground">{guarantee.description}</p>
            </div>
          ))}
        </div>

        {/* Emergency Service */}
        <div className="relative overflow-hidden rounded-none bg-primary text-primary-foreground p-8 lg:p-12 text-center shadow-xl animate-fade-in">
          <div className="absolute inset-0 bg-black/10 mix-blend-overlay"></div>
          <div className="relative z-10 max-w-2xl mx-auto">
            <div className="w-20 h-20 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse-glow shadow-lg">
              <Phone className="w-10 h-10 text-white" />
            </div>

            <h3 className="text-3xl font-bold mb-4 text-white">
              Servicio de Emergencia
            </h3>

            <p className="text-lg text-white/90 mb-8 font-medium">
              ¿Tu patinete se ha averiado? No te preocupes. Nuestro servicio de emergencia
              está disponible las 24 horas para resolver cualquier problema.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-8">
              <Button
                size="lg"
                className="bg-white text-primary hover:bg-gray-100 font-bold text-base h-14 px-8 rounded-none shadow-lg hover:scale-105 transition-transform"
                onClick={() => window.open('tel:+34621143327', '_self')}
              >
                <Phone className="w-5 h-5 mr-2" />
                Llamar: +34 621 14 33 27
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="bg-transparent border-2 border-white text-white hover:bg-white/10 hover:text-white font-bold text-base h-14 px-8 rounded-none hover:scale-105 transition-transform"
                onClick={() => window.open('https://wa.me/34621143327', '_blank')}
              >
                <svg viewBox="0 0 24 24" className="w-5 h-5 mr-2 fill-current">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/>
                </svg>
                WhatsApp
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;