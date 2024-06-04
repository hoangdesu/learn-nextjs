'use client';

import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';

export default function Search({ placeholder }: { placeholder: string }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace: replaceUrl } = useRouter(); // make sure dont import from 'next/router'!

  const handleSearch = useDebouncedCallback((searchTerm: string) => {
    // construct new params from the URL
    const params = new URLSearchParams(searchParams);

    // set params string from user input
    if (searchTerm) {
      params.set('query', searchTerm);
    } else {
      params.delete('query');
    }

    console.log('searching... ', searchTerm);
    // console.log(params.get('query'));

    replaceUrl(`${pathname}?${params.toString()}`); // make sure to append to the current pathname, otherwise app will cause error redirect

    // produce URL from user input -> http://localhost:42069/dashboard/invoices?query=abc123
  }, 400);

  return (
    <div className="relative flex flex-1 flex-shrink-0">
      <label htmlFor="search" className="sr-only">
        Search
      </label>
      <input
        className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
        placeholder={placeholder}
        onChange={(e) => handleSearch(e.target.value)}
        defaultValue={searchParams.get('query')?.toString()}
      />
      <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
    </div>
  );
}
