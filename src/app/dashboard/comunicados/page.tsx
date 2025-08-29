import { KpiCard } from "@/components/kpi-card";
import { Megaphone, CheckCircle, MailOpen, AlertCircle } from "lucide-react";
import { BarChartExample, LineChartExample, ChartCard } from "@/components/charts";

export default function ComunicadosPage() {
  const kpis = [
    { title: "Total Enviados", value: "12,345", icon: Megaphone, trend: "+1,200 este mes", trendDirection: "up" },
    { title: "Tasa de Apertura", value: "68.3%", icon: MailOpen, trend: "+2.1% vs mes anterior", trendDirection: "up" },
    { title: "Entregados con Éxito", value: "11,987", icon: CheckCircle, trend: "97% de efectividad", trendDirection: "neutral" },
    { title: "Rebotes", value: "358", icon: AlertCircle, trend: "-5% vs mes anterior", trendDirection: "down" },
  ];

  const locations = ["Comas", "Callao", "Ate", "Breña", "SJL", "Clientes Especiales", "Surquillo", "VES"];

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="font-headline text-3xl font-bold">Comunicados</h1>
        <p className="text-muted-foreground">Análisis de la efectividad de las comunicaciones.</p>
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
                title={`Comunicados en ${location}`}
                description="Tendencia de comunicados enviados en los últimos 6 meses."
                chart={<LineChartExample />}
            />
        ))}
      </div>
    </div>
  );
}
