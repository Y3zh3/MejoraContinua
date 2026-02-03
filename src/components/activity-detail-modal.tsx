
"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { FileDown } from "lucide-react";

type ActivityData = {
  nombre: string;
  promedioAnual: number;
  metaAnual: number;
  historicoMensual: { mes: string; valor: number; meta: number }[];
  detalleTabla: { label: string; valor: number }[];
  tituloTabla: string;
  columnaLabel: string;
  unidad?: string;
};

interface ActivityDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  activityData: ActivityData | null;
}

export function ActivityDetailModal({
  isOpen,
  onClose,
  activityData,
}: ActivityDetailModalProps) {
  if (!activityData) {
    return null;
  }

  const unit = activityData.unidad || "%";

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl h-[80vh] flex flex-col">
        <DialogHeader>
          <DialogTitle className="font-headline text-2xl text-primary">
            {activityData.nombre}
          </DialogTitle>
          <DialogDescription>
            Meta Anual establecida: {activityData.metaAnual}{unit}
          </DialogDescription>
        </DialogHeader>
        <div className="flex-grow grid grid-cols-1 md:grid-cols-3 gap-6 overflow-y-auto pr-6">
          <div className="md:col-span-2 flex flex-col gap-6">
            <h3 className="font-headline text-lg font-semibold">Evolución Mensual del Indicador</h3>
            <div className="h-96">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={activityData.historicoMensual} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                        <XAxis dataKey="mes" />
                        <YAxis domain={['auto', 'auto']} unit={unit === 'uds.' ? '' : unit} />
                        <Tooltip 
                            contentStyle={{
                                background: "hsl(var(--background))",
                                borderColor: "hsl(var(--border))",
                                borderRadius: "8px"
                            }}
                            formatter={(value: number) => [`${value} ${unit}`, "Valor"]}
                        />
                        <Legend />
                        <Line type="monotone" dataKey="valor" name={`Rendimiento (${unit})`} stroke="hsl(var(--primary))" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                        <Line type="monotone" dataKey="meta" name="Meta Institucional" stroke="hsl(var(--destructive))" strokeWidth={2} strokeDasharray="5 5" />
                    </LineChart>
                </ResponsiveContainer>
            </div>
          </div>
          <div className="md:col-span-1">
             <h3 className="font-headline text-lg mb-4 font-semibold">{activityData.tituloTabla}</h3>
            <div className="border rounded-lg max-h-[calc(80vh-12rem)] overflow-y-auto">
                <Table>
                    <TableHeader className="bg-muted/50 sticky top-0 z-10">
                        <TableRow>
                        <TableHead>{activityData.columnaLabel}</TableHead>
                        <TableHead className="text-right">Valor ({unit})</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {activityData.detalleTabla.map((item, idx) => (
                        <TableRow key={idx}>
                            <TableCell className="font-medium">{item.label}</TableCell>
                            <TableCell className="text-right">{item.valor}{unit}</TableCell>
                        </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
          </div>
        </div>
        <DialogFooter className="pt-4 border-t">
          <Button variant="outline">
            <FileDown className="mr-2 h-4 w-4" />
            Exportar Datos
          </Button>
          <Button onClick={onClose}>Cerrar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
