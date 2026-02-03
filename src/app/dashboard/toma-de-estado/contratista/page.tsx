
"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, LineChart, Line } from 'recharts';
import { HardHat } from "lucide-react";
import { BaseSelector } from "@/components/base-selector";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const contratistaData = {
    todas: {
        promedio: 23.9,
        meta: 15,
        ciclos: [
            { name: 'C01', value: 25.4 },
            { name: 'C02', value: 26.1 },
            { name: 'C03', value: 18.5 },
            { name: 'C04', value: 19.3 },
            { name: 'C05', value: 16.5 },
            { name: 'C06', value: 24.6 },
            { name: 'C07', value: 18.2 },
            { name: 'C08', value: 24.8 },
            { name: 'C09', value: 33.1 },
            { name: 'C10', value: 37.0 },
        ]
    },
    comas: {
        promedio: 22,
        meta: 15,
        ciclos: [
            { name: 'C01', value: 38 }, { name: 'C02', value: 43 }, { name: 'C03', value: 14 },
            { name: 'C04', value: 12 }, { name: 'C05', value: 7 }, { name: 'C06', value: 21 },
            { name: 'C07', value: 18 }, { name: 'C08', value: 23 }, { name: 'C09', value: 34 },
            { name: 'C10', value: 33 },
        ]
    },
    callao: {
        promedio: 17,
        meta: 15,
        ciclos: [
            { name: 'C01', value: 20 }, { name: 'C02', value: 7 }, { name: 'C03', value: 8 },
            { name: 'C04', value: 23 }, { name: 'C05', value: 6 }, { name: 'C06', value: 28 },
            { name: 'C07', value: 26 }, { name: 'C08', value: 23 }, { name: 'C09', value: 10 },
            { name: 'C10', value: 37 },
        ]
    },
    ate: {
        promedio: 50,
        meta: 15,
        ciclos: [
            { name: 'C01', value: 59 }, { name: 'C02', value: 55 }, { name: 'C03', value: 41 },
            { name: 'C04', value: 29 }, { name: 'C05', value: 41 }, { name: 'C06', value: 42 },
            { name: 'C07', value: 27 }, { name: 'C08', value: 68 }, { name: 'C09', value: 69 },
            { name: 'C10', value: 64 },
        ]
    },
    brena: {
        promedio: 28,
        meta: 15,
        ciclos: [
            { name: 'C01', value: 21 }, { name: 'C02', value: 34 }, { name: 'C03', value: 25 },
            { name: 'C04', value: 30 }, { name: 'C05', value: 39 }, { name: 'C06', value: 24 },
            { name: 'C07', value: 30 }, { name: 'C08', value: 17 }, { name: 'C09', value: 27 },
            { name: 'C10', value: 27 },
        ]
    },
    sjl: {
        promedio: 12,
        meta: 15,
        ciclos: [
            { name: 'C01', value: 6 }, { name: 'C02', value: 5 }, { name: 'C03', value: 8 },
            { name: 'C04', value: 6 }, { name: 'C05', value: 11 }, { name: 'C06', value: 14 },
            { name: 'C07', value: 5 }, { name: 'C08', value: 5 }, { name: 'C09', value: 26 },
            { name: 'C10', value: 26 }, { name: 'C11', value: 32 },
        ]
    },
    surquillo: {
        promedio: 16,
        meta: 15,
        ciclos: [
            { name: 'C01', value: 21 }, { name: 'C02', value: 18 }, { name: 'C03', value: 17 },
            { name: 'C04', value: 20 }, { name: 'C05', value: 15 }, { name: 'C06', value: 11 },
            { name: 'C07', value: 11 }, { name: 'C08', value: 7 }, { name: 'C09', value: 21 },
        ]
    },
    ves: {
        promedio: 20,
        meta: 15,
        ciclos: [
            { name: 'C01', value: 11 }, { name: 'C02', value: 25 }, { name: 'C03', value: 19 },
            { name: 'C04', value: 29 }, { name: 'C05', value: 23 }, { name: 'C06', value: 19 },
            { name: 'C07', value: 13 }, { name: 'C08', value: 27 }, { name: 'C09', value: 27 },
        ]
    },
    'clientes-e': {
        promedio: 26,
        meta: 15,
        ciclos: [
            { name: 'C01', value: 27 }, { name: 'C02', value: 22 }, { name: 'C03', value: 25 },
            { name: 'C04', value: 28 }, { name: 'C05', value: 30 }, { name: 'C06', value: 31 },
            { name: 'C07', value: 15 }, { name: 'C08', value: 30 }, { name: 'C09', value: 24 },
            { name: 'C10', value: 39 }, { name: 'C11', value: 0 },
        ]
    }
};

