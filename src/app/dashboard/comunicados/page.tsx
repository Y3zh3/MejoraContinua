
"use client";

import { StatCard } from "@/components/stat-card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableFooter,
} from "@/components/ui/table";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import {
  ChartContainer,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, LabelList, ComposedChart, Line, ResponsiveContainer } from "recharts";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import Image from "next/image";


const resumenEficaciaData = [
  { base: "3. ATE", conFirma: 36, bajoPuerta: 6, total: 42, meta: "80%", eficacia: 86 },
  { base: "5. SJL", conFirma: 22, bajoPuerta: 5, total: 27, meta: "80%", eficacia: 81 },
  { base: "2. CA", conFirma: 56, bajoPuerta: 15, total: 71, meta: "80%", eficacia: 79 },
  { base: "4. BRE", conFirma: 40, bajoPuerta: 17, total: 57, meta: "80%", eficacia: 70 },
  { base: "1. CO", conFirma: 134, bajoPuerta: 70, total: 204, meta: "80%", eficacia: 66 },
];

const eficaciaPorCicloData = [
    { ciclo: "8.CE", eficacia: 100 },
    { ciclo: "3. ATE", eficacia: 85 },
    { ciclo: "2. CA", eficacia: 83 },
    { ciclo: "6.SUR", eficacia: 81 },
    { ciclo: "5. SJL", eficacia: 77 },
    { ciclo: "1. CO", eficacia: 64 },
    { ciclo: "4. BRE", eficacia: 63 },
    { ciclo: "7.VES", eficacia: 46 },
];


const chartConfig = {
  eficacia: {
    label: "%Eficacia",
    color: "hsl(var(--chart-1))",
  },
  total: {
    label: "Cantidad de cartas",
    color: "hsl(var(--foreground))",
  },
};

