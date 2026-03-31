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
  Shield, 
  ArrowLeft,
  ShoppingCart,
  Star,
  CheckCircle,
  Mountain
} from 'lucide-react';
import { Link } from 'react-router-dom';

const SmartGyroExplorer2: React.FC = () => {
  const specifications = [
    { icon: Zap, label: 'Potencia', value: '800W (máxima) / 500W (nominal)' },
    { icon: Battery, label: 'Batería', value: '10.400 mAh / 36V' },
    { icon: Gauge, label: 'Autonomía', value: 'Hasta 35 km' },
    { icon: Weight, label: 'Peso', value: '16.8 kg' },
    { icon: Gauge, label: 'Velocidad máxima', value: '25 km/h' },
    { icon: Mountain, label: 'Terreno', value: 'Todo tipo de terrenos' }
  ];

  const features = [
    'Motor potente de 800W para todo terreno',
    'Estructura plegable para fácil transporte',
    'Materiales resistentes y duraderos',
    'Diseño robusto para aventuras urbanas',
    'Frenos de disco de alta calidad',
    'Manillar ajustable en altura',
    'Luces LED integradas',
    'Suspensión delantera'
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
            <span>SmartGyro e-Xplorer-2</span>
          </div>
        </div>
      </section>

      {/* Product Hero */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="mb-4 bg-secondary/10 text-secondary border-secondary/20">
                Todo Terreno
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                <span className="gradient-text">SmartGyro e-Xplorer-2</span>
              </h1>
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                Un patinete eléctrico potente de 800W acompañado de materiales muy resistentes 
                y una estructura plegable pensada para mejorar la maniobrabilidad y llevarlo 
                por todo tipo de terrenos. Perfecto para aventureros urbanos que buscan 
                versatilidad y rendimiento.
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
                <span className="text-muted-foreground">4.7/5 (89 reseñas)</span>
              </div>
            </div>

            <div className="relative">
              <div className="aspect-square bg-gradient-to-br from-secondary/10 to-primary/10 rounded-2xl flex items-center justify-center">
                <img 
                  src="/placeholder.svg" 
                  alt="SmartGyro e-Xplorer-2" 
                  className="w-full h-full object-contain p-8"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Specifications */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">
            <span className="gradient-text">Especificaciones Técnicas</span>
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {specifications.map((spec, index) => (
              <Card key={index} className="p-6 text-center hover:scale-105 transition-all">
                <spec.icon className="w-8 h-8 text-secondary mx-auto mb-4" />
                <h3 className="font-semibold mb-2">{spec.label}</h3>
                <p className="text-muted-foreground">{spec.value}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">
              <span className="gradient-text">Características Principales</span>
            </h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-secondary flex-shrink-0" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Adventure Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <Mountain className="w-16 h-16 text-secondary mx-auto mb-6" />
            <h2 className="text-3xl font-bold mb-6">
              <span className="gradient-text">Diseñado para la Aventura</span>
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              El e-Xplorer-2 está construido con materiales de alta calidad que resisten 
              el uso intensivo. Su estructura plegable y su potente motor lo convierten 
              en el compañero perfecto para explorar la ciudad y más allá.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-secondary to-primary text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Explora sin límites
          </h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Con el SmartGyro e-Xplorer-2, cada trayecto es una nueva aventura. 
            Potencia, resistencia y versatilidad en un solo patinete.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary">
              Ver Precio y Disponibilidad
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary">
              Contactar Asesor
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default SmartGyroExplorer2;