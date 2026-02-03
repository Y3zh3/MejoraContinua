"use client";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, ReferenceLine } from 'recharts';
import { ShieldCheck } from "lucide-react";
import { BaseSelector } from "@/components/base-selector";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const preventivasData = {
    todas: {
        promedio: 78.4,
        meta: 85,
        ciclos: [
            { name: 'C01', value: 82.0, prev: 14245, total: 17369, meta: 85 },
            { name: 'C02', value: 81.1, prev: 15263, total: 18834, meta: 85 },
            { name: 'C03', value: 81.3, prev: 11964, total: 14721, meta: 85 },
            { name: 'C04', value: 77.2, prev: 11536, total: 14941, meta: 85 },
            { name: 'C05', value: 79.5, prev: 13385, total: 16834, meta: 85 },
        ]
    },
    comas: {
        promedio: 0,
        meta: 85,
        ciclos: [
            { name: 'C01', value: 0, prev: 0, total: 0, meta: 85 },
            { name: 'C02', value: 0, prev: 0, total: 0, meta: 85 },
            { name: 'C03', value: 0, prev: 0, total: 0, meta: 85 },
            { name: 'C04', value: 0, prev: 0, total: 0, meta: 85 },
            { name: 'C05', value: 0, prev: 0, total: 0, meta: 85 },
        ]
    },
    callao: {
        promedio: 86.3,
        meta: 85,
        ciclos: [
            { name: 'C01', value: 84.0, prev: 2272, total: 2706, meta: 85 },
            { name: 'C02', value: 89.1, prev: 2836, total: 3182, meta: 85 },
            { name: 'C03', value: 88.3, prev: 3267, total: 3699, meta: 85 },
            { name: 'C04', value: 82.9, prev: 2906, total: 3505, meta: 85 },
            { name: 'C05', value: 86.9, prev: 3063, total: 3525, meta: 85 },
        ]
    },
    ate: {
        promedio: 83.0,
        meta: 85,
        ciclos: [
            { name: 'C01', value: 83.2, prev: 2497, total: 3002, meta: 85 },
            { name: 'C02', value: 81.0, prev: 4328, total: 5344, meta: 85 },
            { name: 'C03', value: 85.3, prev: 1877, total: 2200, meta: 85 },
            { name: 'C04', value: 83.0, prev: 3199, total: 3854, meta: 85 },
            { name: 'C05', value: 84.3, prev: 1851, total: 2197, meta: 85 },
        ]
    },
    brena: {
        promedio: 72.5,
        meta: 85,
        ciclos: [
            { name: 'C01', value: 82.3, prev: 2647, total: 3218, meta: 85 },
            { name: 'C02', value: 72.2, prev: 1531, total: 2120, meta: 85 },
            { name: 'C03', value: 70.6, prev: 1368, total: 1938, meta: 85 },
            { name: 'C04', value: 69.7, prev: 1533, total: 2198, meta: 85 },
            { name: 'C05', value: 67.9, prev: 1471, total: 2166, meta: 85 },
        ]
    },
    sjl: {
        promedio: 82.8,
        meta: 85,
        ciclos: [
            { name: 'C01', value: 83.5, prev: 3449, total: 4129, meta: 85 },
            { name: 'C02', value: 84.0, prev: 2448, total: 2913, meta: 85 },
            { name: 'C03', value: 81.4, prev: 2685, total: 3300, meta: 85 },
            { name: 'C04', value: 78.9, prev: 1634, total: 2072, meta: 85 },
            { name: 'C05', value: 82.3, prev: 2820, total: 3428, meta: 85 },
        ]
    },
    surquillo: {
        promedio: 80.2,
        meta: 85,
        ciclos: [
            { name: 'C01', value: 75.1, prev: 985, total: 1311, meta: 85 },
            { name: 'C02', value: 83.6, prev: 1903, total: 2277, meta: 85 },
            { name: 'C03', value: 80.4, prev: 1591, total: 1980, meta: 85 },
            { name: 'C04', value: 80.3, prev: 1895, total: 2360, meta: 85 },
            { name: 'C05', value: 81.4, prev: 1781, total: 2189, meta: 85 },
        ]
    },
    ves: {
        promedio: 75.4,
        meta: 85,
        ciclos: [
            { name: 'C01', value: 79.8, prev: 2395, total: 3003, meta: 85 },
            { name: 'C02', value: 74.0, prev: 2217, total: 2998, meta: 85 },
            { name: 'C03', value: 71.6, prev: 2152, total: 3004, meta: 85 },
            { name: 'C04', value: 71.8, prev: 1903, total: 2652, meta: 85 },
            { name: 'C05', value: 79.7, prev: 2399, total: 3009, meta: 85 },
        ]
    },
    'clientes-e': {
        promedio: 100,
        meta: 85,
        ciclos: [
            { name: 'C01', value: 100, prev: 50, total: 50, meta: 85 },
            { name: 'C02', value: 100, prev: 50, total: 50, meta: 85 },
            { name: 'C03', value: 100, prev: 50, total: 50, meta: 85 },
            { name: 'C04', value: 100, prev: 50, total: 50, meta: 85 },
            { name: 'C05', value: 100, prev: 50, total: 50, meta: 85 },
        ]
    }
};

