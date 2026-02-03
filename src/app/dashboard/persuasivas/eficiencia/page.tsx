
"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, ReferenceLine } from 'recharts';
import { Gauge } from "lucide-react";
import { BaseSelector } from "@/components/base-selector";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const eficienciaData = {
    todas: {
        promedio: 91.5,
        meta: 98,
        ciclos: [
            { name: 'C01', value: 90.7, meta: 98 },
            { name: 'C02', value: 92.0, meta: 98 },
            { name: 'C03', value: 94.0, meta: 98 },
            { name: 'C04', value: 87.7, meta: 98 },
        ]
    },
    comas: {
        promedio: 89.7,
        meta: 98,
        ciclos: [
            { name: 'C01', value: 81, meta: 98 },
            { name: 'C02', value: 92, meta: 98 },
            { name: 'C03', value: 96, meta: 98 },
        ]
    },
    callao: {
        promedio: 89.0,
        meta: 98,
        ciclos: [
            { name: 'C01', value: 83, meta: 98 },
            { name: 'C02', value: 90, meta: 98 },
            { name: 'C03', value: 94, meta: 98 },
        ]
    },
    ate: {
        promedio: 92.8,
        meta: 98,
        ciclos: [
            { name: 'C01', value: 92, meta: 98 },
            { name: 'C02', value: 92, meta: 98 },
            { name: 'C03', value: 93, meta: 98 },
            { name: 'C04', value: 94, meta: 98 },
        ]
    },
    brena: {
        promedio: 94.0,
        meta: 98,
        ciclos: [
            { name: 'C01', value: 97, meta: 98 },
            { name: 'C02', value: 91, meta: 98 },
            { name: 'C03', value: 95, meta: 98 },
            { name: 'C04', value: 93, meta: 98 },
        ]
    },
    sjl: {
        promedio: 97.8,
        meta: 98,
        ciclos: [
            { name: 'C01', value: 99, meta: 98 },
            { name: 'C02', value: 100, meta: 98 },
            { name: 'C03', value: 99, meta: 98 },
            { name: 'C04', value: 93, meta: 98 },
        ]
    },
    surquillo: {
        promedio: 87.0,
        meta: 98,
        ciclos: [
            { name: 'C01', value: 90, meta: 98 },
            { name: 'C02', value: 89, meta: 98 },
            { name: 'C03', value: 88, meta: 98 },
            { name: 'C04', value: 81, meta: 98 },
        ]
    },
    ves: {
        promedio: 91.3,
        meta: 98,
        ciclos: [
            { name: 'C01', value: 93, meta: 98 },
            { name: 'C02', value: 90, meta: 98 },
            { name: 'C03', value: 93, meta: 98 },
            { name: 'C04', value: 89, meta: 98 },
        ]
    },
    'clientes-e': {
        promedio: 86.0,
        meta: 98,
        ciclos: [
            { name: 'C02', value: 92, meta: 98 },
            { name: 'C04', value: 80, meta: 98 },
        ]
    }
};

export default function EficienciaPersuasivasPage() {
  const [data, setData] = useState(eficienciaData.todas);

  const handleBaseChange = (base: string) => {
    setData(eficienciaData[base as keyof typeof eficienciaData] || eficienciaData.todas);
  };
  
  return (
    <div className="max-w-7xl mx-auto flex flex-col gap-8">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Gauge className="h-8 w-8 text-[hsl(var(--chart-1))]" />
          <h1 className="font-headline text-3xl font-bold">Persuasivas: Eficiencia</h1>
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
                      formatter={(value: number) => `${value}%`}
                  />
                  <Legend />
                  <Bar 
                    dataKey="value" 
                    name="Eficiencia" 
                    fill="hsl(var(--chart-1))" 
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
                    Análisis del cumplimiento de <span className="font-semibold text-foreground">Eficiencia</span> en acciones persuasivas para el periodo actual.
                </p>
                <div className="grid grid-cols-2 gap-6">
                    <div className="border p-6 rounded-xl text-center bg-card shadow-sm">
                        <p className="text-sm font-medium text-muted-foreground mb-1 uppercase tracking-wider">Promedio del periodo</p>
                        <p className="text-4xl font-bold text-[hsl(var(--chart-1))]">{data.promedio}%</p>
                    </div>
                     <div className="border p-6 rounded-xl text-center bg-card shadow-sm">
                        <p className="text-sm font-medium text-muted-foreground mb-1 uppercase tracking-wider">Meta establecida</p>
                        <p className="text-4xl font-bold">{data.meta}%</p>
                    </div>
                </div>
                <div className="mt-2">
                    <h4 className="font-semibold text-lg mb-2">Observaciones</h4>
                    <p className="text-base text-muted-foreground leading-relaxed">
                        El gráfico muestra el rendimiento ciclo a ciclo frente a la meta institucional del 98%. Los ciclos por debajo de este umbral requieren una revisión de las estrategias de persuasión aplicadas.
                    </p>
                </div>
            </CardContent>
        </Card>
      </div>

       <Card className="transition-colors hover:bg-primary/10 border shadow-sm">
        <CardHeader>
          <CardTitle className="text-xl">Detalle de Eficiencia por Ciclo</CardTitle>
          <p className="text-base text-muted-foreground">
            Desglose porcentual de la eficiencia alcanzada en cada ciclo operativo.
          </p>
        </CardHeader>
        <CardContent>
          <div className="max-h-96 overflow-y-auto rounded-md border">
            <Table className="text-base">
              <TableHeader className="sticky top-0 bg-secondary/50 backdrop-blur-sm">
                <TableRow>
                  <TableHead className="w-[120px] font-bold">Ciclo</TableHead>
                  <TableHead className="font-bold">Eficiencia (%)</TableHead>
                  <TableHead className="text-right font-bold">Meta (%)</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.ciclos.map((item) => (
                  <TableRow key={item.name}>
                    <TableCell className="font-semibold">{item.name}</TableCell>
                    <TableCell className={item.value < item.meta ? "text-destructive font-bold" : "text-foreground"}>
                        {item.value}%
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
