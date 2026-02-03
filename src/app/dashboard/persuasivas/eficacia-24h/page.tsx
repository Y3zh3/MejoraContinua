
"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, ReferenceLine } from 'recharts';
import { Clock4 } from "lucide-react";
import { BaseSelector } from '@/components/base-selector';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const eficaciaData = {
    todas: {
        promedio: 59.8,
        meta: 70,
        ciclos: [
            { name: 'C01', value: 63.7, meta: 70 },
            { name: 'C02', value: 60.1, meta: 70 },
            { name: 'C03', value: 64.1, meta: 70 },
            { name: 'C04', value: 52.7, meta: 70 },
        ]
    },
    comas: {
        promedio: 59.5,
        meta: 70,
        ciclos: [
            { name: 'C01', value: 60, meta: 70 },
            { name: 'C02', value: 45, meta: 70 },
            { name: 'C03', value: 57, meta: 70 },
            { name: 'C04', value: 76, meta: 70 },
        ]
    },
    callao: {
        promedio: 61.8,
        meta: 70,
        ciclos: [
            { name: 'C01', value: 55, meta: 70 },
            { name: 'C02', value: 60, meta: 70 },
            { name: 'C03', value: 67, meta: 70 },
            { name: 'C04', value: 65, meta: 70 },
        ]
    },
    ate: {
        promedio: 46.0,
        meta: 70,
        ciclos: [
            { name: 'C01', value: 57, meta: 70 },
            { name: 'C02', value: 45, meta: 70 },
            { name: 'C03', value: 57, meta: 70 },
            { name: 'C04', value: 25, meta: 70 },
        ]
    },
    brena: {
        promedio: 67.3,
        meta: 70,
        ciclos: [
            { name: 'C01', value: 68, meta: 70 },
            { name: 'C02', value: 72, meta: 70 },
            { name: 'C03', value: 73, meta: 70 },
            { name: 'C04', value: 56, meta: 70 },
        ]
    },
    sjl: {
        promedio: 68.3,
        meta: 70,
        ciclos: [
            { name: 'C01', value: 68, meta: 70 },
            { name: 'C02', value: 73, meta: 70 },
            { name: 'C03', value: 70, meta: 70 },
            { name: 'C04', value: 62, meta: 70 },
        ]
    },
    surquillo: {
        promedio: 62.5,
        meta: 70,
        ciclos: [
            { name: 'C01', value: 68, meta: 70 },
            { name: 'C02', value: 68, meta: 70 },
            { name: 'C03', value: 62, meta: 70 },
            { name: 'C04', value: 52, meta: 70 },
        ]
    },
    ves: {
        promedio: 55.5,
        meta: 70,
        ciclos: [
            { name: 'C01', value: 70, meta: 70 },
            { name: 'C02', value: 58, meta: 70 },
            { name: 'C03', value: 61, meta: 70 },
            { name: 'C04', value: 33, meta: 70 },
        ]
    },
    'clientes-e': {
        promedio: 0,
        meta: 70,
        ciclos: [
            { name: 'C01', value: 0, meta: 70 },
            { name: 'C02', value: 0, meta: 70 },
            { name: 'C03', value: 0, meta: 70 },
            { name: 'C04', value: 0, meta: 70 },
        ]
    }
};

export default function Eficacia24hPersuasivasPage() {
  const [data, setData] = useState(eficaciaData.todas);

  const handleBaseChange = (base: string) => {
    setData(eficaciaData[base as keyof typeof eficaciaData] || eficaciaData.todas);
  };
  
  return (
    <div className="max-w-7xl mx-auto flex flex-col gap-8">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
            <Clock4 className="h-8 w-8 text-[hsl(var(--chart-2))]" />
            <h1 className="font-headline text-3xl font-bold">Persuasivas: Eficacia 24H</h1>
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
                    name="Eficacia" 
                    fill="hsl(var(--chart-2))" 
                    radius={[4, 4, 0, 0]}
                  />
                  <ReferenceLine y={70} label="Meta" stroke="hsl(var(--destructive))" strokeDasharray="3 3" />
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
                    Análisis de la <span className="font-semibold text-foreground">Eficacia 24H</span> para las acciones persuasivas del periodo actual.
                </p>
                <div className="grid grid-cols-2 gap-6">
                    <div className="border p-6 rounded-xl text-center bg-card shadow-sm">
                        <p className="text-sm font-medium text-muted-foreground mb-1 uppercase tracking-wider">Promedio del periodo</p>
                        <p className="text-4xl font-bold text-[hsl(var(--chart-2))]">{data.promedio}%</p>
                    </div>
                     <div className="border p-6 rounded-xl text-center bg-card shadow-sm">
                        <p className="text-sm font-medium text-muted-foreground mb-1 uppercase tracking-wider">Meta establecida</p>
                        <p className="text-4xl font-bold">{data.meta}%</p>
                    </div>
                </div>
                <div className="mt-2">
                    <h4 className="font-semibold text-lg mb-2">Observaciones</h4>
                    <p className="text-base text-muted-foreground leading-relaxed">
                        El gráfico muestra el nivel de eficacia en las primeras 24 horas frente a la meta del 70%. Los ciclos que no alcanzan el objetivo requieren una revisión de la estrategia de contacto inicial.
                    </p>
                </div>
            </CardContent>
        </Card>
      </div>

        <Card className="transition-colors hover:bg-primary/10 border shadow-sm">
        <CardHeader>
            <CardTitle className="text-xl">Detalle de Rendimiento por Ciclo</CardTitle>
            <p className="text-base text-muted-foreground">
            Desglose porcentual de la eficacia 24H por cada ciclo operativo.
            </p>
        </CardHeader>
        <CardContent>
            <div className="max-h-96 overflow-y-auto rounded-md border">
            <Table className="text-base">
                <TableHeader className="sticky top-0 bg-secondary/50 backdrop-blur-sm">
                <TableRow>
                    <TableHead className="w-[120px] font-bold">Ciclo</TableHead>
                    <TableHead className="font-bold">Eficacia (%)</TableHead>
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
