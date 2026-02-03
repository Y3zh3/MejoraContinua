
"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, ReferenceLine } from 'recharts';
import { AlertTriangle } from "lucide-react";
import { BaseSelector } from "@/components/base-selector";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const atipicasData = {
    todas: {
        promedio: 79.4,
        meta: 85,
        ciclos: [
            { name: 'C01', efectivo: 75, total: 100, value: 75, meta: 85 },
            { name: 'C02', efectivo: 76, total: 100, value: 76, meta: 85 },
            { name: 'C03', efectivo: 80, total: 100, value: 80, meta: 85 },
            { name: 'C04', efectivo: 78, total: 100, value: 78, meta: 85 },
            { name: 'C05', efectivo: 81, total: 100, value: 81, meta: 85 },
            { name: 'C06', efectivo: 84, total: 100, value: 84, meta: 85 },
            { name: 'C07', efectivo: 82, total: 100, value: 82, meta: 85 },
            { name: 'C08', efectivo: 83, total: 100, value: 83, meta: 85 },
            { name: 'C09', efectivo: 85, total: 100, value: 85, meta: 85 },
            { name: 'C10', efectivo: 70, total: 100, value: 70, meta: 85 },
        ]
    },
    comas: {
        promedio: 82.7,
        meta: 85,
        ciclos: [
            { name: 'C01', efectivo: 77, total: 100, value: 77, meta: 85 },
            { name: 'C02', efectivo: 78, total: 100, value: 78, meta: 85 },
            { name: 'C03', efectivo: 75, total: 100, value: 75, meta: 85 },
            { name: 'C04', efectivo: 81, total: 100, value: 81, meta: 85 },
            { name: 'C05', efectivo: 84, total: 100, value: 84, meta: 85 },
            { name: 'C06', efectivo: 85, total: 100, value: 85, meta: 85 },
            { name: 'C07', efectivo: 89, total: 100, value: 89, meta: 85 },
            { name: 'C08', efectivo: 88, total: 100, value: 88, meta: 85 },
            { name: 'C09', efectivo: 91, total: 100, value: 91, meta: 85 },
            { name: 'C10', efectivo: 90, total: 100, value: 90, meta: 85 },
        ]
    },
    callao: {
        promedio: 88.4,
        meta: 85,
        ciclos: [
            { name: 'C01', efectivo: 87, total: 100, value: 87, meta: 85 },
            { name: 'C02', efectivo: 81, total: 100, value: 81, meta: 85 },
            { name: 'C03', efectivo: 85, total: 100, value: 85, meta: 85 },
            { name: 'C04', efectivo: 82, total: 100, value: 82, meta: 85 },
            { name: 'C05', efectivo: 84, total: 100, value: 84, meta: 85 },
            { name: 'C06', efectivo: 91, total: 100, value: 91, meta: 85 },
            { name: 'C07', efectivo: 95, total: 100, value: 95, meta: 85 },
            { name: 'C08', efectivo: 95, total: 100, value: 95, meta: 85 },
            { name: 'C09', efectivo: 95, total: 100, value: 95, meta: 85 },
            { name: 'C10', efectivo: 85, total: 100, value: 85, meta: 85 },
        ]
    },
    ate: {
        promedio: 70.8,
        meta: 85,
        ciclos: [
            { name: 'C01', efectivo: 55, total: 100, value: 55, meta: 85 },
            { name: 'C02', efectivo: 67, total: 100, value: 67, meta: 85 },
            { name: 'C03', efectivo: 74, total: 100, value: 74, meta: 85 },
            { name: 'C04', efectivo: 65, total: 100, value: 65, meta: 85 },
            { name: 'C05', efectivo: 70, total: 100, value: 70, meta: 85 },
            { name: 'C06', efectivo: 73, total: 100, value: 73, meta: 85 },
            { name: 'C07', efectivo: 79, total: 100, value: 79, meta: 85 },
            { name: 'C08', efectivo: 77, total: 100, value: 77, meta: 85 },
            { name: 'C09', efectivo: 77, total: 100, value: 77, meta: 85 },
            { name: 'C10', efectivo: 79, total: 100, value: 79, meta: 85 },
        ]
    },
    brena: {
        promedio: 84.8,
        meta: 85,
        ciclos: [
            { name: 'C01', efectivo: 87, total: 100, value: 87, meta: 85 },
            { name: 'C02', efectivo: 83, total: 100, value: 83, meta: 85 },
            { name: 'C03', efectivo: 81, total: 100, value: 81, meta: 85 },
            { name: 'C04', efectivo: 87, total: 100, value: 87, meta: 85 },
            { name: 'C05', efectivo: 87, total: 100, value: 87, meta: 85 },
            { name: 'C06', efectivo: 81, total: 100, value: 81, meta: 85 },
            { name: 'C07', efectivo: 87, total: 100, value: 87, meta: 85 },
            { name: 'C08', efectivo: 85, total: 100, value: 85, meta: 85 },
            { name: 'C09', efectivo: 84, total: 100, value: 84, meta: 85 },
            { name: 'C10', efectivo: 86, total: 100, value: 86, meta: 85 },
        ]
    },
    sjl: {
        promedio: 89.9,
        meta: 85,
        ciclos: [
            { name: 'C01', efectivo: 85, total: 100, value: 85, meta: 85 },
            { name: 'C02', efectivo: 87, total: 100, value: 87, meta: 85 },
            { name: 'C03', efectivo: 87, total: 100, value: 87, meta: 85 },
            { name: 'C04', efectivo: 90, total: 100, value: 90, meta: 85 },
            { name: 'C05', efectivo: 89, total: 100, value: 89, meta: 85 },
            { name: 'C06', efectivo: 96, total: 100, value: 96, meta: 85 },
            { name: 'C07', efectivo: 88, total: 100, value: 88, meta: 85 },
            { name: 'C08', efectivo: 90, total: 100, value: 90, meta: 85 },
            { name: 'C09', efectivo: 89, total: 100, value: 89, meta: 85 },
            { name: 'C10', efectivo: 97, total: 100, value: 97, meta: 85 },
        ]
    },
    surquillo: {
        promedio: 78.3,
        meta: 85,
        ciclos: [
            { name: 'C01', efectivo: 80, total: 100, value: 80, meta: 85 },
            { name: 'C02', efectivo: 75, total: 100, value: 75, meta: 85 },
            { name: 'C03', efectivo: 79, total: 100, value: 79, meta: 85 },
            { name: 'C04', efectivo: 75, total: 100, value: 75, meta: 85 },
            { name: 'C05', efectivo: 77, total: 100, value: 77, meta: 85 },
            { name: 'C06', efectivo: 73, total: 100, value: 73, meta: 85 },
            { name: 'C07', efectivo: 80, total: 100, value: 80, meta: 85 },
            { name: 'C08', efectivo: 80, total: 100, value: 80, meta: 85 },
            { name: 'C09', efectivo: 83, total: 100, value: 83, meta: 85 },
        ]
    },
    ves: {
        promedio: 62.1,
        meta: 85,
        ciclos: [
            { name: 'C01', efectivo: 74, total: 100, value: 74, meta: 85 },
            { name: 'C02', efectivo: 72, total: 100, value: 72, meta: 85 },
            { name: 'C03', efectivo: 73, total: 100, value: 73, meta: 85 },
            { name: 'C04', efectivo: 68, total: 100, value: 68, meta: 85 },
            { name: 'C05', efectivo: 67, total: 100, value: 67, meta: 85 },
            { name: 'C06', efectivo: 73, total: 100, value: 73, meta: 85 },
            { name: 'C07', efectivo: 50, total: 100, value: 50, meta: 85 },
            { name: 'C08', efectivo: 73, total: 100, value: 73, meta: 85 },
            { name: 'C09', efectivo: 28, total: 100, value: 28, meta: 85 },
        ]
    },
    'clientes-e': {
        promedio: 60.0,
        meta: 85,
        ciclos: [
            { name: 'C01', efectivo: 33, total: 100, value: 33, meta: 85 },
            { name: 'C02', efectivo: 0, total: 100, value: 0, meta: 85 },
            { name: 'C03', efectivo: 100, total: 100, value: 100, meta: 85 },
            { name: 'C04', efectivo: 67, total: 100, value: 67, meta: 85 },
            { name: 'C08', efectivo: 100, total: 100, value: 100, meta: 85 },
        ]
    }
};

