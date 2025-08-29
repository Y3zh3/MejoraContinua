
"use client";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, LabelList, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";
import { Badge } from "@/components/ui/badge";
import { Droplet } from "lucide-react";


const morosidadData = [
    { month: "Ene", morosidad: 60, recuperacion: 40 },
    { month: "Feb", morosidad: 55, recuperacion: 45 },
    { month: "Mar", morosidad: 58, recuperacion: 42 },
    { month: "Abr", morosidad: 62, recuperacion: 38 },
    { month: "May", morosidad: 57, recuperacion: 43 },
    { month: "Jun", morosidad: 65, recuperacion: 35 },
];

const facturadoAnualData = [
    { year: '2019', value: 65355388, startColor: '#3498db', endColor: '#2980b9' },
    { year: '2020', value: 52885862, startColor: '#5dade2', endColor: '#3498db' },
    { year: '2021', value: 57862414, startColor: '#85c1e9', endColor: '#5dade2' },
    { year: '2022', value: 75421036, startColor: '#a9d6e5', endColor: '#85c1e9' },
    { year: '2023', value: 76920707, startColor: '#e0f7fa', endColor: '#a9d6e5' },
];

const facturadoData = [
    { name: 'Importe', value: 346873, meta: 400000 },
];

const oportunidadesData = [
    { entidad: "EPSEL S.A.", objeto: "Adquisición de micro medidores y conexiones domiciliarias.", fecha: "15/05/2024", valor: "S/ 1,500,000" },
    { entidad: "SEDAPAL", objeto: "Servicio de consultoría para la supervisión de la obra.", fecha: "20/05/2024", valor: "S/ 850,000" },
    { entidad: "EPS GRAU S.A.", objeto: "Contratación de servicio de mantenimiento de redes.", fecha: "22/05/2024", valor: "S/ 300,000" },
    { entidad: "EMAPA HUACHO", objeto: "Adquisición de tuberías y accesorios de PVC.", fecha: "25/05/2024", valor: "S/ 750,000" },
    { entidad: "SEDALIB S.A.", objeto: "Servicio de transporte de materiales y equipos.", fecha: "28/05/2024", valor: "S/ 420,000" },
];

const CustomCylinderBar = (props: any) => {
    const { x, y, width, height, payload, value, yAxis } = props;
    
    if (!yAxis || height <= 0) return null;
    
    const { year, startColor, endColor } = payload;

    const radius = width / 2;
    const ellipseHeight = radius * 0.35;
    const baseHeight = 60;
    const totalCylinderHeight = yAxis.height; 
    
    const gradientId = `cylinderGradient-${year}`;
    
    const numTicks = 5;
    const tickPositions = Array.from({ length: numTicks }, (_, i) => (totalCylinderHeight / (numTicks - 1)) * i);


    return (
        <g>
             <defs>
                <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={startColor} stopOpacity={0.8} />
                    <stop offset="100%" stopColor={endColor} />
                </linearGradient>
                <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
                    <feDropShadow dx="2" dy="5" stdDeviation="3" floodColor="#000" floodOpacity="0.3"/>
                </filter>
            </defs>

            {/* Glass Cylinder */}
            <rect x={x} y={yAxis.y} width={width} height={totalCylinderHeight} fill="rgba(255, 255, 255, 0.3)" rx={radius} ry={radius} />
            <path d={`M${x},${yAxis.y + ellipseHeight} A${radius},${ellipseHeight} 0 1,1 ${x + width},${yAxis.y + ellipseHeight}`} fill="rgba(255, 255, 255, 0.5)" />
            <rect x={x} y={yAxis.y + ellipseHeight} width={width} height={totalCylinderHeight - ellipseHeight * 2} fill="rgba(235, 245, 255, 0.6)" />
            <path d={`M${x},${yAxis.y + totalCylinderHeight - ellipseHeight} A${radius},${ellipseHeight} 0 1,0 ${x + width},${yAxis.y + totalCylinderHeight - ellipseHeight}`} fill="rgba(255, 255, 255, 0.2)" />


            {/* Liquid */}
            <rect x={x} y={y} width={width} height={height} fill={`url(#${gradientId})`} />
            <path d={`M${x},${y} A${radius},${ellipseHeight} 0 1,1 ${x + width},${y}`} fill={startColor} style={{ filter: 'brightness(1.2)' }} />

            {/* Liquid Highlight */}
            <path d={`M${x+width*0.25},${y} C${x+width*0.35},${y+height*0.33} ${x+width*0.35},${y+height*0.66} ${x+width*0.25},${y+height}`} 
                fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth={10} />

            {/* Measurement Ticks */}
            {tickPositions.map((tickY, i) => (
                <path key={i} d={`M ${x + 5} ${yAxis.y + totalCylinderHeight - tickY} h -5`} stroke="rgba(0,0,0,0.2)" strokeWidth="1" />
            ))}

            {/* Base */}
             <g transform={`translate(${x}, ${yAxis.y + totalCylinderHeight})`}>
                <rect width={width} height={baseHeight} fill="#1c1c1c" />
                <path d={`M0,0 A${radius},${ellipseHeight} 0 0,0 ${width},0 L${width},${ellipseHeight} A${radius},${ellipseHeight} 0 0,1 0,${ellipseHeight} Z`} fill="#2c2c2c" />
                <path d={`M0,${baseHeight} A${radius},${ellipseHeight} 0 0,0 ${width},${baseHeight}`} fill="#111" />
            </g>


            {/* Base Content */}
            <g transform={`translate(${x + radius}, ${yAxis.y + totalCylinderHeight + baseHeight/2 + 5})`}>
                 <Droplet size={18} fill="#56CCF2" stroke="white" strokeWidth={0.5} y={-14}/>
                 <text y={12} fill="white" fontSize="16" fontWeight="bold" textAnchor="middle">{year}</text>
            </g>
        </g>
    );
};