const ResumenEficaciaTable = () => {
    const totals = resumenEficaciaData.reduce(
      (acc, item) => {
        acc.conFirma += item.conFirma;
        acc.bajoPuerta += item.bajoPuerta;
        acc.total += item.total;
        return acc;
      },
      { conFirma: 0, bajoPuerta: 0, total: 0 }
    );
  
    const totalEficacia = totals.total > 0 ? Math.round((totals.conFirma / totals.total) * 100) : 0;
  
    return (
      <Card className="h-full">
        <CardHeader className="p-2">
          <CardTitle className="text-center font-bold text-primary text-sm">RESUMEN DE % DE EFICACIA POR BASE</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="p-1 text-xs h-8">BASE</TableHead>
                <TableHead className="text-center p-1 text-xs h-8">Con firma</TableHead>
                <TableHead className="text-center p-1 text-xs h-8">Bajo puerta</TableHead>
                <TableHead className="text-center p-1 text-xs h-8">Total de cartas</TableHead>
                <TableHead className="text-center p-1 text-xs h-8">Meta</TableHead>
                <TableHead className="text-center p-1 text-xs h-8">%Eficacia</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {resumenEficaciaData.map((row) => (
                <TableRow key={row.base} className="h-8">
                  <TableCell className="font-medium p-1 text-xs">{row.base}</TableCell>
                  <TableCell className="text-center p-1 text-xs">{row.conFirma}</TableCell>
                  <TableCell className="text-center p-1 text-xs">{row.bajoPuerta}</TableCell>
                  <TableCell className="text-center p-1 text-xs">{row.total}</TableCell>
                  <TableCell className="text-center p-1 text-xs">{row.meta}</TableCell>
                  <TableCell className="text-center font-bold p-1 text-xs">
                    <div className="flex items-center justify-center gap-2">
                      <span className={cn(
                        "h-3 w-3 rounded-full",
                        row.eficacia >= 80 ? "bg-green-500" : "bg-red-500"
                      )}></span>
                      {row.eficacia}%
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TableFooter>
              <TableRow className="bg-primary text-primary-foreground hover:bg-primary/90 h-8">
                <TableCell className="font-bold p-1 text-xs">Total</TableCell>
                <TableCell className="text-center font-bold p-1 text-xs">{totals.conFirma}</TableCell>
                <TableCell className="text-center font-bold p-1 text-xs">{totals.bajoPuerta}</TableCell>
                <TableCell className="text-center font-bold p-1 text-xs">{totals.total}</TableCell>
                <TableCell className="text-center font-bold p-1 text-xs">80%</TableCell>
                <TableCell className="text-center font-bold p-1 text-xs">{totalEficacia}%</TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </CardContent>
      </Card>
    );
};


function EficaciaPorBaseChart() {
    return (
      <Card className="h-full">
        <CardHeader className="p-2">
          <CardTitle className="text-center font-bold text-primary text-sm">% EFICACIA POR BASE</CardTitle>
        </CardHeader>
        <CardContent className="p-0 h-[250px]">
          <ChartContainer config={chartConfig} className="w-full h-full">
            <ComposedChart
              data={resumenEficaciaData}
              margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
            >
              <CartesianGrid vertical={false} />
              <XAxis dataKey="base" tickLine={false} tickMargin={10} axisLine={false} fontSize={12} />
              <YAxis yAxisId="left" domain={[0, 100]} hide />
               <YAxis yAxisId="right" orientation="right" domain={[0, Math.max(...resumenEficaciaData.map(d => d.total)) + 50]} hide />
              <Tooltip
                content={<ChartTooltipContent formatter={(value, name) => name === 'eficacia' ? `${value}%` : value} />}
              />
              <ChartLegend content={<ChartLegendContent />} />
              <Bar dataKey="eficacia" yAxisId="left" fill="var(--color-eficacia)" radius={4} barSize={40}>
                <LabelList
                  dataKey="total"
                  position="top"
                  offset={8}
                  className="fill-foreground font-bold"
                  fontSize={12}
                />
                <LabelList
                  dataKey="eficacia"
                  position="center"
                  formatter={(value: number) => `${value}%`}
                  className="fill-primary-foreground font-bold"
                  fontSize={12}
                />
              </Bar>
              <Line
                yAxisId="right"
                dataKey="total"
                type="monotone"
                stroke="var(--color-total)"
                strokeWidth={2}
                strokeDasharray="3 3"
                dot={{
                  fill: "var(--color-total)",
                }}
                activeDot={{
                  r: 6,
                }}
              />
            </ComposedChart>
          </ChartContainer>
        </CardContent>
      </Card>
    );
}

const EficaciaPorCicloChart = () => (
    <Card>
        <CardHeader className="p-2">
            <CardTitle className="text-center font-bold text-primary text-sm">%EFICACIA POR CICLO</CardTitle>
            <CardDescription className="text-center text-xs">Meta 80%</CardDescription>
        </CardHeader>
        <CardContent className="p-2 h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
                <BarChart layout="vertical" data={eficaciaPorCicloData} margin={{ top: 0, right: 30, left: 0, bottom: 0 }}>
                    <CartesianGrid horizontal={false} />
                    <XAxis type="number" domain={[0, 100]} hide />
                    <YAxis dataKey="ciclo" type="category" tickLine={false} axisLine={false} width={50} fontSize={12} />
                    <Tooltip content={<ChartTooltipContent />} />
                    <Bar dataKey="eficacia" fill="hsl(var(--chart-1))" radius={[0, 4, 4, 0]}>
                        <LabelList dataKey="eficacia" position="right" formatter={(value:number) => `${value}%`} className="fill-foreground font-bold" fontSize={12} />
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
        </CardContent>
    </Card>
);

const CicloFilter = () => {
    const ciclos = ["C01", "C02", "C03-C04", "C05", "C06", "C07", "C08-09", "C10"];
    return(
    <Card>
        <CardHeader className="p-2">
            <CardTitle className="text-center font-bold text-primary text-sm">CICLO</CardTitle>
        </CardHeader>
        <CardContent className="p-2">
            {ciclos.map(ciclo => (
                <div key={ciclo} className="flex items-center space-x-2 py-1">
                    <Checkbox id={ciclo} />
                    <label htmlFor={ciclo} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                        {ciclo}
                    </label>
                </div>
            ))}
        </CardContent>
    </Card>
)};


export default function ComunicadosPage() {
  const kpis = [
    { title: "TOTAL DE CARTAS", value: "401" },
    { title: "CON FIRMA", value: "288" },
    { title: "BAJO PUERTA", value: "113" },
    { title: "% DE EFICACIA", value: "72%" },
  ];

  const trabajadoresEncimaMeta = [
    { base: "1. CO", nombre: "CHUMPITAZ LOPEZ", conFirma: 34, bajoPuerta: 0, total: 34, meta: "80%", eficacia: "100%" },
    { base: "2. CA", nombre: "ASTORGA QUIROZ V", conFirma: 24, bajoPuerta: 0, total: 24, meta: "80%", eficacia: "100%" },
    { base: "2. CA", nombre: "CASTAÑEDA BARCO", conFirma: 32, bajoPuerta: 0, total: 32, meta: "80%", eficacia: "100%" },
    { base: "3. ATE", nombre: "ELESCANO RIOS DA", conFirma: 8, bajoPuerta: 0, total: 8, meta: "80%", eficacia: "100%" },
    { base: "4. BRE", nombre: "ALDAZABAL SAIRE", conFirma: 30, bajoPuerta: 0, total: 30, meta: "80%", eficacia: "100%" },
    { base: "5. SJL", nombre: "QUISPE QUISPE JA", conFirma: 17, bajoPuerta: 0, total: 17, meta: "80%", eficacia: "100%" },
  ];

  const trabajadoresDebajoMeta = [
    { base: "1. CO", nombre: "PEREZ TRISTAN JO", conFirma: 29, bajoPuerta: 37, total: 66, meta: "80%", eficacia: "44%" },
    { base: "3. ATE", nombre: "MORE MORALES EDU", conFirma: 22, bajoPuerta: 6, total: 28, meta: "80%", eficacia: "79%" },
    { base: "4. BRE", nombre: "JURO GONZALES NI", conFirma: 0, bajoPuerta: 17, total: 17, meta: "80%", eficacia: "0%" },
    { base: "5. SJL", nombre: "CHICCHE BAILON D", conFirma: 0, bajoPuerta: 5, total: 5, meta: "80%", eficacia: "0%" },
  ];

  const getEficaciaVariant = (eficacia: string) => {
    const value = parseInt(eficacia.replace('%', ''));
    if (value >= 80) return "success";
    if (value < 50) return "destructive";
    return "warning";
  }

  return (
    <div className="flex flex-col gap-4">
      <Tabs defaultValue="cartas-b3">
        <TabsList>
          <TabsTrigger value="cartas-b3">Cartas B3</TabsTrigger>
          <TabsTrigger value="preventivas-b4">Preventivas B4</TabsTrigger>
        </TabsList>
        <TabsContent value="cartas-b3" className="mt-4">
          <div className="flex flex-col gap-4">

            <div className="flex justify-between items-center">
                <div className="w-24 h-24 relative">
                   {/* Placeholder for logo, as we can't generate images */}
                   <div className="w-full h-full bg-gray-200 flex items-center justify-center rounded-md">
                       <span className="text-xs text-muted-foreground">Logo</span>
                   </div>
                </div>
                <h1 className="text-xl font-bold text-primary flex-1 text-center">Reporte de efectividad en la entrega de los comunicados "Con firma"</h1>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {kpis.map(kpi => <StatCard key={kpi.title} title={kpi.title} value={kpi.value} />)}
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr_1fr] gap-4 items-start">
                <div className="flex flex-col gap-4">
                    <EficaciaPorCicloChart />
                </div>

                <div className="flex flex-col gap-4">
                    <ResumenEficaciaTable />
                    <Card>
                        <CardHeader className="p-2">
                            <CardTitle className="font-bold text-primary text-sm">TRABAJADORES CON RESULTADOS POR ENCIMA DE LA META</CardTitle>
                        </CardHeader>
                        <CardContent className="p-0">
                            <Accordion type="single" collapsible className="w-full">
                                <AccordionItem value="item-1">
                                    <AccordionTrigger className="p-2 text-xs">1. CO</AccordionTrigger>
                                    <AccordionContent>
                                        <Table>
                                            <TableBody>
                                                {trabajadoresEncimaMeta.filter(t => t.base.includes("CO")).map((trabajador, index) => (
                                                    <TableRow key={index} className="h-8">
                                                    <TableCell className="p-1 text-xs">{trabajador.nombre}</TableCell>
                                                    <TableCell className="text-right p-1 text-xs">{trabajador.conFirma}</TableCell>
                                                    <TableCell className="text-right p-1 text-xs">{trabajador.bajoPuerta}</TableCell>
                                                    <TableCell className="text-right p-1 text-xs">{trabajador.total}</TableCell>
                                                    <TableCell className="text-right p-1 text-xs">
                                                        <Badge variant="success">{trabajador.eficacia}</Badge>
                                                    </TableCell>
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </AccordionContent>
                                </AccordionItem>
                                 <AccordionItem value="item-2">
                                    <AccordionTrigger className="p-2 text-xs">2. CA</AccordionTrigger>
                                    <AccordionContent>
                                         <Table>
                                            <TableBody>
                                                {trabajadoresEncimaMeta.filter(t => t.base.includes("CA")).map((trabajador, index) => (
                                                    <TableRow key={index} className="h-8">
                                                    <TableCell className="p-1 text-xs">{trabajador.nombre}</TableCell>
                                                    <TableCell className="text-right p-1 text-xs">{trabajador.conFirma}</TableCell>
                                                    <TableCell className="text-right p-1 text-xs">{trabajador.bajoPuerta}</TableCell>
                                                    <TableCell className="text-right p-1 text-xs">{trabajador.total}</TableCell>
                                                    <TableCell className="text-right p-1 text-xs">
                                                        <Badge variant="success">{trabajador.eficacia}</Badge>
                                                    </TableCell>
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </AccordionContent>
                                </AccordionItem>
                                 <AccordionItem value="item-3">
                                    <AccordionTrigger className="p-2 text-xs">3. ATE</AccordionTrigger>
                                     <AccordionContent>
                                         <Table>
                                            <TableBody>
                                                {trabajadoresEncimaMeta.filter(t => t.base.includes("ATE")).map((trabajador, index) => (
                                                    <TableRow key={index} className="h-8">
                                                    <TableCell className="p-1 text-xs">{trabajador.nombre}</TableCell>
                                                    <TableCell className="text-right p-1 text-xs">{trabajador.conFirma}</TableCell>
                                                    <TableCell className="text-right p-1 text-xs">{trabajador.bajoPuerta}</TableCell>
                                                    <TableCell className="text-right p-1 text-xs">{trabajador.total}</TableCell>
                                                    <TableCell className="text-right p-1 text-xs">
                                                        <Badge variant="success">{trabajador.eficacia}</Badge>
                                                    </TableCell>
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </AccordionContent>
                                </AccordionItem>
                                <AccordionItem value="item-4">
                                    <AccordionTrigger className="p-2 text-xs">4. BRE</AccordionTrigger>
                                     <AccordionContent>
                                         <Table>
                                            <TableBody>
                                                {trabajadoresEncimaMeta.filter(t => t.base.includes("BRE")).map((trabajador, index) => (
                                                    <TableRow key={index} className="h-8">
                                                    <TableCell className="p-1 text-xs">{trabajador.nombre}</TableCell>
                                                    <TableCell className="text-right p-1 text-xs">{trabajador.conFirma}</TableCell>
                                                    <TableCell className="text-right p-1 text-xs">{trabajador.bajoPuerta}</TableCell>
                                                    <TableCell className="text-right p-1 text-xs">{trabajador.total}</TableCell>
                                                    <TableCell className="text-right p-1 text-xs">
                                                        <Badge variant="success">{trabajador.eficacia}</Badge>
                                                    </TableCell>
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </AccordionContent>
                                </AccordionItem>
                                <AccordionItem value="item-5">
                                    <AccordionTrigger className="p-2 text-xs">5. SJL</AccordionTrigger>
                                     <AccordionContent>
                                         <Table>
                                            <TableBody>
                                                {trabajadoresEncimaMeta.filter(t => t.base.includes("SJL")).map((trabajador, index) => (
                                                    <TableRow key={index} className="h-8">
                                                    <TableCell className="p-1 text-xs">{trabajador.nombre}</TableCell>
                                                    <TableCell className="text-right p-1 text-xs">{trabajador.conFirma}</TableCell>
                                                    <TableCell className="text-right p-1 text-xs">{trabajador.bajoPuerta}</TableCell>
                                                    <TableCell className="text-right p-1 text-xs">{trabajador.total}</TableCell>
                                                    <TableCell className="text-right p-1 text-xs">
                                                        <Badge variant="success">{trabajador.eficacia}</Badge>
                                                    </TableCell>
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </AccordionContent>
                                </AccordionItem>
                            </Accordion>
                        </CardContent>
                    </Card>
                </div>

                <div className="flex flex-col gap-4">
                    <EficaciaPorBaseChart/>
                    <CicloFilter />
                     <Card>
                        <CardHeader className="p-2">
                        <CardTitle className="font-bold text-primary text-sm">TRABAJADORES POR DEBAJO DE LA META</CardTitle>
                        </CardHeader>
                        <CardContent className="p-0">
                        <Table>
                            <TableHeader>
                            <TableRow>
                                <TableHead className="p-1 text-xs h-8">BASE</TableHead>
                                <TableHead className="p-1 text-xs h-8">Nombre</TableHead>
                                <TableHead className="text-right p-1 text-xs h-8">C/Firma</TableHead>
                                <TableHead className="text-right p-1 text-xs h-8">B/Puerta</TableHead>
                                <TableHead className="text-right p-1 text-xs h-8">Total</TableHead>
                                <TableHead className="text-right p-1 text-xs h-8">% Eficacia</TableHead>
                            </TableRow>
                            </TableHeader>
                            <TableBody>
                            {trabajadoresDebajoMeta.map((trabajador, index) => (
                                <TableRow key={index} className="h-8">
                                <TableCell className="font-medium p-1 text-xs">{trabajador.base}</TableCell>
                                <TableCell className="p-1 text-xs">{trabajador.nombre}</TableCell>
                                <TableCell className="text-right p-1 text-xs">{trabajador.conFirma}</TableCell>
                                <TableCell className="text-right p-1 text-xs">{trabajador.bajoPuerta}</TableCell>
                                <TableCell className="text-right p-1 text-xs">{trabajador.total}</TableCell>
                                <TableCell className="text-right p-1 text-xs">
                                    <Badge variant={getEficaciaVariant(trabajador.eficacia)}>{trabajador.eficacia}</Badge>
                                </TableCell>
                                </TableRow>
                            ))}
                            </TableBody>
                        </Table>
                        </CardContent>
                    </Card>
                </div>
            </div>
          </div>
        </TabsContent>
        <TabsContent value="preventivas-b4" className="mt-4">
          <div className="flex items-center justify-center h-96">
            <p className="text-muted-foreground">El contenido para "Preventivas B4" estará disponible pronto.</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

    