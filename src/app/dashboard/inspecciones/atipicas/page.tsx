
"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, ReferenceLine } from 'recharts';
import { AlertTriangle } from "lucide-react";
import { BaseSelector } from "@/components/base-selector";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const atipicasData = {
    todas: {
        promedio: 78.2,
        meta: 85,
        ciclos: [
            { name: 'C1', efectivo: 1368, total: 1959, value: 69.8, meta: 85 },
            { name: 'C2', efectivo: 1470, total: 1641, value: 89.6, meta: 85 },
            { name: 'C3', efectivo: 1259, total: 1613, value: 78.1, meta: 85 },
            { name: 'C4', efectivo: 1309, total: 1722, value: 76.0, meta: 85 },
            { name: 'C5', efectivo: 970, total: 1239, value: 78.3, meta: 85 },
            { name: 'C6', efectivo: 931, total: 1163, value: 80.1, meta: 85 },
            { name: 'C7', efectivo: 901, total: 1136, value: 79.3, meta: 85 },
            { name: 'C8', efectivo: 760, total: 909, value: 83.6, meta: 85 },
            { name: 'C9', efectivo: 851, total: 1210, value: 70.3, meta: 85 },
            { name: 'C10', efectivo: 563, total: 647, value: 87.0, meta: 85 },
        ]
    },
    comas: {
        promedio: 82.5,
        meta: 85,
        ciclos: [
            { name: 'C1', efectivo: 235, total: 306, value: 76.8, meta: 85 },
            { name: 'C2', efectivo: 298, total: 381, value: 78.2, meta: 85 },
            { name: 'C3', efectivo: 297, total: 395, value: 75.2, meta: 85 },
            { name: 'C4', efectivo: 232, total: 287, value: 80.8, meta: 85 },
            { name: 'C5', efectivo: 169, total: 201, value: 84.1, meta: 85 },
            { name: 'C6', efectivo: 274, total: 322, value: 85.1, meta: 85 },
            { name: 'C7', efectivo: 255, total: 286, value: 89.2, meta: 85 },
            { name: 'C8', efectivo: 189, total: 215, value: 87.9, meta: 85 },
            { name: 'C9', efectivo: 233, total: 255, value: 91.4, meta: 85 },
            { name: 'C10', efectivo: 197, total: 219, value: 90.0, meta: 85 },
        ]
    },
    callao: {
        promedio: 84.2,
        meta: 85,
        ciclos: [
            { name: 'C1', efectivo: 97, total: 112, value: 86.6, meta: 85 },
            { name: 'C2', efectivo: 118, total: 145, value: 81.4, meta: 85 },
            { name: 'C3', efectivo: 184, total: 216, value: 85.2, meta: 85 },
            { name: 'C4', efectivo: 138, total: 168, value: 82.1, meta: 85 },
            { name: 'C5', efectivo: 112, total: 134, value: 83.6, meta: 85 },
            { name: 'C6', efectivo: 111, total: 122, value: 91.0, meta: 85 },
            { name: 'C7', efectivo: 123, total: 130, value: 94.6, meta: 85 },
            { name: 'C8', efectivo: 134, total: 141, value: 95.0, meta: 85 },
            { name: 'C9', efectivo: 143, total: 150, value: 95.3, meta: 85 },
            { name: 'C10', efectivo: 159, total: 188, value: 84.6, meta: 85 },
        ]
    },
    ate: {
        promedio: 73.0,
        meta: 85,
        ciclos: [
            { name: 'C1', efectivo: 436, total: 787, value: 55.4, meta: 85 },
            { name: 'C2', efectivo: 198, total: 296, value: 66.9, meta: 85 },
            { name: 'C3', efectivo: 202, total: 272, value: 74.3, meta: 85 },
            { name: 'C4', efectivo: 193, total: 298, value: 64.8, meta: 85 },
            { name: 'C5', efectivo: 128, total: 183, value: 69.9, meta: 85 },
            { name: 'C6', efectivo: 147, total: 202, value: 72.8, meta: 85 },
            { name: 'C7', efectivo: 143, total: 180, value: 79.4, meta: 85 },
            { name: 'C8', efectivo: 150, total: 194, value: 77.3, meta: 85 },
            { name: 'C9', efectivo: 146, total: 190, value: 76.8, meta: 85 },
            { name: 'C10', efectivo: 79, total: 100, value: 79.0, meta: 85 },
        ]
    },
    brena: {
        promedio: 84.8,
        meta: 85,
        ciclos: [
            { name: 'C1', efectivo: 117, total: 135, value: 86.7, meta: 85 },
            { name: 'C2', efectivo: 163, total: 196, value: 83.2, meta: 85 },
            { name: 'C3', efectivo: 63, total: 78, value: 80.8, meta: 85 },
            { name: 'C4', efectivo: 145, total: 167, value: 86.8, meta: 85 },
            { name: 'C5', efectivo: 116, total: 133, value: 87.2, meta: 85 },
            { name: 'C6', efectivo: 34, total: 42, value: 81.0, meta: 85 },
            { name: 'C7', efectivo: 67, total: 77, value: 87.0, meta: 85 },
            { name: 'C8', efectivo: 46, total: 54, value: 85.2, meta: 85 },
            { name: 'C9', efectivo: 49, total: 58, value: 84.5, meta: 85 },
            { name: 'C10', efectivo: 59, total: 69, value: 85.5, meta: 85 },
        ]
    },
    sjl: {
        promedio: 89.9,
        meta: 85,
        ciclos: [
            { name: 'C1', efectivo: 145, total: 171, value: 84.8, meta: 85 },
            { name: 'C2', efectivo: 121, total: 139, value: 87.1, meta: 85 },
            { name: 'C3', efectivo: 160, total: 184, value: 87.0, meta: 85 },
            { name: 'C4', efectivo: 120, total: 133, value: 90.2, meta: 85 },
            { name: 'C5', efectivo: 104, total: 117, value: 88.9, meta: 85 },
            { name: 'C6', efectivo: 75, total: 78, value: 96.2, meta: 85 },
            { name: 'C7', efectivo: 82, total: 93, value: 88.2, meta: 85 },
            { name: 'C8', efectivo: 61, total: 68, value: 89.7, meta: 85 },
            { name: 'C9', efectivo: 56, total: 63, value: 88.9, meta: 85 },
            { name: 'C10', efectivo: 69, total: 71, value: 97.2, meta: 85 },
        ]
    },
    surquillo: {
        promedio: 78.4,
        meta: 85,
        ciclos: [
            { name: 'C1', efectivo: 125, total: 157, value: 79.6, meta: 85 },
            { name: 'C2', efectivo: 131, total: 175, value: 74.9, meta: 85 },
            { name: 'C3', efectivo: 147, total: 187, value: 78.6, meta: 85 },
            { name: 'C4', efectivo: 275, total: 368, value: 74.7, meta: 85 },
            { name: 'C5', efectivo: 188, total: 243, value: 77.4, meta: 85 },
            { name: 'C6', efectivo: 146, total: 200, value: 73.0, meta: 85 },
            { name: 'C7', efectivo: 121, total: 152, value: 79.6, meta: 85 },
            { name: 'C8', efectivo: 83, total: 104, value: 79.8, meta: 85 },
            { name: 'C9', efectivo: 130, total: 156, value: 83.3, meta: 85 },
        ]
    },
    ves: {
        promedio: 61.2,
        meta: 85,
        ciclos: [
            { name: 'C1', efectivo: 212, total: 287, value: 73.9, meta: 85 },
            { name: 'C2', efectivo: 221, total: 308, value: 71.8, meta: 85 },
            { name: 'C3', efectivo: 205, total: 280, value: 73.2, meta: 85 },
            { name: 'C4', efectivo: 204, total: 298, value: 68.5, meta: 85 },
            { name: 'C5', efectivo: 153, total: 228, value: 67.1, meta: 85 },
            { name: 'C6', efectivo: 144, total: 197, value: 73.1, meta: 85 },
            { name: 'C7', efectivo: 109, total: 217, value: 50.2, meta: 85 },
            { name: 'C8', efectivo: 97, total: 133, value: 72.9, meta: 85 },
            { name: 'C9', efectivo: 94, total: 338, value: 27.8, meta: 85 },
        ]
    },
    'clientes-e': {
        promedio: 60.0,
        meta: 85,
        ciclos: [
            { name: 'C1', efectivo: 1, total: 3, value: 33.3, meta: 85 },
            { name: 'C2', efectivo: 0, total: 1, value: 0.0, meta: 85 },
            { name: 'C3', efectivo: 1, total: 1, value: 100, meta: 85 },
            { name: 'C4', efectivo: 2, total: 3, value: 66.7, meta: 85 },
            { name: 'C7', efectivo: 1, total: 1, value: 100, meta: 85 },
        ]
    }
};

