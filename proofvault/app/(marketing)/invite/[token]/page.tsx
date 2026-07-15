import { redirect } from 'next/navigation';
import { BetaInviteService } from '@/lib/features/beta-invites';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';

interface Props {
  params: {
    token: string;
  };
}

export default async function InviteRedemptionPage({ params }: Props) {
  const { token } = params;
  
  // In a real implementation, we would validate the invite token
  // For now, we're showing a static page
  const isValidToken = true; // This would come from database validation
  const inviteEmail = 'user@example.com'; // This would come from the invite record

  if (!isValidToken) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-md">
        <Card>
          <CardHeader>
            <CardTitle>Invalid Invite</CardTitle>
            <CardDescription>The invite link you used is no longer valid</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              This could be because the invite has expired, been revoked, or already been used.
            </p>
          </CardContent>
          <CardFooter>
            <Button asChild className="w-full">
              <Link href="/">Return to Home</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-md">
      <Card>
        <CardHeader className="text-center">
          <CardTitle>Welcome to ProofVault Beta!</CardTitle>
          <CardDescription>
            You've been invited to join our exclusive beta program
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="bg-muted p-4 rounded-lg">
              <p className="text-sm font-medium">Your Invite</p>
              <p className="text-sm text-muted-foreground break-all">{token}</p>
            </div>
            <p className="text-sm">
              You've been invited to join ProofVault's beta program. As a beta tester, 
              you'll get early access to new features and help us improve the platform.
            </p>
            <ul className="text-sm space-y-1">
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>Exclusive access to new features</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>Direct feedback to the development team</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>Priority support during beta period</span>
              </li>
            </ul>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-4">
          <Button asChild className="w-full">
            <Link href="/(auth)/register">Create Your Account</Link>
          </Button>
          <p className="text-xs text-muted-foreground text-center">
            After creating your account, you'll have full access to the beta features
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}