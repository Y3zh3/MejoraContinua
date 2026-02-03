"use client";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { FileWarning } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const dataEnero = [
  { name: 'Comas', value: 17, meta: 0 },
  { name: 'Callao', value: 6, meta: 0 },
  { name: 'Ate', value: 5, meta: 0 },
  { name: 'Breña', value: 5, meta: 0 },
  { name: 'SJL', value: 0, meta: 0 },
  { name: 'Surquillo', value: 2, meta: 0 },
  { name: 'VES', value: 2, meta: 0 },
  { name: 'Clientes E.', value: 0, meta: 0 },
];

const COLORS = [
  'hsl(var(--chart-1))',
  'hsl(var(--chart-2))',
  'hsl(var(--chart-3))',
  'hsl(var(--chart-4))',
  'hsl(var(--chart-5))',
  '#2563eb',
  '#7c3aed',
  '#10b981',
];

export default function ReclamosPersuasivasPage() {
  const totalReclamos = dataEnero.reduce((acc, item) => acc + item.value, 0);
  const pieData = dataEnero.filter(item => item.value > 0);
  
  return (
    <div className="max-w-7xl mx-auto flex flex-col gap-8">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
            <FileWarning className="h-8 w-8 text-[hsl(var(--chart-4))]" />
            <h1 className="font-headline text-3xl font-bold uppercase tracking-tight text-primary">Persuasivas: Reclamos</h1>
        </div>
        <div className="w-full max-w-xs">
            <Select defaultValue="todas">
                <SelectTrigger>
                    <SelectValue placeholder="Seleccionar Base" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="todas">Todas las bases</SelectItem>
                </SelectContent>
            </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        <div className="flex flex-col gap-6">
            <Card className="border shadow-sm">
                <CardHeader className="pb-2">
                    <CardTitle className="text-xl font-bold text-center">Resumen del Indicador</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col gap-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="border border-border/50 py-3 px-4 rounded-xl text-center bg-card shadow-sm flex flex-col items-center justify-center">
                            <p className="text-[10px] font-bold text-muted-foreground mb-1 uppercase tracking-[0.2em]">Total Reclamos</p>
                            <p className="text-3xl font-black text-[hsl(var(--chart-4))]">{totalReclamos} uds.</p>
                        </div>
                         <div className="border border-border/50 py-3 px-4 rounded-xl text-center bg-card shadow-sm flex flex-col items-center justify-center border-primary/20 bg-primary/5">
                            <p className="text-[10px] font-bold text-muted-foreground mb-1 uppercase tracking-[0.2em]">Meta Máxima</p>
                            <p className="text-3xl font-black text-primary">0 uds.</p>
                        </div>
                    </div>
                    <div className="px-2">
                        <p className="text-sm text-muted-foreground leading-relaxed text-center italic">
                            Monitoreo de inconformidades presentadas por los usuarios respecto a las visitas persuasivas, buscando garantizar un trato justo y procesos de recuperación transparentes.
                        </p>
                    </div>
                </CardContent>
            </Card>

            <Card className="border shadow-sm">
                <CardHeader className="p-4">
                    <CardTitle className="text-xl text-center">Distribución de Reclamos (%)</CardTitle>
                </CardHeader>
                <CardContent className="h-60 p-0 px-2 pb-4">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie data={pieData} cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value" label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}>
                            {pieData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip contentStyle={{ background: "hsl(var(--card))", borderColor: "hsl(var(--border))", borderRadius: "8px" }} />
                        <Legend />
                    </PieChart>
                </ResponsiveContainer>
                </CardContent>
            </Card>
        </div>

        <Card className="border shadow-sm h-full flex flex-col min-h-[600px]">
            <CardHeader className="pb-4">
                <CardTitle className="text-xl font-bold">Detalle Mensual por Sede (Ene'26)</CardTitle>
            </CardHeader>
            <CardContent className="flex-1 px-4">
            <div className="max-h-[600px] overflow-y-auto rounded-xl border border-border/60 bg-card">
                <Table>
                <TableHeader className="sticky top-0 bg-secondary/30 backdrop-blur-md z-10">
                    <TableRow className="hover:bg-transparent border-b">
                    <TableHead className="w-[120px] font-bold text-muted-foreground uppercase text-[11px] tracking-wider pl-6">Sede</TableHead>
                    <TableHead className="font-bold text-muted-foreground uppercase text-[11px] tracking-wider">Reclamos</TableHead>
                    <TableHead className="text-right font-bold text-muted-foreground uppercase text-[11px] tracking-wider pr-6">Meta (máx)</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {dataEnero.map((item) => (
                    <TableRow key={item.name} className="hover:bg-muted/30 transition-colors border-b last:border-0">
                        <TableCell className="font-bold text-foreground pl-6">{item.name}</TableCell>
                        <TableCell className={`font-bold tabular-nums ${item.value > item.meta ? "text-destructive" : "text-primary"}`}>
                            {item.value} uds.
                        </TableCell>
                        <TableCell className="text-right font-medium pr-6">{item.meta} uds.</TableCell>
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
