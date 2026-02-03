
"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, ReferenceLine } from 'recharts';
import { FileWarning } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const dataEnero = [
  { name: 'Comas', value: 17, meta: 5 },
  { name: 'Callao', value: 6, meta: 5 },
  { name: 'Ate', value: 5, meta: 5 },
  { name: 'Breña', value: 5, meta: 5 },
  { name: 'SJL', value: 0, meta: 5 },
  { name: 'Surquillo', value: 2, meta: 5 },
  { name: 'VES', value: 2, meta: 5 },
];

export default function ReclamosPersuasivasPage() {
  const totalReclamos = dataEnero.reduce((acc, item) => acc + item.value, 0);
  
  return (
    <div className="max-w-7xl mx-auto flex flex-col gap-8">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <FileWarning className="h-8 w-8 text-[hsl(var(--chart-4))]" />
          <h1 className="font-headline text-3xl font-bold">Persuasivas: Reclamos</h1>
        </div>
        <div className="w-full max-w-xs">
            <Select defaultValue="todas">
                <SelectTrigger>
                    <SelectValue placeholder="Seleccionar Base" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="todas">Todas las bases</SelectItem>
                </SelectContent>
            </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card className="transition-colors hover:bg-primary/10 border shadow-sm">
            <CardHeader className="p-4">
                <CardTitle className="text-xl">Distribución por Sede - Enero 2026</CardTitle>
            </CardHeader>
            <CardContent className="h-80 p-0 px-2 pb-4">
            <ResponsiveContainer width="100%" height="100%">
                <BarChart data={dataEnero}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="name" />
                  <YAxis unit=" uds." allowDecimals={false} />
                  <Tooltip
                      contentStyle={{
                      background: "hsl(var(--card))",
                      borderColor: "hsl(var(--border))",
                      borderRadius: "8px",
                      }}
                      formatter={(value: number) => `${value} uds.`}
                  />
                  <Legend />
                  <Bar 
                    dataKey="value" 
                    name="Reclamos" 
                    fill="hsl(var(--chart-4))" 
                    radius={[4, 4, 0, 0]} 
                  />
                  <ReferenceLine y={5} label="Meta" stroke="hsl(var(--destructive))" strokeDasharray="3 3" />
                </BarChart>
            </ResponsiveContainer>
            </CardContent>
        </Card>

        <Card className="transition-colors hover:bg-primary/10 border shadow-sm">
            <CardHeader>
            <CardTitle className="text-xl">Resumen del Indicador</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-6 pt-2">
                <p className="text-lg text-muted-foreground leading-relaxed">
                    Análisis del indicador de <span className="font-semibold text-foreground">Reclamos de Persuasivas</span> para el periodo de <span className="font-semibold text-foreground">Enero 2026</span>.
                </p>
                <div className="grid grid-cols-2 gap-6">
                    <div className="border p-6 rounded-xl text-center bg-card shadow-sm">
                        <p className="text-sm font-medium text-muted-foreground mb-1 uppercase tracking-wider">Total Reclamos</p>
                        <p className="text-4xl font-bold text-[hsl(var(--chart-4))]">{totalReclamos} uds.</p>
                    </div>
                     <div className="border p-6 rounded-xl text-center bg-card shadow-sm">
                        <p className="text-sm font-medium text-muted-foreground mb-1 uppercase tracking-wider">Meta (máx/sede)</p>
                        <p className="text-4xl font-bold">5 uds.</p>
                    </div>
                </div>
                <div className="mt-2">
                    <h4 className="font-semibold text-lg mb-2">Observaciones</h4>
                    <p className="text-base text-muted-foreground leading-relaxed">
                        El gráfico muestra el volumen de reclamos por sede durante Enero 2026. Comas presenta el valor más alto con 17 unidades, superando la meta de 5 por sede. SJL destaca por no registrar reclamos.
                    </p>
                </div>
            </CardContent>
        </Card>
      </div>

       <Card className="transition-colors hover:bg-primary/10 border shadow-sm">
        <CardHeader>
            <CardTitle className="text-xl">Detalle de Reclamos por Sede (Ene'26)</CardTitle>
            <p className="text-base text-muted-foreground">
            Desglose comparativo de los reclamos de acciones persuasivas registrados en el mes de Enero 2026.
            </p>
        </CardHeader>
        <CardContent>
            <div className="max-h-96 overflow-y-auto rounded-md border">
            <Table className="text-base">
                <TableHeader className="sticky top-0 bg-secondary/50 backdrop-blur-sm">
                <TableRow>
                    <TableHead className="w-[200px] font-bold">Sede</TableHead>
                    <TableHead className="font-bold">Reclamos</TableHead>
                    <TableHead className="text-right font-bold">Meta (máx)</TableHead>
                </TableRow>
                </TableHeader>
                <TableBody>
                {dataEnero.map((item) => (
                    <TableRow key={item.name}>
                    <TableCell className="font-semibold">{item.name}</TableCell>
                    <TableCell className={item.value > item.meta ? "text-destructive font-bold" : "text-foreground"}>
                        {item.value} uds.
                    </TableCell>
                    <TableCell className="text-right font-medium">{item.meta} uds.</TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
            </div>
        </CardContent>
        </Card>
    </div>
  );
}
