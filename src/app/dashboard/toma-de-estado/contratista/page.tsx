
"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { HardHat } from "lucide-react";
import { BaseSelector } from "@/components/base-selector";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const contratistaData = {
    todas: {
        promedio: 24.3,
        meta: 15,
        ciclos: [
            { name: 'C01', value: 25.2, lecturas: 1013, total: 4009 },
            { name: 'C02', value: 29.1, lecturas: 1390, total: 4767 },
            { name: 'C03', value: 18.5, lecturas: 571, total: 3875 },
            { name: 'C04', value: 19.3, lecturas: 760, total: 4321 },
            { name: 'C05', value: 16.5, lecturas: 732, total: 5489 },
            { name: 'C06', value: 24.6, lecturas: 1073, total: 4357 },
            { name: 'C07', value: 18.2, lecturas: 1110, total: 6093 },
            { name: 'C08', value: 24.8, lecturas: 972, total: 3911 },
            { name: 'C09', value: 33.1, lecturas: 1279, total: 3865 },
            { name: 'C10', value: 37.0, lecturas: 863, total: 2439 },
        ]
    },
    comas: {
        promedio: 24.4,
        meta: 15,
        ciclos: [
            { name: 'C01', value: 38.2, lecturas: 291, total: 761 },
            { name: 'C02', value: 43.1, lecturas: 492, total: 1140 },
            { name: 'C03', value: 14.3, lecturas: 121, total: 844 },
            { name: 'C04', value: 12.4, lecturas: 245, total: 1965 },
            { name: 'C05', value: 7.0, lecturas: 167, total: 2360 },
            { name: 'C06', value: 21.2, lecturas: 320, total: 1507 },
            { name: 'C07', value: 18.0, lecturas: 487, total: 2694 },
            { name: 'C08', value: 23.2, lecturas: 313, total: 1349 },
            { name: 'C09', value: 33.9, lecturas: 496, total: 1463 },
            { name: 'C10', value: 32.8, lecturas: 434, total: 1322 },
        ]
    },
    callao: {
        promedio: 18.7,
        meta: 15,
        ciclos: [
            { name: 'C01', value: 19.5, lecturas: 94, total: 481 },
            { name: 'C02', value: 6.6, lecturas: 37, total: 556 },
            { name: 'C03', value: 7.8, lecturas: 32, total: 409 },
            { name: 'C04', value: 22.6, lecturas: 50, total: 221 },
            { name: 'C05', value: 6.1, lecturas: 40, total: 655 },
            { name: 'C06', value: 28.2, lecturas: 131, total: 463 },
            { name: 'C07', value: 26.1, lecturas: 126, total: 482 },
            { name: 'C08', value: 23.2, lecturas: 123, total: 530 },
            { name: 'C09', value: 10.1, lecturas: 74, total: 732 },
            { name: 'C10', value: 36.8, lecturas: 122, total: 331 },
        ]
    },
    ate: {
        promedio: 49.5,
        meta: 15,
        ciclos: [
            { name: 'C01', value: 59.1, lecturas: 341, total: 577 },
            { name: 'C02', value: 55.3, lecturas: 343, total: 620 },
            { name: 'C03', value: 41.4, lecturas: 112, total: 270 },
            { name: 'C04', value: 29.1, lecturas: 72, total: 247 },
            { name: 'C05', value: 40.5, lecturas: 128, total: 316 },
            { name: 'C06', value: 42.2, lecturas: 187, total: 443 },
            { name: 'C07', value: 26.5, lecturas: 139, total: 524 },
            { name: 'C08', value: 67.7, lecturas: 265, total: 391 },
            { name: 'C09', value: 68.6, lecturas: 324, total: 472 },
            { name: 'C10', value: 64.4, lecturas: 118, total: 183 },
        ]
    },
    brena: {
        promedio: 27.5,
        meta: 15,
        ciclos: [
            { name: 'C01', value: 21.3, lecturas: 56, total: 262 },
            { name: 'C02', value: 34.4, lecturas: 152, total: 441 },
            { name: 'C03', value: 25.0, lecturas: 67, total: 268 },
            { name: 'C04', value: 29.9, lecturas: 80, total: 267 },
            { name: 'C05', value: 38.6, lecturas: 101, total: 261 },
            { name: 'C06', value: 24.3, lecturas: 86, total: 353 },
            { name: 'C07', value: 30.2, lecturas: 142, total: 469 },
            { name: 'C08', value: 16.9, lecturas: 66, total: 389 },
            { name: 'C09', value: 27.2, lecturas: 36, total: 132 },
            { name: 'C10', value: 26.7, lecturas: 88, total: 329 },
        ]
    },
    sjl: {
        promedio: 11.3,
        meta: 15,
        ciclos: [
            { name: 'C01', value: 6.0, lecturas: 39, total: 648 },
            { name: 'C02', value: 5.2, lecturas: 23, total: 440 },
            { name: 'C03', value: 8.2, lecturas: 37, total: 450 },
            { name: 'C04', value: 6.3, lecturas: 27, total: 426 },
            { name: 'C05', value: 10.9, lecturas: 58, total: 529 },
            { name: 'C06', value: 14.4, lecturas: 59, total: 408 },
            { name: 'C07', value: 5.2, lecturas: 19, total: 363 },
            { name: 'C08', value: 4.8, lecturas: 16, total: 330 },
            { name: 'C09', value: 26.2, lecturas: 132, total: 502 },
            { name: 'C10', value: 25.8, lecturas: 78, total: 302 },
            { name: 'C11', value: 31.5, lecturas: 42, total: 133 },
        ]
    },
    surquillo: {
        promedio: 15.7,
        meta: 15,
        ciclos: [
            { name: 'C01', value: 21.4, lecturas: 81, total: 378 },
            { name: 'C02', value: 18.0, lecturas: 117, total: 650 },
            { name: 'C03', value: 17.2, lecturas: 103, total: 598 },
            { name: 'C04', value: 19.7, lecturas: 121, total: 612 },
            { name: 'C05', value: 15.3, lecturas: 72, total: 469 },
            { name: 'C06', value: 10.8, lecturas: 52, total: 481 },
            { name: 'C07', value: 10.5, lecturas: 55, total: 521 },
            { name: 'C08', value: 7.3, lecturas: 41, total: 555 },
            { name: 'C09', value: 20.8, lecturas: 92, total: 441 },
        ]
    },
    ves: {
        promedio: 21.4,
        meta: 15,
        ciclos: [
            { name: 'C01', value: 10.8, lecturas: 89, total: 819 },
            { name: 'C02', value: 25.0, lecturas: 199, total: 795 },
            { name: 'C03', value: 19.4, lecturas: 182, total: 937 },
            { name: 'C04', value: 28.5, lecturas: 146, total: 511 },
            { name: 'C05', value: 23.0, lecturas: 147, total: 639 },
            { name: 'C06', value: 19.1, lecturas: 118, total: 615 },
            { name: 'C07', value: 12.9, lecturas: 131, total: 1009 },
            { name: 'C08', value: 26.8, lecturas: 115, total: 429 },
            { name: 'C09', value: 27.2, lecturas: 120, total: 440 },
        ]
    },
    'clientes-e': {
        promedio: 24.6,
        meta: 15,
        ciclos: [
            { name: 'C01', value: 26.5, lecturas: 22, total: 83 },
            { name: 'C02', value: 21.6, lecturas: 27, total: 125 },
            { name: 'C03', value: 25.3, lecturas: 17, total: 67 },
            { name: 'C04', value: 27.9, lecturas: 19, total: 68 },
            { name: 'C05', value: 29.6, lecturas: 19, total: 64 },
            { name: 'C06', value: 31.3, lecturas: 21, total: 67 },
            { name: 'C07', value: 15.4, lecturas: 11, total: 71 },
            { name: 'C08', value: 30.2, lecturas: 13, total: 43 },
            { name: 'C09', value: 23.8, lecturas: 5, total: 21 },
            { name: 'C10', value: 39.2, lecturas: 11, total: 28 },
            { name: 'C11', value: 0.0, lecturas: 0, total: 0 },
        ]
    }
};

