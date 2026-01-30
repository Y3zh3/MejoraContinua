
"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ChartCard } from "@/components/charts";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend, LabelList } from "recharts";
import { Megaphone } from "lucide-react";

// Mock data
const sedes = ["General", "Comas", "Callao", "Ate", "Breña", "SJL", "Clientes Especiales", "Surquillo", "VES"];
const cicloData = Array.from({ length: 13 }, (_, i) => ({
    name: `C${i + 1}`,
    rendimiento: Math.floor(Math.random() * (100 - 60 + 1)) + 60,
    meta: 80,
}));

const chartConfig = {
  rendimiento: {
    label: "Rendimiento",
    color: "hsl(var(--chart-1))",
  },
  meta: {
    label: "Meta",
    color: "hsl(var(--chart-5))",
  }
};

const CicloChart = () => (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart data={cicloData}>
        <CartesianGrid strokeDasharray="3 3" vertical={false} />
        <XAxis dataKey="name" tick={{ fontSize: 12 }} />
        <YAxis domain={[0, 100]} tickFormatter={(value) => `${value}%`} />
        <Tooltip
            contentStyle={{
                background: "hsl(var(--background))",
                borderColor: "hsl(var(--border))",
            }}
            formatter={(value, name) => [`${value}%`, name === 'rendimiento' ? 'Rendimiento' : 'Meta']}
        />
        <Legend />
        <Bar dataKey="meta" fill="var(--color-meta)" radius={[4, 4, 0, 0]} barSize={10} />
        <Bar dataKey="rendimiento" fill="var(--color-rendimiento)" radius={[4, 4, 0, 0]}>
             <LabelList dataKey="rendimiento" position="top" formatter={(value: number) => `${value}%`} className="fill-foreground font-bold" fontSize={12} />
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );

export default function ComunicadosPage() {
    const [selectedSede, setSelectedSede] = useState("General");

    return (
        <div className="flex flex-col gap-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                    <Megaphone className="h-8 w-8 text-primary" />
                    <div>
                        <h1 className="font-headline text-3xl font-bold">Módulo de Comunicados</h1>
                        <p className="text-muted-foreground">Análisis de la efectividad de los comunicados.</p>
                    </div>
                </div>
                <div className="w-full sm:w-64">
                     <Select value={selectedSede} onValueChange={setSelectedSede}>
                        <SelectTrigger>
                            <SelectValue placeholder="Seleccionar Sede" />
                        </SelectTrigger>
                        <SelectContent>
                            {sedes.map(sede => (
                                <SelectItem key={sede} value={sede}>{sede}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
            </div>

            <ChartCard
                title={`Rendimiento por Ciclo - Sede ${selectedSede}`}
                description="Comparativa del rendimiento real vs la meta para cada ciclo de facturación."
                chart={<CicloChart />}
            />
            
            <Card>
                <CardHeader>
                    <CardTitle>Mapa de Calor (Heatmap) de Cumplimiento</CardTitle>
                    <CardDescription>Vista histórica del cumplimiento por sede y mes. (Próximamente)</CardDescription>
                </CardHeader>
                <CardContent className="flex items-center justify-center h-64 bg-muted/50 rounded-md">
                    <p className="text-muted-foreground">El mapa de calor estará disponible pronto.</p>
                </CardContent>
            </Card>

        </div>
    );
}
