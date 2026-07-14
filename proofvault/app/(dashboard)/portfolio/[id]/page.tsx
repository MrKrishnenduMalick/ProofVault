import { redirect } from 'next/navigation';
import { createServerClient } from '@/lib/auth/supabase';
import { cookies } from 'next/headers';
import { PortfolioForm } from '@/components/portfolio/portfolio-form';

interface Props {
  params: {
    id: string;
  };
}

export default async function PortfolioEditorPage({ params }: Props) {
  // Verify user is authenticated
  const cookieStore = cookies();
  const supabase = createServerClient();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    redirect('/(auth)/login');
  }

  // Fetch portfolio data
  // In a real implementation, this would fetch from the database
  // For now, we're using mock data
  const portfolio = {
    id: params.id,
    title: 'My Portfolio',
    slug: 'my-portfolio',
    status: 'draft',
    sectionsConfig: {
      hero: true,
      about: true,
      projects: true,
      skills: true,
      experience: true,
      education: true,
      contact: true,
    },
    theme: {
      primaryColor: '#3B82F6',
      fontSize: 'base',
      layout: 'default',
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Edit Portfolio</h1>
        <p className="text-muted-foreground">
          Customize your portfolio sections and appearance
        </p>
      </div>

      <PortfolioForm portfolio={portfolio} />
    </div>
  );
}