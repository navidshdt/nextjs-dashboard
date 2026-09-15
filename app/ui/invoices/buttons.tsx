'use client';
import { PencilIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { deleteInvoice } from '@/app/lib/actions';
import { useActionState } from 'react';

export function CreateInvoice() {
  return (
    <Link
      href="/dashboard/invoices/create"
      className="flex h-10 items-center rounded-lg bg-gradient-to-b from-slate-600 to-cyan-700 hover:bg-gradient-to-b hover:from-cyan-700 hover:to-slate-600 px-4 text-sm font-medium text-white transition-colors  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
    >
      <span className="hidden md:block">Create Invoice</span>{' '}
      <PlusIcon className="h-5 md:ml-4" />
    </Link>
  );
}

export function UpdateInvoice({ id }: { id: string }) {
  return (
    <Link
      href={`/dashboard/invoices/${id}/edit`}
      className="rounded-md border p-2 hover:bg-gray-100"
    >
      <PencilIcon className="w-5 text-slate-700" />
    </Link>
  );
}

export function DeleteInvoice({ id }: { id: string }) {
  const deleteInvoiceWithId = deleteInvoice.bind(null, id);
  const [state, formAction, isPending] = useActionState(
    deleteInvoiceWithId,
    null,
  );
  return (
    <form action={formAction}>
      <button type="submit" className="rounded-md border p-2 hover:bg-red-200">
        <span className="sr-only">Delete</span>
        <TrashIcon className="w-5 text-slate-700 hover:bg-red-200" />
      </button>
    </form>
  );
}
