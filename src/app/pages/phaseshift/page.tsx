"use client";

import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import 'katex/dist/katex.min.css';
// @ts-ignore
import { BlockMath, InlineMath } from 'react-katex';
import { div } from "three/tsl";

export default function Home() {
  const [a, setA] = useState(false);

  const explanationRef = useRef<HTMLDivElement>(null);
  const [showExplanation, setShowExplanation] = useState(false);

  useEffect(() => {
    if (showExplanation && explanationRef.current) {
      explanationRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [showExplanation]);
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
            <h1 className="text-center text-2xl font-semibold text-white mb-4">
              Where do the colors between crossed polarizers come from?
            </h1>
            <p className="text-base text-gray-200">
              Now that we understand the basic principle behind birefringence, we can return to the
              case of crossed polarizers. In the previous video, we observed that birefringence
              not only allows light to pass through crossed polarizers again, but also produces
              colors that are not visible without the polarizers. Let's take a closer look
              at this effect in the following video (the video has no audio).
              <div className="mt-6 w-full aspect-[4/3] rounded-lg overflow-hidden shadow-lg">
                <iframe
                  src="https://www.youtube.com/embed/8mviYKM8mkU?rel=0&modestbranding=1&playsinline=1"
                  title="YouTube video player"
                  className="w-full h-full"
                  allow="encrypted-media"
                  allowFullScreen
                />
              </div>
            </p>
          </div>
          {!showExplanation && (
            <div className="text-center mt-6">
              <button
                onClick={() => setShowExplanation(true)}
                className="bg-blue-800 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
              >
                ⬇ Next ⬇
              </button>
            </div>
          )}
        </div>
        {showExplanation && (
          <div ref={explanationRef} className="bg-neutral-900 rounded-2xl p-6 shadow-md w-full max-w-3xl">
            <div className="max-w-xl mx-auto text-base text-gray-200">
              <p className="">
                The video indicates that the observed colors depend on the thickness of the material.
                Since birefringent materials split light into two rays that follow different refractive indices,
                the rays also travel at different speeds. As a result, one ray gradually lags behind the other.
                With increasing thickness, this delay becomes larger. We therefore describe this effect
                as <strong><u>retardation</u></strong> <InlineMath math="\Gamma" />, defined as the product of the 
                birefringence and the material thickness <InlineMath math="d" />.
              </p>
              <BlockMath math="\Gamma = \Delta n \cdot d" />
              <p>The following animation illustrates how linearly polarized light waves behave when they pass through a birefringent material. (The video has no audio.)
                <br /><br />
                <div className="mt-6 w-full aspect-[4/3] rounded-lg overflow-hidden shadow-lg">
                <iframe
                  src="https://www.youtube.com/embed/gELwZD0ZH7k?rel=0&modestbranding=1&playsinline=1"
                  title="YouTube video player"
                  className="w-full h-full"
                  allow="encrypted-media"
                  allowFullScreen
                />
              </div>
                <br /><br />
                Here is what happens: The light from the source is first linearly polarized by the polarizer. When this linearly polarized
                wave enters the birefringent material, it splits into the two components: the ordinary ray and the extraordinary ray.
                Again we illustrate the split as two waves that are orthogonal to each other like in the animation. Both components propagate
                in the same direction, but the waves are shifted relative to each other because they experience different refractive indices. We call
                this  <strong><u>phase shift</u></strong> <InlineMath math="\delta" />. <BlockMath math="\delta = \frac{2\pi}{\lambda_0} \cdot \Gamma =\frac{2\pi}{\lambda_0} \cdot \Delta n \cdot d" />
                <br />
                In this equation, the retardation <InlineMath math="\Gamma" /> is scaled by the factor <InlineMath math="\tfrac{2\pi}{\lambda_0}" />.
                This factor converts the retardation into a phase difference by comparing it to the wavelengths of the light waves in vacuum <InlineMath math="\lambda_0" />.
                <br />
                When they recombine upon leaving the birefringent material, the resulting
                electric field is obtained by adding the two components at each point in time. In the animation, the recombined wave is initially still linearly polarized, 
                but in a different direction than the incoming light. This is why the crossed polarizer still allows some light to pass through at the very top. As we change 
                the phase shift, the recombined light wave no longer oscillates strictly in one direction but instead traces out a spiral. Most of the time it takes on an 
                elliptical shape, and only at specific phase shifts it becomes linearly polarized or forms a perfectly circular shape. <br /> In the following illustrations 
                you can see the two waves oscillating in green and blue. In red you can see the combined light wave forming a circle. 
                <div className="flex justify-center gap-6 mt-6 mb-6">
                  <Image
                    src="/circular.gif"
                    alt="Circular polarization animation"
                    height={200}
                    width={0}
                    className="h-64 w-auto rounded-md border border-gray-400"
                  />
                  <Image
                    src="/circl.png"
                    alt="Circular polarization diagram"
                    height={200}
                    width={500}
                    className="h-64 w-auto rounded-md border border-gray-400 bg-white"
                  />
                </div>

                So, depending on the phase shift, the resulting spiral takes on either an elliptical shape like in the animation or a circular shape like in the illustrations above.
                In these cases, we refer to the light as <strong><u>elliptically</u></strong> or <strong><u>circularly polarized</u></strong>.
                <br /><br />
                When elliptically or circularly polarized light passes through the second polarizer, only the component of the wave that is
                 aligned with the transmission axis of the filter can pass through. Because the wavelength <InlineMath math="\lambda_0" /> differs for each color, and the 
                 phase shift <InlineMath math="\delta" /> depends on the wavelength <InlineMath math="\lambda_0" />, each color experiences a 
                 different phase shift and is therefore polarized differently. As a result, some colors are more aligned with the transmission axis and can pass through more easily,
                  while others that are less aligned are partially or fully blocked.
                 The color we are able to see in the end is a combination of the 
                 wavelengths that are still transmitted.

              </p>
            </div>

          </div>
        )}
      </main >
      <footer className="w-full max-w-3xl mx-auto px-4 mt-8">
        <div className="flex justify-between items-center text-white px-6 py-3 rounded-2xl shadow-md">
          <Link href="/pages/refraction_birefringence" className="bg-gray-500 text-black px-4 py-2 rounded-lg hover:bg-gray-400">
            Back
          </Link>
          <button
            onClick={() => setShowExplanation(true)}
            className="bg-gray-500 text-black px-4 py-2 rounded-lg hover:bg-gray-400"
          >
            Show all
          </button>
          <Link
            href="/pages/michel-levy_chart"
            className={`px-4 py-2 rounded-lg transition-colors duration-300 ${showExplanation
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
    </div >

  );
}