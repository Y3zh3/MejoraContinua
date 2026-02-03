
"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { FileWarning, CheckCircle2, Receipt } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const dataEnero = [
  { name: 'Comas', value: 10, meta: 0 },
  { name: 'Callao', value: 13, meta: 0 },
  { name: 'Ate', value: 5, meta: 0 },
  { name: 'Breña', value: 3, meta: 0 },
  { name: 'SJL', value: 6, meta: 0 },
  { name: 'Surquillo', value: 1, meta: 0 },
  { name: 'VES', value: 0, meta: 0 },
  { name: 'Clientes E.', value: 0, meta: 0 },
];

const COLORS = [
  'hsl(var(--chart-1))',
  'hsl(var(--chart-2))',
  'hsl(var(--chart-3))',
  'hsl(var(--chart-4))',
  'hsl(var(--chart-5))',
  '#2563eb',
  '#7c3aed',
  '#10b981',
];

export default function ReclamosRecibosPage() {
  const totalReclamos = dataEnero.reduce((acc, item) => acc + item.value, 0);
  const pieData = dataEnero.filter(item => item.value > 0);
  const sedesCumplidoras = dataEnero.filter(item => item.value === 0).map(item => item.name);
  
  return (
    <div className="max-w-7xl mx-auto flex flex-col gap-8">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Receipt className="h-8 w-8 text-[hsl(var(--chart-1))]" />
          <h1 className="font-headline text-3xl font-bold">Recibos: Reclamos</h1>
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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Card className="lg:col-span-2 transition-colors hover:bg-primary/10 border shadow-sm">
            <CardHeader className="p-4">
                <CardTitle className="text-xl">Distribución de Reclamos por Sede (%) - Enero '26</CardTitle>
            </CardHeader>
            <CardContent className="h-96 p-0 px-2 pb-4">
            <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={80}
                    outerRadius={120}
                    paddingAngle={5}
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{
                      background: "hsl(var(--card))",
                      borderColor: "hsl(var(--border))",
                      borderRadius: "8px",
                    }}
                  />
                  <Legend />
                </PieChart>
            </ResponsiveContainer>
            </CardContent>
        </Card>

        <Card className="transition-colors hover:bg-primary/10 border shadow-sm">
            <CardHeader>
            <CardTitle className="text-xl">Resumen de Enero '26</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-6 pt-2">
                <div className="grid grid-cols-1 gap-6">
                    <div className="border p-6 rounded-xl text-center bg-card shadow-sm">
                        <p className="text-sm font-medium text-muted-foreground mb-1 uppercase tracking-wider">Total Reclamos</p>
                        <p className="text-4xl font-bold text-[hsl(var(--chart-1))]">{totalReclamos} uds.</p>
                    </div>
                     <div className="border p-6 rounded-xl text-center bg-card shadow-sm border-primary/20 bg-primary/5">
                        <p className="text-sm font-medium text-muted-foreground mb-1 uppercase tracking-wider">Meta Máxima p/Sede</p>
                        <p className="text-4xl font-bold text-primary">0 uds.</p>
                    </div>
                </div>
                <div className="mt-4 flex flex-col gap-4">
                    <div>
                        <h4 className="font-semibold text-lg mb-2 flex items-center gap-2">
                            <CheckCircle2 className="h-5 w-5 text-primary" />
                            Logro del Mes
                        </h4>
                        <p className="text-base text-muted-foreground leading-relaxed">
                            Las sedes <span className="font-bold text-foreground">{sedesCumplidoras.join(" y ")}</span> han alcanzado la meta de excelencia con <span className="font-bold text-primary">0 reclamos</span> registrados.
                        </p>
                    </div>
                    <div>
                        <h4 className="font-semibold text-lg mb-2">Análisis Crítico</h4>
                        <p className="text-base text-muted-foreground leading-relaxed">
                            Callao y Comas concentran el <span className="font-bold text-foreground">60%</span> de las incidencias del mes, requiriendo revisión de los procesos de facturación locales.
                        </p>
                    </div>
                </div>
            </CardContent>
        </Card>
      </div>

       <Card className="transition-colors hover:bg-primary/10 border shadow-sm">
        <CardHeader>
            <CardTitle className="text-xl">Detalle Mensual por Sede (Ene'26)</CardTitle>
            <p className="text-base text-muted-foreground">
            Desglose comparativo frente a la meta de cero reclamos de recibos.
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
                    <TableCell className={item.value > item.meta ? "text-destructive font-bold" : "text-primary font-bold flex items-center gap-2"}>
                        {item.value} uds.
                        {item.value === 0 && <CheckCircle2 className="h-4 w-4" />}
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
