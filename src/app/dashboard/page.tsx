import { TrendingUp, Target, Zap } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';

export default function DashboardPage() {
  return (
    <>
      <div className="relative text-center mb-8 rounded-lg overflow-hidden">
        <div className="absolute inset-0 bg-black/30 z-10" />
        <Image 
            src="https://picsum.photos/seed/water-stream/1200/300"
            alt="Hero Background"
            width={1200}
            height={300}
            className="w-full object-cover"
            data-ai-hint="water stream"
        />
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-primary-foreground">
            <div className="flex items-center justify-center gap-4">
                <TrendingUp className="h-10 w-10 text-white" />
                <h1 className="text-5xl font-bold text-white font-headline">Mejora Continua</h1>
            </div>
            <p className="mt-4 text-lg text-white/90 max-w-3xl mx-auto px-4">
                Impulsando la eficiencia y la excelencia operativa a través del análisis de datos y la optimización de procesos.
            </p>
        </div>
      </div>
      
      <div>
        <h2 className="text-2xl font-bold text-center text-foreground mb-8">Nuestros Pilares de Gestión</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          <Card className="transition-colors hover:bg-primary/5">
            <CardHeader className="items-center pb-2">
              <div className="bg-primary/10 p-3 rounded-full">
                 <Target className="h-6 w-6 text-primary" />
              </div>
              <CardTitle className="pt-3 text-lg">Optimización de Procesos</CardTitle>
            </CardHeader>
            <CardContent className="text-center text-sm text-muted-foreground leading-relaxed">
              Analizamos cada ciclo y actividad para identificar cuellos de botella, reducir ineficiencias y garantizar el cumplimiento de metas con la máxima calidad.
            </CardContent>
          </Card>
          <Card className="transition-colors hover:bg-primary/5">
            <CardHeader className="items-center pb-2">
               <div className="bg-primary/10 p-3 rounded-full">
                 <TrendingUp className="h-6 w-6 text-primary" />
              </div>
              <CardTitle className="pt-3 text-lg">Análisis de Datos</CardTitle>
            </CardHeader>
            <CardContent className="text-center text-sm text-muted-foreground leading-relaxed">
              Transformamos datos brutos en insights accionables. Nuestros dashboards permiten una visualización clara del rendimiento para tomar decisiones informadas.
            </CardContent>
          </Card>
          <Card className="transition-colors hover:bg-primary/5">
            <CardHeader className="items-center pb-2">
               <div className="bg-primary/10 p-3 rounded-full">
                <Zap className="h-6 w-6 text-primary" />
              </div>
              <CardTitle className="pt-3 text-lg">Innovación y Agilidad</CardTitle>
            </CardHeader>
            <CardContent className="text-center text-sm text-muted-foreground leading-relaxed">
              Fomentamos una cultura de agilidad, respondiendo rápidamente a los cambios y adoptando nuevas tecnologías para mejorar continuamente el servicio.
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
