"use client";

import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import 'katex/dist/katex.min.css';
// @ts-ignore
import { BlockMath, InlineMath } from 'react-katex';

export default function Home() {
    const [a, setA] = useState(false);

    const equationRef = useRef<HTMLDivElement>(null);
    const [showEquation, setShowEquation] = useState(false);

    useEffect(() => {
        if (showEquation && equationRef.current) {
            equationRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
        }
    }, [showEquation]);


    const [showQuiz, setShowQuiz] = useState(false);
    const [quizCompleted, setQuizCompleted] = useState(false);

    const correctAnswer = "C";
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
                            Michel-Lévy Chart
                        </h1>
                        <p className="text-base text-gray-200 mb-6">
                            Since the form of the polarized light hitting the second polarizer depends on the
                            value of the birefringence <InlineMath math="\Delta n" /> (in the chart: <InlineMath math="n_1-n_2" />) and the thickness <InlineMath math="d" />, the
                            resulting color is strongly determined by these parameters as well. This relationship was empirically
                            investigated, leading to the establishment of the Michel-Lévy chart (<em>Figure 1</em>).
                        </p>
                        <Image
                            src="/Chart.png"
                            alt="Chart"
                            width={550}
                            height={60}
                            priority
                            className="rounded-md"
                        />

                        <p className="text-center text-sm text-gray-200 italic mt-2">
                            <strong>Figure 1</strong> - Michel-Lévy Chart.
                        </p>

                        <p className="text-base text-gray-200 mb-6 mt-6">
                            The Michel-Levy chart helps us, for example, to predict the color of a sample if we know its birefringence and thickness. 
                            Alternatively, it can help us determine the strength of birefringence by examining samples of different thicknesses from 
                            the same material in the POM and then comparing their colors with the chart. <br />
                            For instance, if we have a sample with a thickness of 0.02 mm and a birefringence of <InlineMath math="\Delta n" /> = 0.065, we can determine its color 
                            by following the line in the chart that ends at 0.065 on the right side and tracing it back until it intersects with the 
                            line corresponding to 0.02 mm thickness (indicated in red in <em>figure 2</em>). At that exact point, the background color is yellow, which means we can expect to 
                            see a yellow color for this sample under the POM.
                        </p>

                        <Image
                            src="/chart_example.png"
                            alt="Chart"
                            width={550}
                            height={60}
                            priority
                            className="rounded-md"
                        />

                        <p className="text-center text-sm text-gray-200 italic mt-2">
                            <strong>Figure 2</strong> - Reading the Michel-Lévy Chart.
                        </p>

                        <p className="text-base text-gray-200 mb-6 mt-6">
                            Let us now take a look at a sample under the polarization microscope (<em>Figure 3</em>). The sample is a liquid
                            crystal called 8OCB, which is in the nematic phase. This means that a birefringence <InlineMath math="\Delta n" />  of
                            approximately 0.1 to 0.2 is present. In the Michel-Lévy chart, this corresponds to the range of the lowest two birefringence
                            lines. By comparing the color progression of the sample with the Michel-Lévy chart, it can be determined that the sample becomes
                            thicker from left to right.
                        </p>
                        <div className="flex justify-center">
                            <Image
                                src="/8OCB.jpg"
                                alt="Chart"
                                width={300}
                                height={60}
                                priority
                                className="rounded-md"
                            />
                        </div>


                        <p className="text-center text-sm text-gray-200 italic mt-2">
                            <strong>Figure 3</strong> - 8OCB in POM. <br /><br /><br /><br />
                        </p>

                    </div>
                    {!showEquation && (
                        <div className="text-center mt-6">
                            <button
                                onClick={() => setShowEquation(true)}
                                className="bg-blue-800 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
                            >
                                ⬇ Next ⬇
                            </button>
                        </div>
                    )}
                </div>
                {showEquation && (
                    <div ref={equationRef} className="bg-neutral-900 rounded-2xl p-6 shadow-md w-full max-w-3xl">
                        <div className="max-w-xl mx-auto text-base text-gray-200">
                            Finally, we want to adjust the formula for the light intensity <InlineMath math="I" />. When a birefringent object
                            is placed between two crossed polarizers, the light intensity at the end is given by:
                            <BlockMath math="I = \frac{I_0}{2} \cdot sin^2(2\phi) \cdot sin^2(\frac{\delta}{2})" />
                            In this formula, <InlineMath math="I_0" /> again represents the intensity of the original light wave. <br />
                            <InlineMath math="\phi" /> denotes the angle between the transmission axis of the first polarizer and the
                            optical axis of the birefringent material. <br />
                            <InlineMath math="\delta" /> represents the phase shift, which includes the strength of the birefringence.
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

                )
                }
                {
                    showQuiz && (
                        <div ref={quizRef} className="bg-neutral-900 rounded-2xl p-6 shadow-md w-full max-w-3xl mx-auto mt-8">
                            <h2 className="text-xl font-semibold text-white mb-4 text-center">
                                Quiz: Michel-Lévy-Chart
                            </h2>
                            <p className="text-gray-200 mb-6 text-center">
                                What color can we expect when the sample in the POM has a birefringence value of <InlineMath math="\Delta n = 0.010" /> and
                                 a thickness of <InlineMath math="0.04" /> mm?
                            </p>

                            <div className="grid grid-cols-2 gap-4">
                                {["A", "B", "C", "D"].map((choice) => {
                                    const answers: Record<string, string> = {
                                        A: "blue",
                                        B: "green",
                                        C: "orange",
                                        D: "purple"
                                    };

                                    return (
                                        <button
                                            key={choice}
                                            onClick={() => {
                                                setSelectedAnswer(choice);
                                                if (choice === "C") setQuizCompleted(true);
                                            }}
                                            className={`px-4 py-2 rounded-lg text-left ${selectedAnswer === choice
                                                ? choice === "C"
                                                    ? "bg-green-700 text-white"
                                                    : "bg-red-700 text-white"
                                                : "bg-neutral-800 text-gray-200 hover:bg-neutral-700"
                                                }`}
                                        >
                                            <strong>{choice}.</strong> {answers[choice]}
                                        </button>
                                    );
                                })}
                            </div>

                            {selectedAnswer && (
                                <p className="mt-6 text-center text-gray-200">
                                    {selectedAnswer === "C"
                                        ? "Correct! "
                                        : "Not quite. Try again"}
                                </p>
                            )}
                            {quizCompleted && (
                                <p className="mt-6 text-center text-gray-200">
                                    You have now completed the learning unit. 
                                </p>



                            )}
                        </div>
                    )
                }
            </main >
            <footer className="w-full max-w-3xl mx-auto px-4 mt-8">
                <div className="flex justify-between items-center text-white px-6 py-3 rounded-2xl shadow-md">
                    <Link href="/pages/phaseshift" className="bg-gray-500 text-black px-4 py-2 rounded-lg hover:bg-gray-400">
                        Back
                    </Link>
                    <button
                        onClick={() => { setShowEquation(true); setShowQuiz(true); setQuizCompleted(true) }}
                        className="bg-gray-500 text-black px-4 py-2 rounded-lg hover:bg-gray-400"
                    >
                        Show all
                    </button>
                    <Link
                        href="/pages/chapters"
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
        </div >

    );
}