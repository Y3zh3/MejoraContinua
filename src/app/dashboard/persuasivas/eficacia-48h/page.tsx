
"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, ReferenceLine } from 'recharts';
import { Clock9 } from "lucide-react";
import { BaseSelector } from "@/components/base-selector";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const eficacia48Data = {
    todas: {
        promedio: 69.5,
        meta: 70,
        ciclos: [
            { name: 'C1', atendidos: 5214, total: 7464, value: 69.9, meta: 70 },
            { name: 'C2', atendidos: 3774, total: 5732, value: 65.8, meta: 70 },
            { name: 'C3', atendidos: 4325, total: 6129, value: 70.6, meta: 70 },
            { name: 'C4', atendidos: 2746, total: 3794, value: 72.4, meta: 70 },
        ]
    },
    comas: {
        promedio: 67.9,
        meta: 70,
        ciclos: [
            { name: 'C1', atendidos: 1575, total: 2312, value: 68.1, meta: 70 },
            { name: 'C2', atendidos: 1309, total: 1999, value: 65.5, meta: 70 },
            { name: 'C3', atendidos: 1197, total: 1703, value: 70.3, meta: 70 },
        ]
    },
    callao: {
        promedio: 66.8,
        meta: 70,
        ciclos: [
            { name: 'C1', atendidos: 301, total: 480, value: 62.7, meta: 70 },
            { name: 'C2', atendidos: 245, total: 364, value: 67.3, meta: 70 },
            { name: 'C3', atendidos: 334, total: 473, value: 70.6, meta: 70 },
        ]
    },
    ate: {
        promedio: 66.0,
        meta: 70,
        ciclos: [
            { name: 'C1', atendidos: 711, total: 1008, value: 70.5, meta: 70 },
            { name: 'C2', atendidos: 726, total: 1132, value: 64.1, meta: 70 },
            { name: 'C3', atendidos: 680, total: 992, value: 68.5, meta: 70 },
            { name: 'C4', atendidos: 538, total: 890, value: 60.4, meta: 70 },
        ]
    },
    brena: {
        promedio: 75.9,
        meta: 70,
        ciclos: [
            { name: 'C1', atendidos: 580, total: 778, value: 74.6, meta: 70 },
            { name: 'C2', atendidos: 415, total: 529, value: 78.4, meta: 70 },
            { name: 'C3', atendidos: 432, total: 550, value: 78.5, meta: 70 },
            { name: 'C4', atendidos: 470, total: 642, value: 73.2, meta: 70 },
        ]
    },
    sjl: {
        promedio: 79.1,
        meta: 70,
        ciclos: [
            { name: 'C1', atendidos: 544, total: 682, value: 79.8, meta: 70 },
            { name: 'C2', atendidos: 386, total: 472, value: 81.8, meta: 70 },
            { name: 'C3', atendidos: 481, total: 629, value: 76.5, meta: 70 },
            { name: 'C4', atendidos: 356, total: 451, value: 78.9, meta: 70 },
        ]
    },
    surquillo: {
        promedio: 73.7,
        meta: 70,
        ciclos: [
            { name: 'C1', atendidos: 391, total: 490, value: 79.8, meta: 70 },
            { name: 'C2', atendidos: 306, total: 402, value: 76.1, meta: 70 },
            { name: 'C3', atendidos: 260, total: 383, value: 67.9, meta: 70 },
            { name: 'C4', atendidos: 328, total: 469, value: 69.9, meta: 70 },
        ]
    },
    ves: {
        promedio: 66.2,
        meta: 70,
        ciclos: [
            { name: 'C1', atendidos: 1011, total: 1302, value: 77.6, meta: 70 },
            { name: 'C2', atendidos: 788, total: 1125, value: 70.0, meta: 70 },
            { name: 'C3', atendidos: 936, total: 1392, value: 67.2, meta: 70 },
            { name: 'C4', atendidos: 758, total: 1456, value: 52.1, meta: 70 },
        ]
    },
    'clientes-e': {
        promedio: 7.1,
        meta: 70,
        ciclos: [
            { name: 'C2', atendidos: 1, total: 11, value: 9.1, meta: 70 },
            { name: 'C4', atendidos: 0, total: 3, value: 0.0, meta: 70 },
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
            <CardContent className="h-60 p-0 px-2 pb-4">
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
            <CardContent className="flex flex-col gap-6 pt-2 h-60 overflow-y-auto">
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
            Desglose porcentual y numérico de la eficacia alcanzada hasta las 48h por ciclo.
          </p>
        </CardHeader>
        <CardContent>
          <div className="max-h-96 overflow-y-auto rounded-md border">
            <Table className="text-base">
              <TableHeader className="sticky top-0 bg-secondary/50 backdrop-blur-sm">
                <TableRow>
                  <TableHead className="w-[150px] font-bold">Ciclo</TableHead>
                  <TableHead className="font-bold">Con Reap hasta 48</TableHead>
                  <TableHead className="font-bold">Total</TableHead>
                  <TableHead className="font-bold">Eficacia (%)</TableHead>
                  <TableHead className="text-right font-bold">Meta (%)</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.ciclos.map((item) => (
                  <TableRow key={item.name}>
                    <TableCell className="font-semibold">{item.name}</TableCell>
                    <TableCell>{item.atendidos.toLocaleString()}</TableCell>
                    <TableCell>{item.total.toLocaleString()}</TableCell>
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
