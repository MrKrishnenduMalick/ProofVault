import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface HeroSectionProps {
  portfolio: any;
}

export function HeroSection({ portfolio }: HeroSectionProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Hero Section</CardTitle>
        <CardDescription>
          The main introduction that appears at the top of your portfolio
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Headline</label>
            <input
              type="text"
              className="w-full rounded-md border border-input bg-background px-3 py-2"
              placeholder="Software Developer & Designer"
              defaultValue={portfolio.profile?.headline || ''}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Subheading</label>
            <input
              type="text"
              className="w-full rounded-md border border-input bg-background px-3 py-2"
              placeholder="Creating beautiful and functional digital experiences"
              defaultValue={portfolio.profile?.subheading || ''}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Call to Action</label>
            <input
              type="text"
              className="w-full rounded-md border border-input bg-background px-3 py-2"
              placeholder="View My Work"
              defaultValue={portfolio.profile?.cta || ''}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}