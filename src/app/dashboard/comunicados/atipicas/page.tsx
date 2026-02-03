
"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, Line } from 'recharts';
import { AlertTriangle } from "lucide-react";
import { BaseSelector } from '@/components/base-selector';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const atipicasData = {
    todas: {
        promedio: 81.3,
        meta: 85,
        ciclos: [
            { name: 'C01', value: 86.5, meta: 85 },
            { name: 'C02', value: 85.8, meta: 85 },
            { name: 'C03', value: 83.6, meta: 85 },
            { name: 'C04', value: 84.8, meta: 85 },
            { name: 'C05', value: 84.1, meta: 85 },
            { name: 'C06', value: 81.8, meta: 85 },
            { name: 'C07', value: 78.4, meta: 85 },
            { name: 'C08', value: 85.3, meta: 85 },
            { name: 'C09', value: 85.1, meta: 85 },
            { name: 'C10', value: 84.6, meta: 85 },
            { name: 'C11', value: 80.5, meta: 85 },
        ]
    },
    comas: {
        promedio: 83.7,
        meta: 85,
        ciclos: [
            { name: 'C01', value: 86, meta: 85 }, { name: 'C02', value: 85, meta: 85 }, { name: 'C03', value: 85, meta: 85 },
            { name: 'C04', value: 83, meta: 85 }, { name: 'C05', value: 88, meta: 85 }, { name: 'C06', value: 82, meta: 85 },
            { name: 'C07', value: 78, meta: 85 }, { name: 'C08', value: 84, meta: 85 }, { name: 'C09', value: 84, meta: 85 },
            { name: 'C10', value: 82, meta: 85 },
        ]
    },
    callao: {
        promedio: 86.3,
        meta: 85,
        ciclos: [
            { name: 'C01', value: 87, meta: 85 }, { name: 'C02', value: 88, meta: 85 }, { name: 'C03', value: 83, meta: 85 },
            { name: 'C04', value: 87, meta: 85 }, { name: 'C05', value: 88, meta: 85 }, { name: 'C06', value: 85, meta: 85 },
            { name: 'C07', value: 91, meta: 85 }, { name: 'C08', value: 85, meta: 85 }, { name: 'C09', value: 84, meta: 85 },
            { name: 'C10', value: 87, meta: 85 },
        ]
    },
    ate: {
        promedio: 90.2,
        meta: 85,
        ciclos: [
            { name: 'C01', value: 89, meta: 85 }, { name: 'C02', value: 91, meta: 85 }, { name: 'C03', value: 91, meta: 85 },
            { name: 'C04', value: 93, meta: 85 }, { name: 'C05', value: 90, meta: 85 }, { name: 'C06', value: 93, meta: 85 },
            { name: 'C07', value: 87, meta: 85 }, { name: 'C08', value: 88, meta: 85 }, { name: 'C09', value: 92, meta: 85 },
            { name: 'C10', value: 88, meta: 85 },
        ]
    },
    brena: {
        promedio: 84.8,
        meta: 85,
        ciclos: [
            { name: 'C01', value: 82, meta: 85 }, { name: 'C02', value: 82, meta: 85 }, { name: 'C03', value: 88, meta: 85 },
            { name: 'C04', value: 82, meta: 85 }, { name: 'C05', value: 82, meta: 85 }, { name: 'C06', value: 81, meta: 85 },
            { name: 'C07', value: 86, meta: 85 }, { name: 'C08', value: 89, meta: 85 }, { name: 'C09', value: 90, meta: 85 },
            { name: 'C10', value: 86, meta: 85 },
        ]
    },
    sjl: {
        promedio: 72.6,
        meta: 85,
        ciclos: [
            { name: 'C01', value: 77, meta: 85 }, { name: 'C02', value: 76, meta: 85 }, { name: 'C03', value: 81, meta: 85 },
            { name: 'C04', value: 69, meta: 85 }, { name: 'C05', value: 68, meta: 85 }, { name: 'C06', value: 65, meta: 85 },
            { name: 'C07', value: 68, meta: 85 }, { name: 'C08', value: 81, meta: 85 }, { name: 'C09', value: 75, meta: 85 },
            { name: 'C10', value: 77, meta: 85 }, { name: 'C11', value: 61, meta: 85 },
        ]
    },
    surquillo: {
        promedio: 88.8,
        meta: 85,
        ciclos: [
            { name: 'C01', value: 93, meta: 85 }, { name: 'C02', value: 87, meta: 85 }, { name: 'C03', value: 89, meta: 85 },
            { name: 'C04', value: 89, meta: 85 }, { name: 'C05', value: 86, meta: 85 }, { name: 'C06', value: 88, meta: 85 },
            { name: 'C07', value: 87, meta: 85 }, { name: 'C08', value: 95, meta: 85 }, { name: 'C09', value: 90, meta: 85 },
        ]
    },
    ves: {
        promedio: 47.8,
        meta: 85,
        ciclos: [
            { name: 'C01', value: 59, meta: 85 }, { name: 'C02', value: 57, meta: 85 }, { name: 'C03', value: 41, meta: 85 },
            { name: 'C04', value: 51, meta: 85 }, { name: 'C05', value: 60, meta: 85 }, { name: 'C06', value: 60, meta: 85 },
            { name: 'C07', value: 40, meta: 85 }, { name: 'C08', value: 44, meta: 85 }, { name: 'C09', value: 18, meta: 85 },
        ]
    },
    'clientes-e': {
        promedio: 100,
        meta: 85,
        ciclos: [
            { name: 'C01', value: 100, meta: 85 }, { name: 'C02', value: 100, meta: 85 }, { name: 'C03', value: 100, meta: 85 },
            { name: 'C04', value: 100, meta: 85 }, { name: 'C10', value: 100, meta: 85 },
        ]
    }
};

