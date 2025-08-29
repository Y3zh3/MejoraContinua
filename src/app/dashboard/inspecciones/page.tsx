import { KpiCard } from "@/components/kpi-card";
import { ClipboardList, Clock, Check, X } from "lucide-react";
import { BarChartExample, LineChartExample, ChartCard } from "@/components/charts";

export default function InspeccionesPage() {
  const kpis = [
    { title: "Inspecciones Programadas", value: "520", icon: ClipboardList, trend: "+30 esta semana", trendDirection: "up" },
    { title: "Tiempo Promedio", value: "45 min", icon: Clock, trend: "-5 min vs mes anterior", trendDirection: "down" },
    { title: "Aprobadas", value: "480", icon: Check, trend: "92.3% de aprobación", trendDirection: "neutral" },
    { title: "Rechazadas", value: "40", icon: X, trend: "+4 vs mes anterior", trendDirection: "up" },
  ];
  
  const locations = ["Comas", "Callao", "Ate", "Breña", "SJL", "Clientes Especiales", "Surquillo", "VES"];

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="font-headline text-3xl font-bold">Inspecciones</h1>
        <p className="text-muted-foreground">Métricas sobre las inspecciones de campo.</p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {kpis.map((kpi) => (
          <KpiCard key={kpi.title} {...kpi} />
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-2">
        {locations.map((location) => (
          <ChartCard
            key={location}
            title={`Inspecciones en ${location}`}
            description="Número de inspecciones en los últimos meses."
            chart={<BarChartExample />}
          />
        ))}
      </div>
    </div>
  );
}
