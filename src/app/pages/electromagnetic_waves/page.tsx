"use client";

import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import 'katex/dist/katex.min.css';
// @ts-ignore
import { BlockMath, InlineMath } from 'react-katex';
import { Italic } from "lucide-react";

const ModelViewer = dynamic(() => import("@/app/components/ModelViewer/ModelViewer"), {
  ssr: false,
});

export default function Home() {

  const [showQuiz, setShowQuiz] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const options = [
    { value: "0", label: "I = 0" },
    { value: "\\frac{1}{4}I_0", label: "I = \\frac{1}{4}I_0" },
    { value: "\\frac{3}{4}I_0", label: "I = \\frac{3}{4}I_0" },
    { value: "I_0", label: "I = I_0" },
  ];

  const correctAnswer = "\\frac{1}{4}I_0";
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);

  const handleAnswer = (value: string) => {
    setSelectedAnswer(value);
    if (value === correctAnswer) setQuizCompleted(true);
  };
  const quizRef = useRef<HTMLDivElement>(null);
  const resultRef = useRef<HTMLDivElement>(null);
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

  const [showNext, setShowNext] = useState(false);
  const [a, setA] = useState(false);
  const nextRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (showNext && nextRef.current) {
      nextRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [showNext]);

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
              <Image
                className="pointer-events-none"
                src="/unistuttgart_logo_deutsch_cmyk_invertiert.png"
                alt="Unilogo"
                width={180}
                height={60}
                priority
              />
            </Link>
          </div>

          <div className="row-start-1">
            <Link className="absolute top-4 left-4 invert" href="/">
              <Image
                className="pointer-events-none"
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
            <h1 className="text-center text-2xl font-semibold text-white mb-4">
              How do crossed polarizers work?
            </h1>
            <p className="text-base text-gray-100">
              As you may already know, light consists of electromagnetic waves. For the sake of understanding,
              we focus only on the electric part of the light wave and leave out the magnetic component. In the model
              below you can see what happens if electromagnetic waves hit a polarizer. Within the
              visible spectrum, these waves can have different wavelengths and amplitudes,
              depending on color and brightness. As can be seen in the model before the first polarizer,
              the wavelength corresponds to the stretching and compression along the <em>x</em>-axis, and the
              amplitude represents the height of the oscillation in the <em>y</em>-direction for one light wave,
              and in the <em>z</em>-direction for the other wave. <br /><br />
              But in addition, light waves also differ in the direction in which their electric field oscillates relative
              to their direction of propagation. To make this more intuitive: the electric field vector (direction of the amplitude) of the light wave
              can oscillate in any direction around the <em>x</em>-axis. For example, in the model, one light wave is rotated 90°
              around the <em>x</em>-axis relative to the other. <br /><br />
            </p>
            <div className="p-4 w-full max-w-3xl mx-auto">
              <h1 className="text-xl text-center font-semibold mb-4 text-white">
                Rotatable 3D-Model of crossed polarizers
              </h1>
              <div className="rounded-xl overflow-hidden shadow-lg bg-neutral-300 w-full h-[500px] mb-2">
                <ModelViewer modelName="Polarizer" />
              </div>
              <p className="text-center text-sm text-gray-200 italic mb-6">
                <strong>3D-Model 1</strong> - Two light waves passing through crossed polarizers.
              </p>
            </div>
            <p className="text-base text-gray-100">
              Now the first polarizer comes into play. Polarizers only transmit the component of the light wave that is
              aligned with their <strong><u>transmission axis</u></strong>. In the model the transmission axis is indicated by the blue arrows
              next to the polarizers.
              We define the angle between the wave's oscillation direction and the transmission axis as <InlineMath math="θ" /> (theta).
              In the model, the light wave oscillating in the <em>y</em>-direction has an angle of <InlineMath math="θ = 90°" /> relative to the polarizer
              and gets fully blocked.
              The other wave is aligned exactly with the transmission axis of the polarizer, meaning its angle is <InlineMath math="θ = 0°" />
              and the whole light wave passes the polarizer.<br />
              So, after passing through the first polarizer, we are left with light whose amplitude only oscillates in the same direction as the polarizer's
              transmission axis. Light with a single direction of oscillation like this is called <strong><u>linearly polarized light</u></strong> (sometimes also known as plane polarized light).<br /><br />
              Since the second polarizer is oriented orthogonally to the first one, the light wave between the two polarizers
              now forms an angle of <InlineMath math="θ = 90°" /> with respect to the second polarizer. As a result, it is completely blocked as well.
              This is why no light can be observed after passing through the second polarizer.
            </p>
          </div>
          <p className="max-w-xl mx-auto text-center text-gray-100 mt-6">
            What happens for angles other than 0° or 90°?
          </p>


          {!showNext && (
            <div className="text-center mt-2">
              <button
                onClick={() => setShowNext(true)}
                className="bg-blue-800 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
              >
                ⬇ Next ⬇
              </button>
            </div>
          )}
        </div>
        {showNext && (
          <div ref={nextRef} className="bg-neutral-900 rounded-2xl p-6 shadow-md w-full max-w-3xl ">
            <div className="max-w-xl mx-auto">
              <h1 className="text-center text-2xl font-semibold text-white mb-6">
                Intensity of Light
              </h1>
              <p className="max-w-xl mx-auto text-gray-100">
                In the two models below, you can now see a yellow light wave that instead has an angle
                of <InlineMath math="θ = 60°" />. It can be seen that even here, a light wave passes through the first polarizer.
                However, this wave only retains part of its original strength, which is why its amplitude
                is smaller than before and therefore its brightness as well.
              </p>
              <div className="p-4 w-full max-w-3xl mx-auto mt-2 ">
                <div className="rounded-xl overflow-hidden shadow-lg bg-neutral-300 w-full h-[500px] mb-2">
                  <ModelViewer modelName="angle" />
                </div>
                <p className="text-center text-sm text-gray-200 italic mb-6">
                  <strong>3D-Model 2</strong> - Light wave hitting a polarizer at 60°.
                </p>
                <div className="rounded-xl overflow-hidden shadow-lg bg-neutral-300 w-full h-[500px] mb-2">
                  <ModelViewer modelName="split_angle" />
                </div>
                <p className="text-center text-sm text-gray-200 italic mb-6">
                  <strong>3D-Model 3</strong> - Splitting the light wave along the axis.
                </p>
                <p className="max-w-xl mx-auto text-gray-100 mb-4">
                  In <em>3D-Model 3</em>, the red light waves illustrate how the
                  yellow wave is split into its <em>y</em>- and <em>z</em>-components. This splitting is based on
                  simple geometric calculations. In <em>Figure 1</em>, you can see how the new amplitude <InlineMath math="A_z" /> along
                  the <em>z</em>-axis is determined. The yellow line is the original light wave from the model viewed form the point of the light bulb.
                  The red lines are the two red waves from <em>3D-Model 3</em>.
                  Since the polarizer is aligned in the <em>z</em>-direction, the red wave along the <em>z</em>-axis is precisely the component of the light wave that passes through the polarizer.
                </p>
                <div className="flex justify-center">
                  <Image
                    className="pointer-events-none rounded-xl mb-2 bg-neutral-300"
                    src="/geometry_split.png"
                    alt="Geometry Split"
                    width={580}
                    height={200}
                  />
                </div>
                <p className="text-center text-sm text-gray-200 italic mb-6">
                  <strong>Figure 1</strong> - View of the light waves from the x-axis
                </p>
                <p className="max-w-xl mx-auto text-gray-100"> Therefore we can conclude that for the amplitude <InlineMath math="A_z" /> of the light wave after the polarizer, the following holds:</p>
                <BlockMath math="A_z = A_0 \cdot \cos(\theta)" />
                <p className="max-w-xl mx-auto text-gray-100">
                  Here, <InlineMath math="A_0" /> represents the amplitude of the original light wave.
                  However, instead of the amplitude, we want to use the <u><strong>light intensity <InlineMath math="I" /></strong></u> as a measure.
                  The light intensity is proportional to the square of the amplitude, so <InlineMath math="I = A^2" />.
                  From this, we can conclude that the intensity of a light wave after passing through a polarizer is given by:
                </p>
                <BlockMath math="I = I_0 \cdot \cos^2(\theta)" />
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
          </div>
        )}
        {showQuiz && (
          <div ref={quizRef} className="bg-neutral-900 rounded-2xl p-6 shadow-md w-full max-w-3xl">
            <div className="mt-4 flex flex-col items-center gap-4">
              <h2 className="text-lg font-semibold text-white max-w-xl mx-auto">
                What is the light intensity <InlineMath math="I" /> of a light wave with initial intensity <InlineMath math="I_0" /> after
                passing through a polarizer at an angle of <InlineMath math=" \theta =60°" />?
              </h2>
              <div className="grid grid-cols-2 gap-4">
                {options.map(({ value, label }) => (
                  <button
                    key={value}
                    onClick={() => handleAnswer(value)}
                    className={`px-4 py-2 rounded-lg border text-white transition-colors text-sm
                      ${selectedAnswer === value
                        ? (value === correctAnswer ? "bg-green-600 border-green-600" : "bg-red-600 border-red-600")
                        : "bg-neutral-800 border-white hover:bg-neutral-700"
                      }`}
                  >
                    <InlineMath math={label} />
                  </button>
                ))}
              </div>
              {selectedAnswer !== null && (
                <p className={`text-sm mt-2 ${selectedAnswer === correctAnswer ? "text-green-400" : "text-red-400"}`}>
                  {selectedAnswer === correctAnswer ? (
                    "Correct"
                  ) : (
                    <>
                      Incorrect. Hint: <InlineMath math="\cos(60^\circ) = \frac{1}{2}" />
                    </>
                  )}
                </p>
              )}
              {quizCompleted && (
                <p ref={resultRef} className="text-base text-gray-200 max-w-xl mx-auto my-5 ">
                  A light wave hitting a polarizer at 60° retains only one-fourth of its original
                  light intensity. However, as long as the second polarizer is oriented at 90° relative
                  to the first, no light will pass through. Let's explore why, even though no light is
                  visible at this angle, this configuration is still used in polarization microscopy (POM).
                </p>
              )}
            </div>


          </div>
        )}


      </main>

      <footer className="w-full max-w-3xl mx-auto px-4 mt-8">
        <div className="flex justify-between items-center text-white px-6 py-3 rounded-2xl shadow-md">
          <Link
            href="/pages/polarizers"
            className="bg-gray-500 text-black px-4 py-2 rounded-lg hover:bg-gray-400"
          >
            Back
          </Link>
          <button
            onClick={() => { setA(true); setShowNext(true); setShowQuiz(true); setQuizCompleted(true) }}
            className="bg-gray-500 text-black px-4 py-2 rounded-lg hover:bg-gray-400"
          >
            Show all
          </button>
          <Link
            href="/pages/isotropy_anisotropy"
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
