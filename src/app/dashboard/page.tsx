
import { TrendingUp, Target, Zap } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function DashboardPage() {
  return (
    <div className="w-full bg-background p-8 md:p-12">
      <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-4">
              <TrendingUp className="h-12 w-12 text-primary" />
              <h1 className="text-6xl font-bold text-foreground font-headline">Mejora Continua</h1>
          </div>
          <p className="mt-4 text-xl text-muted-foreground max-w-3xl mx-auto">
              Impulsando la eficiencia y la excelencia operativa a través del análisis de datos y la optimización de procesos.
          </p>
      </div>
      
      <div className="bg-background">
        <h2 className="text-3xl font-bold text-center text-foreground mb-10">Nuestros Pilares de Gestión</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <Card>
            <CardHeader className="items-center">
              <div className="bg-primary/10 p-3 rounded-full">
                 <Target className="h-8 w-8 text-primary" />
              </div>
              <CardTitle className="pt-4">Optimización de Procesos</CardTitle>
            </CardHeader>
            <CardContent className="text-center text-muted-foreground">
              Analizamos cada ciclo y actividad para identificar cuellos de botella, reducir ineficiencias y garantizar el cumplimiento de metas con la máxima calidad.
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="items-center">
               <div className="bg-primary/10 p-3 rounded-full">
                 <TrendingUp className="h-8 w-8 text-primary" />
              </div>
              <CardTitle className="pt-4">Análisis de Datos</CardTitle>
            </CardHeader>
            <CardContent className="text-center text-muted-foreground">
              Transformamos datos brutos en insights accionables. Nuestros dashboards permiten una visualización clara del rendimiento para tomar decisiones informadas.
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="items-center">
               <div className="bg-primary/10 p-3 rounded-full">
                <Zap className="h-8 w-8 text-primary" />
              </div>
              <CardTitle className="pt-4">Innovación y Agilidad</CardTitle>
            </CardHeader>
            <CardContent className="text-center text-muted-foreground">
              Fomentamos una cultura de agilidad, respondiendo rápidamente a los cambios y adoptando nuevas tecnologías para mejorar continuamente el servicio.
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
