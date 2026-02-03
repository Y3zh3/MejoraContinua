
"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { CameraOff } from "lucide-react";
import { BaseSelector } from "@/components/base-selector";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const fotografiaData = {
    todas: {
        promedio: 9.4,
        meta: 5,
        ciclos: [
            { name: 'C01', value: 5.4, casos: 1245, total: 23055 },
            { name: 'C02', value: 11.2, casos: 3102, total: 27696 },
            { name: 'C03', value: 9.8, casos: 2450, total: 25000 },
            { name: 'C04', value: 6.5, casos: 1540, total: 23692 },
            { name: 'C05', value: 8.2, casos: 1980, total: 24146 },
            { name: 'C06', value: 12.4, casos: 2800, total: 22580 },
            { name: 'C07', value: 7.9, casos: 1650, total: 20886 },
            { name: 'C08', value: 14.1, casos: 3200, total: 22695 },
            { name: 'C09', value: 12.6, casos: 2750, total: 21825 },
            { name: 'C10', value: 10.3, casos: 1850, total: 17961 },
        ]
    },
    comas: {
        promedio: 11.0,
        meta: 5,
        ciclos: [
            { name: 'C01', value: 11, casos: 524, total: 4763 },
            { name: 'C02', value: 28, casos: 1242, total: 4435 },
            { name: 'C03', value: 7, casos: 310, total: 4428 },
            { name: 'C04', value: 5, casos: 219, total: 4380 },
            { name: 'C05', value: 6, casos: 181, total: 3016 },
            { name: 'C06', value: 5, casos: 228, total: 4560 },
            { name: 'C07', value: 10, casos: 247, total: 2470 },
            { name: 'C08', value: 8, casos: 310, total: 3875 },
            { name: 'C09', value: 16, casos: 259, total: 1618 },
            { name: 'C10', value: 14, casos: 201, total: 1435 },
        ]
    },
    callao: {
        promedio: 21.5,
        meta: 5,
        ciclos: [
            { name: 'C01', value: 0, casos: 0, total: 481 },
            { name: 'C02', value: 12, casos: 67, total: 556 },
            { name: 'C03', value: 22, casos: 90, total: 409 },
            { name: 'C04', value: 13, casos: 29, total: 221 },
            { name: 'C05', value: 29, casos: 190, total: 655 },
            { name: 'C06', value: 42, casos: 194, total: 463 },
            { name: 'C07', value: 13, casos: 63, total: 482 },
            { name: 'C08', value: 43, casos: 228, total: 530 },
            { name: 'C09', value: 44, casos: 322, total: 732 },
            { name: 'C10', value: 19, casos: 63, total: 331 },
        ]
    },
    ate: {
        promedio: 18.8,
        meta: 5,
        ciclos: [
            { name: 'C01', value: 21, casos: 121, total: 577 },
            { name: 'C02', value: 13, casos: 81, total: 620 },
            { name: 'C03', value: 22, casos: 59, total: 270 },
            { name: 'C04', value: 7, casos: 17, total: 247 },
            { name: 'C05', value: 14, casos: 44, total: 316 },
            { name: 'C06', value: 24, casos: 106, total: 443 },
            { name: 'C07', value: 9, casos: 47, total: 524 },
            { name: 'C08', value: 35, casos: 137, total: 391 },
            { name: 'C09', value: 16, casos: 76, total: 472 },
            { name: 'C10', value: 14, casos: 26, total: 183 },
        ]
    },
    brena: {
        promedio: 3.8,
        meta: 5,
        ciclos: [
            { name: 'C01', value: 0, casos: 0, total: 262 },
            { name: 'C02', value: 0, casos: 0, total: 441 },
            { name: 'C03', value: 0, casos: 0, total: 268 },
            { name: 'C04', value: 0, casos: 0, total: 267 },
            { name: 'C05', value: 0, casos: 0, total: 261 },
            { name: 'C06', value: 1, casos: 4, total: 353 },
            { name: 'C07', value: 12, casos: 56, total: 469 },
            { name: 'C08', value: 15, casos: 58, total: 389 },
            { name: 'C09', value: 0, casos: 0, total: 132 },
            { name: 'C10', value: 10, casos: 33, total: 329 },
        ]
    },
    sjl: {
        promedio: 0.5,
        meta: 5,
        ciclos: [
            { name: 'C01', value: 0, casos: 0, total: 648 },
            { name: 'C02', value: 0, casos: 0, total: 440 },
            { name: 'C03', value: 0, casos: 0, total: 450 },
            { name: 'C04', value: 0, casos: 0, total: 426 },
            { name: 'C05', value: 0, casos: 0, total: 529 },
            { name: 'C06', value: 5, casos: 20, total: 408 },
            { name: 'C07', value: 0, casos: 0, total: 363 },
            { name: 'C08', value: 0, casos: 0, total: 330 },
            { name: 'C09', value: 0, casos: 0, total: 502 },
            { name: 'C10', value: 0, casos: 0, total: 302 },
            { name: 'C11', value: 0, casos: 0, total: 133 },
        ]
    },
    surquillo: {
        promedio: 5.2,
        meta: 5,
        ciclos: [
            { name: 'C01', value: 2, casos: 8, total: 378 },
            { name: 'C02', value: 8, casos: 52, total: 650 },
            { name: 'C03', value: 2, casos: 12, total: 598 },
            { name: 'C04', value: 10, casos: 61, total: 612 },
            { name: 'C05', value: 1, casos: 5, total: 469 },
            { name: 'C06', value: 2, casos: 10, total: 481 },
            { name: 'C07', value: 4, casos: 21, total: 521 },
            { name: 'C08', value: 8, casos: 44, total: 555 },
            { name: 'C09', value: 10, casos: 44, total: 441 },
        ]
    },
    ves: {
        promedio: 1.9,
        meta: 5,
        ciclos: [
            { name: 'C01', value: 1, casos: 8, total: 819 },
            { name: 'C02', value: 1, casos: 8, total: 795 },
            { name: 'C03', value: 1, casos: 9, total: 937 },
            { name: 'C04', value: 2, casos: 10, total: 511 },
            { name: 'C05', value: 1, casos: 6, total: 639 },
            { name: 'C06', value: 3, casos: 18, total: 615 },
            { name: 'C07', value: 1, casos: 10, total: 1009 },
            { name: 'C08', value: 2, casos: 9, total: 429 },
            { name: 'C09', value: 4, casos: 18, total: 440 },
        ]
    },
    'clientes-e': {
        promedio: 0.6,
        meta: 5,
        ciclos: [
            { name: 'C01', value: 0, casos: 0, total: 83 },
            { name: 'C02', value: 4, casos: 5, total: 125 },
            { name: 'C03', value: 0, casos: 0, total: 67 },
            { name: 'C04', value: 0, casos: 0, total: 68 },
            { name: 'C05', value: 2, casos: 1, total: 64 },
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
                <CardTitle className="text-xl">Rendimiento por Ciclo - Enero 2026</CardTitle>
            </CardHeader>
            <CardContent className="h-80 p-0 px-2 pb-4">
            <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data.ciclos}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" />
                <YAxis unit=" uds." />
                <Tooltip
                    contentStyle={{
                    background: "hsl(var(--card))",
                    borderColor: "hsl(var(--border))",
                    borderRadius: "8px",
                    }}
                    formatter={(value: number) => `${value.toLocaleString()} uds.`}
                />
                <Legend />
                <Bar dataKey="casos" name="Casos" fill="hsl(var(--chart-4))" radius={[4, 4, 0, 0]} />
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
                        Se observa una fluctuación en las incidencias de fotografía según el ciclo. Los ciclos con porcentajes superiores al 5% requieren una revisión inmediata de los procesos de captura.
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
                  <TableHead className="font-bold">Incidencias (Casos)</TableHead>
                  <TableHead className="font-bold">Total Lecturas</TableHead>
                  <TableHead className="text-right font-bold">Porcentaje (%)</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.ciclos.map((ciclo) => (
                  <TableRow key={ciclo.name}>
                    <TableCell className="font-semibold">{ciclo.name}</TableCell>
                    <TableCell>{ciclo.casos.toLocaleString()} uds.</TableCell>
                    <TableCell>{ciclo.total.toLocaleString()} uds.</TableCell>
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