export default function AtipicasInspeccionesPage() {
  const [data, setData] = useState(atipicasData.todas);

  const handleBaseChange = (base: string) => {
    setData(atipicasData[base as keyof typeof atipicasData] || atipicasData.todas);
  };
  
  return (
    <div className="max-w-7xl mx-auto flex flex-col gap-8">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <AlertTriangle className="h-8 w-8 text-[hsl(var(--chart-4))]" />
          <h1 className="font-headline text-3xl font-bold">Inspecciones: Atípicas</h1>
        </div>
        <BaseSelector onBaseChange={handleBaseChange} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card className="transition-colors hover:bg-primary/10 border shadow-sm">
            <CardHeader className="p-4">
                <CardTitle className="text-xl">Rendimiento por Ciclo (%)</CardTitle>
            </CardHeader>
            <CardContent className="h-80 p-0 px-2 pb-4">
            <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data.ciclos}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="name" />
                  <YAxis domain={[0, 110]} unit="%"/>
                  <Tooltip
                      contentStyle={{
                      background: "hsl(var(--card))",
                      borderColor: "hsl(var(--border))",
                      borderRadius: "8px",
                      }}
                      formatter={(value: number) => `${value.toFixed(1)}%`}
                  />
                  <Legend />
                  <Bar 
                    dataKey="value" 
                    name="Rendimiento" 
                    fill="hsl(var(--chart-4))" 
                    radius={[4, 4, 0, 0]}
                  />
                  <ReferenceLine y={85} label="Meta" stroke="hsl(var(--destructive))" strokeDasharray="3 3" />
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
                    Análisis del indicador de <span className="font-semibold text-foreground">Inspecciones Atípicas</span> para el periodo actual.
                </p>
                <div className="grid grid-cols-2 gap-6">
                    <div className="border p-6 rounded-xl text-center bg-card shadow-sm">
                        <p className="text-sm font-medium text-muted-foreground mb-1 uppercase tracking-wider">Promedio del periodo</p>
                        <p className="text-4xl font-bold text-[hsl(var(--chart-4))]">{data.promedio}%</p>
                    </div>
                     <div className="border p-6 rounded-xl text-center bg-card shadow-sm">
                        <p className="text-sm font-medium text-muted-foreground mb-1 uppercase tracking-wider">Meta establecida</p>
                        <p className="text-4xl font-bold">{data.meta}%</p>
                    </div>
                </div>
                <div className="mt-2">
                    <h4 className="font-semibold text-lg mb-2">Observaciones</h4>
                    <p className="text-base text-muted-foreground leading-relaxed">
                        El gráfico muestra el nivel de cumplimiento frente a la meta del 85%. Los ciclos que no alcanzan el objetivo requieren una revisión detallada de las causas de no efectividad.
                    </p>
                </div>
            </CardContent>
        </Card>
      </div>

      <Card className="transition-colors hover:bg-primary/10 border shadow-sm">
        <CardHeader>
            <CardTitle className="text-xl">Detalle de Rendimiento por Ciclo</CardTitle>
            <p className="text-base text-muted-foreground">
            Desglose porcentual y numérico del rendimiento de inspecciones atípicas por cada ciclo operativo.
            </p>
        </CardHeader>
        <CardContent>
            <div className="max-h-96 overflow-y-auto rounded-md border">
            <Table className="text-base">
                <TableHeader className="sticky top-0 bg-secondary/50 backdrop-blur-sm">
                <TableRow>
                    <TableHead className="w-[150px] font-bold">Ciclo</TableHead>
                    <TableHead className="font-bold">Efectivo</TableHead>
                    <TableHead className="font-bold">Total</TableHead>
                    <TableHead className="font-bold">Rendimiento (%)</TableHead>
                    <TableHead className="text-right font-bold">Meta (%)</TableHead>
                </TableRow>
                </TableHeader>
                <TableBody>
                {data.ciclos.map((item) => (
                    <TableRow key={item.name}>
                    <TableCell className="font-semibold">{item.name}</TableCell>
                    <TableCell>{item.efectivo.toLocaleString()}</TableCell>
                    <TableCell>{item.total.toLocaleString()}</TableCell>
                    <TableCell className={item.value < item.meta ? "text-destructive font-bold" : "text-foreground"}>
                        {item.value.toFixed(1)}%
                    </TableCell>
                    <TableCell className="text-right font-medium">{item.meta}%</TableCell>
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
