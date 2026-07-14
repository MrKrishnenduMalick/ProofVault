import { redirect } from 'next/navigation';
import { createServerClient } from '@/lib/auth/supabase';
import { cookies } from 'next/headers';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default async function PortfolioListPage() {
  // Verify user is authenticated
  const cookieStore = cookies();
  const supabase = createServerClient();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    redirect('/(auth)/login');
  }

  // Fetch user's portfolios
  // In a real implementation, this would fetch from the database
  // For now, we're using mock data
  const portfolios = [
    {
      id: '1',
      title: 'My Portfolio',
      slug: 'my-portfolio',
      status: 'published',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: '2',
      title: 'Design Portfolio',
      slug: 'design-portfolio',
      status: 'draft',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ];

  return (
    <div className="p-6">
      <div className="mb-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Portfolios</h1>
            <p className="text-muted-foreground">
              Manage your published portfolios and drafts
            </p>
          </div>
          <Button asChild>
            <Link href="/(dashboard)/portfolio/new">Create New Portfolio</Link>
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {portfolios.map((portfolio) => (
          <Card key={portfolio.id}>
            <CardHeader>
              <CardTitle>{portfolio.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-2">
                Slug: {portfolio.slug}
              </p>
              <Badge variant={portfolio.status === 'published' ? 'default' : 'secondary'}>
                {portfolio.status.charAt(0).toUpperCase() + portfolio.status.slice(1)}
              </Badge>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" asChild>
                <Link href={`/u/${portfolio.slug}`} target="_blank">
                  Preview
                </Link>
              </Button>
              <Button asChild>
                <Link href={`/(dashboard)/portfolio/${portfolio.id}`}>Edit</Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}