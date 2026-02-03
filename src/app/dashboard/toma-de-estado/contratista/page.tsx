
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
          <h1 className="font-headline text-3xl font-bold">Toma de Estado: Contratista</h1>
        </div>
        <BaseSelector onBaseChange={handleBaseChange} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        <div className="flex flex-col gap-8">
            <Card className="transition-colors hover:bg-primary/10 border shadow-sm">
                <CardHeader className="pb-4">
                    <CardTitle className="text-xl">Resumen del Indicador</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col gap-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="border p-4 rounded-xl text-center bg-card shadow-sm">
                            <p className="text-xs font-medium text-muted-foreground mb-1 uppercase tracking-wider">Promedio Periodo</p>
                            <p className="text-3xl font-bold text-[hsl(var(--chart-3))]">{data.promedio}%</p>
                        </div>
                         <div className="border p-4 rounded-xl text-center bg-card shadow-sm">
                            <p className="text-xs font-medium text-muted-foreground mb-1 uppercase tracking-wider">Meta (máx)</p>
                            <p className="text-3xl font-bold">{data.meta}%</p>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Card className="transition-colors hover:bg-primary/10 border shadow-sm">
                <CardHeader className="p-4">
                    <CardTitle className="text-xl">Rendimiento por Ciclo (%)</CardTitle>
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
        </div>

        <Card className="transition-colors hover:bg-primary/10 border shadow-sm">
            <CardHeader>
                <CardTitle className="text-xl">Detalle de Rendimiento por Ciclo</CardTitle>
            </CardHeader>
            <CardContent>
            <div className="rounded-md border overflow-hidden">
                <Table>
                <TableHeader className="bg-secondary/50">
                    <TableRow>
                    <TableHead className="w-[120px] font-bold">Ciclo</TableHead>
                    <TableHead className="font-bold text-center">Lecturas Realizadas</TableHead>
                    <TableHead className="font-bold text-center">Total Lecturas</TableHead>
                    <TableHead className="font-bold text-center">Rendimiento (%)</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {data.ciclos.map((ciclo) => (
                    <TableRow key={ciclo.name}>
                        <TableCell className="font-semibold">{ciclo.name}</TableCell>
                        <TableCell className="text-center">{ciclo.lecturas.toLocaleString()}</TableCell>
                        <TableCell className="text-center">{ciclo.total.toLocaleString()}</TableCell>
                        <TableCell className="text-center font-medium">{ciclo.value}%</TableCell>
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
