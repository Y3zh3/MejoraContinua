import { KpiCard } from "@/components/kpi-card";
import { GaugeCircle, Wrench, Activity, Wifi } from "lucide-react";
import { BarChartExample, PieChartExample, ChartCard } from "@/components/charts";

export default function MedidoresPage() {
  const kpis = [
    { title: "Medidores Instalados", value: "45,876", icon: GaugeCircle, trend: "89% del total", trendDirection: "neutral" },
    { title: "Mantenimientos", value: "1,234", icon: Wrench, trend: "+150 este mes", trendDirection: "up" },
    { title: "Medidores Activos", value: "99.2%", icon: Activity, trend: "Estable", trendDirection: "neutral" },
    { title: "Conectividad", value: "98.9%", icon: Wifi, trend: "-0.2% vs semana anterior", trendDirection: "down" },
  ];

  const locations = ["Comas", "Callao", "Ate", "Breña", "SJL", "Clientes Especiales", "Surquillo", "VES"];

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="font-headline text-3xl font-bold">Medidores</h1>
        <p className="text-muted-foreground">Estadísticas sobre la red de medidores inteligentes.</p>
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
            title={`Medidores en ${location}`}
            description="Distribución de medidores por estado."
            chart={<PieChartExample />}
          />
        ))}
      </div>
    </div>
  );
}
