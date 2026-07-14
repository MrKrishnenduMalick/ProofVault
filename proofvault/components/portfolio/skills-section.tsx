import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface SkillsSectionProps {
  portfolio: any;
}

export function SkillsSection({ portfolio }: SkillsSectionProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Skills Section</CardTitle>
        <CardDescription>
          Highlight your technical and soft skills
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Technical Skills</label>
            <textarea
              className="w-full rounded-md border border-input bg-background px-3 py-2 min-h-[120px]"
              placeholder="React, Node.js, TypeScript, etc."
              defaultValue={portfolio.skills?.technical || ''}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Soft Skills</label>
            <textarea
              className="w-full rounded-md border border-input bg-background px-3 py-2 min-h-[120px]"
              placeholder="Communication, Leadership, Problem Solving, etc."
              defaultValue={portfolio.skills?.soft || ''}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}