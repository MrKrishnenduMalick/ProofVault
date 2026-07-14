import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { DownloadIcon } from 'lucide-react';
import { formatCurrency } from '@/lib/utils/format-currency';

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

interface InvoiceListProps {
  invoices: Invoice[];
}

export function InvoiceList({ invoices }: InvoiceListProps) {
  if (invoices.length === 0) {
    return (
      <p className="text-muted-foreground">No invoices found.</p>
    );
  }

  return (
    <div className="space-y-4">
      {invoices.map((invoice) => (
        <div key={invoice.id} className="flex items-center justify-between border-b pb-4 last:border-b-0 last:pb-0">
          <div>
            <p className="font-medium">{invoice.stripeInvoiceId}</p>
            <p className="text-sm text-muted-foreground">
              {new Date(invoice.periodStart).toLocaleDateString()} - {new Date(invoice.periodEnd).toLocaleDateString()}
            </p>
          </div>
          <div className="text-right">
            <p className="font-medium">{formatCurrency(invoice.amountCents / 100, invoice.currency)}</p>
            <p className="text-sm text-muted-foreground capitalize">{invoice.status}</p>
          </div>
          <Button variant="outline" size="sm" asChild>
            <a href={invoice.invoicePdfUrl} target="_blank" rel="noopener noreferrer">
              <DownloadIcon className="h-4 w-4 mr-2" />
              Download
            </a>
          </Button>
        </div>
      ))}
    </div>
  );
}