const FacturadoAnualChart = () => {
    return (
        <ResponsiveContainer width="100%" height={400}>
            <BarChart data={facturadoAnualData} margin={{ top: 20, right: 30, left: 20, bottom: 40 }} barSize={80}>
                <CartesianGrid vertical={false} strokeDasharray="3 3" />
                <XAxis dataKey="year" tickLine={false} axisLine={false} tick={false} />
                <YAxis
                    axisLine={false}
                    tickLine={false}
                    tickFormatter={(value) => new Intl.NumberFormat('es-PE', { notation: 'compact', compactDisplay: 'short' }).format(value)}
                    domain={[0, 85000000]}
                    tickCount={10}
                />
                <Tooltip
                    cursor={{ fill: 'rgba(206, 212, 218, 0.2)' }}
                    content={({ active, payload, label }) => {
                        if (active && payload && payload.length) {
                            return (
                                <div className="p-2 bg-background border rounded-md shadow-md">
                                    <p className="font-bold">{label}</p>
                                    <p>Importe: {new Intl.NumberFormat('es-PE', { style: 'currency', currency: 'PEN' }).format(payload[0].value as number)}</p>
                                </div>
                            );
                        }
                        return null;
                    }}
                />
                <Bar dataKey="value" shape={<CustomCylinderBar />}>
                    <LabelList
                        dataKey="value"
                        position="center"
                        angle={-90}
                        offset={20}
                        formatter={(value: number) => new Intl.NumberFormat('es-PE').format(value)}
                        fill="#fff"
                        fontSize={16}
                        fontWeight="bold"
                        style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.7)' }}
                    />
                </Bar>
            </BarChart>
        </ResponsiveContainer>
    );
};


