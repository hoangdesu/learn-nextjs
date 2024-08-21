import { CheckIcon, ClockIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';

export default function InvoiceStatus({ status }: { status: string }) {
  return (
    // using clsx to construct className with conditionals
    <span
      className={clsx(
        'inline-flex items-center rounded-full px-2 py-1 text-xs',
        {
          'bg-gray-100 text-gray-500': status === 'pending',
          'bg-green-500 text-white': status === 'paid',
        },
      )}
    >
      {/* // traditional approach without using clsx -> checking with string template evaluation and ternary => not as clean */}
      {/* <span 
      className={`'inline-flex text-xs' items-center rounded-full px-2 py-1 ${
        status === 'pending'
          ? 'bg-gray-100 text-gray-500'
          : 'bg-green-500 text-white'
      }`}> */}

      {status === 'pending' ? (
        <>
          Pending
          <ClockIcon className="ml-1 w-4 text-gray-500" />
        </>
      ) : null}
      {status === 'paid' ? (
        <>
          Paid
          <CheckIcon className="ml-1 w-4 text-white" />
        </>
      ) : null}
    </span>
  );
}
