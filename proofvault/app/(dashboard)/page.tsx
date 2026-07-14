import { redirect } from 'next/navigation';
import { createServerClient } from '@/lib/auth/supabase';
import { cookies } from 'next/headers';
import { StatsCard } from '@/components/dashboard/stats-card';
import { ActivityFeed } from '@/components/dashboard/activity-feed';
import { QuickActions } from '@/components/dashboard/quick-actions';

export default async function DashboardPage() {
  // Verify user is authenticated
  const cookieStore = cookies();
  const supabase = createServerClient();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    redirect('/(auth)/login');
  }

  // Fetch dashboard data
  // Note: In a real implementation, this would fetch from the database
  // For now, we're using mock data
  const portfolioStats = {
    totalPortfolios: 1,
    publishedPortfolios: 1,
    totalProjects: 5,
    totalViews: 127,
  };

  const recentActivity = [
    {
      id: 1,
      action: 'Portfolio published',
      description: 'My Portfolio was published successfully',
      timestamp: new Date(Date.now() - 3600000).toISOString(), // 1 hour ago
    },
    {
      id: 2,
      action: 'Project added',
      description: 'Added new project: E-commerce Platform',
      timestamp: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
    },
    {
      id: 3,
      action: 'Media uploaded',
      description: 'Uploaded 3 new images to project gallery',
      timestamp: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
    },
  ];

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back! Here's what's happening with your portfolio.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
        <StatsCard
          title="Published Portfolios"
          value={portfolioStats.publishedPortfolios.toString()}
          change="+1 since last week"
          icon="📊"
        />
        <StatsCard
          title="Total Projects"
          value={portfolioStats.totalProjects.toString()}
          change="+2 since last week"
          icon="📦"
        />
        <StatsCard
          title="Total Views"
          value={portfolioStats.totalViews.toString()}
          change="+15% since last week"
          icon="👁️"
        />
        <StatsCard
          title="Active Projects"
          value={(portfolioStats.totalProjects - 1).toString()}
          change="+1 since last week"
          icon="🚀"
        />
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <ActivityFeed activities={recentActivity} />
        </div>
        <div>
          <QuickActions />
        </div>
      </div>
    </div>
  );
}