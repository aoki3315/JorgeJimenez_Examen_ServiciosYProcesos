import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { 
  ArrowLeft,
  Wrench,
  Battery,
  Droplets,
  Shield,
  Download,
  AlertCircle
} from 'lucide-react';
import { Link } from 'react-router-dom';

const MaintenanceGuide: React.FC = () => {
  const steps = [
    {
      icon: Battery,
      title: 'Sistema Eléctrico y Batería',
      frequency: 'Semanal',
      content: 'El corazón de tu patinete requiere atención constante. Mantén la carga siempre entre el 20% y el 80% para evitar la degradación prematura de las celdas de litio de alta densidad. Nunca cargues el vehículo inmediatamente después de un uso intensivo; permite que la batería se enfríe a temperatura ambiente durante al menos 30 minutos.',
      bullets: [
        'Inspecciona visualmente el puerto de carga por posibles oxidaciones.',
        'Utiliza siempre el cargador original provisto por Evolution Mobility.',
        'Almacena el patinete en lugares frescos (15°C - 25°C).'
      ]
    },
    {
      icon: Wrench,
      title: 'Ajuste Estructural',
      frequency: 'Mensual',
      content: 'Las vibraciones del terreno urbano causan holgura progresiva en la perfilería de aluminio. Revisa meticulosamente el sistema de plegado y la base del mástil. La tensión correcta evita ruidos parasitarios y previene riesgos críticos a altas velocidades.',
      bullets: [
        'Aplica sellador de roscas de par medio en tornillería crítica.',
        'Verifica la presión neumática (Mínimo 45 PSI para máxima autonomía).',
        'Ajusta la tensión de los cables de freno mecánicos.'
      ]
    },
    {
      icon: Droplets,
      title: 'Protección Medioambiental',
      frequency: 'Tras exposición a lluvia',
      content: 'A pesar de las certificaciones IPX, el agua a presión puede penetrar en los rodamientos sellados o en el display principal. La limpieza debe ser en seco o mediante paños ligeramente humedecidos con productos específicos.',
      bullets: [
        'Seca inmediatamente el deck antideslizante tras circular con lluvia.',
        'Aplica grasa de teflón seca en los ejes (evita lubricantes líquidos).',
        'Verifica que los tapones de goma sellen completamente los puertos.'
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-[#fafafa] text-[#1a1a1a] font-serif selection:bg-orange-200">
      <Header />
      
      <main className="pt-32 pb-24">
        <article className="max-w-3xl mx-auto px-6">
          {/* Header block */}
          <header className="mb-20 text-center">
            <Link to="/" className="inline-flex items-center text-sm font-sans tracking-widest text-slate-400 hover:text-slate-900 uppercase transition-colors mb-12">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Volver al Inicio
            </Link>
            <div className="text-orange-600 font-sans text-xs tracking-[0.3em] uppercase mb-6 font-bold">
              Revista Técnica / Volumen IV.
            </div>
            <h1 className="text-5xl md:text-7xl font-semibold tracking-tight text-slate-900 mb-8 leading-[1.1] font-serif">
              El Arte del Mantenimiento Urbano
            </h1>
            <p className="text-xl md:text-2xl text-slate-600 leading-relaxed font-light italic">
              Un enfoque profesional para extender la vida útil y el rendimiento de tu vehículo 
              de movilidad personal.
            </p>
          </header>

          <div className="w-full h-px bg-slate-200 mb-20" />

          {/* Intro paragraph with drop cap styling conceptually */}
          <div className="prose prose-lg md:prose-xl prose-slate max-w-none font-serif leading-relaxed mb-20">
            <p className="first-letter:text-7xl first-letter:font-bold first-letter:text-orange-600 first-letter:mr-3 first-letter:float-left first-line:uppercase first-line:tracking-widest">
              Conducir un patinete eléctrico de altas prestaciones por la ciudad es una 
              experiencia liberadora, pero conlleva una gran responsabilidad técnica. La 
              precisión suiza que exigen las máquinas que nos transportan no admite negligencias. 
              Evolution Mobility ha recopilado el canon definitivo de mantenimiento para 
              pilotos que no se conforman con menos que el máximo rendimiento.
            </p>
          </div>

          {/* Step-by-step Editorial Format */}
          <div className="space-y-24">
            {steps.map((step, index) => (
              <section key={index} className="relative">
                <div className="absolute -left-8 top-0 bottom-0 w-px bg-slate-200 hidden md:block" />
                <div className="md:absolute -left-10 top-0 w-4 h-4 rounded-full bg-orange-600 hidden md:block" />
                
                <div className="flex items-center gap-4 mb-6">
                  <span className="font-sans text-xs font-bold uppercase tracking-widest text-orange-600 bg-orange-50 px-3 py-1 rounded-sm">
                    {step.frequency}
                  </span>
                </div>

                <h2 className="text-3xl font-semibold mb-6 flex items-center gap-4">
                  <step.icon className="w-8 h-8 text-slate-300" />
                  {step.title}
                </h2>
                
                <p className="text-xl text-slate-600 leading-relaxed mb-8">
                  {step.content}
                </p>

                <div className="p-8 bg-white border border-slate-100 shadow-sm">
                  <h3 className="text-sm font-sans font-bold uppercase tracking-widest text-slate-400 mb-6">Protocolo de actuación</h3>
                  <ul className="space-y-4">
                    {step.bullets.map((bullet, i) => (
                      <li key={i} className="flex gap-4 font-sans text-slate-700">
                        <span className="w-1.5 h-1.5 mt-2 rounded-full bg-orange-600 shrink-0" />
                        <span className="leading-relaxed">{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </section>
            ))}
          </div>

          <div className="w-full h-px bg-slate-200 my-20" />

          <section className="bg-slate-900 text-white p-12 text-center flex flex-col items-center">
            <AlertCircle className="w-12 h-12 text-orange-500 mb-6" />
            <h3 className="text-2xl font-serif font-semibold mb-4">¿Necesitas asistencia profesional?</h3>
            <p className="font-sans text-slate-400 max-w-md mx-auto mb-8 leading-relaxed">
              Nuestro taller cuenta con los diagnósticos propietarios y herrramientas de calibración 
              oficial para dejar tu vehículo como el primer día.
            </p>
            <Button className="bg-white text-slate-900 hover:bg-slate-100 rounded-none font-sans uppercase tracking-widest font-bold px-8 py-6">
              Contactar Taller <ArrowLeft className="w-4 h-4 ml-3 rotate-180" />
            </Button>
          </section>

        </article>
      </main>

      <Footer />
    </div>
  );
};

export default MaintenanceGuide;