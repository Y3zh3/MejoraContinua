
"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, ReferenceLine } from 'recharts';
import { CircleOff } from "lucide-react";
import { BaseSelector } from "@/components/base-selector";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const cierresData = {
    todas: {
        promedio: 38.1,
        meta: 15,
        ciclos: [
            { name: 'C01', value: 47.0, meta: 15 },
            { name: 'C02', value: 30.4, meta: 15 },
            { name: 'C03', value: 37.3, meta: 15 },
            { name: 'C04', value: 35.6, meta: 15 },
            { name: 'C05', value: 40.1, meta: 15 },
        ]
    },
    comas: {
        promedio: 100,
        meta: 15,
        ciclos: [
            { name: 'C01', value: 100, meta: 15 },
            { name: 'C02', value: 100, meta: 15 },
            { name: 'C03', value: 100, meta: 15 },
            { name: 'C04', value: 100, meta: 15 },
            { name: 'C05', value: 100, meta: 15 },
        ]
    },
    callao: {
        promedio: 18.2,
        meta: 15,
        ciclos: [
            { name: 'C01', value: 29, meta: 15 },
            { name: 'C02', value: 13, meta: 15 },
            { name: 'C03', value: 15, meta: 15 },
            { name: 'C04', value: 12, meta: 15 },
            { name: 'C05', value: 22, meta: 15 },
        ]
    },
    ate: {
        promedio: 52.6,
        meta: 15,
        ciclos: [
            { name: 'C01', value: 56, meta: 15 },
            { name: 'C02', value: 23, meta: 15 },
            { name: 'C03', value: 72, meta: 15 },
            { name: 'C04', value: 50, meta: 15 },
            { name: 'C05', value: 62, meta: 15 },
        ]
    },
    brena: {
        promedio: 11.2,
        meta: 15,
        ciclos: [
            { name: 'C01', value: 32, meta: 15 },
            { name: 'C02', value: 5, meta: 15 },
            { name: 'C03', value: 4, meta: 15 },
            { name: 'C04', value: 6, meta: 15 },
            { name: 'C05', value: 9, meta: 15 },
        ]
    },
    sjl: {
        promedio: 12.4,
        meta: 15,
        ciclos: [
            { name: 'C01', value: 9, meta: 15 },
            { name: 'C02', value: 10, meta: 15 },
            { name: 'C03', value: 11, meta: 15 },
            { name: 'C04', value: 14, meta: 15 },
            { name: 'C05', value: 18, meta: 15 },
        ]
    },
    surquillo: {
        promedio: 21.0,
        meta: 15,
        ciclos: [
            { name: 'C01', value: 43, meta: 15 },
            { name: 'C02', value: 21, meta: 15 },
            { name: 'C03', value: 12, meta: 15 },
            { name: 'C04', value: 14, meta: 15 },
            { name: 'C05', value: 15, meta: 15 },
        ]
    },
    ves: {
        promedio: 51.2,
        meta: 15,
        ciclos: [
            { name: 'C01', value: 60, meta: 15 },
            { name: 'C02', value: 41, meta: 15 },
            { name: 'C03', value: 47, meta: 15 },
            { name: 'C04', value: 53, meta: 15 },
            { name: 'C05', value: 55, meta: 15 },
        ]
    },
    'clientes-e': {
        promedio: 100,
        meta: 15,
        ciclos: [
            { name: 'C01', value: 100, meta: 15 },
            { name: 'C02', value: 100, meta: 15 },
            { name: 'C03', value: 100, meta: 15 },
            { name: 'C04', value: 100, meta: 15 },
            { name: 'C05', value: 100, meta: 15 },
        ]
    }
};

