import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <Image
          className=""
          src="/unistuttgart_logo_deutsch_cmyk_invertiert.png"
          alt="Unilogo"
          width={300}
          height={10}
          priority
        />
        <text>
          Kapitelauswahl
        
        </text>

        
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        <Link
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="\"
        >
          <Image className="invert"
            aria-hidden
            src="/home.png"
            alt="Home"
            width={25}
            height={25}
          />
          Startseite
        </Link>
      </footer>
    </div>
  );
}