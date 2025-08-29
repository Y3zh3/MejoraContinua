import { KpiCard } from "@/components/kpi-card";
import { Megaphone, CheckCircle, MailOpen, AlertCircle } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

export default function ComunicadosPage() {
  const kpis = [
    { title: "Total Enviados", value: "12,345", icon: Megaphone, trend: "+1,200 este mes", trendDirection: "up" },
    { title: "Tasa de Apertura", value: "68.3%", icon: MailOpen, trend: "+2.1% vs mes anterior", trendDirection: "up" },
    { title: "Entregados con Éxito", value: "11,987", icon: CheckCircle, trend: "97% de efectividad", trendDirection: "neutral" },
    { title: "Rebotes", value: "358", icon: AlertCircle, trend: "-5% vs mes anterior", trendDirection: "down" },
  ];

  const comunicados = [
    { id: "COM-001", asunto: "Corte de servicio programado", fecha: "2024-07-20", area: "Comas", estado: "Enviado" },
    { id: "COM-002", asunto: "Aviso de mantenimiento de red", fecha: "2024-07-19", area: "Callao", estado: "Entregado" },
    { id: "COM-003", asunto: "Factura de Julio disponible", fecha: "2024-07-18", area: "Ate", estado: "Leído" },
    { id: "COM-004", asunto: "Campaña de ahorro de agua", fecha: "2024-07-17", area: "Breña", estado: "Rebotado" },
    { id: "COM-005", asunto: "Actualización de política de privacidad", fecha: "2024-07-16", area: "SJL", estado: "Enviado" },
    { id: "COM-006", asunto: "Encuesta de satisfacción", fecha: "2024-07-15", area: "Clientes Especiales", estado: "Leído" },
  ];

  const getBadgeVariant = (estado: string) => {
    switch (estado) {
      case "Enviado":
        return "default";
      case "Entregado":
        return "secondary";
      case "Leído":
        return "outline";
      case "Rebotado":
        return "destructive";
      default:
        return "default";
    }
  }

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

      <div>
        <h2 className="font-headline text-2xl font-bold mb-4">Últimos Comunicados</h2>
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Asunto</TableHead>
                <TableHead>Fecha</TableHead>
                <TableHead>Área</TableHead>
                <TableHead>Estado</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {comunicados.map((comunicado) => (
                <TableRow key={comunicado.id}>
                  <TableCell className="font-medium">{comunicado.id}</TableCell>
                  <TableCell>{comunicado.asunto}</TableCell>
                  <TableCell>{comunicado.fecha}</TableCell>
                  <TableCell>{comunicado.area}</TableCell>
                  <TableCell>
                    <Badge variant={getBadgeVariant(comunicado.estado)}>{comunicado.estado}</Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
