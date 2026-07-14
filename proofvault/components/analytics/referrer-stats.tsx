import { Card, CardContent } from '@/components/ui/card';

interface ReferrerSource {
  domain: string;
  count: number;
}

interface ReferrerStatsProps {
  referrerSources: ReferrerSource[];
}

export function ReferrerStats({ referrerSources }: ReferrerStatsProps) {
  return (
    <div className="space-y-4">
      {referrerSources.map((source, index) => (
        <div key={index} className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-primary"></div>
            <span className="text-sm">{source.domain}</span>
          </div>
          <span className="text-sm font-medium">{source.count}</span>
        </div>
      ))}
    </div>
  );
}