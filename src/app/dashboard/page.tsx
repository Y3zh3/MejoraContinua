import { KpiCard } from "@/components/kpi-card";
import { 
  Megaphone,
  ClipboardList,
  Receipt,
  GaugeCircle,
  Handshake,
  Siren,
} from "lucide-react";
import { BarChartExample, LineChartExample, PieChartExample, ChartCard } from "@/components/charts";

export default function DashboardPage() {
  const kpis = [
    { title: "Comunicados Enviados", value: "1,250", icon: Megaphone, trend: "+20.1% from last month", trendDirection: "up" },
    { title: "Inspecciones Realizadas", value: "340", icon: ClipboardList, trend: "+15.2% from last month", trendDirection: "up" },
    { title: "Recibos Procesados", value: "15,690", icon: Receipt, trend: "+5.3% from last month", trendDirection: "up" },
    { title: "Medidores Inteligentes", value: "89%", icon: GaugeCircle, trend: "-1.1% from last month", trendDirection: "down" },
    { title: "Acuerdos Persuasivos", value: "128", icon: Handshake, trend: "+8.9% from last month", trendDirection: "up" },
    { title: "Emergencias Atendidas", value: "42", icon: Siren, trend: "+2.4% from last month", trendDirection: "neutral" },
  ];

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="font-headline text-3xl font-bold">Dashboard General</h1>
        <p className="text-muted-foreground">Una vista general de las métricas clave.</p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {kpis.map((kpi) => (
          <KpiCard key={kpi.title} {...kpi} />
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <ChartCard 
            title="Actividad Mensual"
            description="Comparativa de actividades de escritorio vs móvil."
            chart={<BarChartExample />}
        />
        <ChartCard
            title="Tendencia de Valor"
            description="Seguimiento del valor a lo largo del tiempo."
            chart={<LineChartExample />}
        />
      </div>
      <div className="grid grid-cols-1 gap-6">
        <ChartCard
            title="Distribución por Categoría"
            description="Desglose de datos por categoría."
            chart={<PieChartExample />}
        />
      </div>
    </div>
  );
}
