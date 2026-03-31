import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { 
  ArrowLeft,
  Calendar,
  Scale,
  ShieldAlert,
  MapPin
} from 'lucide-react';
import { Link } from 'react-router-dom';

const RegulationNews: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#fafafa] text-[#1a1a1a] font-serif selection:bg-red-200">
      <Header />
      
      <main className="pt-32 pb-24">
        <article className="max-w-3xl mx-auto px-6">
          <header className="mb-16">
            <Link to="/" className="inline-flex items-center text-sm font-sans tracking-widest text-slate-400 hover:text-slate-900 uppercase transition-colors mb-12">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Volver al Inicio
            </Link>
            
            <div className="flex items-center gap-4 text-red-600 font-sans text-xs tracking-[0.2em] uppercase mb-6 font-bold">
              <span>Marco Jurídico</span>
              <span className="w-1 h-1 bg-red-600 rounded-full" />
              <span className="text-slate-400 text-[10px] tracking-widest">Publicado en BOE</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-semibold tracking-tight text-slate-900 mb-8 leading-[1.1] font-serif">
              Nueva Ley de Tráfico VMP 2024: Análisis del impacto regulatorio
            </h1>
            
            <div className="flex flex-wrap items-center gap-6 font-sans text-xs uppercase tracking-widest text-slate-500 border-b border-slate-200 pb-8">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>Impacto en vigor</span>
              </div>
              <div className="flex items-center gap-2">
                <Scale className="w-4 h-4" />
                <span>Auditoría Legal DGT</span>
              </div>
            </div>
          </header>

          <div className="prose prose-lg md:prose-xl prose-slate max-w-none font-serif leading-relaxed mb-16">
            <p className="first-letter:text-7xl first-letter:font-bold first-letter:text-red-600 first-letter:mr-3 first-letter:float-left first-line:uppercase first-line:tracking-widest">
              La transición hacia un nuevo modelo de convivencia vial está en marcha. 
              El marco legislativo que define las normas de uso de los Vehículos de Movilidad 
              Personal (VMP) en el ecosistema urbano ha sufrido su modificación más profunda 
              y ambiciosa hasta la fecha. Analizamos los preceptos ineludibles que todo 
              piloto deberá cumplir este año.
            </p>
          </div>

          <div className="my-16 bg-white p-10 border-l-4 border-red-600 shadow-sm relative italic text-xl text-slate-700">
            <ShieldAlert className="absolute top-8 right-8 w-12 h-12 text-slate-100" />
            "El desconocimiento de la normativa vial no exime de su cumplimiento ni aminora la responsabilidad civil en siniestros urbanos."
          </div>

          <section className="mt-16">
            <h2 className="text-3xl font-semibold mb-10 pb-4 border-b border-slate-200">
              Pilares de la nueva regulación
            </h2>

            <div className="space-y-12">
              <div className="group">
                <h3 className="text-xl font-bold font-sans uppercase tracking-widest text-slate-900 mb-4 flex items-center gap-3">
                  <span className="text-red-600">I.</span> Límite Tasa de Alcoholemia
                </h3>
                <p className="text-lg text-slate-600 leading-relaxed font-serif pl-8 border-l border-slate-200">
                  Total tolerancia cero para conductores menores de edad (0,0g/l). Para el resto, 
                  se equipara rígidamente al conductor general (0,25 mg/l en aire espirado). Negarse a la 
                  prueba técnica acarrea penalizaciones extremas comparables a conducción temeraria.
                </p>
              </div>

              <div className="group">
                <h3 className="text-xl font-bold font-sans uppercase tracking-widest text-slate-900 mb-4 flex items-center gap-3">
                  <span className="text-red-600">II.</span> Veto a Vías Peatonales
                </h3>
                <p className="text-lg text-slate-600 leading-relaxed font-serif pl-8 border-l border-slate-200">
                  Queda terminantemente restringido el tráfico de VMP y bicicletas de tracción 
                  eléctrica sobre aceras y corredores puramente peatonales, sin excepción. 
                  Aquellos corredores que crucen zonas caminables deberán hacerse con el vehículo 
                  apagado y empujando su estructura.
                </p>
              </div>

              <div className="group">
                <h3 className="text-xl font-bold font-sans uppercase tracking-widest text-slate-900 mb-4 flex items-center gap-3">
                  <span className="text-red-600">III.</span> Aseguramiento Obligatorio
                </h3>
                <p className="text-lg text-slate-600 leading-relaxed font-serif pl-8 border-l border-slate-200">
                  La Directiva europea implementada ratifica que será mandatario portar un seguro de 
                  Responsabilidad Civil para flotas privadas dentro del año en curso. Consolidará un 
                  padrón municipal unificado para identificar infractores de hit and run (fugas).
                </p>
              </div>
            </div>
          </section>

          <div className="mt-20 p-8 bg-red-50 text-red-900 font-sans border border-red-100 flex flex-col md:flex-row items-center gap-8">
            <div className="shrink-0">
              <MapPin className="w-12 h-12 text-red-600 opacity-50" />
            </div>
            <div>
              <h4 className="font-bold uppercase tracking-widest text-sm mb-2">Advertencia Zonal</h4>
              <p className="text-sm leading-relaxed opacity-80">
                Diversos ayuntamientos locales están ejerciendo sus competencias para endurecer 
                las penas o ampliar los núcleos cerrados de acceso VMP. Por favor comprueba 
                las ordenanzas del municipio al que viajes.
              </p>
            </div>
          </div>

        </article>
      </main>

      <Footer />
    </div>
  );
};

export default RegulationNews;