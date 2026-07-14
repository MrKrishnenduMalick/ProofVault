import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface AboutSectionProps {
  portfolio: any;
}

export function AboutSection({ portfolio }: AboutSectionProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>About Section</CardTitle>
        <CardDescription>
          Information about yourself and your background
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Bio</label>
            <textarea
              className="w-full rounded-md border border-input bg-background px-3 py-2 min-h-[120px]"
              placeholder="Tell visitors about yourself..."
              defaultValue={portfolio.profile?.bio || ''}
            />
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label className="block text-sm font-medium mb-1">Location</label>
              <input
                type="text"
                className="w-full rounded-md border border-input bg-background px-3 py-2"
                placeholder="City, Country"
                defaultValue={portfolio.profile?.location || ''}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Years of Experience</label>
              <input
                type="number"
                className="w-full rounded-md border border-input bg-background px-3 py-2"
                placeholder="5"
                defaultValue={portfolio.profile?.yearsOfExperience || ''}
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}