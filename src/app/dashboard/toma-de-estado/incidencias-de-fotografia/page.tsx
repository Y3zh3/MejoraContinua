"use client";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, ReferenceLine } from 'recharts';
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
            <h1 className="font-headline text-3xl font-bold">Toma de Estado: Incidencias</h1>
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
                            <p className="text-3xl font-bold text-[hsl(var(--chart-4))]">{data.promedio}%</p>
                        </div>
                         <div className="border p-4 rounded-xl text-center bg-card shadow-sm">
                            <p className="text-xs font-medium text-muted-foreground mb-1 uppercase tracking-wider">Meta (máx)</p>
                            <p className="text-3xl font-bold">{data.meta}%</p>
                        </div>
                    </div>
                    <div>
                        <h4 className="font-semibold text-base mb-1 uppercase tracking-tight text-muted-foreground">Observaciones</h4>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                            Evolución de incidencias de fotografía. La meta máxima permitida es del 5% para garantizar la calidad del proceso.
                        </p>
                    </div>
                </CardContent>
            </Card>

            <Card className="transition-colors hover:bg-primary/10 border shadow-sm">
                <CardHeader className="p-4">
                    <CardTitle className="text-xl">Evolución de Incidencia (%)</CardTitle>
                </CardHeader>
                <CardContent className="h-60 p-0 px-2 pb-4">
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
                        <Area type="monotone" dataKey="value" name="Incidencia" stroke="hsl(var(--chart-4))" fillOpacity={1} fill="url(#colorIncidencia)" strokeWidth={3} />
                        <ReferenceLine y={5} label="Meta" stroke="hsl(var(--destructive))" strokeDasharray="3 3" />
                    </AreaChart>
                </ResponsiveContainer>
                </CardContent>
            </Card>
        </div>

        <Card className="transition-colors hover:bg-primary/10 border shadow-sm h-full flex flex-col">
            <CardHeader>
                <CardTitle className="text-xl">Detalle de Incidencias por Ciclo</CardTitle>
            </CardHeader>
            <CardContent className="flex-1">
            <div className="max-h-[500px] overflow-y-auto rounded-md border">
                <Table>
                <TableHeader className="sticky top-0 bg-secondary/50 backdrop-blur-sm z-10">
                    <TableRow>
                    <TableHead className="w-[120px] font-bold">Ciclo</TableHead>
                    <TableHead className="font-bold">Incidencias</TableHead>
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
    </div>
  );
}