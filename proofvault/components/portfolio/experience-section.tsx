import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface ExperienceSectionProps {
  portfolio: any;
}

export function ExperienceSection({ portfolio }: ExperienceSectionProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Experience Section</CardTitle>
        <CardDescription>
          Your work history and professional experience
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Current Position</label>
            <input
              type="text"
              className="w-full rounded-md border border-input bg-background px-3 py-2"
              placeholder="Senior Software Engineer"
              defaultValue={portfolio.experience?.currentPosition || ''}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Company</label>
            <input
              type="text"
              className="w-full rounded-md border border-input bg-background px-3 py-2"
              placeholder="Acme Inc."
              defaultValue={portfolio.experience?.company || ''}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Work Description</label>
            <textarea
              className="w-full rounded-md border border-input bg-background px-3 py-2 min-h-[120px]"
              placeholder="Describe your responsibilities and achievements..."
              defaultValue={portfolio.experience?.description || ''}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}