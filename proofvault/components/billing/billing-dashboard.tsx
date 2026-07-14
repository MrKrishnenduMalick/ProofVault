import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { SubscriptionCard } from './subscription-card';
import { InvoiceList } from './invoice-list';

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

interface Invoice {
  id: string;
  subscriptionId: string;
  userId: string;
  stripeInvoiceId: string;
  amountCents: number;
  currency: string;
  status: string;
  invoicePdfUrl: string;
  periodStart: string;
  periodEnd: string;
  createdAt: string;
}

interface BillingDashboardProps {
  subscription: Subscription;
  invoices: Invoice[];
}

export function BillingDashboard({ subscription, invoices }: BillingDashboardProps) {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Current Plan</CardTitle>
        </CardHeader>
        <CardContent>
          <SubscriptionCard subscription={subscription} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Payment History</CardTitle>
        </CardHeader>
        <CardContent>
          <InvoiceList invoices={invoices} />
        </CardContent>
      </Card>
    </div>
  );
}