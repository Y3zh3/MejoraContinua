
"use client";

import { useState } from "react";
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
            { name: '01-01-26', cingreso: 0, total: 0, value: 0, meta: 85 },
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
    },
    comas: {
        promedio: 79.5,
        meta: 85,
        ciclos: [
            { name: '02-01-26', cingreso: 4, total: 4, value: 100, meta: 85 },
            { name: '05-01-26', cingreso: 86, total: 114, value: 75.4, meta: 85 },
            { name: '06-01-26', cingreso: 75, total: 101, value: 74.3, meta: 85 },
            { name: '07-01-26', cingreso: 54, total: 73, value: 74.0, meta: 85 },
            { name: '08-01-26', cingreso: 98, total: 127, value: 77.2, meta: 85 },
            { name: '09-01-26', cingreso: 69, total: 83, value: 83.1, meta: 85 },
            { name: '12-01-26', cingreso: 41, total: 57, value: 71.9, meta: 85 },
            { name: '13-01-26', cingreso: 51, total: 62, value: 82.3, meta: 85 },
            { name: '14-01-26', cingreso: 55, total: 70, value: 78.6, meta: 85 },
            { name: '15-01-26', cingreso: 64, total: 77, value: 83.1, meta: 85 },
            { name: '16-01-26', cingreso: 55, total: 75, value: 73.3, meta: 85 },
            { name: '19-01-26', cingreso: 91, total: 119, value: 76.5, meta: 85 },
            { name: '20-01-26', cingreso: 40, total: 47, value: 85.1, meta: 85 },
            { name: '21-01-26', cingreso: 78, total: 93, value: 83.9, meta: 85 },
            { name: '22-01-26', cingreso: 101, total: 122, value: 82.8, meta: 85 },
            { name: '23-01-26', cingreso: 61, total: 74, value: 82.4, meta: 85 },
            { name: '26-01-26', cingreso: 86, total: 104, value: 82.7, meta: 85 }
        ]
    },
    callao: {
        promedio: 87.8,
        meta: 85,
        ciclos: [
            { name: '05-01-26', cingreso: 46, total: 52, value: 88.5, meta: 85 },
            { name: '06-01-26', cingreso: 41, total: 47, value: 87.2, meta: 85 },
            { name: '07-01-26', cingreso: 53, total: 55, value: 96.4, meta: 85 },
            { name: '08-01-26', cingreso: 45, total: 53, value: 84.9, meta: 85 },
            { name: '09-01-26', cingreso: 45, total: 53, value: 84.9, meta: 85 },
            { name: '12-01-26', cingreso: 30, total: 39, value: 76.9, meta: 85 },
            { name: '13-01-26', cingreso: 33, total: 41, value: 80.5, meta: 85 },
            { name: '14-01-26', cingreso: 49, total: 53, value: 92.5, meta: 85 },
            { name: '15-01-26', cingreso: 28, total: 34, value: 82.4, meta: 85 },
            { name: '16-01-26', cingreso: 36, total: 42, value: 85.7, meta: 85 },
            { name: '19-01-26', cingreso: 30, total: 36, value: 83.3, meta: 85 },
            { name: '20-01-26', cingreso: 42, total: 48, value: 87.5, meta: 85 },
            { name: '21-01-26', cingreso: 47, total: 52, value: 90.4, meta: 85 },
            { name: '22-01-26', cingreso: 40, total: 42, value: 95.2, meta: 85 },
            { name: '23-01-26', cingreso: 54, total: 56, value: 96.4, meta: 85 },
            { name: '26-01-26', cingreso: 51, total: 55, value: 92.7, meta: 85 }
        ]
    },
    ate: {
        promedio: 81.2,
        meta: 85,
        ciclos: [
            { name: '02-01-26', cingreso: 6, total: 8, value: 75.0, meta: 85 },
            { name: '05-01-26', cingreso: 66, total: 82, value: 80.5, meta: 85 },
            { name: '06-01-26', cingreso: 62, total: 76, value: 81.6, meta: 85 },
            { name: '07-01-26', cingreso: 52, total: 64, value: 81.3, meta: 85 },
            { name: '08-01-26', cingreso: 65, total: 83, value: 78.3, meta: 85 },
            { name: '09-01-26', cingreso: 71, total: 93, value: 76.3, meta: 85 },
            { name: '12-01-26', cingreso: 60, total: 77, value: 77.9, meta: 85 },
            { name: '13-01-26', cingreso: 53, total: 65, value: 81.5, meta: 85 },
            { name: '14-01-26', cingreso: 58, total: 66, value: 87.9, meta: 85 },
            { name: '15-01-26', cingreso: 63, total: 69, value: 91.3, meta: 85 },
            { name: '16-01-26', cingreso: 53, total: 62, value: 85.5, meta: 85 },
            { name: '19-01-26', cingreso: 56, total: 69, value: 81.2, meta: 85 },
            { name: '20-01-26', cingreso: 43, total: 52, value: 82.7, meta: 85 },
            { name: '21-01-26', cingreso: 57, total: 77, value: 74.0, meta: 85 },
            { name: '22-01-26', cingreso: 41, total: 53, value: 77.4, meta: 85 },
            { name: '23-01-26', cingreso: 70, total: 91, value: 76.9, meta: 85 },
            { name: '26-01-26', cingreso: 63, total: 81, value: 77.8, meta: 85 }
        ]
    },
    brena: {
        promedio: 79.5,
        meta: 85,
        ciclos: [
            { name: '05-01-26', cingreso: 32, total: 43, value: 74.4, meta: 85 },
            { name: '06-01-26', cingreso: 24, total: 31, value: 77.4, meta: 85 },
            { name: '07-01-26', cingreso: 11, total: 14, value: 78.6, meta: 85 },
            { name: '08-01-26', cingreso: 5, total: 6, value: 83.3, meta: 85 },
            { name: '09-01-26', cingreso: 33, total: 45, value: 73.3, meta: 85 },
            { name: '12-01-26', cingreso: 23, total: 26, value: 88.5, meta: 85 },
            { name: '13-01-26', cingreso: 25, total: 32, value: 78.1, meta: 85 },
            { name: '14-01-26', cingreso: 21, total: 25, value: 84.0, meta: 85 },
            { name: '15-01-26', cingreso: 34, total: 41, value: 82.9, meta: 85 },
            { name: '16-01-26', cingreso: 32, total: 42, value: 76.2, meta: 85 },
            { name: '19-01-26', cingreso: 28, total: 35, value: 80.0, meta: 85 },
            { name: '20-01-26', cingreso: 38, total: 43, value: 88.4, meta: 85 },
            { name: '21-01-26', cingreso: 16, total: 24, value: 66.7, meta: 85 },
            { name: '22-01-26', cingreso: 30, total: 35, value: 85.7, meta: 85 },
            { name: '23-01-26', cingreso: 28, total: 33, value: 84.8, meta: 85 },
            { name: '26-01-26', cingreso: 22, total: 24, value: 91.7, meta: 85 }
        ]
    },
    sjl: {
        promedio: 81.5,
        meta: 85,
        ciclos: [
            { name: '02-01-26', cingreso: 1, total: 1, value: 100, meta: 85 },
            { name: '05-01-26', cingreso: 27, total: 33, value: 81.8, meta: 85 },
            { name: '06-01-26', cingreso: 17, total: 22, value: 77.3, meta: 85 },
            { name: '07-01-26', cingreso: 28, total: 36, value: 77.8, meta: 85 },
            { name: '08-01-26', cingreso: 40, total: 46, value: 87.0, meta: 85 },
            { name: '09-01-26', cingreso: 10, total: 13, value: 76.9, meta: 85 },
            { name: '12-01-26', cingreso: 12, total: 14, value: 85.7, meta: 85 },
            { name: '13-01-26', cingreso: 3, total: 3, value: 100, meta: 85 },
            { name: '14-01-26', cingreso: 24, total: 27, value: 88.9, meta: 85 },
            { name: '15-01-26', cingreso: 35, total: 38, value: 92.1, meta: 85 },
            { name: '16-01-26', cingreso: 28, total: 31, value: 90.3, meta: 85 },
            { name: '19-01-26', cingreso: 21, total: 26, value: 80.8, meta: 85 },
            { name: '20-01-26', cingreso: 20, total: 22, value: 90.9, meta: 85 },
            { name: '21-01-26', cingreso: 18, total: 22, value: 81.8, meta: 85 },
            { name: '22-01-26', cingreso: 38, total: 44, value: 86.4, meta: 85 },
            { name: '23-01-26', cingreso: 23, total: 29, value: 79.3, meta: 85 },
            { name: '26-01-26', cingreso: 18, total: 29, value: 62.1, meta: 85 }
        ]
    },
    surquillo: {
        promedio: 84.1,
        meta: 85,
        ciclos: [
            { name: '02-01-26', cingreso: 1, total: 1, value: 100, meta: 85 },
            { name: '03-01-26', cingreso: 4, total: 4, value: 100, meta: 85 },
            { name: '05-01-26', cingreso: 23, total: 33, value: 69.7, meta: 85 },
            { name: '06-01-26', cingreso: 36, total: 39, value: 92.3, meta: 85 },
            { name: '07-01-26', cingreso: 16, total: 22, value: 72.7, meta: 85 },
            { name: '08-01-26', cingreso: 23, total: 28, value: 82.1, meta: 85 },
            { name: '09-01-26', cingreso: 14, total: 16, value: 87.5, meta: 85 },
            { name: '10-01-26', cingreso: 3, total: 3, value: 100, meta: 85 },
            { name: '12-01-26', cingreso: 15, total: 20, value: 75.0, meta: 85 },
            { name: '13-01-26', cingreso: 13, total: 17, value: 76.5, meta: 85 },
            { name: '14-01-26', cingreso: 17, total: 22, value: 77.3, meta: 85 },
            { name: '15-01-26', cingreso: 17, total: 21, value: 81.0, meta: 85 },
            { name: '16-01-26', cingreso: 10, total: 12, value: 83.3, meta: 85 },
            { name: '17-01-26', cingreso: 3, total: 4, value: 75.0, meta: 85 },
            { name: '19-01-26', cingreso: 10, total: 10, value: 100, meta: 85 },
            { name: '20-01-26', cingreso: 21, total: 25, value: 84.0, meta: 85 },
            { name: '21-01-26', cingreso: 29, total: 34, value: 85.3, meta: 85 },
            { name: '22-01-26', cingreso: 28, total: 35, value: 80.0, meta: 85 },
            { name: '23-01-26', cingreso: 30, total: 38, value: 78.9, meta: 85 },
            { name: '24-01-26', cingreso: 4, total: 4, value: 100, meta: 85 },
            { name: '26-01-26', cingreso: 28, total: 36, value: 77.8, meta: 85 }
        ]
    },
    ves: {
        promedio: 73.8,
        meta: 85,
        ciclos: [
            { name: '05-01-26', cingreso: 33, total: 40, value: 82.5, meta: 85 },
            { name: '06-01-26', cingreso: 24, total: 42, value: 57.1, meta: 85 },
            { name: '07-01-26', cingreso: 36, total: 43, value: 83.7, meta: 85 },
            { name: '08-01-26', cingreso: 37, total: 46, value: 80.4, meta: 85 },
            { name: '09-01-26', cingreso: 38, total: 53, value: 71.7, meta: 85 },
            { name: '12-01-26', cingreso: 13, total: 17, value: 76.5, meta: 85 },
            { name: '13-01-26', cingreso: 19, total: 28, value: 67.9, meta: 85 },
            { name: '14-01-26', cingreso: 19, total: 28, value: 67.9, meta: 85 },
            { name: '15-01-26', cingreso: 17, total: 25, value: 68.0, meta: 85 },
            { name: '16-01-26', cingreso: 9, total: 13, value: 69.2, meta: 85 },
            { name: '19-01-26', cingreso: 21, total: 32, value: 65.6, meta: 85 },
            { name: '20-01-26', cingreso: 14, total: 19, value: 73.7, meta: 85 },
            { name: '21-01-26', cingreso: 21, total: 25, value: 84.0, meta: 85 },
            { name: '22-01-26', cingreso: 23, total: 30, value: 76.7, meta: 85 },
            { name: '26-01-26', cingreso: 26, total: 34, value: 76.5, meta: 85 }
        ]
    },
    'clientes-e': {
        promedio: 81.3,
        meta: 85,
        ciclos: [
            { name: '06-01-26', cingreso: 6, total: 8, value: 75.0, meta: 85 },
            { name: '09-01-26', cingreso: 1, total: 1, value: 100, meta: 85 },
            { name: '10-01-26', cingreso: 4, total: 4, value: 100, meta: 85 },
            { name: '12-01-26', cingreso: 30, total: 31, value: 96.8, meta: 85 },
            { name: '13-01-26', cingreso: 6, total: 7, value: 85.7, meta: 85 },
            { name: '14-01-26', cingreso: 7, total: 10, value: 70.0, meta: 85 },
            { name: '15-01-26', cingreso: 2, total: 2, value: 100, meta: 85 },
            { name: '16-01-26', cingreso: 1, total: 1, value: 100, meta: 85 },
            { name: '19-01-26', cingreso: 1, total: 3, value: 33.3, meta: 85 },
            { name: '22-01-26', cingreso: 4, total: 4, value: 100, meta: 85 },
            { name: '23-01-26', cingreso: 28, total: 28, value: 100, meta: 85 }
        ]
    }
};

