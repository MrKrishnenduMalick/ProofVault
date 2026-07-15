import { NextResponse } from 'next/server';
import { BillingService } from '@/lib/services/billing-service';
import { StripeClient } from '@/lib/payments/stripe-client';

export async function POST(request: Request) {
  const sig = request.headers.get('stripe-signature');
  const body = await request.text();

  if (!sig) {
    return NextResponse.json(
      {
        success: false,
        status: 400,
        message: 'Missing stripe-signature header',
        requestId: crypto.randomUUID(),
        timestamp: new Date().toISOString(),
      },
      { status: 400 }
    );
  }

  try {
    // Verify the webhook signature
    const event = await StripeClient.verifyWebhookSignature(body, sig);

    // Log the event for security monitoring (without sensitive data)
    console.log(`Stripe webhook received: ${event.type} for ${event.data.object.id}`);

    // Handle the event based on its type
    switch (event.type) {
      case 'customer.subscription.created':
      case 'customer.subscription.updated':
      case 'customer.subscription.deleted':
        await BillingService.handleSubscriptionEvent(event);
        break;
      case 'invoice.payment_succeeded':
      case 'invoice.payment_failed':
        await BillingService.handleInvoiceEvent(event);
        break;
      default:
        console.log(`Unhandled event type ${event.type}`);
        break;
    }

    return NextResponse.json(
      {
        success: true,
        status: 200,
        message: 'Webhook processed successfully',
        requestId: crypto.randomUUID(),
        timestamp: new Date().toISOString(),
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Stripe webhook error:', error);
    
    // Return 400 to indicate invalid signature, but don't reveal details
    return NextResponse.json(
      {
        success: false,
        status: 400,
        message: 'Webhook signature verification failed',
        requestId: crypto.randomUUID(),
        timestamp: new Date().toISOString(),
      },
      { status: 400 }
    );
  }
}