export default function AtipicasComunicadosPage() {
  const [data, setData] = useState(atipicasData.todas);

  const handleBaseChange = (base: string) => {
    setData(atipicasData[base as keyof typeof atipicasData] || atipicasData.todas);
  };
  
  return (
    <div className="max-w-7xl mx-auto flex flex-col gap-8">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
            <AlertTriangle className="h-8 w-8 text-[hsl(var(--chart-1))]" />
            <h1 className="font-headline text-3xl font-bold">Comunicados: Atípicas</h1>
        </div>
        <BaseSelector onBaseChange={handleBaseChange} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card className="transition-colors hover:bg-primary/10 border shadow-sm">
            <CardHeader className="p-4">
                <CardTitle className="text-xl">Evolución de Rendimiento (%)</CardTitle>
            </CardHeader>
            <CardContent className="h-80 p-0 px-2 pb-4">
            <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data.ciclos}>
                  <defs>
                      <linearGradient id="colorAtipicas" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="hsl(var(--chart-1))" stopOpacity={0.8}/>
                          <stop offset="95%" stopColor="hsl(var(--chart-1))" stopOpacity={0}/>
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
                    name="Rendimiento" 
                    stroke="hsl(var(--chart-1))" 
                    fillOpacity={1} 
                    fill="url(#colorAtipicas)" 
                    strokeWidth={3}
                  />
                  <Line type="monotone" dataKey="meta" name="Meta" stroke="hsl(var(--destructive))" strokeDasharray="5 5" strokeWidth={2} dot={false} />
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
                    Análisis del indicador de <span className="font-semibold text-foreground">Comunicaciones Atípicas</span> para el periodo actual.
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
                        El rendimiento de las comunicaciones atípicas muestra variaciones notables entre las distintas bases. Es fundamental monitorear los ciclos que se encuentran por debajo de la meta del 85%.
                    </p>
                </div>
            </CardContent>
        </Card>
      </div>

        <Card className="transition-colors hover:bg-primary/10 border shadow-sm">
        <CardHeader>
            <CardTitle className="text-xl">Detalle Semanal de Rendimiento Atípico</CardTitle>
            <p className="text-base text-muted-foreground">
            Desglose porcentual del rendimiento de comunicaciones atípicas por ciclo operativo.
            </p>
        </CardHeader>
        <CardContent>
            <div className="max-h-96 overflow-y-auto rounded-md border">
            <Table className="text-base">
                <TableHeader className="sticky top-0 bg-secondary/50 backdrop-blur-sm">
                <TableRow>
                    <TableHead className="w-[150px] font-bold">Ciclo</TableHead>
                    <TableHead className="font-bold">Rendimiento (%)</TableHead>
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
