import { KpiCard } from "@/components/kpi-card";
import { Handshake, Target, Phone, TrendingUp } from "lucide-react";
import { LineChartExample, BarChartExample, ChartCard } from "@/components/charts";

export default function PersuasivasPage() {
  const kpis = [
    { title: "Acuerdos Creados", value: "1,280", icon: Handshake, trend: "+12% vs mes anterior", trendDirection: "up" },
    { title: "Tasa de Éxito", value: "75%", icon: Target, trend: "+3% vs mes anterior", trendDirection: "up" },
    { title: "Llamadas Realizadas", value: "8,432", icon: Phone, trend: "Estable", trendDirection: "neutral" },
    { title: "Monto Recuperado", value: "S/ 250k", icon: TrendingUp, trend: "+S/ 30k vs mes anterior", trendDirection: "up" },
  ];

  const locations = ["Comas", "Callao", "Ate", "Breña", "SJL", "Clientes Especiales", "Surquillo", "VES"];

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="font-headline text-3xl font-bold">Acciones Persuasivas</h1>
        <p className="text-muted-foreground">Seguimiento de la gestión de cobranza y acuerdos.</p>
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
            title={`Acuerdos en ${location}`}
            description="Evolución de acuerdos de pago mensuales."
            chart={<BarChartExample />}
          />
        ))}
      </div>
    </div>
  );
}
