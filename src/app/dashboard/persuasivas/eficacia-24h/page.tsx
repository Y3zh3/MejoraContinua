
"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, ReferenceLine } from 'recharts';
import { Clock4 } from "lucide-react";
import { BaseSelector } from '@/components/base-selector';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const eficaciaData = {
    todas: {
        promedio: 57.6,
        meta: 70,
        ciclos: [
            { name: 'C01', atendidos: 4992, total: 7254, value: 68.8, meta: 70 },
            { name: 'C02', atendidos: 3249, total: 6183, value: 52.5, meta: 70 },
            { name: 'C03', atendidos: 3841, total: 5832, value: 65.9, meta: 70 },
            { name: 'C04', atendidos: 3529, total: 8185, value: 43.1, meta: 70 },
        ]
    },
    comas: {
        promedio: 59.4,
        meta: 70,
        ciclos: [
            { name: 'C01', atendidos: 1382, total: 2312, value: 59.8, meta: 70 },
            { name: 'C02', atendidos: 906, total: 1999, value: 45.3, meta: 70 },
            { name: 'C03', atendidos: 965, total: 1703, value: 56.7, meta: 70 },
            { name: 'C04', atendidos: 1540, total: 2029, value: 75.9, meta: 70 },
        ]
    },
    callao: {
        promedio: 61.7,
        meta: 70,
        ciclos: [
            { name: 'C01', atendidos: 265, total: 480, value: 55.2, meta: 70 },
            { name: 'C02', atendidos: 217, total: 364, value: 59.6, meta: 70 },
            { name: 'C03', atendidos: 315, total: 473, value: 66.6, meta: 70 },
            { name: 'C04', atendidos: 372, total: 570, value: 65.3, meta: 70 },
        ]
    },
    ate: {
        promedio: 45.9,
        meta: 70,
        ciclos: [
            { name: 'C01', atendidos: 579, total: 1008, value: 57.4, meta: 70 },
            { name: 'C02', atendidos: 514, total: 1132, value: 45.4, meta: 70 },
            { name: 'C03', atendidos: 563, total: 992, value: 56.8, meta: 70 },
            { name: 'C04', atendidos: 320, total: 1305, value: 24.5, meta: 70 },
        ]
    },
    brena: {
        promedio: 67.0,
        meta: 70,
        ciclos: [
            { name: 'C01', atendidos: 527, total: 778, value: 67.7, meta: 70 },
            { name: 'C02', atendidos: 379, total: 529, value: 71.6, meta: 70 },
            { name: 'C03', atendidos: 399, total: 550, value: 72.5, meta: 70 },
            { name: 'C04', atendidos: 387, total: 689, value: 56.2, meta: 70 },
        ]
    },
    sjl: {
        promedio: 68.0,
        meta: 70,
        ciclos: [
            { name: 'C01', atendidos: 464, total: 682, value: 68.0, meta: 70 },
            { name: 'C02', atendidos: 343, total: 472, value: 72.7, meta: 70 },
            { name: 'C03', atendidos: 439, total: 629, value: 69.8, meta: 70 },
            { name: 'C04', atendidos: 280, total: 451, value: 62.1, meta: 70 },
        ]
    },
    surquillo: {
        promedio: 62.5,
        meta: 70,
        ciclos: [
            { name: 'C01', atendidos: 331, total: 490, value: 67.6, meta: 70 },
            { name: 'C02', atendidos: 272, total: 402, value: 67.7, meta: 70 },
            { name: 'C03', atendidos: 239, total: 383, value: 62.4, meta: 70 },
            { name: 'C04', atendidos: 245, total: 469, value: 52.2, meta: 70 },
        ]
    },
    ves: {
        promedio: 55.4,
        meta: 70,
        ciclos: [
            { name: 'C01', atendidos: 913, total: 1302, value: 70.1, meta: 70 },
            { name: 'C02', atendidos: 647, total: 1125, value: 57.5, meta: 70 },
            { name: 'C03', atendidos: 849, total: 1392, value: 61.0, meta: 70 },
            { name: 'C04', atendidos: 482, total: 1459, value: 33.0, meta: 70 },
        ]
    },
    'clientes-e': {
        promedio: 0,
        meta: 70,
        ciclos: [
            { name: 'C01', atendidos: 0, total: 0, value: 0, meta: 70 },
            { name: 'C02', atendidos: 0, total: 11, value: 0.0, meta: 70 },
            { name: 'C03', atendidos: 0, total: 0, value: 0, meta: 70 },
            { name: 'C04', atendidos: 0, total: 3, value: 0.0, meta: 70 },
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
                <CardTitle className="text-xl text-center">Tendencia de Eficacia (%)</CardTitle>
            </CardHeader>
            <CardContent className="h-80 p-0 px-2 pb-4">
            <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data.ciclos}>
                  <defs>
                      <linearGradient id="colorEficacia" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="hsl(var(--chart-2))" stopOpacity={0.8}/>
                          <stop offset="95%" stopColor="hsl(var(--chart-2))" stopOpacity={0}/>
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
                    name="Eficacia" 
                    stroke="hsl(var(--chart-2))" 
                    fillOpacity={1} 
                    fill="url(#colorEficacia)" 
                    strokeWidth={3}
                  />
                  <ReferenceLine y={70} label="Meta" stroke="hsl(var(--destructive))" strokeDasharray="3 3" />
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
                        El gráfico muestra la evolución de la eficacia en las primeras 24 horas. La meta establecida del 70% busca garantizar una respuesta rápida en los procesos de recaudación.
                    </p>
                </div>
            </CardContent>
        </Card>
      </div>

        <Card className="transition-colors hover:bg-primary/10 border shadow-sm">
        <CardHeader>
            <CardTitle className="text-xl">Detalle de Rendimiento por Ciclo</CardTitle>
            <p className="text-base text-muted-foreground">
            Desglose porcentual y numérico de la eficacia 24H por cada ciclo operativo.
            </p>
        </CardHeader>
        <CardContent>
            <div className="max-h-96 overflow-y-auto rounded-md border">
            <Table className="text-base">
                <TableHeader className="sticky top-0 bg-secondary/50 backdrop-blur-sm">
                <TableRow>
                    <TableHead className="w-[120px] font-bold">Ciclo</TableHead>
                    <TableHead className="font-bold">Con Reap Antes 24</TableHead>
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