export default function ContratistaTomaDeEstadoPage() {
  const [data, setData] = useState(contratistaData.todas);

  const handleBaseChange = (base: string) => {
    setData(contratistaData[base as keyof typeof contratistaData] || contratistaData.todas);
  };
  
  return (
    <div className="max-w-7xl mx-auto flex flex-col gap-8">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <HardHat className="h-8 w-8 text-[hsl(var(--chart-3))]" />
          <h1 className="font-headline text-3xl font-bold text-foreground">Toma de Estado: Contratista</h1>
        </div>
        <BaseSelector onBaseChange={handleBaseChange} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card className="transition-colors hover:bg-primary/10 border shadow-sm">
            <CardHeader className="p-4">
                <CardTitle className="text-xl">Rendimiento por Ciclo - Enero 2026</CardTitle>
            </CardHeader>
            <CardContent className="h-60 p-0 px-2 pb-4">
            <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data.ciclos}>
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
                <Line type="monotone" dataKey="value" name="Rendimiento" stroke="hsl(var(--chart-3))" strokeWidth={3} dot={{ r: 6 }} activeDot={{ r: 8 }} />
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
                    Análisis del rendimiento de <span className="font-semibold text-foreground">Contratistas</span> para el periodo de <span className="font-semibold text-foreground">Enero 2026</span>.
                </p>
                <div className="grid grid-cols-2 gap-6">
                    <div className="border p-6 rounded-xl text-center bg-card shadow-sm">
                        <p className="text-sm font-medium text-muted-foreground mb-1 uppercase tracking-wider">Promedio Simple</p>
                        <p className="text-4xl font-bold text-[hsl(var(--chart-3))]">{data.promedio}%</p>
                    </div>
                     <div className="border p-6 rounded-xl text-center bg-card shadow-sm">
                        <p className="text-sm font-medium text-muted-foreground mb-1 uppercase tracking-wider">Meta (máx)</p>
                        <p className="text-4xl font-bold">{data.meta}%</p>
                    </div>
                </div>
                <div className="mt-2">
                    <h4 className="font-semibold text-lg mb-2">Observaciones</h4>
                    <p className="text-base text-muted-foreground leading-relaxed">
                        El rendimiento del contratista varía significativamente entre ciclos. Es fundamental supervisar los ciclos con desviaciones mayores a la meta del 15%.
                    </p>
                </div>
            </CardContent>
        </Card>
      </div>

       <Card className="transition-colors hover:bg-primary/10 border shadow-sm">
        <CardHeader>
          <CardTitle className="text-xl">Detalle de Rendimiento por Ciclo</CardTitle>
          <p className="text-base text-muted-foreground">
            Desglose porcentual y numérico del rendimiento del contratista en cada ciclo operativo.
          </p>
        </CardHeader>
        <CardContent>
          <div className="max-h-96 overflow-y-auto rounded-md border">
            <Table>
              <TableHeader className="sticky top-0 bg-secondary/50 backdrop-blur-sm">
                <TableRow>
                  <TableHead className="w-[120px] font-bold">Ciclo</TableHead>
                  <TableHead className="font-bold">Lecturas Realizadas</TableHead>
                  <TableHead className="font-bold">Total Lecturas</TableHead>
                  <TableHead className="text-right font-bold">Rendimiento (%)</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.ciclos.map((ciclo) => (
                  <TableRow key={ciclo.name}>
                    <TableCell className="font-semibold">{ciclo.name}</TableCell>
                    <TableCell>{ciclo.lecturas.toLocaleString()}</TableCell>
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
