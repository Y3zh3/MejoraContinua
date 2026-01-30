
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
import { KpiCard } from "@/components/kpi-card";
import type { LucideIcon } from "lucide-react";

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

export function ActivitySummary({ activity }: ActivitySummaryProps) {
  return (
    <Card className="flex flex-col">
      <CardHeader>
        <CardTitle>{activity.name}</CardTitle>
        <CardDescription>Resumen de indicadores para esta actividad.</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col flex-1">
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
                kpi.indicador.includes('%') ? (v) => `${v}%` : (v) => v.toString()
              }
            />
          ))}
        </div>
        <Accordion type="single" collapsible className="w-full mt-4">
          <AccordionItem value="item-1">
            <AccordionTrigger>Ver detalle por sede (Drill-down)</AccordionTrigger>
            <AccordionContent>
              Aquí se mostraría una tabla o gráfico con el detalle por sede para la actividad de {activity.name}.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
    </Card>
  );
}
