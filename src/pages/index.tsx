

import localFont from "next/font/local";
import Image from 'next/image';
import Link from 'next/link';

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function Home() {
  return (
    <section className={`${geistSans.variable} ${geistMono.variable}`}>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4">
        <Link href='/characters' className="col-span-3 sm:col-span-1 md:col-span-3 bg-base-600 border border-base-700 rounded-lg h-3/5 flex flex-col">
          <div className="relative flex flex-col overflow-hidden rounded-lg px-4 py-4 flex-grow">
            <Image
              src='/character.jpg'
              alt='View Marvel characters'
              width={500}
              height={500}
              className="object-cover w-full h-full rounded-lg" 
            />
          </div>
          <h1 className="text-2xl font-medium text-white px-4 pb-4 xs:text-xl md:text-3xl">Marvel heroes</h1>
        </Link>
        <Link href='/comics' className="col-span-2 sm:col-span-1 md:col-span-2 bg-base-600 border border-base-700 rounded-lg h-3/5 flex flex-col">
          <div className="relative flex flex-col overflow-hidden rounded-lg px-4 py-4 flex-grow">
            <Image
              src='/comic.jpg'
              alt='View Marvel comics'
              width={400}
              height={300}
              className="object-cover w-full h-full rounded-lg" 
            />
          </div>
          <h1 className="text-2xl font-medium text-white px-4 pb-4 xs:text-xl md:text-3xl">Marvel comics</h1>
        </Link>
      </div>
    </section>
  );
}

