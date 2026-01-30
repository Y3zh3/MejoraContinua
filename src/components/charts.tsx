
"use client";

import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Pie,
  PieChart,
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const barChartData = [
  { month: "January", desktop: 186, mobile: 80 },
  { month: "February", desktop: 305, mobile: 200 },
  { month: "March", desktop: 237, mobile: 120 },
  { month: "April", desktop: 73, mobile: 190 },
  { month: "May", desktop: 209, mobile: 130 },
  { month: "June", desktop: 214, mobile: 140 },
];

const barChartConfig = {
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-1))",
  },
  mobile: {
    label: "Mobile",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

export function BarChartExample() {
  return (
    <ChartContainer config={barChartConfig} className="min-h-[200px] w-full">
      <BarChart accessibilityLayer data={barChartData}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="month"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          tickFormatter={(value) => value.slice(0, 3)}
        />
        <YAxis />
        <Tooltip content={<ChartTooltipContent />} />
        <Legend />
        <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} />
        <Bar dataKey="mobile" fill="var(--color-mobile)" radius={4} />
      </BarChart>
    </ChartContainer>
  );
}


const areaChartData = [
    { date: "2024-01-01", value: 87 },
    { date: "2024-02-01", value: 92 },
    { date: "2024-03-01", value: 78 },
    { date: "2024-04-01", value: 105 },
    { date: "2024-05-01", value: 95 },
    { date: "2024-06-01", value: 110 },
  ];
  
  const areaChartConfig = {
    value: {
      label: "Value",
      color: "hsl(var(--chart-1))",
    },
  } satisfies ChartConfig;

export function AreaChartExample() {
    return (
        <ChartContainer config={areaChartConfig} className="min-h-[200px] w-full">
            <AreaChart
                accessibilityLayer
                data={areaChartData}
                margin={{ left: 12, right: 12 }}
            >
                <CartesianGrid vertical={false} />
                 <XAxis
                    dataKey="date"
                    tickLine={false}
                    axisLine={false}
                    tickMargin={8}
                    tickFormatter={(value) => new Date(value).toLocaleDateString('es-ES', { month: 'short' })}
                />
                <YAxis />
                <Tooltip cursor={false} content={<ChartTooltipContent indicator="dot" />} />
                <defs>
                    <linearGradient id="fillValue" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="var(--color-value)" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="var(--color-value)" stopOpacity={0.1} />
                    </linearGradient>
                </defs>
                <Area
                    dataKey="value"
                    type="natural"
                    fill="url(#fillValue)"
                    stroke="var(--color-value)"
                    stackId="a"
                />
            </AreaChart>
        </ChartContainer>
    );
}

const radarChartData = [
    { sede: 'Comas', valor: 120, meta: 110, fullMark: 150 },
    { sede: 'Callao', valor: 98, meta: 130, fullMark: 150 },
    { sede: 'Ate', valor: 86, meta: 130, fullMark: 150 },
    { sede: 'Breña', valor: 99, meta: 100, fullMark: 150 },
    { sede: 'SJL', valor: 85, meta: 90, fullMark: 150 },
    { sede: 'Surquillo', valor: 65, meta: 85, fullMark: 150 },
  ];
  
  const radarChartConfig = {
    valor: { label: 'Desempeño', color: 'hsl(var(--chart-1))' },
    meta: { label: 'Meta', color: 'hsl(var(--chart-2))' },
  } satisfies ChartConfig;

export function RadarChartExample() {
    return (
      <ChartContainer
        config={radarChartConfig}
        className="mx-auto aspect-square h-[250px]"
      >
        <RadarChart data={radarChartData}>
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent />}
          />
          <PolarGrid />
          <PolarAngleAxis dataKey="sede" />
          <PolarRadiusAxis angle={30} domain={[0, 150]} />
          <Radar name="Desempeño" dataKey="valor" stroke="var(--color-valor)" fill="var(--color-valor)" fillOpacity={0.6} />
          <Radar name="Meta" dataKey="meta" stroke="var(--color-meta)" fill="var(--color-meta)" fillOpacity={0.6} />
          <Legend />
        </RadarChart>
      </ChartContainer>
    )
  }

const pieChartData = [
    { name: 'Category A', value: 400, fill: "hsl(var(--chart-1))" },
    { name: 'Category B', value: 300, fill: "hsl(var(--chart-2))" },
    { name: 'Category C', value: 300, fill: "hsl(var(--chart-3))" },
    { name: 'Category D', value: 200, fill: "hsl(var(--chart-4))" },
  ];
  
  const pieChartConfig = {
    value: {
      label: "Value",
    },
    "Category A": {
      label: "Category A",
      color: "hsl(var(--chart-1))",
    },
    "Category B": {
      label: "Category B",
      color: "hsl(var(--chart-2))",
    },
    "Category C": {
        label: "Category C",
        color: "hsl(var(--chart-3))",
    },
    "Category D": {
        label: "Category D",
        color: "hsl(var(--chart-4))",
    },
  } satisfies ChartConfig;
  

export function PieChartExample() {
    return (
      <ChartContainer
        config={pieChartConfig}
        className="mx-auto aspect-square h-[250px]"
      >
        <PieChart>
          <Tooltip
            cursor={false}
            content={<ChartTooltipContent hideLabel />}
          />
          <Pie
            data={pieChartData}
            dataKey="value"
            nameKey="name"
            innerRadius={60}
          />
        </PieChart>
      </ChartContainer>
    )
  }

type ChartCardProps = {
    title: string;
    description: string;
    chart: React.ReactNode;
    className?: string;
}
  
export function ChartCard({ title, description, chart, className}: ChartCardProps) {
    return (
        <Card className={cn(className)}>
            <CardHeader>
              <CardTitle className="font-headline text-lg">{title}</CardTitle>
              <CardDescription>{description}</CardDescription>
            </CardHeader>
            <CardContent>
              {chart}
            </CardContent>
        </Card>
    );
}
