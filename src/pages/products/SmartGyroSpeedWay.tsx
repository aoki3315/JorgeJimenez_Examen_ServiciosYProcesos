import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Battery, 
  Gauge, 
  Weight, 
  Zap, 
  ArrowLeft,
  ShoppingCart,
  Star,
  CheckCircle,
  Rocket,
  Timer
} from 'lucide-react';
import { Link } from 'react-router-dom';

const SmartGyroSpeedWay: React.FC = () => {
  const specifications = [
    { icon: Zap, label: 'Potencia', value: '1000W (máxima) / 600W (nominal)' },
    { icon: Battery, label: 'Batería', value: '15.600 mAh / 48V' },
    { icon: Gauge, label: 'Autonomía', value: 'Hasta 60 km' },
    { icon: Weight, label: 'Peso', value: '22 kg' },
    { icon: Gauge, label: 'Velocidad máxima', value: '35 km/h' },
    { icon: Timer, label: 'Aceleración', value: '0-25 km/h en 4s' }
  ];

  const features = [
    'Motor de alta potencia 1000W',
    'Batería de capacidad excepcional',
    'Velocidad máxima de 35 km/h',
    'Frenos de disco hidráulicos',
    'Suspensión delantera y trasera',
    'Pantalla LCD multifunción',
    'Luces LED de alta intensidad',
    'Neumáticos tubeless de 10"',
    'Estructura de aluminio aeroespacial',
    'Sistema de plegado rápido'
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Breadcrumb */}
      <section className="pt-20 pb-8 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link to="/" className="hover:text-primary flex items-center gap-1">
              <ArrowLeft className="w-4 h-4" />
              Volver al Inicio
            </Link>
            <span>/</span>
            <span>SmartGyro SpeedWay</span>
          </div>
        </div>
      </section>

      {/* Product Hero */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="mb-4 bg-red-500/10 text-red-500 border-red-500/20">
                Alta Velocidad
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                <span className="gradient-text">SmartGyro SpeedWay</span>
              </h1>
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                El patinete eléctrico más potente de SmartGyro. SpeedWay es sinónimo de velocidad, 
                resistencia y aplomo con una conducción muy sencilla. Incorpora una batería con 
                una capacidad excepcional que te permitirá recorrer hasta 60 km con una sola carga.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Button size="lg" className="bg-gradient-primary hover:scale-105 transition-all">
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  Ver en Catálogo
                </Button>
                <Button variant="outline" size="lg">
                  Solicitar Información
                </Button>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <span className="text-muted-foreground">4.9/5 (156 reseñas)</span>
              </div>
            </div>

            <div className="relative">
              <div className="aspect-square bg-gradient-to-br from-red-500/10 to-orange-500/10 rounded-2xl flex items-center justify-center">
                <img 
                  src="/placeholder.svg" 
                  alt="SmartGyro SpeedWay" 
                  className="w-full h-full object-contain p-8"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Speed Highlight */}
      <section className="py-16 bg-gradient-to-r from-red-500/10 to-orange-500/10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <Rocket className="w-16 h-16 text-red-500 mx-auto mb-6" />
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              <span className="gradient-text">Velocidad Extrema</span>
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Con una velocidad máxima de 35 km/h y una aceleración de 0 a 25 km/h en solo 4 segundos, 
              el SpeedWay redefine lo que significa movilidad urbana rápida y eficiente.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-4xl font-bold text-red-500 mb-2">35</div>
                <div className="text-muted-foreground">km/h máxima</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-orange-500 mb-2">60</div>
                <div className="text-muted-foreground">km autonomía</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-yellow-500 mb-2">4s</div>
                <div className="text-muted-foreground">0-25 km/h</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Specifications */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">
            <span className="gradient-text">Especificaciones Técnicas</span>
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {specifications.map((spec, index) => (
              <Card key={index} className="p-6 text-center hover:scale-105 transition-all">
                <spec.icon className="w-8 h-8 text-red-500 mx-auto mb-4" />
                <h3 className="font-semibold mb-2">{spec.label}</h3>
                <p className="text-muted-foreground">{spec.value}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">
              <span className="gradient-text">Características Principales</span>
            </h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-red-500 to-orange-500 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Siente la velocidad
          </h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            El SmartGyro SpeedWay no es solo un patinete, es una experiencia de velocidad 
            y libertad que transformará tu forma de moverte por la ciudad.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary">
              Ver Precio y Disponibilidad
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-red-500">
              Contactar Asesor
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default SmartGyroSpeedWay;