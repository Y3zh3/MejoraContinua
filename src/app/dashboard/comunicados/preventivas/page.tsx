
"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, ReferenceLine } from 'recharts';
import { ShieldCheck } from "lucide-react";
import { BaseSelector } from "@/components/base-selector";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const preventivasData = {
    todas: {
        promedio: 73.1,
        meta: 85,
        ciclos: [
            { name: 'C01', value: 70.3, meta: 85 },
            { name: 'C02: ', value: 69.9, meta: 85 },
            { name: 'C03', value: 75.3, meta: 85 },
            { name: 'C04', value: 72.8, meta: 85 },
            { name: 'C05', value: 77.2, meta: 85 },
        ]
    },
    comas: {
        promedio: 0,
        meta: 85,
        ciclos: [
            { name: 'C01', value: 0, meta: 85 },
            { name: 'C02', value: 0, meta: 85 },
            { name: 'C03', value: 0, meta: 85 },
            { name: 'C04', value: 0, meta: 85 },
            { name: 'C05', value: 0, meta: 85 },
        ]
    },
    callao: {
        promedio: 86.2,
        meta: 85,
        ciclos: [
            { name: 'C01', value: 84, meta: 85 },
            { name: 'C02', value: 89, meta: 85 },
            { name: 'C03', value: 88, meta: 85 },
            { name: 'C04', value: 83, meta: 85 },
            { name: 'C05', value: 87, meta: 85 },
        ]
    },
    ate: {
        promedio: 83.2,
        meta: 85,
        ciclos: [
            { name: 'C01', value: 83, meta: 85 },
            { name: 'C02', value: 81, meta: 85 },
            { name: 'C03', value: 85, meta: 85 },
            { name: 'C04', value: 83, meta: 85 },
            { name: 'C05', value: 84, meta: 85 },
        ]
    },
    brena: {
        promedio: 73.0,
        meta: 85,
        ciclos: [
            { name: 'C01', value: 82, meta: 85 },
            { name: 'C02', value: 72, meta: 85 },
            { name: 'C03', value: 71, meta: 85 },
            { name: 'C04', value: 70, meta: 85 },
            { name: 'C05', value: 68, meta: 85 },
        ]
    },
    sjl: {
        promedio: 82.0,
        meta: 85,
        ciclos: [
            { name: 'C01', value: 84, meta: 85 },
            { name: 'C02', value: 84, meta: 85 },
            { name: 'C03', value: 81, meta: 85 },
            { name: 'C04', value: 79, meta: 85 },
            { name: 'C05', value: 82, meta: 85 },
        ]
    },
    surquillo: {
        promedio: 80.6,
        meta: 85,
        ciclos: [
            { name: 'C01', value: 75, meta: 85 },
            { name: 'C02', value: 84, meta: 85 },
            { name: 'C03', value: 80, meta: 85 },
            { name: 'C04', value: 80, meta: 85 },
            { name: 'C05', value: 84, meta: 85 },
        ]
    },
    ves: {
        promedio: 75.6,
        meta: 85,
        ciclos: [
            { name: 'C01', value: 80, meta: 85 },
            { name: 'C02', value: 74, meta: 85 },
            { name: 'C03', value: 72, meta: 85 },
            { name: 'C04', value: 72, meta: 85 },
            { name: 'C05', value: 80, meta: 85 },
        ]
    },
    'clientes-e': {
        promedio: 100,
        meta: 85,
        ciclos: [
            { name: 'C01', value: 100, meta: 85 },
            { name: 'C02', value: 100, meta: 85 },
            { name: 'C03', value: 100, meta: 85 },
            { name: 'C04', value: 100, meta: 85 },
            { name: 'C05', value: 100, meta: 85 },
        ]
    }
};

export default function PreventivasComunicadosPage() {
  const [data, setData] = useState(preventivasData.todas);

  const handleBaseChange = (base: string) => {
    setData(preventivasData[base as keyof typeof preventivasData] || preventivasData.todas);
  };
  
  return (
    <div className="max-w-7xl mx-auto flex flex-col gap-8">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <ShieldCheck className="h-8 w-8 text-[hsl(var(--chart-2))]" />
          <h1 className="font-headline text-3xl font-bold">Comunicados: Preventivas</h1>
        </div>
        <BaseSelector onBaseChange={handleBaseChange} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card className="transition-colors hover:bg-primary/10 border shadow-sm">
            <CardHeader className="p-4">
                <CardTitle className="text-xl">Tendencia de Cumplimiento (%)</CardTitle>
            </CardHeader>
            <CardContent className="h-80 p-0 px-2 pb-4">
            <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data.ciclos}>
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
                  <Line 
                    type="monotone" 
                    dataKey="value" 
                    name="Cumplimiento" 
                    stroke="hsl(var(--chart-2))" 
                    strokeWidth={3}
                    dot={{ r: 6 }}
                    activeDot={{ r: 8 }}
                  />
                  <ReferenceLine y={85} label="Meta" stroke="hsl(var(--destructive))" strokeDasharray="3 3" />
                </LineChart>
            </ResponsiveContainer>
            </CardContent>
        </Card>

        <Card className="transition-colors hover:bg-primary/10 border shadow-sm">
            <CardHeader>
            <CardTitle className="text-xl">Resumen del Indicador</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-6 pt-2">
                <p className="text-lg text-muted-foreground leading-relaxed">
                    Análisis del cumplimiento de <span className="font-semibold text-foreground">Comunicaciones Preventivas</span> para el periodo actual.
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
                        El cumplimiento preventivo es clave para la reducción de reclamos. Los valores por debajo del 85% requieren un análisis de las causas de no entrega.
                    </p>
                </div>
            </CardContent>
        </Card>
      </div>

       <Card className="transition-colors hover:bg-primary/10 border shadow-sm">
        <CardHeader>
          <CardTitle className="text-xl">Detalle Semanal de Cumplimiento</CardTitle>
          <p className="text-base text-muted-foreground">
            Desglose porcentual del cumplimiento de comunicaciones preventivas por ciclo operativo.
          </p>
        </CardHeader>
        <CardContent>
          <div className="max-h-96 overflow-y-auto rounded-md border">
            <Table className="text-base">
              <TableHeader className="sticky top-0 bg-secondary/50 backdrop-blur-sm">
                <TableRow>
                  <TableHead className="w-[150px] font-bold">Ciclo</TableHead>
                  <TableHead className="font-bold">Cumplimiento (%)</TableHead>
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
