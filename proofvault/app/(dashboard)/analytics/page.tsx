import { redirect } from 'next/navigation';
import { createServerClient } from '@/lib/auth/supabase';
import { cookies } from 'next/headers';
import { AnalyticsDashboard } from '@/components/analytics/analytics-dashboard';

export default async function AnalyticsPage() {
  // Verify user is authenticated
  const cookieStore = cookies();
  const supabase = createServerClient();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    redirect('/(auth)/login');
  }

  // In a real implementation, we would fetch the user's analytics data
  // For now, we're using mock data
  const analyticsData = {
    totalViews: 127,
    uniqueVisitors: 89,
    avgSessionDuration: 120,
    bounceRate: 0.32,
    referrerSources: [
      { domain: 'google.com', count: 45 },
      { domain: 'linkedin.com', count: 23 },
      { domain: 'direct', count: 32 },
      { domain: 'twitter.com', count: 18 },
      { domain: 'github.com', count: 9 },
    ],
    dailyViews: [
      { date: '2023-10-01', views: 12 },
      { date: '2023-10-02', views: 18 },
      { date: '2023-10-03', views: 15 },
      { date: '2023-10-04', views: 22 },
      { date: '2023-10-05', views: 19 },
      { date: '2023-10-06', views: 24 },
      { date: '2023-10-07', views: 17 },
    ],
    projectEngagement: [
      { 
        projectId: '1', 
        projectName: 'E-commerce Platform', 
        views: 45, 
        clicks: 12,
        linkClicks: 8
      },
      { 
        projectId: '2', 
        projectName: 'Task Management App', 
        views: 32, 
        clicks: 7,
        linkClicks: 5
      },
      { 
        projectId: '3', 
        projectName: 'Dashboard UI Kit', 
        views: 28, 
        clicks: 9,
        linkClicks: 6
      },
    ],
  };

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Analytics</h1>
        <p className="text-muted-foreground">
          Track how your portfolio is performing
        </p>
      </div>

      <AnalyticsDashboard analyticsData={analyticsData} />
    </div>
  );
}