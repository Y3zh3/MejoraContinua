import type { FC } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, TrendingDown, type LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

type KpiCardProps = {
  title: string;
  value: string;
  icon: LucideIcon;
  trend: string;
  trendDirection: 'up' | 'down' | 'neutral';
};

export const KpiCard: FC<KpiCardProps> = ({ title, value, icon: Icon, trend, trendDirection }) => {
  const TrendIcon = trendDirection === 'up' ? TrendingUp : TrendingDown;
  
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className={cn(
          "text-xs text-muted-foreground flex items-center gap-1",
          trendDirection === 'up' && 'text-green-600',
          trendDirection === 'down' && 'text-red-600',
        )}>
          {trendDirection !== 'neutral' && <TrendIcon className="h-3 w-3" />}
          {trend}
        </p>
      </CardContent>
    </Card>
  );
};
