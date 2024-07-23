import Breadcrumbs from '@/app/ui/invoices/breadcrumbs';
import { fetchCustomers, fetchInvoiceById } from '@/app/lib/data';
import Form from '@/app/ui/invoices/edit-form';

export default async function EditInvoiceIdPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;

  const [invoice, customers] = await Promise.all([
    fetchInvoiceById(id),
    fetchCustomers(),
  ]);

//   console.log(invoice, customers);
  
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
