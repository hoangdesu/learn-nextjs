'use server';

import { z } from 'zod';
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

const FormSchema = z.object({
  id: z.string(),
  customerId: z.string({
    invalid_type_error: 'Please select a customer.',
  }),
  amount: z.coerce
    .number()
    .gt(0, { message: 'Please enter an amount greater than $0.' }),
  status: z.enum(['pending', 'paid'], {
    invalid_type_error: 'Please select an invoice status.',
  }),
  date: z.string(),
});

const CreateInvoice = FormSchema.omit({ id: true, date: true });

export async function createInvoice(prevState: FormState, formData: FormData) {
  // const rawFormData = {
  //   customerId: formData.get('customerId'),
  //   amount: formData.get('amount'),
  //   status: formData.get('status'),
  // };
  // Test it out:
  // console.log(rawFormData);

  // const { customerId, amount, status } = CreateInvoice.parse({ 
  // -> use safeParse() instead to have returned success or error fields
  // -> handle better, no need try/catch

  const validatedFields = CreateInvoice.safeParse({
    customerId: formData.get('customerId'),
    amount: formData.get('amount'),
    status: formData.get('status'),
  });

  console.log(validatedFields);
  
  // Return early if the form data is invalid
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing fields. Failed to create invoice.'
    }
  }

  // good practice to store monetary values in cents in database to eliminate JavaScript floating-point errors and ensure greater accuracy.
  const amountInCents = amount * 100;

  const date = new Date().toISOString().split('T')[0]; // get current date in YYYY-MM-DD

  console.log(
    '> creating invoice: ',
    customerId,
    amount,
    status,
    amountInCents,
    date,
  );

  try {
    await sql`
    INSERT INTO invoices (customer_id, amount, status, date)
    VALUES (${customerId}, ${amountInCents}, ${status}, ${date})
  `;
  } catch (err) {
    return {
      message: 'Database error: Failed to create invoice.',
    };
  }

  // clear this cache and trigger a new request to the server (fresh data)
  revalidatePath('/dashboard/invoices');

  // redirect user back to previous page
  redirect('/dashboard/invoices');
}

const UpdateInvoice = FormSchema.omit({ id: true, date: true });

export async function updateInvoice(id: string, formData: FormData) {
  console.log('> updatating invoice id:', id);

  // extract data from form and validate types with Zod
  const { customerId, amount, status } = UpdateInvoice.parse({
    customerId: formData.get('customerId'),
    amount: formData.get('amount'),
    status: formData.get('status'),
  });

  const amountInCents = amount * 100;

  try {
    await sql`
      UPDATE invoices
      SET customer_id = ${customerId}, amount = ${amountInCents}, status = ${status}
      WHERE id = ${id}
    `;
  } catch (err) {
    return {
      message: 'Database error: Failed to update invoice.',
    };
  }

  // clear the client cache, ensure fresh data from server
  revalidatePath('/dashboard/invoices');

  // redirect user after back to invoices table after successful edit
  // redirect() internally THROWS an error => so it should be called outside of try/catch blocks
  redirect('/dashboard/invoices');
}

export async function deleteInvoice(id: string) {
  // only for testing error handling
  // throw new Error('Failed to delete invoice');

  try {
    await sql`DELETE FROM invoices WHERE id = ${id}`;
    revalidatePath('/dashboard/invoices');
    console.log('> Deleted invoice', id);
  } catch (err) {
    return {
      message: 'Database error: Failed to delete invoice.',
    };
  }
}

export type FormState = {
  message?: string | null;
  errors?: {
    customerId?: string[];
    amount?: string[];
    status?: string[];
  };
};
