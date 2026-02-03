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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        <div className="flex flex-col gap-8">
            <Card className="border shadow-sm">
                <CardHeader className="pb-2">
                    <CardTitle className="text-xl">Resumen del Indicador</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="border p-4 rounded-xl text-center bg-card shadow-sm">
                            <p className="text-xs font-medium text-muted-foreground mb-1 uppercase tracking-wider">Promedio Periodo</p>
                            <p className="text-3xl font-bold text-[hsl(var(--chart-4))]">{data.promedio}%</p>
                        </div>
                         <div className="border p-4 rounded-xl text-center bg-card shadow-sm">
                            <p className="text-xs font-medium text-muted-foreground mb-1 uppercase tracking-wider">Meta</p>
                            <p className="text-3xl font-bold">{data.meta}%</p>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Card className="border shadow-sm">
                <CardHeader className="pb-4">
                    <CardTitle className="text-xl">Rendimiento por Ciclo (%)</CardTitle>
                </CardHeader>
                <CardContent className="h-60 p-0 px-2 pb-4">
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
                        <Bar dataKey="value" name="Rendimiento" fill="hsl(var(--chart-4))" radius={[4, 4, 0, 0]} />
                        <ReferenceLine y={85} label="Meta" stroke="hsl(var(--destructive))" strokeDasharray="3 3" />
                    </BarChart>
                </ResponsiveContainer>
                </CardContent>
            </Card>
        </div>

        <Card className="border shadow-sm h-full flex flex-col">
            <CardHeader>
                <CardTitle className="text-xl">Detalle de Rendimiento por Ciclo</CardTitle>
            </CardHeader>
            <CardContent className="flex-1">
            <div className="max-h-[500px] overflow-y-auto rounded-md border">
                <Table>
                <TableHeader className="sticky top-0 bg-secondary/50 backdrop-blur-sm z-10">
                    <TableRow>
                    <TableHead className="w-[120px] font-bold">Ciclo</TableHead>
                    <TableHead className="font-bold">C/Ingreso</TableHead>
                    <TableHead className="font-bold">Total</TableHead>
                    <TableHead className="text-right font-bold">Rendimiento (%)</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {data.ciclos.map((item) => (
                    <TableRow key={item.name}>
                        <TableCell className="font-semibold">{item.name}</TableCell>
                        <TableCell className="text-right">{item.efectivo.toLocaleString()}</TableCell>
                        <TableCell className="text-right">{item.total.toLocaleString()}</TableCell>
                        <TableCell className={`text-right font-medium ${item.value < item.meta ? "text-destructive" : ""}`}>
                            {item.value.toFixed(1)}%
                        </TableCell>
                    </TableRow>
                    ))}
                </TableBody>
                </Table>
            </div>
            </CardContent>
        </Card>
      </div>
    </div>
  );
}