
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

type StatCardProps = {
  title: string;
  value: string;
};

export const StatCard: React.FC<StatCardProps> = ({ title, value }) => {
  return (
    <Card className="text-center">
      <CardHeader className="p-1 pb-0">
        <CardTitle className="text-xs font-medium text-muted-foreground">{title}</CardTitle>
      </CardHeader>
      <CardContent className="p-1">
        <p className="text-2xl font-bold text-primary">{value}</p>
      </CardContent>
    </Card>
  );
};

    