const CylinderChart = ({ data, title, description, color }: { data: any[], title: string, description: string, color: string }) => {
    const percentage = (data[0].value / data[0].meta) * 100;
    const formattedValue = new Intl.NumberFormat('es-PE', { style: 'currency', currency: 'PEN' }).format(data[0].value);
    
    return (
        <Card>
            <CardHeader>
                <CardTitle>{title}</CardTitle>
                <CardDescription>{description}</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col justify-center items-center h-[400px] gap-4">
                <div className="relative w-28 h-64 bg-gray-200/50 rounded-t-lg flex items-end" style={{ borderBottomLeftRadius: '60px', borderBottomRightRadius: '60px' }}>
                    <div className="absolute w-full h-8 bg-gray-300/40" style={{top: 0, borderTopLeftRadius: '60px', borderTopRightRadius: '60px'}}></div>
                    <div 
                        className="relative w-full" 
                        style={{ 
                            height: `${percentage}%`,
                            backgroundColor: color,
                            borderBottomLeftRadius: '60px',
                            borderBottomRightRadius: '60px',
                            minHeight: '10px'
                        }}
                    >
                         <div 
                            className="absolute w-full h-8 rounded-full -top-4" 
                            style={{
                                backgroundColor: color, 
                                filter: 'brightness(1.2)'
                            }}>
                        </div>
                    </div>
                     <div 
                        className="absolute w-full h-8 bg-gray-800/80" 
                        style={{ bottom: '-15px', borderBottomLeftRadius: '60px', borderBottomRightRadius: '60px' }}>
                    </div>


                    <div className="absolute z-10 text-white text-center w-full bottom-1/2 translate-y-1/2">
                        <p className="font-bold text-lg drop-shadow">{formattedValue}</p>
                        <p className="text-xs drop-shadow">({percentage.toFixed(1)}%)</p>
                    </div>

                </div>
                 <div className="text-center mt-2">
                    <p className="text-xl font-bold">Importe Facturado</p>
                </div>
            </CardContent>
        </Card>
    );
};


export default function InspeccionesPage() {
    return (
        <div className="flex flex-col gap-6">
            <div>
                <h1 className="font-headline text-3xl font-bold">Panel de Control Operativo</h1>
                <p className="text-muted-foreground">Visualización integral de métricas clave de la operación.</p>
            </div>

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                <Card>
                    <CardHeader>
                        <CardTitle>Importe facturado anual</CardTitle>
                        <CardDescription>Fuentes: Eps Sedacusco SA-2023</CardDescription>
                    </CardHeader>
                    <CardContent className="h-[400px]">
                        <FacturadoAnualChart />
                    </CardContent>
                </Card>
                <CylinderChart 
                    data={facturadoData} 
                    title="Importe facturado por Agua y Alcantarillado" 
                    description="Fuentes: Eps Sedacusco SA-2023"
                    color="hsl(var(--chart-2))" 
                />
            </div>
            
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                <Card>
                    <CardHeader>
                        <CardTitle>Evolución nivel de morosidad</CardTitle>
                    </CardHeader>
                    <CardContent className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={morosidadData} layout="vertical" stackOffset="expand">
                                <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                                <XAxis type="number" hide />
                                <YAxis type="category" dataKey="month" axisLine={false} tickLine={false} />
                                <Tooltip
                                    content={({ active, payload, label }) => {
                                        if (active && payload && payload.length) {
                                            return (
                                                <div className="p-2 bg-background border rounded-md shadow-md">
                                                    <p className="font-bold">{label}</p>
                                                    <p style={{ color: "hsl(var(--chart-5))" }}>Morosidad: {((payload[1].value || 0) * 100).toFixed(0)}%</p>
                                                    <p style={{ color: "hsl(var(--chart-3))" }}>Recuperación: {((payload[0].value || 0) * 100).toFixed(0)}%</p>
                                                </div>
                                            );
                                        }
                                        return null;
                                    }}
                                />
                                <Bar dataKey="recuperacion" stackId="a" fill="hsl(var(--chart-3))" radius={[5, 0, 0, 5]} />
                                <Bar dataKey="morosidad" stackId="a" fill="hsl(var(--chart-5))" radius={[0, 5, 5, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Oportunidad Venta - SEACE</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Entidad</TableHead>
                                    <TableHead>Objeto de Contratación</TableHead>
                                    <TableHead>Fecha</TableHead>
                                    <TableHead className="text-right">Valor Estimado</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {oportunidadesData.map((op, index) => (
                                    <TableRow key={index}>
                                        <TableCell className="font-medium">{op.entidad}</TableCell>
                                        <TableCell>{op.objeto}</TableCell>
                                        <TableCell>{op.fecha}</TableCell>
                                        <TableCell className="text-right font-bold">{op.valor}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