export default function CierresComunicadosPage() {
  const [data, setData] = useState(cierresData.todas);

  const handleBaseChange = (base: string) => {
    setData(cierresData[base as keyof typeof cierresData] || cierresData.todas);
  };

  return (
    <div className="max-w-7xl mx-auto flex flex-col gap-8">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <CircleOff className="h-8 w-8 text-[hsl(var(--chart-3))]" />
          <h1 className="font-headline text-3xl font-bold">Comunicados: Cierres</h1>
        </div>
        <BaseSelector onBaseChange={handleBaseChange} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card className="transition-colors hover:bg-primary/10 border shadow-sm">
            <CardHeader className="p-4">
                <CardTitle className="text-xl">Efectividad de Cierres (%)</CardTitle>
            </CardHeader>
            <CardContent className="h-80 p-0 px-2 pb-4">
            <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data.ciclos}>
                  <defs>
                      <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="hsl(var(--chart-3))" stopOpacity={0.8}/>
                          <stop offset="95%" stopColor="hsl(var(--chart-3))" stopOpacity={0}/>
                      </linearGradient>
                  </defs>
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
                  <Area 
                    type="monotone" 
                    dataKey="value" 
                    name="Efectividad" 
                    stroke="hsl(var(--chart-3))" 
                    fillOpacity={1} 
                    fill="url(#colorValue)" 
                    strokeWidth={3}
                  />
                  <ReferenceLine y={15} label="Meta" stroke="hsl(var(--destructive))" strokeDasharray="3 3" />
                </AreaChart>
            </ResponsiveContainer>
            </CardContent>
        </Card>

        <Card className="transition-colors hover:bg-primary/10 border shadow-sm">
            <CardHeader>
            <CardTitle className="text-xl">Resumen del Indicador</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-6 pt-2">
                <p className="text-lg text-muted-foreground leading-relaxed">
                    Análisis de la <span className="font-semibold text-foreground">Efectividad de Cierres</span> para el periodo actual.
                </p>
                <div className="grid grid-cols-2 gap-6">
                    <div className="border p-6 rounded-xl text-center bg-card shadow-sm">
                        <p className="text-sm font-medium text-muted-foreground mb-1 uppercase tracking-wider">Promedio del periodo</p>
                        <p className="text-4xl font-bold text-[hsl(var(--chart-3))]">{data.promedio}%</p>
                    </div>
                     <div className="border p-6 rounded-xl text-center bg-card shadow-sm">
                        <p className="text-sm font-medium text-muted-foreground mb-1 uppercase tracking-wider">Meta establecida</p>
                        <p className="text-4xl font-bold">{data.meta}%</p>
                    </div>
                </div>
                <div className="mt-2">
                    <h4 className="font-semibold text-lg mb-2">Observaciones</h4>
                    <p className="text-base text-muted-foreground leading-relaxed">
                        El gráfico muestra la efectividad ciclo a ciclo comparada con la meta del 15%. La mayoría de las bases superan ampliamente el objetivo mínimo establecido.
                    </p>
                </div>
            </CardContent>
        </Card>
      </div>

      <Card className="transition-colors hover:bg-primary/10 border shadow-sm">
        <CardHeader>
            <CardTitle className="text-xl">Detalle por Ciclo de Efectividad de Cierres</CardTitle>
            <p className="text-base text-muted-foreground">
            Desglose porcentual de la efectividad de cierres por cada ciclo operativo.
            </p>
        </CardHeader>
        <CardContent>
            <div className="max-h-96 overflow-y-auto rounded-md border">
            <Table className="text-base">
                <TableHeader className="sticky top-0 bg-secondary/50 backdrop-blur-sm">
                <TableRow>
                    <TableHead className="w-[150px] font-bold">Ciclo</TableHead>
                    <TableHead className="font-bold">Efectividad (%)</TableHead>
                    <TableHead className="text-right font-bold">Meta (%)</TableHead>
                </TableRow>
                </TableHeader>
                <TableBody>
                {data.ciclos.map((item) => (
                    <TableRow key={item.name}>
                    <TableCell className="font-semibold">{item.name}</TableCell>
                    <TableCell className={item.value < item.meta ? "text-destructive font-bold" : "text-foreground font-medium"}>
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
