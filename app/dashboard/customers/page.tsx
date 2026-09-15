// app/dashboard/customers/page.tsx
import Image from 'next/image';
import { fetchCustomers } from '@/app/lib/data';
import { formatCurrency, formatDateToLocal } from '@/app/lib/utils';
import { lusitana } from '@/app/ui/fonts';

export default async function Page() {
  const customers = await fetchCustomers();

  return (
    <main>
      <h1 className={`${lusitana.className} text-2xl`}>Customers</h1>

      <div className="mt-6 flow-root">
        <div className="inline-block min-w-full align-middle">
          <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
            {/* Mobile */}
            <div className="md:hidden">
              {customers?.map((customer) => (
                <div
                  key={customer.id}
                  className="mb-2 w-full rounded-md bg-white p-4"
                >
                  <div className="flex items-center justify-between border-b pb-4">
                    <div className="flex items-center gap-3">
                      <Image
                        src={customer.image_url}
                        className="rounded-full"
                        alt={`${customer.name}'s profile picture`}
                        width={32}
                        height={32}
                      />
                      <div>
                        <p className="font-medium">{customer.name}</p>
                        <p className="text-sm text-gray-500">
                          {customer.email}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="flex w-full items-center justify-between pt-4">
                    <div>
                      <p className="text-xl font-medium">
                        {formatCurrency(customer.total_paid)}
                      </p>
                      <p className="text-sm text-gray-500">Paid</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xl font-medium">
                        {formatCurrency(customer.total_pending)}
                      </p>
                      <p className="text-sm text-gray-500">Pending</p>
                    </div>
                  </div>
                  <div className="pt-2 text-sm text-gray-500">
                    Last invoice:{' '}
                    {customer.last_invoice
                      ? formatDateToLocal(customer.last_invoice)
                      : 'No invoices'}
                  </div>
                </div>
              ))}
            </div>

            {/* Desktop */}
            <table className="hidden min-w-full text-gray-900 md:table">
              <thead className="rounded-lg text-left text-sm font-normal">
                <tr>
                  <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                    Customer
                  </th>
                  <th scope="col" className="px-3 py-5 font-medium">
                    Email
                  </th>
                  <th scope="col" className="px-3 py-5 font-medium">
                    Paid
                  </th>
                  <th scope="col" className="px-3 py-5 font-medium">
                    Pending
                  </th>
                  <th scope="col" className="px-3 py-5 font-medium">
                    Last Invoice
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white">
                {customers?.map((customer) => (
                  <tr
                    key={customer.id}
                    className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                  >
                    <td className="whitespace-nowrap py-3 pl-6 pr-3">
                      <div className="flex items-center gap-3">
                        <Image
                          src={customer.image_url}
                          className="rounded-full"
                          alt={`${customer.name}'s profile picture`}
                          width={28}
                          height={28}
                        />
                        <p>{customer.name}</p>
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-3 py-3">
                      {customer.email}
                    </td>
                    <td className="whitespace-nowrap px-3 py-3">
                      {formatCurrency(customer.total_paid)}
                    </td>
                    <td className="whitespace-nowrap px-3 py-3">
                      {formatCurrency(customer.total_pending)}
                    </td>
                    <td className="whitespace-nowrap px-3 py-3">
                      {customer.last_invoice
                        ? formatDateToLocal(customer.last_invoice)
                        : '—'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  );
}
