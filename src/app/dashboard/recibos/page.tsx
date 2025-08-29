import { KpiCard } from "@/components/kpi-card";
import { Receipt, Banknote, CalendarClock, AlertTriangle } from "lucide-react";
import { LineChartExample, BarChartExample, ChartCard } from "@/components/charts";

export default function RecibosPage() {
  const kpis = [
    { title: "Recibos Emitidos", value: "150,432", icon: Receipt, trend: "+1.2% vs mes anterior", trendDirection: "up" },
    { title: "Monto Facturado", value: "S/ 1.2M", icon: Banknote, trend: "+3.5% vs mes anterior", trendDirection: "up" },
    { title: "Pagos a Tiempo", value: "85.7%", icon: CalendarClock, trend: "-0.5% vs mes anterior", trendDirection: "down" },
    { title: "Pagos Vencidos", value: "14.3%", icon: AlertTriangle, trend: "+0.5% vs mes anterior", trendDirection: "up" },
  ];

  const locations = ["Comas", "Callao", "Ate", "Breña", "SJL", "Clientes Especiales", "Surquillo", "VES"];

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="font-headline text-3xl font-bold">Recibos y Facturación</h1>
        <p className="text-muted-foreground">Seguimiento de la facturación y pagos.</p>
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
                title={`Facturación en ${location}`}
                description="Evolución de la facturación mensual."
                chart={<LineChartExample />}
            />
        ))}
      </div>
    </div>
  );
}
