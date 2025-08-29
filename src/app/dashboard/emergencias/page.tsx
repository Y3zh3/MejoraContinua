import { KpiCard } from "@/components/kpi-card";
import { Siren, Clock, ShieldCheck, Wrench } from "lucide-react";
import { PieChartExample, BarChartExample, ChartCard } from "@/components/charts";

export default function EmergenciasPage() {
  const kpis = [
    { title: "Emergencias Reportadas", value: "142", icon: Siren, trend: "-10% vs mes anterior", trendDirection: "down" },
    { title: "Tiempo de Respuesta", value: "2.5 hrs", icon: Clock, trend: "-15 min vs mes anterior", trendDirection: "down" },
    { title: "Resueltas con Éxito", value: "98.6%", icon: ShieldCheck, trend: "Estable", trendDirection: "neutral" },
    { title: "Tipo Más Común", value: "Fuga de agua", icon: Wrench, trend: "45% de los casos", trendDirection: "neutral" },
  ];

  const locations = ["Comas", "Callao", "Ate", "Breña", "SJL", "Clientes Especiales", "Surquillo", "VES"];

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="font-headline text-3xl font-bold">Emergencias</h1>
        <p className="text-muted-foreground">Datos y estadísticas sobre la gestión de emergencias.</p>
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
            title={`Emergencias en ${location}`}
            description="Distribución de tipos de emergencia."
            chart={<PieChartExample />}
          />
        ))}
      </div>
    </div>
  );
}
