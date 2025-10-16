"use client";

import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";

export default function Home() {
  const [angle, setAngle] = useState(0);
  const normalizedAngle = angle % 360;
  const intensity = Math.pow(Math.cos((normalizedAngle * Math.PI) / 180), 2);

  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const correctAnswer = "90°, 270°";

  const [showVisualization, setShowVisualization] = useState(false);
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);

  const visualizationRef = useRef<HTMLDivElement>(null);
  const quizRef = useRef<HTMLDivElement>(null);
  const resultRef = useRef<HTMLDivElement>(null);

  const handleAnswer = (value: string) => {
    setSelectedAnswer(value);
    if (value === correctAnswer) setQuizCompleted(true);
  };


  useEffect(() => {
    if (showVisualization && visualizationRef.current) {
      visualizationRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [showVisualization]);

  useEffect(() => {
    if (showQuiz && quizRef.current) {
      quizRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [showQuiz]);

  useEffect(() => {
    if (quizCompleted && resultRef.current) {
      resultRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [quizCompleted]);

  return (

    <div className="min-h-screen flex flex-col justify-between bg-background">
      <main className="items-center flex flex-col space-y-8 py-8">
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

        <div className="bg-neutral-900 rounded-2xl p-6 shadow-md w-full max-w-3xl">
          <div className="max-w-xl mx-auto">
            <h1 className="text-center text-2xl font-semibold text-white mb-8">
              Polarized light microscopy
            </h1>
            <p className="text-base text-gray-200">
              <div className="flex justify-center gap-4 items-start mb-8">
                <img
                  src="/POM.jpg"
                  alt="Polarization microscope setup"
                  className="h-[300px] w-auto border-2 border-gray-700 rounded-md object-contain"
                />
                <video
                  src="/POM_in_use.mp4"
                  autoPlay
                  loop
                  muted
                  playsInline
                  controls={false}
                  disablePictureInPicture
                  disableRemotePlayback
                  controlsList="nodownload nofullscreen noremoteplayback"
                  className="h-[300px] w-auto border-2 border-gray-700 rounded-md object-contain"
                />

              </div>
              On the left, you can see a polarization microscope (POM), which is commonly
              used to study the properties of liquid crystals. On the right, you can observe what
              happens when a liquid crystal is observed under a POMn while it is heated. To understand what you can see
              under a POM, this website teaches the basics behind polarized light microscopy.
              <br /><br />
              In general, the POM is based on observing light as it passes
              through two polarizing filters. The following visualization demonstrates
              the behavior of two polarizers placed one after the other and how this affects the
              intensity of light.
            </p>
          </div>
          {!showVisualization && (
            <div className="text-center mt-6">
              <button
                onClick={() => setShowVisualization(true)}
                className="bg-blue-800 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
              >
                ⬇ Next ⬇
              </button>
            </div>
          )}
        </div>

        {showVisualization && (
          <div ref={visualizationRef} className="bg-neutral-900 rounded-2xl p-6 shadow-md w-full max-w-3xl">
            <div className="relative w-[600px] h-[440px] bg-white rounded-2xl mx-auto pointer-events-none">
              <Image
                src="/blaue_Lupe.svg"
                alt="Blaue Lupe"
                fill
                className="absolute object-contain"
              />
              <div
                className="absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] w-[525px] h-[525px] pointer-events-none"
                style={{ transform: `rotate(${normalizedAngle}deg)` }}
              >
                <Image
                  src="/rote_Lupe.svg"
                  alt="Rote Lupe"
                  fill
                  className="object-contain"
                />
              </div>
              <div
                className="absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] w-[139px] h-[139px] inset-0 rounded-full transition-colors duration-200"
                style={{ backgroundColor: `rgba(0, 0, 0, ${1 - intensity})` }}
              />
            </div>

            <div className="mt-12 flex flex-col items-center gap-2">
              <input
                type="range"
                min={0}
                max={360}
                step={7.5}
                value={angle}
                onChange={(e) => setAngle(parseInt(e.target.value))}
                className="w-[360px] accent-blue-600"
              />
              <div className="relative w-[360px] h-6">
                {Array.from({ length: 9 }).map((_, i) => {
                  const degree = i * 45;
                  return (
                    <div
                      key={degree}
                      className="absolute top-0 flex flex-col items-center"
                      style={{ left: `${(degree / 360) * 100}%`, transform: "translateX(-50%)" }}
                    >
                      <div className="w-px h-2 bg-white" />
                      <div className="text-xs text-white mt-0.5">{degree}°</div>
                    </div>
                  );
                })}
              </div>
              <div className="flex gap-2 mt-2">
                <span className="bg-gray-200 text-black rounded-xl px-3 py-1 text-sm">
                  Angle of second polarizer: {angle}°
                </span>
                <span className="bg-gray-200 text-black rounded-xl px-3 py-1 text-sm">
                  Light intensity: {Math.round(intensity * 100)}%
                </span>
              </div>
            </div>

            {!showQuiz && (
              <div className="text-center mt-8">
                <button
                  onClick={() => setShowQuiz(true)}
                  className="bg-blue-800 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
                >
                  ⬇ Next ⬇
                </button>
              </div>
            )}
          </div>
        )}

        {showQuiz && (
          <div ref={quizRef} className="bg-neutral-900 rounded-2xl p-6 shadow-md w-full max-w-3xl">
            <div className="mt-4 flex flex-col items-center gap-4">
              <h2 className="text-lg font-semibold text-white">
                At which angles is the light intensity the lowest?
              </h2>
              <div className="grid grid-cols-2 gap-4">
                {["0°, 180°, 360°", "45°, 255°", "90°, 270°", "135°, 315°"].map((option) => (
                  <button
                    key={option}
                    onClick={() => handleAnswer(option)}
                    className={`px-4 py-2 rounded-lg border text-white transition-colors text-sm
                      ${selectedAnswer === option ?
                        (option === correctAnswer ? "bg-green-600 border-green-600" : "bg-red-600 border-red-600")
                        : "bg-neutral-800 border-white hover:bg-neutral-700"}`}
                  >
                    {option}
                  </button>
                ))}
              </div>
              {selectedAnswer !== null && (
                <p className={`text-sm mt-2 ${selectedAnswer === correctAnswer ? "text-green-400" : "text-red-400"}`}>
                  {selectedAnswer === correctAnswer
                    ? "Correct"
                    : "Incorrect. The lowest light intensity is when it's darkest between the two polarizers."}
                </p>
              )}
              {quizCompleted && (
                <p ref={resultRef} className="text-base text-gray-200 max-w-xl mx-auto my-5 ">At an angle of 90°, the light intensity is at its lowest.
                  This is also the typical configuration used in polarization microscopes (POM).
                  The arrangement of 90° is referred to as <u><strong>crossed polarizers</strong></u>. Let's have a look at why it turns dark in crossed polarizers. </p>
              )}
            </div>
          </div>
        )}
      </main>

      <footer className="w-full max-w-3xl mx-auto px-4 mt-8">
        <div className="flex justify-between items-center text-white px-6 py-3 rounded-2xl shadow-md">
          <Link href="/" className="bg-gray-500 text-black px-4 py-2 rounded-lg hover:bg-gray-400">
            Back
          </Link>
          <button
            onClick={() => { setShowVisualization(true); setShowQuiz(true); setQuizCompleted(true) }}
            className="bg-gray-500 text-black px-4 py-2 rounded-lg hover:bg-gray-400"
          >
            Show all
          </button>
          <Link
            href="/pages/electromagnetic_waves"
            className={`px-4 py-2 rounded-lg transition-colors duration-300 ${quizCompleted
              ? "bg-green-600 hover:bg-green-700 text-white"
              : "bg-gray-500 hover:bg-gray-400 text-black"
              }`}
          >
            Continue
          </Link>
        </div>
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