
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
  detalleSedes: { sede: string; valor: number }[];
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

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl h-[80vh] flex flex-col">
        <DialogHeader>
          <DialogTitle className="font-headline text-2xl text-primary">
            {activityData.nombre}
          </DialogTitle>
          <DialogDescription>
            Meta Anual: {activityData.metaAnual}%
          </DialogDescription>
        </DialogHeader>
        <div className="flex-grow grid grid-cols-1 md:grid-cols-3 gap-6 overflow-y-auto pr-6">
          <div className="md:col-span-2 flex flex-col gap-6">
            <h3 className="font-headline text-lg">Evolución Mensual</h3>
            <div className="h-96">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={activityData.historicoMensual} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                        <XAxis dataKey="mes" />
                        <YAxis />
                        <Tooltip contentStyle={{
                            background: "hsl(var(--background))",
                            borderColor: "hsl(var(--border))",
                        }}/>
                        <Legend />
                        <Line type="monotone" dataKey="valor" name="Valor" stroke="hsl(var(--primary))" strokeWidth={2} />
                        <Line type="monotone" dataKey="meta" name="Meta" stroke="hsl(var(--accent))" strokeWidth={2} strokeDasharray="5 5" />
                    </LineChart>
                </ResponsiveContainer>
            </div>
          </div>
          <div className="md:col-span-1">
             <h3 className="font-headline text-lg mb-4">Acumulado por Sede</h3>
            <div className="border rounded-lg max-h-[calc(80vh-12rem)] overflow-y-auto">
                <Table>
                    <TableHeader>
                        <TableRow>
                        <TableHead>Sede</TableHead>
                        <TableHead className="text-right">Valor</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {activityData.detalleSedes.map((sede) => (
                        <TableRow key={sede.sede}>
                            <TableCell className="font-medium">{sede.sede}</TableCell>
                            <TableCell className="text-right">{sede.valor}%</TableCell>
                        </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
          </div>
        </div>
        <DialogFooter className="pt-4">
          <Button variant="outline">
            <FileDown className="mr-2 h-4 w-4" />
            Exportar
          </Button>
          <Button onClick={onClose}>Cerrar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
