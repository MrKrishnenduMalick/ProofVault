import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { formatCurrency } from '@/lib/utils/format-currency';

interface Subscription {
  id: string;
  userId: string;
  plan: 'free' | 'professional' | 'enterprise';
  status: 'active' | 'past_due' | 'canceled';
  provider: string;
  providerReference: string;
  renewalDate?: string;
  expiresAt?: string;
  createdAt: string;
  updatedAt: string;
}

interface SubscriptionCardProps {
  subscription: Subscription;
}

export function SubscriptionCard({ subscription }: SubscriptionCardProps) {
  const planDetails = {
    name: subscription.plan.charAt(0).toUpperCase() + subscription.plan.slice(1),
    price: subscription.plan === 'professional' ? '$12' : subscription.plan === 'enterprise' ? '$29' : '$0',
    features: subscription.plan === 'professional' 
      ? ['Unlimited projects', 'Advanced analytics', 'Custom domain'] 
      : subscription.plan === 'enterprise' 
        ? ['Everything in Professional', 'Team collaboration', 'SSO'] 
        : ['3 projects', 'Basic analytics', 'Community support'],
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-xl font-bold">{planDetails.name}</h3>
          <p className="text-2xl font-bold">{planDetails.price}<span className="text-sm font-normal text-muted-foreground">/month</span></p>
        </div>
        <Badge 
          variant={
            subscription.status === 'active' 
              ? 'default' 
              : subscription.status === 'past_due' 
                ? 'destructive' 
                : 'secondary'
          }
        >
          {subscription.status.replace('_', ' ').toUpperCase()}
        </Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <h4 className="font-medium mb-2">Renewal Date</h4>
          <p>{formatDate(subscription.renewalDate)}</p>
        </div>
        <div>
          <h4 className="font-medium mb-2">Status</h4>
          <p>{subscription.status.replace('_', ' ')}</p>
        </div>
      </div>

      <div className="border-t pt-4">
        <h4 className="font-medium mb-2">Features</h4>
        <ul className="space-y-1">
          {planDetails.features.map((feature, index) => (
            <li key={index} className="flex items-center">
              <span className="mr-2">â€¢</span>
              {feature}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}