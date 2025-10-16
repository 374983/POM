import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <div className="relative w-full xl:max-w-5xl mx-auto px-4 py-8">
          <div className="row-start-1">
            <Link
              className="absolute top-4 right-4"
              href="https://www.uni-stuttgart.de"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image className="pointer-events-none"
                src="/unistuttgart_logo_deutsch_cmyk_invertiert.png"
                alt="Unilogo"
                width={180}
                height={60}
                priority
              />
            </Link>
          </div>
          <div className="row-start-1">
            <Link
              className="absolute top-4 left-4 invert"
              href="/"
            >
              <Image className="pointer-events-none"
                src="/home.png"
                alt="Home"
                width={40}
                height={40}
                priority
              />
            </Link>
          </div>
        </div>

        <div className="bg-neutral-900 rounded-2xl p-8 shadow-lg w-full max-w-4xl mx-auto">
          <h1 className="w-full text-2xl text-center font-semibold text-white mb-6">
            Chapter Selection
          </h1>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 justify-items-center">
            {[
              { chapter: "Chapter 1", title: "Polarization", link: "/pages/polarizers" },
              { chapter: "Chapter 2", title: "Crossed Polarizers", link: "/pages/electromagnetic_waves" },
              { chapter: "Chapter 3", title: "Isotropy & Anisotropy", link: "/pages/isotropy_anisotropy" },
              { chapter: "Chapter 4", title: "Refraction & Birefringence", link: "/pages/refraction_birefringence" },
              { chapter: "Chapter 5", title: "Phase Shift", link: "/pages/phaseshift" },
              { chapter: "Chapter 6", title: "Michel-Lévi Chart", link: "/pages/michel-levy_chart" },
            ].map((kapitel, i) => (
              <Link
                key={i}
                href={kapitel.link!}
                className="bg-sky-100 text-black border-4 border-sky-400 rounded w-40 h-40 flex flex-col items-center p-4 font-medium text-sm sm:text-base shadow-sm hover:bg-sky-300 transition-colors"
              >
                <div className="mt-2 text-xs sm:text-sm font-semibold">{kapitel.chapter}</div>
                <div className="flex-grow flex items-center justify-center text-center px-2">
                  {kapitel.title}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>

      <footer className="row-start-3  gap-[24px] flex-wrap items-center justify-center">
        <Link
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="/"
        >
          <Image
            className="invert"
            aria-hidden
            src="/home.png"
            alt="Home"
            width={25}
            height={25}
          />
          Home
        </Link>

        <div className="flex justify-center items-center space-x-4 text-sm mt-10">
					<Link href="https://www.uni-stuttgart.de/impressum" className="text-gray-400 hover:text-white">
						Imprint
					</Link>
					<span className="text-gray-400">|</span>
					<Link href="https://www.uni-stuttgart.de/datenschutz" className="text-gray-400 hover:text-white">
						Privacy Policy
					</Link>
				</div>
      </footer>
    </div>
  );
}