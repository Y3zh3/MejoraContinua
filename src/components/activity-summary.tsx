
"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { KpiCard } from "@/components/kpi-card";
import type { LucideIcon } from "lucide-react";
import { ChartCard } from "./charts";

export type Kpi = {
  id: string;
  indicador: string;
  sede: string;
  valor: number;
  meta: number;
  icon: LucideIcon;
  description?: string;
};

export type Activity = {
  name: string;
  kpis: Kpi[];
};

type ActivitySummaryProps = {
  activity: Activity;
};

// Mock data for drill-down
const sedesData = [
    { sede: 'Comas', valor: 92, meta: 90, incidencias: 12 },
    { sede: 'Callao', valor: 85, meta: 88, incidencias: 25 },
    { sede: 'Ate', valor: 95, meta: 90, incidencias: 8 },
    { sede: 'Breña', valor: 78, meta: 85, incidencias: 31 },
    { sede: 'SJL', valor: 98, meta: 95, incidencias: 5 },
    { sede: 'Surquillo', valor: 88, meta: 85, incidencias: 15 },
];

const cicloData = Array.from({ length: 13 }, (_, i) => ({
    name: `C${i + 1}`,
    rendimiento: Math.floor(Math.random() * (100 - 60 + 1)) + 60,
}));


const CicloChart = () => (
    <ResponsiveContainer width="100%" height={250}>
      <BarChart data={cicloData}>
        <CartesianGrid strokeDasharray="3 3" vertical={false} />
        <XAxis dataKey="name" tick={{ fontSize: 12 }} />
        <YAxis />
        <Tooltip />
        <Bar dataKey="rendimiento" fill="hsl(var(--chart-1))" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );

export function ActivitySummary({ activity }: ActivitySummaryProps) {
  return (
    <Card className="flex flex-col">
      <CardHeader>
        <CardTitle>{activity.name}</CardTitle>
        <CardDescription>Resumen de indicadores para esta actividad.</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col flex-1">
        {/* High-Level KPIs */}
        <div className="grid flex-1 grid-cols-1 gap-4 sm:grid-cols-2">
          {activity.kpis.map((kpi) => (
            <KpiCard
              key={kpi.id}
              title={kpi.indicador}
              indicador={kpi.indicador}
              value={kpi.valor}
              meta={kpi.meta}
              icon={kpi.icon}
              description={kpi.description}
              valueFormatter={
                kpi.indicador.includes('%') || kpi.valor.toString().includes('.') ? (v) => `${v.toLocaleString()}%` : (v) => v.toLocaleString()
              }
            />
          ))}
        </div>

        {/* Drill-down Accordion */}
        <Accordion type="single" collapsible className="w-full mt-4">
          <AccordionItem value="item-1">
            <AccordionTrigger>Ver Desglose (Drill-Down)</AccordionTrigger>
            <AccordionContent>
              <div className="flex flex-col gap-6 pt-4">
                
                {/* Splat View: Sedes */}
                <Card>
                    <CardHeader>
                        <CardTitle className="text-lg">Capa de Sedes (Splat View)</CardTitle>
                        <CardDescription>Tabla comparativa del rendimiento entre sedes.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Table>
                        <TableHeader>
                            <TableRow>
                            <TableHead>Sede</TableHead>
                            <TableHead className="text-right">Rendimiento</TableHead>
                            <TableHead className="text-right">Meta</TableHead>
                            <TableHead className="text-right">Incidencias</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {sedesData.map((sede) => (
                            <TableRow key={sede.sede} className={sede.valor >= sede.meta ? 'bg-green-900/20' : 'bg-red-900/20'}>
                                <TableCell className="font-medium">{sede.sede}</TableCell>
                                <TableCell className="text-right">{sede.valor}%</TableCell>
                                <TableCell className="text-right">{sede.meta}%</TableCell>
                                <TableCell className="text-right">{sede.incidencias}</TableCell>
                            </TableRow>
                            ))}
                        </TableBody>
                        </Table>
                    </CardContent>
                </Card>

                {/* Deep Dive: Ciclos */}
                <ChartCard 
                    title="Capa de Ciclos (Deep Dive)"
                    description="Rendimiento detallado por ciclo para esta actividad."
                    chart={<CicloChart />}
                />
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
    </Card>
  );
}
