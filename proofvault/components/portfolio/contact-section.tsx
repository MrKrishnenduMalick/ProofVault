import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface ContactSectionProps {
  portfolio: any;
}

export function ContactSection({ portfolio }: ContactSectionProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Contact Section</CardTitle>
        <CardDescription>
          How visitors can reach you
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <input
                type="email"
                className="w-full rounded-md border border-input bg-background px-3 py-2"
                placeholder="you@example.com"
                defaultValue={portfolio.contact?.email || ''}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Phone</label>
              <input
                type="tel"
                className="w-full rounded-md border border-input bg-background px-3 py-2"
                placeholder="+1 (555) 123-4567"
                defaultValue={portfolio.contact?.phone || ''}
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Social Links</label>
            <div className="space-y-2">
              <input
                type="url"
                className="w-full rounded-md border border-input bg-background px-3 py-2"
                placeholder="LinkedIn Profile"
                defaultValue={portfolio.contact?.linkedin || ''}
              />
              <input
                type="url"
                className="w-full rounded-md border border-input bg-background px-3 py-2"
                placeholder="GitHub Profile"
                defaultValue={portfolio.contact?.github || ''}
              />
              <input
                type="url"
                className="w-full rounded-md border border-input bg-background px-3 py-2"
                placeholder="Twitter Profile"
                defaultValue={portfolio.contact?.twitter || ''}
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}