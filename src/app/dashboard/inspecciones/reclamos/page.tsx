
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
            { name: '1', value: 100, meta: 85 }, { name: '2', value: 100, meta: 85 }, { name: '3', value: 100, meta: 85 },
            { name: '5', value: 75, meta: 85 }, { name: '6', value: 74, meta: 85 }, { name: '7', value: 74, meta: 85 }, { name: '8', value: 77, meta: 85 }, { name: '9', value: 83, meta: 85 },
            { name: '12', value: 72, meta: 85 }, { name: '13', value: 82, meta: 85 }, { name: '14', value: 79, meta: 85 }, { name: '15', value: 83, meta: 85 }, { name: '16', value: 73, meta: 85 },
            { name: '19', value: 76, meta: 85 }, { name: '20', value: 85, meta: 85 }, { name: '21', value: 84, meta: 85 }, { name: '22', value: 83, meta: 85 }, { name: '23', value: 82, meta: 85 },
            { name: '26', value: 83, meta: 85 }
        ]
    },
    comas: {
        promedio: 81.3,
        meta: 85,
        ciclos: [
            { name: '2', value: 100, meta: 85 },
            { name: '5', value: 75, meta: 85 }, { name: '6', value: 74, meta: 85 }, { name: '7', value: 74, meta: 85 }, { name: '8', value: 77, meta: 85 }, { name: '9', value: 83, meta: 85 },
            { name: '12', value: 72, meta: 85 }, { name: '13', value: 82, meta: 85 }, { name: '14', value: 79, meta: 85 }, { name: '15', value: 83, meta: 85 }, { name: '16', value: 73, meta: 85 },
            { name: '19', value: 76, meta: 85 }, { name: '20', value: 85, meta: 85 }, { name: '21', value: 84, meta: 85 }, { name: '22', value: 83, meta: 85 }, { name: '23', value: 82, meta: 85 },
            { name: '26', value: 83, meta: 85 }
        ]
    },
    callao: {
        promedio: 87.8,
        meta: 85,
        ciclos: [
            { name: '5', value: 88, meta: 85 }, { name: '6', value: 87, meta: 85 }, { name: '7', value: 96, meta: 85 }, { name: '8', value: 85, meta: 85 }, { name: '9', value: 85, meta: 85 },
            { name: '12', value: 77, meta: 85 }, { name: '13', value: 80, meta: 85 }, { name: '14', value: 92, meta: 85 }, { name: '15', value: 82, meta: 85 }, { name: '16', value: 86, meta: 85 },
            { name: '19', value: 83, meta: 85 }, { name: '20', value: 88, meta: 85 }, { name: '21', value: 90, meta: 85 }, { name: '22', value: 95, meta: 85 }, { name: '23', value: 96, meta: 85 },
            { name: '26', value: 93, meta: 85 }
        ]
    },
    ate: {
        promedio: 80.8,
        meta: 85,
        ciclos: [
            { name: '2', value: 75, meta: 85 },
            { name: '5', value: 80, meta: 85 }, { name: '6', value: 82, meta: 85 }, { name: '7', value: 81, meta: 85 }, { name: '8', value: 78, meta: 85 }, { name: '9', value: 76, meta: 85 },
            { name: '12', value: 78, meta: 85 }, { name: '13', value: 82, meta: 85 }, { name: '14', value: 88, meta: 85 }, { name: '15', value: 91, meta: 85 }, { name: '16', value: 85, meta: 85 },
            { name: '19', value: 81, meta: 85 }, { name: '20', value: 83, meta: 85 }, { name: '21', value: 74, meta: 85 }, { name: '22', value: 77, meta: 85 }, { name: '23', value: 77, meta: 85 },
            { name: '26', value: 78, meta: 85 }
        ]
    },
    brena: {
        promedio: 80.6,
        meta: 85,
        ciclos: [
            { name: '5', value: 74, meta: 85 }, { name: '6', value: 77, meta: 85 }, { name: '7', value: 79, meta: 85 }, { name: '8', value: 83, meta: 85 }, { name: '9', value: 73, meta: 85 },
            { name: '12', value: 88, meta: 85 }, { name: '13', value: 78, meta: 85 }, { name: '14', value: 84, meta: 85 }, { name: '15', value: 83, meta: 85 }, { name: '16', value: 76, meta: 85 },
            { name: '19', value: 80, meta: 85 }, { name: '20', value: 88, meta: 85 }, { name: '21', value: 67, meta: 85 }, { name: '22', value: 85, meta: 85 }, { name: '23', value: 85, meta: 85 },
            { name: '26', value: 92, meta: 85 }
        ]
    },
    sjl: {
        promedio: 83.0,
        meta: 85,
        ciclos: [
            { name: '2', value: 100, meta: 85 },
            { name: '5', value: 82, meta: 85 }, { name: '6', value: 77, meta: 85 }, { name: '7', value: 78, meta: 85 }, { name: '8', value: 87, meta: 85 }, { name: '9', value: 77, meta: 85 },
            { name: '12', value: 86, meta: 85 }, { name: '13', value: 100, meta: 85 }, { name: '14', value: 89, meta: 85 }, { name: '15', value: 92, meta: 85 }, { name: '16', value: 90, meta: 85 },
            { name: '19', value: 81, meta: 85 }, { name: '20', value: 91, meta: 85 }, { name: '21', value: 82, meta: 85 }, { name: '22', value: 86, meta: 85 }, { name: '23', value: 79, meta: 85 },
            { name: '26', value: 62, meta: 85 }
        ]
    },
    surquillo: {
        promedio: 84.0,
        meta: 85,
        ciclos: [
            { name: '2', value: 100, meta: 85 }, { name: '3', value: 100, meta: 85 },
            { name: '5', value: 70, meta: 85 }, { name: '6', value: 92, meta: 85 }, { name: '7', value: 73, meta: 85 }, { name: '8', value: 82, meta: 85 }, { name: '9', value: 88, meta: 85 }, { name: '10', value: 100, meta: 85 },
            { name: '12', value: 75, meta: 85 }, { name: '13', value: 76, meta: 85 }, { name: '14', value: 77, meta: 85 }, { name: '15', value: 81, meta: 85 }, { name: '16', value: 83, meta: 85 }, { name: '17', value: 75, meta: 85 },
            { name: '19', value: 100, meta: 85 }, { name: '20', value: 84, meta: 85 }, { name: '21', value: 85, meta: 85 }, { name: '22', value: 80, meta: 85 }, { name: '23', value: 79, meta: 85 }, { name: '24', value: 100, meta: 85 },
            { name: '26', value: 78, meta: 85 }
        ]
    },
    ves: {
        promedio: 73.8,
        meta: 85,
        ciclos: [
            { name: '5', value: 83, meta: 85 }, { name: '6', value: 57, meta: 85 }, { name: '7', value: 84, meta: 85 }, { name: '8', value: 80, meta: 85 }, { name: '9', value: 72, meta: 85 },
            { name: '12', value: 76, meta: 85 }, { name: '13', value: 68, meta: 85 }, { name: '14', value: 68, meta: 85 }, { name: '15', value: 68, meta: 85 }, { name: '16', value: 69, meta: 85 },
            { name: '19', value: 66, meta: 85 }, { name: '20', value: 73, meta: 85 }, { name: '21', value: 83, meta: 85 }, { name: '22', value: 77, meta: 85 },
            { name: '26', value: 76, meta: 85 }
        ]
    },
    'clientes-e': {
        promedio: 87.0,
        meta: 85,
        ciclos: [
            { name: '6', value: 75, meta: 85 }, { name: '9', value: 100, meta: 85 }, { name: '10', value: 100, meta: 85 },
            { name: '12', value: 97, meta: 85 }, { name: '13', value: 86, meta: 85 }, { name: '14', value: 70, meta: 85 }, { name: '15', value: 100, meta: 85 },
            { name: '19', value: 33, meta: 85 }, { name: '22', value: 100, meta: 85 }, { name: '23', value: 100, meta: 85 }
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
                <XAxis dataKey="name" label={{ value: 'Ciclo', position: 'insideBottom', offset: -5 }} />
                <YAxis domain={[0, 110]} unit="%" />
                <Tooltip
                    contentStyle={{
                    background: "hsl(var(--card))",
                    borderColor: "hsl(var(--border))",
                    borderRadius: "8px",
                    }}
                    formatter={(value: number) => `${value}%`}
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
                        El cumplimiento se mide frente a la meta del 85%. Los ciclos con variaciones significativas requieren un análisis detallado de las causas de no conformidad.
                    </p>
                </div>
            </CardContent>
        </Card>
      </div>

        <Card className="transition-colors hover:bg-primary/10 border shadow-sm">
        <CardHeader>
            <CardTitle className="text-xl">Detalle por Ciclo de Cumplimiento</CardTitle>
            <p className="text-base text-muted-foreground">
            Desglose porcentual de los reclamos de inspecciones por ciclo registrado.
            </p>
        </CardHeader>
        <CardContent>
            <div className="max-h-96 overflow-y-auto rounded-md border">
            <Table className="text-base">
                <TableHeader className="sticky top-0 bg-secondary/50 backdrop-blur-sm">
                <TableRow>
                    <TableHead className="w-[150px] font-bold">Ciclo</TableHead>
                    <TableHead className="font-bold">Cumplimiento (%)</TableHead>
                    <TableHead className="text-right font-bold">Meta (%)</TableHead>
                </TableRow>
                </TableHeader>
                <TableBody>
                {data.ciclos.map((item) => (
                    <TableRow key={item.name}>
                    <TableCell className="font-semibold">Ciclo {item.name}</TableCell>
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