export default function AtipicasInspeccionesPage() {
  const [data, setData] = useState(atipicasData.todas);

  const handleBaseChange = (base: string) => {
    setData(atipicasData[base as keyof typeof atipicasData] || atipicasData.todas);
  };
  
  return (
    <div className="max-w-7xl mx-auto flex flex-col gap-8">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <AlertTriangle className="h-8 w-8 text-[hsl(var(--chart-4))]" />
          <h1 className="font-headline text-3xl font-bold">Inspecciones: Atípicas</h1>
        </div>
        <BaseSelector onBaseChange={handleBaseChange} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card className="transition-colors hover:bg-primary/10 border shadow-sm">
            <CardHeader className="p-4">
                <CardTitle className="text-xl">Rendimiento por Ciclo (%)</CardTitle>
            </CardHeader>
            <CardContent className="h-80 p-0 px-2 pb-4">
            <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data.ciclos}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="name" />
                  <YAxis domain={[0, 110]} unit="%"/>
                  <Tooltip
                      contentStyle={{
                      background: "hsl(var(--card))",
                      borderColor: "hsl(var(--border))",
                      borderRadius: "8px",
                      }}
                      formatter={(value: number) => `${value.toFixed(1)}%`}
                  />
                  <Legend />
                  <Bar 
                    dataKey="value" 
                    name="Rendimiento" 
                    fill="hsl(var(--chart-4))" 
                    radius={[4, 4, 0, 0]}
                  />
                  <ReferenceLine y={85} label="Meta" stroke="hsl(var(--destructive))" strokeDasharray="3 3" />
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
                    Análisis del indicador de <span className="font-semibold text-foreground">Inspecciones Atípicas</span> para el periodo actual.
                </p>
                <div className="grid grid-cols-2 gap-6">
                    <div className="border p-6 rounded-xl text-center bg-card shadow-sm">
                        <p className="text-sm font-medium text-muted-foreground mb-1 uppercase tracking-wider">Promedio del periodo</p>
                        <p className="text-4xl font-bold text-[hsl(var(--chart-4))]">{data.promedio}%</p>
                    </div>
                     <div className="border p-6 rounded-xl text-center bg-card shadow-sm">
                        <p className="text-sm font-medium text-muted-foreground mb-1 uppercase tracking-wider">Meta establecida</p>
                        <p className="text-4xl font-bold">{data.meta}%</p>
                    </div>
                </div>
                <div className="mt-2">
                    <h4 className="font-semibold text-lg mb-2">Observaciones</h4>
                    <p className="text-base text-muted-foreground leading-relaxed">
                        El gráfico muestra el nivel de cumplimiento frente a la meta del 85%. Los ciclos que no alcanzan el objetivo requieren una revisión detallada de las causas de no efectividad.
                    </p>
                </div>
            </CardContent>
        </Card>
      </div>

      <Card className="transition-colors hover:bg-primary/10 border shadow-sm">
        <CardHeader>
            <CardTitle className="text-xl">Detalle de Rendimiento por Ciclo</CardTitle>
            <p className="text-base text-muted-foreground">
            Desglose porcentual y numérico del rendimiento de inspecciones atípicas por cada ciclo operativo.
            </p>
        </CardHeader>
        <CardContent>
            <div className="max-h-96 overflow-y-auto rounded-md border">
            <Table className="text-base">
                <TableHeader className="sticky top-0 bg-secondary/50 backdrop-blur-sm">
                <TableRow>
                    <TableHead className="w-[150px] font-bold">Ciclo</TableHead>
                    <TableHead className="font-bold">C/Ingreso</TableHead>
                    <TableHead className="font-bold">Total</TableHead>
                    <TableHead className="font-bold">Rendimiento (%)</TableHead>
                    <TableHead className="text-right font-bold">Meta (%)</TableHead>
                </TableRow>
                </TableHeader>
                <TableBody>
                {data.ciclos.map((item) => (
                    <TableRow key={item.name}>
                    <TableCell className="font-semibold">{item.name}</TableCell>
                    <TableCell>{item.efectivo.toLocaleString()}</TableCell>
                    <TableCell>{item.total.toLocaleString()}</TableCell>
                    <TableCell className={item.value < item.meta ? "text-destructive font-bold" : "text-foreground"}>
                        {item.value.toFixed(1)}%
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