export default function PreventivasComunicadosPage() {
  const [data, setData] = useState(preventivasData.todas);

  const handleBaseChange = (base: string) => {
    setData(preventivasData[base as keyof typeof preventivasData] || preventivasData.todas);
  };
  
  return (
    <div className="max-w-7xl mx-auto flex flex-col gap-8">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
            <ShieldCheck className="h-8 w-8 text-[hsl(var(--chart-2))]" />
            <h1 className="font-headline text-3xl font-bold">Comunicados: Preventivas</h1>
        </div>
        <BaseSelector onBaseChange={handleBaseChange} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        <div className="flex flex-col gap-8">
            <Card className="transition-colors hover:bg-primary/10 border shadow-sm">
                <CardHeader>
                    <CardTitle className="text-xl">Resumen del Indicador</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col gap-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="border p-4 rounded-xl text-center bg-card shadow-sm">
                            <p className="text-xs font-medium text-muted-foreground mb-1 uppercase tracking-wider">Promedio Periodo</p>
                            <p className="text-3xl font-bold text-[hsl(var(--chart-2))]">{data.promedio}%</p>
                        </div>
                         <div className="border p-4 rounded-xl text-center bg-card shadow-sm">
                            <p className="text-xs font-medium text-muted-foreground mb-1 uppercase tracking-wider">Meta</p>
                            <p className="text-3xl font-bold">{data.meta}%</p>
                        </div>
                    </div>
                    <div>
                        <h4 className="font-semibold text-base mb-1 uppercase tracking-tight text-muted-foreground">Observaciones</h4>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                            Análisis del cumplimiento de Comunicaciones Preventivas. El cumplimiento preventivo es clave para la reducción de reclamos.
                        </p>
                    </div>
                </CardContent>
            </Card>

            <Card className="transition-colors hover:bg-primary/10 border shadow-sm">
                <CardHeader className="p-4">
                    <CardTitle className="text-xl">Tendencia de Cumplimiento (%)</CardTitle>
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
                            formatter={(value: number) => `${value.toFixed(1)}%`}
                        />
                        <Legend />
                        <Line type="monotone" dataKey="value" name="Cumplimiento" stroke="hsl(var(--chart-2))" strokeWidth={3} dot={{ r: 6 }} activeDot={{ r: 8 }} />
                        <ReferenceLine y={85} label="Meta" stroke="hsl(var(--destructive))" strokeDasharray="3 3" />
                    </LineChart>
                </ResponsiveContainer>
                </CardContent>
            </Card>
        </div>

        <Card className="transition-colors hover:bg-primary/10 border shadow-sm h-full flex flex-col">
            <CardHeader>
                <CardTitle className="text-xl">Detalle de Cumplimiento Preventivo</CardTitle>
            </CardHeader>
            <CardContent className="flex-1">
            <div className="max-h-[500px] overflow-y-auto rounded-md border">
                <Table>
                <TableHeader className="sticky top-0 bg-secondary/50 backdrop-blur-sm z-10">
                    <TableRow>
                    <TableHead className="w-[120px] font-bold">Ciclo</TableHead>
                    <TableHead className="font-bold">Prev Sin</TableHead>
                    <TableHead className="font-bold">Total</TableHead>
                    <TableHead className="text-right font-bold">Cumplimiento (%)</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {data.ciclos.map((item) => (
                    <TableRow key={item.name}>
                        <TableCell className="font-semibold">{item.name}</TableCell>
                        <TableCell>{item.prev.toLocaleString()}</TableCell>
                        <TableCell>{item.total.toLocaleString()}</TableCell>
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