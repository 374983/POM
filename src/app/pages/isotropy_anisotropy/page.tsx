"use client";

import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import BirefringenceQuiz from "@/app/components/BirefringenceQuiz/BirefringenceQuiz";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { div } from "three/tsl";

export default function Home() {
  const [showExplanation, setShowExplanation] = useState(false);
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);

  const explanationRef = useRef<HTMLDivElement>(null);
  const quizRef = useRef<HTMLDivElement>(null);
  const quizCompletedRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (showExplanation && explanationRef.current) {
      explanationRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [showExplanation]);

  useEffect(() => {
    if (showQuiz && quizRef.current) {
      quizRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [showQuiz]);

  useEffect(() => {
    if (quizCompleted && quizCompletedRef.current) {
      quizCompletedRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
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
            <h1 className="text-center text-2xl font-semibold text-white mb-4">
              What can be seen between crossed polarizers?
            </h1>
            <p className="text-base text-gray-100">
              To answer this question, let's take a look at what happens when we place different
              materials between crossed polarizers. In the video it turns blue instead of black
              because the polarizers are not strong enough (the video has no audio).
            </p>
            <div className="mt-6 w-full aspect-[4/3] rounded-lg overflow-hidden shadow-lg">
              <iframe
                src="https://www.youtube-nocookie.com/embed/omi6VAYdn0o?rel=0&modestbranding=1&playsinline=1"
                title="YouTube video player"
                className="w-full h-full"
                allow="encrypted-media"
                allowFullScreen
              />
            </div>
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
          <div ref={explanationRef} className="bg-neutral-900 rounded-2xl p-6 shadow-md w-full max-w-3xl text-gray-100">
            <p className="text-base text-gray-100 mb-6 max-w-xl mx-auto">
              So we can see that some materials let light pass while others don't.
              The difference between the materials shown in the video, which causes light to pass through even with crossed polarizers,
              lies in their internal structure. Let's have a closer look at the calcite crystal and the glass.
            </p>
            <div className="overflow-x-auto max-w-xl mx-auto mb-6">
              <table className="table-auto border-collapse w-full text-sm text-left">
                <thead>
                  <tr className="bg-neutral-800 text-white">
                    <th className="px-4 py-2 border border-neutral-700">Material</th>
                    <th className="px-4 py-2 border border-neutral-700">Result</th>
                    <th className="px-4 py-2 border border-neutral-700">Structure</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="px-4 py-2 border border-neutral-700"><strong>Calcite</strong></td>
                    <td className="px-4 py-2 border border-neutral-700">
                      <div className="flex justify-center items-center h-full">
                        <Image src="/calcite.png" alt="Calcite" width={300} height={80} />
                      </div>
                    </td>
                    <td className="px-4 py-2 border border-neutral-700">
                      <div className="flex justify-center items-center h-full">
                        <Image src="/structure_calcite.png" alt="Calcite structure" width={300} height={80} />
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 border border-neutral-700"><strong>Glass</strong></td>
                    <td className="px-4 py-2 border border-neutral-700">
                      <div className="flex justify-center items-center h-full">
                        <Image src="/glass.png" alt="Glass" width={300} height={80} />
                      </div>
                    </td>
                    <td className="px-4 py-2 border border-neutral-700">
                      <div className="flex justify-center items-center h-full">
                        <Image src="/structure_glass.png" alt="Glass structure" width={300} height={80} />
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-base text-gray-100 mb-6 max-w-xl mx-auto">
              The main difference between the two materials lies in the way their internal structures are formed. 
              The structure of the calcite crystal (CaCO<sub>3</sub>) is based on its unit cell, as shown above. 
              One can see that the structure is different along the <em>x</em>-direction compared to the <em>z</em>-direction. This means 
              that a light ray traveling through the crystal along the <em>x</em>-axis statistically encounters a different average arrangement 
              of atoms than a light ray traveling along the <em>z</em>-axis. Light interacts differently with each type of atom, so having 
              a different arrangement of atoms changes its speed. Due to this difference, the optical properties of calcite 
              depend on the direction in which light propagates through the crystal.
              This is why light behaves differently when passing through calcite and, depending on the angle, remains visible even when placed between 
              crossed polarizers, which would normally block all light. Materials that exhibit direction-dependent behavior are called <strong><u>anisotropic</u></strong>. 
              Here we only consider the interaction of the material with light, which is why we only focus on <strong><u>optical anisotropy</u></strong>.

              <br /><br />
              In contrast, glass does not form a regular structure with a preferred orientation.
              Its structure is disordered, and since there is no common directional order, a light ray along any axis 
              statistically encounters the same average distribution of atoms as a light ray along another axis. Therefore its optical properties remain the same in
              every direction. That's why you don't see any difference when placed between crossed polarizers. Materials that behave the same in all directions are 
              called <strong><u>isotropic</u></strong>. So in our case we focus on <strong><u>optical isotropy</u></strong>.
            </p>
            <div className="mt-6 max-w-xl mx-auto">
              <img
                src="/Sodium_chloride_crystal.png"
                alt="Salt crystal structure"
                className="w-40 float-right ml-4 mb-2 rounded-lg shadow-lg bg-white "
              />
              <p className="text-base text-gray-100 leading-relaxed">
                However, not all crystals are optically anisotropic. Some crystals are optically isotropic. For example, 
                salts that form a cubic crystal structure, such as table salt (NaCl), as shown in the figure to the right. 
                In this type of crystal, the atoms are arranged in a uniform pattern in every direction. This means that 
                a light ray traveling through the crystal encounters the same average arrangement of atoms, no matter 
                which direction it moves. As a result, the optical properties of the crystal are the same along all 
                directions and so it is optically isotropic.
              </p>
            </div>
            <div className="mt-6 max-w-xl mx-auto">
              <img
                src="/Polymers.png"
                alt="Polymer stretching"
                className="w-71 float-right ml-4 mb-2 rounded-lg shadow-lg bg-white"

              />
              <p className="text-base text-gray-100 leading-relaxed">
                So now we know that materials are anisotropic due to direction dependent structures in their formation.
                However, some materials become anisotropic by external influence. This occurs in plastics. The polymer
                chains themselves usually have no preferred orientation and are therefore isotropic. But when we stretch
                a polymer to produce thin plastic films, the chains align in the direction of stretching. As a result, the
                polymer chains acquire a common orientation and become anisotropic. This is why the tape at the end of the
                video above appeared bright, similar to the calcite crystal.
              </p>
              <div className="clear-both" />
            </div>


            <p className="mt-6 max-w-xl mx-auto">
              In the case of water, the molecules have intermolecular forces and orient themselves relative to each other.
              However, from a larger-scale perspective, the arrangement is still random, making it optically isotropic. But when water freezes,
              it forms hexagonal, ordered structures that are anisotropic.
              <br /><br />
              When a material is anisotropic, it can split light into two rays with different polarization directions.
              This phenomenon is known as <strong><u>birefringence</u></strong>. As a result, such materials appear bright when placed between crossed polarizers,
              almost as if the polarizers were uncrossed. We will explore the concept of birefringence in more detail in the next chapter but first another quiz.
            </p>
            {!showQuiz && (
              <div className="text-center mt-6">
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
            <BirefringenceQuiz onComplete={() => setQuizCompleted(true)} />
         {quizCompleted && (
            <p className="text-center text-gray-100 mb-6 max-w-xl mx-auto"> Now, let's take a closer look at birefringence in the next chapter.</p>
          )}
          </div>
        )}
        
      </main>
      <footer className="w-full max-w-3xl mx-auto px-4 mt-8">
        <div ref={quizCompletedRef} className="flex justify-between items-center text-white px-6 py-3 rounded-2xl shadow-md">
          <Link href="/pages/electromagnetic_waves" className="bg-gray-500 text-black px-4 py-2 rounded-lg hover:bg-gray-400">
            Back
          </Link>
          <button
            onClick={() => { setShowExplanation(true); setShowQuiz(true); setQuizCompleted(true)}}
            className="bg-gray-500 text-black px-4 py-2 rounded-lg hover:bg-gray-400"
          >
            Show all
          </button>
          <Link
            href="/pages/refraction_birefringence"
            className={`px-4 py-2 rounded-lg transition-colors duration-300 ${
              quizCompleted
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