
"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { CameraOff } from "lucide-react";
import { BaseSelector } from "@/components/base-selector";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const fotografiaData = {
    todas: {
        promedio: 10.3,
        meta: 5,
        ciclos: [
            { name: 'C01', value: 5.6, casos: 1245, total: 23055 },
            { name: 'C02', value: 8.9, casos: 3102, total: 27696 },
            { name: 'C03', value: 9.8, casos: 2450, total: 25000 },
            { name: 'C04', value: 6.5, casos: 1540, total: 23692 },
            { name: 'C05', value: 11.2, casos: 1980, total: 24146 },
            { name: 'C06', value: 13.4, casos: 2800, total: 22580 },
            { name: 'C07', value: 7.9, casos: 1650, total: 20886 },
            { name: 'C08', value: 15.1, casos: 3200, total: 22695 },
            { name: 'C09', value: 12.6, casos: 2750, total: 21825 },
            { name: 'C10', value: 12.3, casos: 1850, total: 17961 },
        ]
    },
    comas: {
        promedio: 11.5,
        meta: 5,
        ciclos: [
            { name: 'C01', value: 11.1, casos: 56, total: 504 },
            { name: 'C02', value: 28.3, casos: 167, total: 591 },
            { name: 'C03', value: 7.2, casos: 60, total: 834 },
            { name: 'C04', value: 5.0, casos: 99, total: 1964 },
            { name: 'C05', value: 6.0, casos: 132, total: 2202 },
            { name: 'C06', value: 5.3, casos: 63, total: 1179 },
            { name: 'C07', value: 9.8, casos: 217, total: 2212 },
            { name: 'C08', value: 7.9, casos: 106, total: 1349 },
            { name: 'C09', value: 16.3, casos: 239, total: 1463 },
            { name: 'C10', value: 13.6, casos: 148, total: 1087 },
        ]
    },
    callao: {
        promedio: 23.7,
        meta: 5,
        ciclos: [
            { name: 'C01', value: 0, casos: 0, total: 30 },
            { name: 'C02', value: 11.8, casos: 6, total: 51 },
            { name: 'C03', value: 22.5, casos: 47, total: 209 },
            { name: 'C04', value: 12.5, casos: 14, total: 112 },
            { name: 'C05', value: 28.7, casos: 78, total: 272 },
            { name: 'C06', value: 42.5, casos: 48, total: 113 },
            { name: 'C07', value: 12.8, casos: 10, total: 78 },
            { name: 'C08', value: 42.7, casos: 85, total: 199 },
            { name: 'C09', value: 44.0, casos: 113, total: 257 },
            { name: 'C10', value: 19.2, casos: 48, total: 250 },
        ]
    },
    ate: {
        promedio: 18.8,
        meta: 5,
        ciclos: [
            { name: 'C01', value: 20.8, casos: 120, total: 577 },
            { name: 'C02', value: 12.7, casos: 55, total: 432 },
            { name: 'C03', value: 21.7, casos: 15, total: 69 },
            { name: 'C04', value: 6.7, casos: 16, total: 239 },
            { name: 'C05', value: 14.5, casos: 24, total: 166 },
            { name: 'C06', value: 24.4, casos: 108, total: 442 },
            { name: 'C07', value: 8.9, casos: 42, total: 474 },
            { name: 'C08', value: 34.7, casos: 43, total: 124 },
            { name: 'C09', value: 16.3, casos: 77, total: 472 },
            { name: 'C10', value: 13.7, casos: 25, total: 183 },
        ]
    },
    brena: {
        promedio: 3.8,
        meta: 5,
        ciclos: [
            { name: 'C01', value: 0, casos: 0, total: 155 },
            { name: 'C02', value: 0, casos: 0, total: 438 },
            { name: 'C03', value: 0, casos: 0, total: 248 },
            { name: 'C04', value: 0, casos: 0, total: 241 },
            { name: 'C05', value: 0, casos: 0, total: 259 },
            { name: 'C06', value: 0.8, casos: 2, total: 257 },
            { name: 'C07', value: 11.8, casos: 12, total: 102 },
            { name: 'C08', value: 14.6, casos: 6, total: 41 },
            { name: 'C09', value: 0, casos: 0, total: 96 },
            { name: 'C10', value: 10.0, casos: 8, total: 80 },
        ]
    },
    sjl: {
        promedio: 0.45,
        meta: 5,
        ciclos: [
            { name: 'C01', value: 0.2, casos: 1, total: 587 },
            { name: 'C02', value: 0, casos: 0, total: 440 },
            { name: 'C03', value: 0, casos: 0, total: 450 },
            { name: 'C04', value: 0, casos: 0, total: 420 },
            { name: 'C05', value: 0, casos: 0, total: 333 },
            { name: 'C06', value: 4.8, casos: 3, total: 62 },
            { name: 'C07', value: 0, casos: 0, total: 363 },
            { name: 'C08', value: 0, casos: 0, total: 329 },
            { name: 'C09', value: 0, casos: 0, total: 502 },
            { name: 'C10', value: 0, casos: 0, total: 302 },
            { name: 'C11', value: 0, casos: 0, total: 133 },
        ]
    },
    surquillo: {
        promedio: 5.2,
        meta: 5,
        ciclos: [
            { name: 'C01', value: 1.9, casos: 6, total: 312 },
            { name: 'C02', value: 7.6, casos: 25, total: 330 },
            { name: 'C03', value: 1.5, casos: 9, total: 598 },
            { name: 'C04', value: 9.9, casos: 53, total: 535 },
            { name: 'C05', value: 1.1, casos: 5, total: 453 },
            { name: 'C06', value: 2.4, casos: 11, total: 462 },
            { name: 'C07', value: 3.9, casos: 13, total: 337 },
            { name: 'C08', value: 8.4, casos: 19, total: 226 },
            { name: 'C09', value: 10.0, casos: 16, total: 160 },
        ]
    },
    ves: {
        promedio: 1.6,
        meta: 5,
        ciclos: [
            { name: 'C01', value: 0.6, casos: 5, total: 791 },
            { name: 'C02', value: 1.5, casos: 10, total: 681 },
            { name: 'C03', value: 1.0, casos: 7, total: 717 },
            { name: 'C04', value: 2.4, casos: 10, total: 421 },
            { name: 'C05', value: 1.4, casos: 7, total: 508 },
            { name: 'C06', value: 3.0, casos: 14, total: 465 },
            { name: 'C07', value: 1.3, casos: 11, total: 868 },
            { name: 'C08', value: 2.5, casos: 9, total: 365 },
            { name: 'C09', value: 4.3, casos: 19, total: 438 },
        ]
    },
    'clientes-e': {
        promedio: 0.6,
        meta: 5,
        ciclos: [
            { name: 'C01', value: 0, casos: 0, total: 83 },
            { name: 'C02', value: 4.0, casos: 5, total: 125 },
            { name: 'C03', value: 0, casos: 0, total: 67 },
            { name: 'C04', value: 0, casos: 0, total: 68 },
            { name: 'C05', value: 1.6, casos: 1, total: 64 },
            { name: 'C06', value: 0, casos: 0, total: 67 },
            { name: 'C07', value: 0, casos: 0, total: 71 },
            { name: 'C08', value: 0, casos: 0, total: 43 },
            { name: 'C09', value: 0, casos: 0, total: 21 },
            { name: 'C10', value: 0, casos: 0, total: 28 },
        ]
    }
};

