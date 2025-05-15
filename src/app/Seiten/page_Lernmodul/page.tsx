"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Home() {
  const [ansichtIndex, setAnsichtIndex] = useState(0);

  const ansichten = [
    {
      text: "Hier zu sehen sind die verschiedenen Phasen des Flüssigkristalls 8OCB.",
      bilder: ["/8OCB_46.png", "/8OCB_55.png", "/8OCB_68.png"],
    },
    {
      text: "Dies ist eine weitere Phase unter verändertem Temperaturverlauf.",
      bilder: ["/8OCB_75.png", "/8OCB_85.png", "/8OCB_95.png"],
    },
    {
      text: "Abschließend die isotrope Phase nach vollständiger Erhitzung.",
      bilder: [],
      text2: "uiiii",
    },
  ];

  const aktuelleAnsicht = ansichten[ansichtIndex];

  const weiter = () => {
    if (ansichtIndex < ansichten.length - 1) {
      setAnsichtIndex(ansichtIndex + 1);
    }
  };

  const zurueck = () => {
    if (ansichtIndex > 0) {
      setAnsichtIndex(ansichtIndex - 1);
    }
  };

  return (
    <div className="grid grid-rows-[auto_1fr_auto] min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <div className="row-start-1">
        <Link
          className="flex items-center"
          href="https://www.uni-stuttgart.de"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            src="/unistuttgart_logo_deutsch_cmyk_invertiert.png"
            alt="Unilogo"
            width={180}
            height={60}
            priority
          />
        </Link>
      </div>

      <main className="row-start-2 flex justify-center items-center">
        <div className="bg-[#f0f0f0] dark:bg-[#1e1e1e] rounded-2xl p-4 sm:p-6 shadow-lg max-w-8xl w-full flex flex-col gap-4">
          <p className="text-center">{aktuelleAnsicht.text}</p>
          <div className="flex flex-wrap justify-center gap-4">
            {aktuelleAnsicht.bilder.map((src, index) => (
              <img key={index} src={src} alt={`Bild ${index + 1}`} className="w-80" />
            ))}
          </div>
          <p className="text-center">{aktuelleAnsicht.text2}</p>
          <div className="flex justify-between mt-4">
            <button
              onClick={zurueck}
              disabled={ansichtIndex === 0}
              className="text-black bg-gray-200 hover:bg-gray-300 px-6 py-2 rounded-xl disabled:opacity-50"
            >
              Zurück
            </button>
            <button
              onClick={weiter}
              disabled={ansichtIndex === ansichten.length - 1}
              className="text-black bg-gray-200 hover:bg-gray-300 px-6 py-2 rounded-xl disabled:opacity-50"
            >
              Weiter
            </button>
          </div>
        </div>
      </main>

      <footer className="row-start-3 flex flex-wrap justify-center gap-6">
        <Link
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="/"
        >
          <Image
            className="invert"
            src="/home.png"
            alt="Home"
            width={25}
            height={25}
            aria-hidden
          />
          Startseite
        </Link>
      </footer>
    </div>
  );
}