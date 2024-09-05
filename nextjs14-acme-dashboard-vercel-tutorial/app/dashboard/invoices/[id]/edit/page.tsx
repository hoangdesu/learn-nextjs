import Breadcrumbs from '@/app/ui/invoices/breadcrumbs';
import { fetchCustomers, fetchInvoiceById } from '@/app/lib/data';
import Form from '@/app/ui/invoices/edit-form';
import { notFound } from 'next/navigation';
import type { Metadata, ResolvingMetadata } from 'next';

type Props = {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

// either Static metadata or Dynamic metadata
export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  // read route params
  const id = params.id;

  // fetch data
  // const product = await fetch(`https://.../${id}`).then((res) => res.json());

  // optionally access and extend (rather than replace) parent metadata
  // const previousImages = (await parent).openGraph?.images || [];

  // return {
  //   title: product.title,
  //   openGraph: {
  //     images: ['/some-specific-page-image.jpg', ...previousImages],
  //   },
  // };

  const invoice = await fetchInvoiceById(id);
  
  return {
    title: `Edit invoice '${invoice.id.slice(0, 5)}'`,
  };
}

export default async function EditInvoicePage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;

  const [invoice, customers] = await Promise.all([
    fetchInvoiceById(id),
    fetchCustomers(),
  ]);

  // - Throws error when an invoice is not found
  // - Show UI from file not-found.tsx
  // - Handle a more specific error
  if (!invoice) {
    notFound();
  }

  // console.log(invoice, customers);

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Invoices', href: '/dashboard/invoices' },
          {
            label: 'Edit Invoice',
            href: `/dashboard/invoices/${id}/edit/`,
            active: true,
          },
        ]}
      />

      {/* <h1>ID: {id}</h1>
      <h1>Invoice: {JSON.stringify(invoice)}</h1>
      <h1>Customers: {JSON.stringify(customers)}</h1> */}

      <Form invoice={invoice} customers={customers} />
    </main>
  );
}
