import { GlobeAltIcon } from '@heroicons/react/24/outline';
import { lusitana } from '@/app/ui/fonts';
import Link from 'next/link';

export default function AcmeLogo() {
  return (
    <Link
      className={`${lusitana.className} flex flex-row items-center leading-none text-white`}
      href="/"
    >
      <GlobeAltIcon className="h-12 w-12 rotate-[15deg]" />
      <p className="text-[44px]">Acme</p>
    </Link>
  );
}
