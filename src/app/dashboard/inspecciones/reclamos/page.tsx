
"use client";
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, ReferenceLine } from 'recharts';
import { FileWarning } from "lucide-react";
import { BaseSelector } from "@/components/base-selector";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const reclamosData = {
    todas: {
        promedio: 81.4,
        meta: 85,
        ciclos: [
            { name: '02-01-26', cingreso: 11, total: 13, value: 84.6, meta: 85 },
            { name: '03-01-26', cingreso: 4, total: 4, value: 100, meta: 85 },
            { name: '05-01-26', cingreso: 251, total: 321, value: 78.2, meta: 85 },
            { name: '06-01-26', cingreso: 201, total: 271, value: 74.2, meta: 85 },
            { name: '07-01-26', cingreso: 221, total: 291, value: 75.9, meta: 85 },
            { name: '08-01-26', cingreso: 251, total: 311, value: 80.7, meta: 85 },
            { name: '09-01-26', cingreso: 228, total: 282, value: 80.9, meta: 85 },
            { name: '12-01-26', cingreso: 181, total: 243, value: 74.5, meta: 85 },
            { name: '13-01-26', cingreso: 191, total: 236, value: 80.9, meta: 85 },
            { name: '14-01-26', cingreso: 211, total: 261, value: 80.8, meta: 85 },
            { name: '15-01-26', cingreso: 201, total: 243, value: 82.7, meta: 85 },
            { name: '16-01-26', cingreso: 181, total: 243, value: 74.5, meta: 85 },
            { name: '19-01-26', cingreso: 241, total: 311, value: 77.5, meta: 85 },
            { name: '20-01-26', cingreso: 211, total: 243, value: 86.8, meta: 85 },
            { name: '21-01-26', cingreso: 221, total: 261, value: 84.7, meta: 85 },
            { name: '22-01-26', cingreso: 231, total: 282, value: 81.9, meta: 85 },
            { name: '23-01-26', cingreso: 241, total: 291, value: 82.8, meta: 85 },
            { name: '26-01-26', cingreso: 251, total: 301, value: 83.4, meta: 85 }
        ]
    }
};

export default function ReclamosInspeccionesPage() {
  const [isMounted, setIsMounted] = useState(false);
  const [data, setData] = useState(reclamosData.todas);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleBaseChange = (base: string) => {
    setData(reclamosData[base as keyof typeof reclamosData] || reclamosData.todas);
  };

  if (!isMounted) return null;
  
  return (
    <div className="max-w-7xl mx-auto flex flex-col gap-8">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
            <FileWarning className="h-8 w-8 text-[hsl(var(--chart-5))]" />
            <h1 className="font-headline text-3xl font-bold">Inspecciones: Reclamos</h1>
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
                            <p className="text-3xl font-bold text-[hsl(var(--chart-5))]">{data.promedio}%</p>
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
                        <Line type="monotone" dataKey="value" name="Cumplimiento" stroke="hsl(var(--chart-5))" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                        <ReferenceLine y={85} label="Meta" stroke="hsl(var(--destructive))" strokeDasharray="3 3" />
                    </LineChart>
                </ResponsiveContainer>
                </CardContent>
            </Card>
        </div>

        <Card className="border shadow-sm h-full flex flex-col">
            <CardHeader>
                <CardTitle className="text-xl">Detalle de Cumplimiento por Fecha</CardTitle>
            </CardHeader>
            <CardContent className="flex-1">
            <div className="max-h-[500px] overflow-y-auto rounded-md border">
                <Table>
                <TableHeader className="sticky top-0 bg-secondary/50 backdrop-blur-sm z-10">
                    <TableRow>
                    <TableHead className="w-[120px] font-bold">Fecha</TableHead>
                    <TableHead className="font-bold text-right">C./Ingreso</TableHead>
                    <TableHead className="font-bold text-right">Total</TableHead>
                    <TableHead className="text-right font-bold">Cumplimiento (%)</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {data.ciclos.map((item) => (
                    <TableRow key={item.name}>
                        <TableCell className="font-semibold">{item.name}</TableCell>
                        <TableCell className="text-right">{item.cingreso.toLocaleString()}</TableCell>
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
