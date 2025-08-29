"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  Pie,
  PieChart,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Cell,
} from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

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


const lineChartData = [
    { date: "2024-01-01", value: 87 },
    { date: "2024-01-02", value: 92 },
    { date: "2024-01-03", value: 78 },
    { date: "2024-01-04", value: 105 },
    { date: "2024-01-05", value: 95 },
    { date: "2024-01-06", value: 110 },
    { date: "2024-01-07", value: 102 },
  ];
  
  const lineChartConfig = {
    value: {
      label: "Value",
      color: "hsl(var(--chart-1))",
    },
  } satisfies ChartConfig;

export function LineChartExample() {
    return (
        <ChartContainer config={lineChartConfig} className="min-h-[200px] w-full">
            <LineChart
            accessibilityLayer
            data={lineChartData}
            margin={{
                left: 12,
                right: 12,
            }}
            >
            <CartesianGrid vertical={false} />
            <XAxis
                dataKey="date"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tickFormatter={(value) => new Date(value).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
            />
            <YAxis />
            <Tooltip cursor={false} content={<ChartTooltipContent indicator="line" />} />
            <Line
                dataKey="value"
                type="natural"
                stroke="var(--color-value)"
                strokeWidth={2}
                dot={false}
            />
            </LineChart>
        </ChartContainer>
    );
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
}
  
export function ChartCard({ title, description, chart}: ChartCardProps) {
    return (
        <Card>
            <CardHeader>
            <CardTitle className="font-headline">{title}</CardTitle>
            <CardDescription>{description}</CardDescription>
            </CardHeader>
            <CardContent>
            {chart}
            </CardContent>
        </Card>
    );
}
