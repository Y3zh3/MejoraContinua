
"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, ReferenceLine } from 'recharts';
import { AlertTriangle } from "lucide-react";
import { BaseSelector } from "@/components/base-selector";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const atipicasData = {
    todas: {
        promedio: 91.2,
        meta: 98,
        ciclos: [
            { name: 'C01', efectivo: 7051, total: 7981, value: 88.3, meta: 98 },
            { name: 'C02', efectivo: 6062, total: 6617, value: 91.6, meta: 98 },
            { name: 'C03', efectivo: 6136, total: 6454, value: 95.1, meta: 98 },
            { name: 'C04', efectivo: 3016, total: 3360, value: 89.8, meta: 98 },
        ]
    },
    comas: {
        promedio: 88.2,
        meta: 98,
        ciclos: [
            { name: 'C01', efectivo: 2316, total: 2873, value: 80.6, meta: 98 },
            { name: 'C02', efectivo: 1999, total: 2173, value: 92.0, meta: 98 },
            { name: 'C03', efectivo: 1705, total: 1775, value: 96.1, meta: 98 },
        ]
    },
    callao: {
        promedio: 88.7,
        meta: 98,
        ciclos: [
            { name: 'C01', efectivo: 480, total: 579, value: 82.9, meta: 98 },
            { name: 'C02', efectivo: 375, total: 415, value: 90.4, meta: 98 },
            { name: 'C03', efectivo: 475, total: 506, value: 93.9, meta: 98 },
        ]
    },
    ate: {
        promedio: 92.6,
        meta: 98,
        ciclos: [
            { name: 'C01', efectivo: 1005, total: 1095, value: 91.8, meta: 98 },
            { name: 'C02', efectivo: 1134, total: 1232, value: 92.0, meta: 98 },
            { name: 'C03', efectivo: 985, total: 1058, value: 93.1, meta: 98 },
            { name: 'C04', efectivo: 544, total: 578, value: 94.1, meta: 98 },
        ]
    },
    brena: {
        promedio: 94.0,
        meta: 98,
        ciclos: [
            { name: 'C01', efectivo: 777, total: 801, value: 97.0, meta: 98 },
            { name: 'C02', efectivo: 538, total: 592, value: 90.9, meta: 98 },
            { name: 'C03', efectivo: 559, total: 589, value: 94.9, meta: 98 },
            { name: 'C04', efectivo: 640, total: 691, value: 92.6, meta: 98 },
        ]
    },
    sjl: {
        promedio: 97.8,
        meta: 98,
        ciclos: [
            { name: 'C01', efectivo: 682, total: 687, value: 99.3, meta: 98 },
            { name: 'C02', efectivo: 472, total: 474, value: 99.6, meta: 98 },
            { name: 'C03', efectivo: 634, total: 642, value: 98.8, meta: 98 },
            { name: 'C04', efectivo: 451, total: 486, value: 92.8, meta: 98 },
        ]
    },
    surquillo: {
        promedio: 86.9,
        meta: 98,
        ciclos: [
            { name: 'C01', efectivo: 489, total: 543, value: 90.1, meta: 98 },
            { name: 'C02', efectivo: 404, total: 455, value: 88.8, meta: 98 },
            { name: 'C03', efectivo: 385, total: 437, value: 88.1, meta: 98 },
            { name: 'C04', efectivo: 428, total: 529, value: 80.9, meta: 98 },
        ]
    },
    ves: {
        promedio: 91.3,
        meta: 98,
        ciclos: [
            { name: 'C01', efectivo: 1302, total: 1403, value: 92.8, meta: 98 },
            { name: 'C02', efectivo: 1129, total: 1254, value: 90.0, meta: 98 },
            { name: 'C03', efectivo: 1393, total: 1496, value: 93.1, meta: 98 },
            { name: 'C04', efectivo: 949, total: 1072, value: 88.5, meta: 98 },
        ]
    },
    'clientes-e': {
        promedio: 88.2,
        meta: 98,
        ciclos: [
            { name: 'C02', efectivo: 11, total: 12, value: 91.7, meta: 98 },
            { name: 'C04', efectivo: 4, total: 5, value: 80.0, meta: 98 },
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
                  <ReferenceLine y={98} label="Meta" stroke="hsl(var(--destructive))" strokeDasharray="3 3" />
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
                        El gráfico muestra el nivel de cumplimiento frente a la meta del 98%. Los ciclos que no alcanzan el objetivo requieren una revisión detallada de las causas de no efectividad.
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
