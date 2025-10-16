import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="relative min-h-screen">
      <div className="absolute inset-0 z-0">
        <div className="w-full h-full bg-[url('/Hintergrund.png')] bg-cover bg-center brightness-50">
          <div className="w-full h-full bg-gradient-to-b from-transparent to-[#040035]" />
        </div>
      </div>
      <div className="relative z-10 grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)] text-white">
        <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
          <Image
            src="/unistuttgart_logo_deutsch_cmyk_invertiert.png"
            alt="Unilogo"
            width={300}
            height={10}
            priority
          />
          <p className="text-base text-gray-100 mb-6 max-w-xl mx-auto">
            Birefringence and Polarized Light Microscopy
          </p>
          <div className="flex gap-4 items-center flex-col sm:flex-row">
            <Link
              className="rounded-lg border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:w-auto"
              href="/pages/polarizers"
            >
              Start
            </Link>
            <Link
              className="rounded-lg border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:w-auto"
              href="/pages/chapters"
            >
              Chapters
            </Link>
          </div>
          <div className="flex justify-center items-center space-x-4 text-sm mt-60">
					<Link href="https://www.uni-stuttgart.de/impressum" className="text-gray-400 hover:text-white">
						Imprint
					</Link>
					<span className="text-gray-400">|</span>
					<Link href="https://www.uni-stuttgart.de/datenschutz" className="text-gray-400 hover:text-white">
						Privacy Policy
					</Link>
				</div>
        </main>
      </div>
    </div>
    
  );
}