export default function ContratistaTomaDeEstadoPage() {
  const [data, setData] = useState(contratistaData.todas);

  const handleBaseChange = (base: string) => {
    setData(contratistaData[base as keyof typeof contratistaData] || contratistaData.todas);
  };
  
  return (
    <div className="max-w-6xl mx-auto flex flex-col gap-8">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <HardHat className="h-8 w-8 text-[hsl(var(--chart-3))]" />
          <h1 className="font-headline text-3xl font-bold">Toma de Estado: Contratista</h1>
        </div>
        <BaseSelector onBaseChange={handleBaseChange} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card className="transition-all hover:bg-primary/5 cursor-default border-none shadow-md">
            <CardHeader className="p-4">
                <CardTitle className="text-xl">Rendimiento por Ciclo - Enero 2026</CardTitle>
            </CardHeader>
            <CardContent className="h-80 p-0 px-2 pb-4">
            <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data.ciclos}>
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
                <Bar dataKey="value" name="Rendimiento" fill="hsl(var(--chart-3))" radius={[4, 4, 0, 0]} />
                </BarChart>
            </ResponsiveContainer>
            </CardContent>
        </Card>

        <Card className="transition-all hover:bg-primary/5 cursor-default border-none shadow-md">
            <CardHeader>
            <CardTitle className="text-xl">Resumen del Indicador</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-6 pt-2">
                <p className="text-lg text-muted-foreground leading-relaxed">
                    Análisis del rendimiento de <span className="font-semibold text-foreground">Contratistas</span> para el periodo de <span className="font-semibold text-foreground">Enero 2026</span>.
                </p>
                <div className="grid grid-cols-2 gap-6">
                    <div className="border p-6 rounded-xl text-center bg-card">
                        <p className="text-sm font-medium text-muted-foreground mb-1 uppercase tracking-wider">Promedio Simple</p>
                        <p className="text-4xl font-bold text-[hsl(var(--chart-3))]">{data.promedio}%</p>
                    </div>
                     <div className="border p-6 rounded-xl text-center bg-card">
                        <p className="text-sm font-medium text-muted-foreground mb-1 uppercase tracking-wider">Meta (máx)</p>
                        <p className="text-4xl font-bold">{data.meta}%</p>
                    </div>
                </div>
                <div className="mt-2">
                    <h4 className="font-semibold text-lg mb-2">Observaciones</h4>
                    <p className="text-base text-muted-foreground leading-relaxed">
                        El rendimiento del contratista varía significativamente entre ciclos. Es fundamental supervisar los ciclos con desviaciones mayores a la meta del 15% para asegurar la calidad del servicio.
                    </p>
                </div>
            </CardContent>
        </Card>
      </div>

       <Card className="transition-all hover:bg-primary/5 cursor-default border-none shadow-md">
        <CardHeader>
          <CardTitle className="text-xl">Detalle de Rendimiento por Ciclo</CardTitle>
          <p className="text-muted-foreground">
            Desglose porcentual del rendimiento del contratista en cada ciclo operativo.
          </p>
        </CardHeader>
        <CardContent>
          <div className="max-h-96 overflow-y-auto rounded-md border">
            <Table>
              <TableHeader className="sticky top-0 bg-secondary/50 backdrop-blur-sm">
                <TableRow>
                  <TableHead className="w-[120px] font-bold">Ciclo</TableHead>
                  <TableHead className="font-bold">Rendimiento (%)</TableHead>
                  <TableHead className="text-right font-bold">Meta (%)</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.ciclos.map((ciclo) => (
                  <TableRow key={ciclo.name} className="hover:bg-muted/50 transition-colors">
                    <TableCell className="font-semibold text-base">{ciclo.name}</TableCell>
                    <TableCell className="text-base">{ciclo.value}%</TableCell>
                    <TableCell className="text-right text-base font-medium">{data.meta}%</TableCell>
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
