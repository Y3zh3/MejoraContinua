"use client";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, ReferenceLine } from 'recharts';
import { AlertTriangle } from "lucide-react";
import { BaseSelector } from '@/components/base-selector';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const atipicasData = {
    todas: {
        promedio: 81.3,
        meta: 85,
        ciclos: [
            { name: 'C01', cfirma: 1659, total: 2050, value: 80.9, meta: 85 },
            { name: 'C02', cfirma: 1150, total: 1470, value: 78.2, meta: 85 },
            { name: 'C03', cfirma: 1246, total: 1440, value: 86.5, meta: 85 },
            { name: 'C04', cfirma: 1368, total: 1654, value: 82.7, meta: 85 },
            { name: 'C05', cfirma: 1002, total: 1282, value: 78.2, meta: 85 },
            { name: 'C06', cfirma: 938, total: 1165, value: 80.5, meta: 85 },
            { name: 'C07', cfirma: 842, total: 1095, value: 76.9, meta: 85 },
            { name: 'C08', cfirma: 831, total: 1041, value: 79.8, meta: 85 },
            { name: 'C09', cfirma: 828, total: 1042, value: 79.5, meta: 85 },
            { name: 'C10', cfirma: 547, total: 648, value: 84.4, meta: 85 },
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
                            <p className="text-3xl font-bold text-[hsl(var(--chart-1))]">{data.promedio}%</p>
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
                    <CardTitle className="text-xl">Comparativa de Rendimiento (%)</CardTitle>
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
                        formatter={(value: number) => `${value}%`}
                    />
                    <Legend />
                    <Bar dataKey="value" name="Rendimiento" fill="hsl(var(--chart-1))" radius={[4, 4, 0, 0]} />
                    <ReferenceLine y={85} label="Meta" stroke="hsl(var(--destructive))" strokeDasharray="3 3" />
                    </BarChart>
                </ResponsiveContainer>
                </CardContent>
            </Card>
        </div>

        <Card className="border shadow-sm h-full flex flex-col">
            <CardHeader>
                <CardTitle className="text-xl">Detalle de Rendimiento Atípico</CardTitle>
            </CardHeader>
            <CardContent className="flex-1">
            <div className="max-h-[500px] overflow-y-auto rounded-md border">
                <Table>
                <TableHeader className="sticky top-0 bg-secondary/50 backdrop-blur-sm z-10">
                    <TableRow>
                    <TableHead className="w-[120px] font-bold">Ciclo</TableHead>
                    <TableHead className="font-bold">C/Firma</TableHead>
                    <TableHead className="font-bold">Total</TableHead>
                    <TableHead className="text-right font-bold">Rendimiento (%)</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {data.ciclos.map((item) => (
                    <TableRow key={item.name}>
                        <TableCell className="font-semibold">{item.name}</TableCell>
                        <TableCell className="text-right">{item.cfirma.toLocaleString()}</TableCell>
                        <TableCell className="text-right">{item.total.toLocaleString()}</TableCell>
                        <TableCell className={`text-right font-medium ${item.value < item.meta ? "text-destructive" : ""}`}>
                            {item.value}%
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