export default function ReclamosInspeccionesPage() {
  const [data, setData] = useState(reclamosData.todas);

  const handleBaseChange = (base: string) => {
    setData(reclamosData[base as keyof typeof reclamosData] || reclamosData.todas);
  };
  
  return (
    <div className="max-w-7xl mx-auto flex flex-col gap-8">
       <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <FileWarning className="h-8 w-8 text-[hsl(var(--chart-5))]" />
          <h1 className="font-headline text-3xl font-bold">Inspecciones: Reclamos</h1>
        </div>
        <BaseSelector onBaseChange={handleBaseChange} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card className="transition-colors hover:bg-primary/10 border shadow-sm">
            <CardHeader className="p-4">
                <CardTitle className="text-xl">Tendencia de Cumplimiento (%)</CardTitle>
            </CardHeader>
            <CardContent className="h-80 p-0 px-2 pb-4">
            <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data.ciclos}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" label={{ value: 'Fecha', position: 'insideBottom', offset: -5 }} />
                <YAxis domain={[0, 110]} unit="%" />
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

        <Card className="transition-colors hover:bg-primary/10 border shadow-sm">
            <CardHeader>
            <CardTitle className="text-xl">Resumen del Indicador</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-6 pt-2">
                <p className="text-lg text-muted-foreground leading-relaxed">
                    Análisis del indicador de <span className="font-semibold text-foreground">Cumplimiento de Inspecciones</span> para el periodo actual.
                </p>
                <div className="grid grid-cols-2 gap-6">
                    <div className="border p-6 rounded-xl text-center bg-card shadow-sm">
                        <p className="text-sm font-medium text-muted-foreground mb-1 uppercase tracking-wider">Promedio del periodo</p>
                        <p className="text-4xl font-bold text-[hsl(var(--chart-5))]">{data.promedio}%</p>
                    </div>
                     <div className="border p-6 rounded-xl text-center bg-card shadow-sm">
                        <p className="text-sm font-medium text-muted-foreground mb-1 uppercase tracking-wider">Meta establecida</p>
                        <p className="text-4xl font-bold">{data.meta}%</p>
                    </div>
                </div>
                <div className="mt-2">
                    <h4 className="font-semibold text-lg mb-2">Observaciones</h4>
                    <p className="text-base text-muted-foreground leading-relaxed">
                        El cumplimiento se mide frente a la meta del 85%. Los periodos con variaciones significativas requieren un análisis detallado de las causas de no conformidad.
                    </p>
                </div>
            </CardContent>
        </Card>
      </div>

        <Card className="transition-colors hover:bg-primary/10 border shadow-sm">
        <CardHeader>
            <CardTitle className="text-xl">Detalle de Cumplimiento por Fecha</CardTitle>
            <p className="text-base text-muted-foreground">
            Desglose porcentual y numérico de los reclamos de inspecciones por fecha registrada.
            </p>
        </CardHeader>
        <CardContent>
            <div className="max-h-96 overflow-y-auto rounded-md border">
            <Table className="text-base">
                <TableHeader className="sticky top-0 bg-secondary/50 backdrop-blur-sm">
                <TableRow>
                    <TableHead className="w-[150px] font-bold">Fecha</TableHead>
                    <TableHead className="font-bold">C./Ingreso</TableHead>
                    <TableHead className="font-bold">Total</TableHead>
                    <TableHead className="font-bold">Cumplimiento (%)</TableHead>
                    <TableHead className="text-right font-bold">Meta (%)</TableHead>
                </TableRow>
                </TableHeader>
                <TableBody>
                {data.ciclos.map((item) => (
                    <TableRow key={item.name}>
                    <TableCell className="font-semibold">{item.name}</TableCell>
                    <TableCell>{item.cingreso.toLocaleString()}</TableCell>
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
