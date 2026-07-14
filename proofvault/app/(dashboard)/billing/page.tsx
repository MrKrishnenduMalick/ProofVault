import { redirect } from 'next/navigation';
import { createServerClient } from '@/lib/auth/supabase';
import { cookies } from 'next/headers';
import { BillingDashboard } from '@/components/billing/billing-dashboard';

export default async function BillingPage() {
  // Verify user is authenticated
  const cookieStore = cookies();
  const supabase = createServerClient();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    redirect('/(auth)/login');
  }

  // In a real implementation, we would fetch the user's subscription and invoice data
  // For now, we're using mock data
  const subscriptionData = {
    id: 'sub_mock',
    userId: session.user.id,
    plan: 'professional',
    status: 'active',
    provider: 'stripe',
    providerReference: 'sub_stripe_ref',
    renewalDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
    expiresAt: null,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  const invoicesData = [
    {
      id: 'inv_1',
      subscriptionId: 'sub_mock',
      userId: session.user.id,
      stripeInvoiceId: 'in_stripe_inv_1',
      amountCents: 12000,
      currency: 'usd',
      status: 'paid',
      invoicePdfUrl: 'https://stripe.com/invoice1.pdf',
      periodStart: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
      periodEnd: new Date().toISOString(),
      createdAt: new Date().toISOString(),
    },
    {
      id: 'inv_2',
      subscriptionId: 'sub_mock',
      userId: session.user.id,
      stripeInvoiceId: 'in_stripe_inv_2',
      amountCents: 12000,
      currency: 'usd',
      status: 'paid',
      invoicePdfUrl: 'https://stripe.com/invoice2.pdf',
      periodStart: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString(),
      periodEnd: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
      createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
    },
  ];

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Billing</h1>
        <p className="text-muted-foreground">
          Manage your subscription and payment details
        </p>
      </div>

      <BillingDashboard 
        subscription={subscriptionData} 
        invoices={invoicesData} 
      />
    </div>
  );
}