export default function IncidenciasFotografiaTomaDeEstadoPage() {
  const [data, setData] = useState(fotografiaData.todas);

  const handleBaseChange = (base: string) => {
    setData(fotografiaData[base as keyof typeof fotografiaData] || fotografiaData.todas);
  };
  
  return (
    <div className="max-w-7xl mx-auto flex flex-col gap-8">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <CameraOff className="h-8 w-8 text-[hsl(var(--chart-4))]" />
          <h1 className="font-headline text-3xl font-bold text-foreground">Toma de Estado: Incidencias de Fotografía</h1>
        </div>
        <BaseSelector onBaseChange={handleBaseChange} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card className="transition-colors hover:bg-primary/10 border shadow-sm">
            <CardHeader className="p-4">
                <CardTitle className="text-xl text-center">Evolución de Incidencia (%) - Enero 2026</CardTitle>
            </CardHeader>
            <CardContent className="h-80 p-0 px-2 pb-4">
            <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data.ciclos}>
                <defs>
                    <linearGradient id="colorIncidencia" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="hsl(var(--chart-4))" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="hsl(var(--chart-4))" stopOpacity={0}/>
                    </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" />
                <YAxis unit="%" />
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
                    name="Incidencia" 
                    stroke="hsl(var(--chart-4))" 
                    fillOpacity={1} 
                    fill="url(#colorIncidencia)" 
                    strokeWidth={3}
                />
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
                    Análisis de las <span className="font-semibold text-foreground">Incidencias de Fotografía</span> para el periodo de <span className="font-semibold text-foreground">Enero 2026</span>.
                </p>
                <div className="grid grid-cols-2 gap-6">
                    <div className="border p-6 rounded-xl text-center bg-card shadow-sm">
                        <p className="text-sm font-medium text-muted-foreground mb-1 uppercase tracking-wider">Promedio Simple</p>
                        <p className="text-4xl font-bold text-[hsl(var(--chart-4))]">{data.promedio}%</p>
                    </div>
                     <div className="border p-6 rounded-xl text-center bg-card shadow-sm">
                        <p className="text-sm font-medium text-muted-foreground mb-1 uppercase tracking-wider">Meta (máx)</p>
                        <p className="text-4xl font-bold">{data.meta}%</p>
                    </div>
                </div>
                <div className="mt-2">
                    <h4 className="font-semibold text-lg mb-2">Observaciones</h4>
                    <p className="text-base text-muted-foreground leading-relaxed">
                        El gráfico de área muestra claramente la fluctuación de incidencias. Los picos que superan la meta del 5% indican ciclos con problemas críticos en la calidad de la toma de datos.
                    </p>
                </div>
            </CardContent>
        </Card>
      </div>

       <Card className="transition-colors hover:bg-primary/10 border shadow-sm">
        <CardHeader>
          <CardTitle className="text-xl">Detalle de Incidencias por Ciclo</CardTitle>
          <p className="text-base text-muted-foreground">
            Desglose porcentual y numérico de las incidencias de fotografía detectadas en cada ciclo operativo.
          </p>
        </CardHeader>
        <CardContent>
          <div className="max-h-96 overflow-y-auto rounded-md border">
            <Table className="text-base">
              <TableHeader className="sticky top-0 bg-secondary/50 backdrop-blur-sm">
                <TableRow>
                  <TableHead className="w-[120px] font-bold">Ciclo</TableHead>
                  <TableHead className="font-bold">Incidencias (Lecturas)</TableHead>
                  <TableHead className="font-bold">Total Lecturas</TableHead>
                  <TableHead className="text-right font-bold">Porcentaje (%)</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.ciclos.map((ciclo) => (
                  <TableRow key={ciclo.name}>
                    <TableCell className="font-semibold">{ciclo.name}</TableCell>
                    <TableCell>{ciclo.casos.toLocaleString()}</TableCell>
                    <TableCell>{ciclo.total.toLocaleString()}</TableCell>
                    <TableCell className="text-right font-medium">{ciclo.value}%</TableCell>
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
