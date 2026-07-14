import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PlusCircle, BarChart3, Upload, Settings } from 'lucide-react';
import Link from 'next/link';

export function QuickActions() {
  const actions = [
    {
      title: 'Create New Project',
      description: 'Add a new project to your portfolio',
      icon: PlusCircle,
      href: '/(dashboard)/projects/new',
      color: 'bg-blue-500',
    },
    {
      title: 'View Analytics',
      description: 'See how your portfolio is performing',
      icon: BarChart3,
      href: '/(dashboard)/analytics',
      color: 'bg-green-500',
    },
    {
      title: 'Upload Media',
      description: 'Add new images to your media library',
      icon: Upload,
      href: '/(dashboard)/media',
      color: 'bg-purple-500',
    },
    {
      title: 'Manage Settings',
      description: 'Update your profile and preferences',
      icon: Settings,
      href: '/(dashboard)/settings',
      color: 'bg-orange-500',
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {actions.map((action, index) => (
            <Link key={index} href={action.href}>
              <Button
                variant="outline"
                className="flex w-full items-center justify-start gap-3"
              >
                <div className={`rounded-lg p-2 ${action.color}`}>
                  <action.icon className="h-4 w-4 text-white" />
                </div>
                <div className="text-left">
                  <p className="font-medium">{action.title}</p>
                  <p className="text-xs text-muted-foreground">
                    {action.description}
                  </p>
                </div>
              </Button>
            </Link>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}