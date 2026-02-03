
"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, ReferenceLine } from 'recharts';
import { Clock9 } from "lucide-react";
import { BaseSelector } from "@/components/base-selector";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const eficacia48Data = {
    todas: {
        promedio: 65.7,
        meta: 70,
        ciclos: [
            { name: 'C01', value: 73.8, meta: 70 },
            { name: 'C02:24', value: 71.7, meta: 70 },
            { name: 'C03', value: 72.8, meta: 70 },
            { name: 'C04', value: 44.5, meta: 70 },
        ]
    },
    comas: {
        promedio: 67.7,
        meta: 70,
        ciclos: [
            { name: 'C01', value: 68, meta: 70 },
            { name: 'C02', value: 65, meta: 70 },
            { name: 'C03', value: 70, meta: 70 },
        ]
    },
    callao: {
        promedio: 67.0,
        meta: 70,
        ciclos: [
            { name: 'C01', value: 63, meta: 70 },
            { name: 'C02', value: 67, meta: 70 },
            { name: 'C03', value: 71, meta: 70 },
        ]
    },
    ate: {
        promedio: 66.0,
        meta: 70,
        ciclos: [
            { name: 'C01', value: 71, meta: 70 },
            { name: 'C02', value: 64, meta: 70 },
            { name: 'C03', value: 69, meta: 70 },
            { name: 'C04', value: 60, meta: 70 },
        ]
    },
    brena: {
        promedio: 76.3,
        meta: 70,
        ciclos: [
            { name: 'C01', value: 75, meta: 70 },
            { name: 'C02', value: 78, meta: 70 },
            { name: 'C03', value: 79, meta: 70 },
            { name: 'C04', value: 73, meta: 70 },
        ]
    },
    sjl: {
        promedio: 79.3,
        meta: 70,
        ciclos: [
            { name: 'C01', value: 80, meta: 70 },
            { name: 'C02', value: 82, meta: 70 },
            { name: 'C03', value: 76, meta: 70 },
            { name: 'C04', value: 79, meta: 70 },
        ]
    },
    surquillo: {
        promedio: 73.5,
        meta: 70,
        ciclos: [
            { name: 'C01', value: 80, meta: 70 },
            { name: 'C02', value: 76, meta: 70 },
            { name: 'C03', value: 68, meta: 70 },
            { name: 'C04', value: 70, meta: 70 },
        ]
    },
    ves: {
        promedio: 66.8,
        meta: 70,
        ciclos: [
            { name: 'C01', value: 78, meta: 70 },
            { name: 'C02', value: 70, meta: 70 },
            { name: 'C03', value: 67, meta: 70 },
            { name: 'C04', value: 52, meta: 70 },
        ]
    },
    'clientes-e': {
        promedio: 4.5,
        meta: 70,
        ciclos: [
            { name: 'C02', value: 9, meta: 70 },
            { name: 'C04', value: 0, meta: 70 },
        ]
    }
};

export default function Eficacia48hPersuasivasPage() {
  const [data, setData] = useState(eficacia48Data.todas);

  const handleBaseChange = (base: string) => {
    setData(eficacia48Data[base as keyof typeof eficacia48Data] || eficacia48Data.todas);
  };
  
  return (
    <div className="max-w-7xl mx-auto flex flex-col gap-8">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Clock9 className="h-8 w-8 text-[hsl(var(--chart-1))]" />
          <h1 className="font-headline text-3xl font-bold">Persuasivas: Eficacia 48H</h1>
        </div>
        <BaseSelector onBaseChange={handleBaseChange} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card className="transition-colors hover:bg-primary/10 border shadow-sm">
            <CardHeader className="p-4">
                <CardTitle className="text-xl">Tendencia de Eficacia (%)</CardTitle>
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
                    name="Eficacia" 
                    stroke="hsl(var(--chart-1))" 
                    strokeWidth={3} 
                    dot={{ r: 6 }}
                    activeDot={{ r: 8 }}
                />
                <ReferenceLine y={70} label="Meta" stroke="hsl(var(--destructive))" strokeDasharray="3 3" />
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
                    Análisis de la <span className="font-semibold text-foreground">Eficacia 48H</span> para las acciones persuasivas del periodo actual.
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
                        El gráfico muestra el rendimiento acumulado a las 48 horas frente a la meta del 70%. Este indicador es vital para medir la capacidad de respuesta y recuperación de ingresos.
                    </p>
                </div>
            </CardContent>
        </Card>
      </div>

      <Card className="transition-colors hover:bg-primary/10 border shadow-sm">
        <CardHeader>
          <CardTitle className="text-xl">Detalle de Rendimiento por Ciclo</CardTitle>
          <p className="text-base text-muted-foreground">
            Desglose porcentual de la eficacia 48H por cada ciclo operativo.
          </p>
        </CardHeader>
        <CardContent>
          <div className="max-h-96 overflow-y-auto rounded-md border">
            <Table className="text-base">
              <TableHeader className="sticky top-0 bg-secondary/50 backdrop-blur-sm">
                <TableRow>
                  <TableHead className="w-[150px] font-bold">Ciclo</TableHead>
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
