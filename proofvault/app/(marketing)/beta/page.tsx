import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { BetaInviteService } from '@/lib/features/beta-invites';

export default async function BetaLandingPage() {
  // In a real implementation, we would check if the beta program is still active
  // For now, we're showing a static page
  const isBetaActive = true;
  
  // Get invite stats (in a real implementation, this would only be available to admins)
  const stats = {
    totalUsers: 150,
    activeUsers: 120,
    projectsCreated: 420,
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Join Our Beta Program</h1>
        <p className="text-xl text-muted-foreground mb-8">
          Help us build the best portfolio platform for developers and creators
        </p>
      </div>

      {isBetaActive ? (
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <Card>
            <CardHeader>
              <CardTitle>What You'll Get</CardTitle>
              <CardDescription>Early access to ProofVault features</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <span className="mr-2">✓</span>
                  <span>Create and publish professional portfolios</span>
                </li>
                <li className="flex items-center">
                  <span className="mr-2">✓</span>
                  <span>Privacy-respecting analytics</span>
                </li>
                <li className="flex items-center">
                  <span className="mr-2">✓</span>
                  <span>Media library with R2 storage</span>
                </li>
                <li className="flex items-center">
                  <span className="mr-2">✓</span>
                  <span>Portfolio health scoring</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Beta Statistics</CardTitle>
              <CardDescription>Early user engagement metrics</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-muted p-4 rounded-lg">
                  <p className="text-2xl font-bold">{stats.totalUsers}+</p>
                  <p className="text-sm text-muted-foreground">Total Users</p>
                </div>
                <div className="bg-muted p-4 rounded-lg">
                  <p className="text-2xl font-bold">{stats.activeUsers}</p>
                  <p className="text-sm text-muted-foreground">Active Users</p>
                </div>
                <div className="bg-muted p-4 rounded-lg">
                  <p className="text-2xl font-bold">{stats.projectsCreated}</p>
                  <p className="text-sm text-muted-foreground">Projects Created</p>
                </div>
                <div className="bg-muted p-4 rounded-lg">
                  <p className="text-2xl font-bold">98%</p>
                  <p className="text-sm text-muted-foreground">Satisfaction</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      ) : (
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold mb-4">Beta Program Closed</h2>
          <p className="text-muted-foreground mb-6">
            Thank you for your interest. We've reached capacity for our beta program.
            Sign up for our newsletter to be notified when we launch publicly.
          </p>
        </div>
      )}

      <div className="text-center">
        <h2 className="text-2xl font-bold mb-4">Ready to Join?</h2>
        <p className="text-muted-foreground mb-6 max-w-md mx-auto">
          Enter your email to request access to the beta program. We'll notify you when a spot opens up.
        </p>
        
        <div className="max-w-md mx-auto">
          <form className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input 
                id="email" 
                type="email" 
                placeholder="you@example.com" 
                required
              />
            </div>
            <Button type="submit" className="w-full">
              Request Beta Access
            </Button>
          </form>
          
          <p className="text-xs text-muted-foreground mt-4">
            By requesting access, you agree to our Terms and Privacy Policy.
          </p>
        </div>
      </div>
    </div>
  );
}