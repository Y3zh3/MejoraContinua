
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
            { name: 'C11', cfirma: 37, total: 61, value: 60.7, meta: 85 },
        ]
    },
    comas: {
        promedio: 83.7,
        meta: 85,
        ciclos: [
            { name: 'C01', cfirma: 264, total: 306, value: 86.3, meta: 85 },
            { name: 'C02', cfirma: 324, total: 381, value: 85.0, meta: 85 },
            { name: 'C03', cfirma: 337, total: 395, value: 85.3, meta: 85 },
            { name: 'C04', cfirma: 238, total: 287, value: 82.9, meta: 85 },
            { name: 'C05', cfirma: 176, total: 201, value: 87.6, meta: 85 },
            { name: 'C06', cfirma: 264, total: 322, value: 82.0, meta: 85 },
            { name: 'C07', cfirma: 222, total: 286, value: 77.6, meta: 85 },
            { name: 'C08', cfirma: 181, total: 215, value: 84.2, meta: 85 },
            { name: 'C09', cfirma: 214, total: 255, value: 83.9, meta: 85 },
            { name: 'C10', cfirma: 180, total: 219, value: 82.2, meta: 85 },
        ]
    },
    callao: {
        promedio: 84.7,
        meta: 85,
        ciclos: [
            { name: 'C01', cfirma: 97, total: 112, value: 86.6, meta: 85 },
            { name: 'C02', cfirma: 128, total: 145, value: 88.3, meta: 85 },
            { name: 'C03', cfirma: 179, total: 216, value: 82.9, meta: 85 },
            { name: 'C04', cfirma: 146, total: 168, value: 86.9, meta: 85 },
            { name: 'C05', cfirma: 118, total: 134, value: 88.1, meta: 85 },
            { name: 'C06', cfirma: 104, total: 122, value: 85.2, meta: 85 },
            { name: 'C07', cfirma: 118, total: 130, value: 90.8, meta: 85 },
            { name: 'C08', cfirma: 120, total: 141, value: 85.1, meta: 85 },
            { name: 'C09', cfirma: 126, total: 150, value: 84.0, meta: 85 },
            { name: 'C10', cfirma: 164, total: 188, value: 87.2, meta: 85 },
        ]
    },
    ate: {
        promedio: 89.2,
        meta: 85,
        ciclos: [
            { name: 'C01', cfirma: 694, total: 781, value: 88.9, meta: 85 },
            { name: 'C02', cfirma: 270, total: 296, value: 91.2, meta: 85 },
            { name: 'C03', cfirma: 247, total: 272, value: 90.8, meta: 85 },
            { name: 'C04', cfirma: 278, total: 298, value: 93.3, meta: 85 },
            { name: 'C05', cfirma: 164, total: 183, value: 89.6, meta: 85 },
            { name: 'C06', cfirma: 187, total: 202, value: 92.6, meta: 85 },
            { name: 'C07', cfirma: 156, total: 180, value: 86.7, meta: 85 },
            { name: 'C08', cfirma: 170, total: 194, value: 87.6, meta: 85 },
            { name: 'C09', cfirma: 175, total: 190, value: 92.1, meta: 85 },
            { name: 'C10', cfirma: 88, total: 100, value: 88.0, meta: 85 },
        ]
    },
    brena: {
        promedio: 84.2,
        meta: 85,
        ciclos: [
            { name: 'C01', cfirma: 111, total: 135, value: 82.2, meta: 85 },
            { name: 'C02', cfirma: 161, total: 196, value: 82.1, meta: 85 },
            { name: 'C03', cfirma: 69, total: 78, value: 88.5, meta: 85 },
            { name: 'C04', cfirma: 137, total: 167, value: 82.0, meta: 85 },
            { name: 'C05', cfirma: 109, total: 133, value: 82.0, meta: 85 },
            { name: 'C06', cfirma: 34, total: 42, value: 81.0, meta: 85 },
            { name: 'C07', cfirma: 66, total: 77, value: 85.7, meta: 85 },
            { name: 'C08', cfirma: 48, total: 54, value: 88.9, meta: 85 },
            { name: 'C09', cfirma: 52, total: 58, value: 89.7, meta: 85 },
            { name: 'C10', cfirma: 59, total: 69, value: 85.5, meta: 85 },
        ]
    },
    sjl: {
        promedio: 73.1,
        meta: 85,
        ciclos: [
            { name: 'C01', cfirma: 128, total: 166, value: 77.1, meta: 85 },
            { name: 'C02', cfirma: 105, total: 139, value: 75.5, meta: 85 },
            { name: 'C03', cfirma: 149, total: 185, value: 80.5, meta: 85 },
            { name: 'C04', cfirma: 92, total: 133, value: 69.2, meta: 85 },
            { name: 'C05', cfirma: 80, total: 117, value: 68.4, meta: 85 },
            { name: 'C06', cfirma: 51, total: 78, value: 65.4, meta: 85 },
            { name: 'C07', cfirma: 62, total: 91, value: 68.1, meta: 85 },
            { name: 'C08', cfirma: 55, total: 68, value: 80.9, meta: 85 },
            { name: 'C09', cfirma: 47, total: 63, value: 74.6, meta: 85 },
            { name: 'C10', cfirma: 55, total: 71, value: 77.5, meta: 85 },
            { name: 'C11', cfirma: 37, total: 61, value: 60.7, meta: 85 },
        ]
    },
    surquillo: {
        promedio: 90.8,
        meta: 85,
        ciclos: [
            { name: 'C01', cfirma: 146, total: 157, value: 93.0, meta: 85 },
            { name: 'C02', cfirma: 153, total: 175, value: 87.4, meta: 85 },
            { name: 'C03', cfirma: 166, total: 187, value: 88.8, meta: 85 },
            { name: 'C04', cfirma: 326, total: 368, value: 88.6, meta: 85 },
            { name: 'C05', cfirma: 210, total: 243, value: 86.4, meta: 85 },
            { name: 'C06', cfirma: 176, total: 200, value: 88.0, meta: 85 },
            { name: 'C07', cfirma: 131, total: 150, value: 87.3, meta: 85 },
            { name: 'C08', cfirma: 98, total: 103, value: 95.1, meta: 85 },
            { name: 'C09', cfirma: 141, total: 156, value: 90.4, meta: 85 },
        ]
    },
    ves: {
        promedio: 47.9,
        meta: 85,
        ciclos: [
            { name: 'C01', cfirma: 170, total: 287, value: 59.2, meta: 85 },
            { name: 'C02', cfirma: 176, total: 308, value: 57.1, meta: 85 },
            { name: 'C03', cfirma: 113, total: 278, value: 40.6, meta: 85 },
            { name: 'C04', cfirma: 151, total: 298, value: 50.7, meta: 85 },
            { name: 'C05', cfirma: 136, total: 228, value: 59.6, meta: 85 },
            { name: 'C06', cfirma: 119, total: 198, value: 60.1, meta: 85 },
            { name: 'C07', cfirma: 87, total: 217, value: 40.1, meta: 85 },
            { name: 'C08', cfirma: 59, total: 133, value: 44.4, meta: 85 },
            { name: 'C09', cfirma: 123, total: 666, value: 18.5, meta: 85 },
        ]
    },
    'clientes-e': {
        promedio: 100,
        meta: 85,
        ciclos: [
            { name: 'C01', cfirma: 3, total: 3, value: 100, meta: 85 },
            { name: 'C02', cfirma: 1, total: 1, value: 100, meta: 85 },
            { name: 'C03', cfirma: 1, total: 1, value: 100, meta: 85 },
            { name: 'C04', cfirma: 3, total: 3, value: 100, meta: 85 },
            { name: 'C10', cfirma: 1, total: 1, value: 100, meta: 85 },
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card className="transition-colors hover:bg-primary/10 border shadow-sm">
            <CardHeader className="p-4">
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
                  <Bar 
                    dataKey="value" 
                    name="Rendimiento" 
                    fill="hsl(var(--chart-1))" 
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
            <CardContent className="flex flex-col gap-6 pt-2 h-60 overflow-y-auto">
                <p className="text-lg text-muted-foreground leading-relaxed">
                    Análisis del indicador de <span className="font-semibold text-foreground">Comunicaciones Atípicas</span> para el periodo actual.
                </p>
                <div className="grid grid-cols-2 gap-6">
                    <div className="border p-6 rounded-xl text-center bg-card shadow-sm">
                        <p className="text-sm font-medium text-muted-foreground mb-1 uppercase tracking-wider">Promedio del periodo</p>
                        <p className="text-4xl font-bold text-[hsl(var(--chart-1))]">{data.promedio}%</p>
                    </div>
                     <div className="border p-6 rounded-xl text-center bg-card shadow-sm">
                        <p className="text-sm font-medium text-muted-foreground mb-1 uppercase tracking-wider">Meta establecida</p>
                        <p className="text-4xl font-bold">{data.meta}%</p>
                    </div>
                </div>
                <div className="mt-2">
                    <h4 className="font-semibold text-lg mb-2">Observaciones</h4>
                    <p className="text-base text-muted-foreground leading-relaxed">
                        El gráfico muestra el rendimiento ciclo a ciclo frente a la meta del 85%. Los ciclos por debajo de la línea de meta requieren una revisión de los procesos operativos.
                    </p>
                </div>
            </CardContent>
        </Card>
      </div>

        <Card className="transition-colors hover:bg-primary/10 border shadow-sm">
        <CardHeader>
            <CardTitle className="text-xl">Detalle Semanal de Rendimiento Atípico</CardTitle>
            <p className="text-base text-muted-foreground">
            Desglose porcentual y numérico del rendimiento de comunicaciones atípicas por ciclo operativo.
            </p>
        </CardHeader>
        <CardContent>
            <div className="max-h-96 overflow-y-auto rounded-md border">
            <Table className="text-base">
                <TableHeader className="sticky top-0 bg-secondary/50 backdrop-blur-sm">
                <TableRow>
                    <TableHead className="w-[120px] font-bold">Ciclo</TableHead>
                    <TableHead className="font-bold">C/Firma</TableHead>
                    <TableHead className="font-bold">Total</TableHead>
                    <TableHead className="font-bold">Rendimiento (%)</TableHead>
                    <TableHead className="text-right font-bold">Meta (%)</TableHead>
                </TableRow>
                </TableHeader>
                <TableBody>
                {data.ciclos.map((item) => (
                    <TableRow key={item.name}>
                    <TableCell className="font-semibold">{item.name}</TableCell>
                    <TableCell>{item.cfirma.toLocaleString()}</TableCell>
                    <TableCell>{item.total.toLocaleString()}</TableCell>
                    <TableCell className={item.value < item.meta ? "text-destructive font-bold" : "text-foreground"}>
                        {item.value}%
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
