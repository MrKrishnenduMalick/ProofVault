import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface EducationSectionProps {
  portfolio: any;
}

export function EducationSection({ portfolio }: EducationSectionProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Education Section</CardTitle>
        <CardDescription>
          Your academic background and qualifications
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Degree</label>
            <input
              type="text"
              className="w-full rounded-md border border-input bg-background px-3 py-2"
              placeholder="Bachelor of Science in Computer Science"
              defaultValue={portfolio.education?.degree || ''}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Institution</label>
            <input
              type="text"
              className="w-full rounded-md border border-input bg-background px-3 py-2"
              placeholder="University of Technology"
              defaultValue={portfolio.education?.institution || ''}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Graduation Year</label>
            <input
              type="number"
              className="w-full rounded-md border border-input bg-background px-3 py-2"
              placeholder="2020"
              defaultValue={portfolio.education?.year || ''}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}