import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

interface DailyView {
  date: string;
  views: number;
}

interface ViewsChartProps {
  dailyViews: DailyView[];
}

export function ViewsChart({ dailyViews }: ViewsChartProps) {
  return (
    <div className="h-80">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={dailyViews}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="views" fill="#3B82F6" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}