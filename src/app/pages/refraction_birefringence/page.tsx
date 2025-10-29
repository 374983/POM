"use client";

import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import 'katex/dist/katex.min.css';
import Demos from "@/app/components/Demos/Demos";
// @ts-ignore
import { BlockMath, InlineMath } from 'react-katex';

export default function Home() {
	const [showBiref, setShowBiref] = useState(false);

	const showBirefRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (showBiref && showBirefRef.current) {
			showBirefRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
		}
	}, [showBiref]);

	const [showQuiz, setShowQuiz] = useState(false);
	const [quizCompleted, setQuizCompleted] = useState(false);

	const correctAnswer = "D";
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
					<h1 className="text-center text-2xl font-semibold text-white mb-6">
						Refraction
					</h1>

					<div className="flex flex-col md:flex-row items-center md:items-start gap-6 max-w-xl mx-auto">
						<div className="max-w-xl">
							<p className="text-base text-gray-200">
								To understand the principle of birefringence, it is first necessary
								to understand what refraction is. <em>Figure 1</em> illustrates the familiar everyday
								phenomenon in which objects appear displaced when viewed through water. This
								occurs because light travels at different speeds depending on the medium. When
								light moves from one medium to another, for example from air into water, its speed changes.
								This change in speed at the boundary also changes the direction of the light. The light is refracted.
							</p>
						</div>
						<div className="flex-shrink-0 text-center">
							<img
								src="/Refraction.gif"
								alt="Refraction (Figure 1)"
								className="rounded-lg shadow-md max-w-[200px] mx-auto"
							/>
							<p className="text-center text-sm text-gray-200 italic mt-2">
								<strong>Figure 1</strong> - Refraction with water.
							</p>
						</div>
					</div>
					<p className="text-base text-gray-200 max-w-xl mx-auto mt-6">
						The angle at which the light wave is refracted depends, among other things, on the material it passes through.
						Each material has a specific constant called the refractive
						index, denoted as <InlineMath math="n" />, which indicates how fast light travels in that material (<InlineMath math="c_m" />) compared
						to the light speed in a vacuum (<InlineMath math="c_0" />). <BlockMath math="n = \frac{c_0}{c_m}" />The slower light travels
						in a material compared to vacuum, the higher the refractive index,
						and therefore the more it is refracted when entering a new material. The following table lists some refractive indices. <br />
						The refractive index of a material also depends on the wavelength of light. Usually, it is enough to specify it for a single
						wavelength. That's why the refractive index is often written as <InlineMath math="n_D^{20}" />,
						where <InlineMath math="D" /> refers to the sodium D-line (spectral line of sodium at a wavelength of about 589 nm) at 20 °C.
						<br />
					</p>

					<div className="overflow-x-auto mt-4">
						<table className="table-auto border-collapse border border-gray-500 text-gray-200 text-sm mx-auto">
							<thead>
								<tr className="bg-neutral-800">
									<th className="border border-gray-500 px-4 py-2 text-left">Material</th>
									<th className="border border-gray-500 px-4 py-2 text-left">Refractive Index <InlineMath math="n_D" /></th>
								</tr>
							</thead>
							<tbody>
								<tr>
									<td className="border border-gray-500 px-4 py-2">Vacuum</td>
									<td className="border border-gray-500 px-4 py-2">1.0000</td>
								</tr>
								<tr>
									<td className="border border-gray-500 px-4 py-2">Air</td>
									<td className="border border-gray-500 px-4 py-2">1.0003</td>
								</tr>
								<tr>
									<td className="border border-gray-500 px-4 py-2">Water</td>
									<td className="border border-gray-500 px-4 py-2">1.333</td>
								</tr>
								<tr>
									<td className="border border-gray-500 px-4 py-2">Ethanol</td>
									<td className="border border-gray-500 px-4 py-2">1.36</td>
								</tr>
								<tr>
									<td className="border border-gray-500 px-4 py-2">Window glass</td>
									<td className="border border-gray-500 px-4 py-2">1.52</td>
								</tr>
								<tr>
									<td className="border border-gray-500 px-4 py-2">Diamond</td>
									<td className="border border-gray-500 px-4 py-2">2.417</td>
								</tr>
							</tbody>
						</table>
					</div>

					<p className="text-base text-gray-200 max-w-xl mx-auto mt-6">
						In the following visualization, you can see how a refracted light ray behaves depending on the angle at
						which it strikes the boundary to another material.

					</p>

					<div className="mt-8">
						<Demos choice="refraction" />
					</div>
					<p className="text-base text-gray-200 max-w-xl mx-auto mt-6">To calculate how a light ray is refracted,
						we use Snell's law of refraction. It is expressed as:
					</p>
					<BlockMath math="n_{1} \sin \theta_{1} = n_{2} \sin \theta_{2}" />

					<p className="text-base text-gray-200 max-w-xl mx-auto mt-6">What happens at the boundary between
						two media can be understood with an analogy. Imagine a dumbbell
						rolling at an angle from a smooth concrete surface onto rough grass. On the concrete, the dumbbell moves
						faster than on the grass. Because it approaches the boundary at an angle, one wheel (or disk) of the
						dumbbell touches the grass first. This wheel immediately slows down, while the other wheel is still
						moving faster on the concrete. As a result, the dumbbell changes direction and curves toward the slower
						side until both wheels are on the grass. From that point onward, it continues to move straight again,
						but now in a different direction than before.

					</p>

					{!showBiref && (
						<div className="text-center mt-6">
							<button
								onClick={() => setShowBiref(true)}
								className="bg-blue-800 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
							>
								⬇ Next ⬇
							</button>
						</div>
					)}
				</div>

				{showBiref && (
					<div ref={showBirefRef} className="bg-neutral-900 rounded-2xl p-6 shadow-md w-full max-w-3xl">
						<div className="max-w-xl mx-auto">
							<h1 className="text-center text-2xl font-semibold text-white mb-4">
								Birefringence
							</h1>

							<div className="flex flex-col md:flex-row items-center md:items-start gap-6 max-w-xl mx-auto mb-6">
								<div className="max-w-xl">
									<p className="text-base text-gray-200">
										Now that we understand refraction, we can also address birefringence. We have already
										encountered calcite as a birefringent crystal. In figure 2, the birefringent effect can
										be seen directly. When the crystal is placed on top of an image, the image appears doubled.
										If the crystal is rotated, one of the two images remains fixed in place, while the other rotates
										around the stationary one.
									</p>
								</div>
								<div className="flex-shrink-0 text-center">
									<img
										src="/Birefringence.gif"
										alt="Birefringence (Figure 2)"
										className="rounded-lg shadow-md max-w-[200px] mx-auto"
									/>
									<p className="text-center text-sm text-gray-200 italic mt-2">
										<strong>Figure 2</strong> - Birefringence of calcite.
									</p>
								</div>
							</div>
							<p className="text-base text-gray-200 mb-6">
								The doubled image occurs because birefringent materials do not have one single specific refractive index.
								Due to their anisotropic properties, light travels at different speeds for different directions.
								Therefore, birefringent materials have two refractive indices. <br />
								The image that remains in the same position when the crystal is rotated follows Snell's law as we know
								it from normal refraction. This is the <strong><u>ordinary ray</u></strong>, which depends on the
								refractive index <InlineMath math="n_o" />. <br />
								The image that rotates along with the crystal is produced by the <strong><u>extraordinary ray</u></strong>,
								which depends on the refractive index <InlineMath math="n_e" /> and the orientation of the crystal.
							</p>
							<Demos choice="birefringence" />
							<p className="text-base text-gray-200 mt-6">
								In the visualization, you can see how the ordinary ray continues to follow the
								normal law of refraction, while the extraordinary ray is refracted in a different direction.
								The value of birefringence <InlineMath math="\Delta n" /> represents the difference between the two refractive indices:
								<BlockMath math="\Delta n = n_{e} - n_{o}" />
								Here are some values of birefringence:
							</p>
							<div className="overflow-x-auto">
								<table className="table-auto border-collapse border border-gray-600 text-gray-200 mx-auto mt-4 mb-4">
									<thead>
										<tr className="bg-neutral-700">
											<th className="border border-gray-600 px-4 py-2">Material</th>
											<th className="border border-gray-600 px-4 py-2">Formula</th>
											<th className="border border-gray-600 px-4 py-2"><InlineMath math="n_o" /></th>
											<th className="border border-gray-600 px-4 py-2"><InlineMath math="n_e" /></th>
											<th className="border border-gray-600 px-4 py-2"><InlineMath math="\Delta n" /></th>
										</tr>
									</thead>
									<tbody>
										<tr>
											<td className="border border-gray-600 px-4 py-2">Calcite</td>
											<td className="border border-gray-600 px-4 py-2">CaCO₃</td>
											<td className="border border-gray-600 px-4 py-2">1.658</td>
											<td className="border border-gray-600 px-4 py-2">1.486</td>
											<td className="border border-gray-600 px-4 py-2">-0.172</td>
										</tr>
										<tr>
											<td className="border border-gray-600 px-4 py-2">Ice</td>
											<td className="border border-gray-600 px-4 py-2">H₂O</td>
											<td className="border border-gray-600 px-4 py-2">1.3090</td>
											<td className="border border-gray-600 px-4 py-2">1.3104</td>
											<td className="border border-gray-600 px-4 py-2">+0.0014</td>
										</tr>
										<tr>
											<td className="border border-gray-600 px-4 py-2">Quartz</td>
											<td className="border border-gray-600 px-4 py-2">SiO₂</td>
											<td className="border border-gray-600 px-4 py-2">1.544</td>
											<td className="border border-gray-600 px-4 py-2">1.553</td>
											<td className="border border-gray-600 px-4 py-2">+0.009</td>
										</tr>
										<tr>
											<td className="border border-gray-600 px-4 py-2">Rutile</td>
											<td className="border border-gray-600 px-4 py-2">TiO₂</td>
											<td className="border border-gray-600 px-4 py-2">2.616</td>
											<td className="border border-gray-600 px-4 py-2">2.903</td>
											<td className="border border-gray-600 px-4 py-2">+0.287</td>
										</tr>
									</tbody>
								</table>
							</div>

							<div className="flex flex-col md:flex-row items-center md:items-start gap-6 max-w-xl mx-auto mb-6 mt-8">
								<div className="max-w-xl">
									<p className="text-base text-gray-200">
										To better understand how the electric waves behave in birefringence, let us take a look at <em>figure 3</em>.
										Once again, we can see the calcite crystal producing a doubled image of the image beneath it.
										However, when the crystal is observed through a polarization filter, it becomes clear that depending on the orientation of the filter,
										only certain parts of the birefringence are transmitted. In particular, one can observe that sometimes only the ordinary ray passes through,
										while at other times only the extraordinary ray is visible. Moreover, these two configurations are exactly 90° apart.
										This shows that the rays must be two orthogonal waves as illustrated in <em>figure 4</em>. 
										They are affected differently by birefringence, which is why they drift apart.
									</p>
								</div>
								<div className="flex-shrink-0 text-center">
									<img
										src="/polarized_calcite.gif"
										alt="Birefringence (Figure 2)"
										className="rounded-lg shadow-md max-w-[200px] mx-auto"
									/>
									<p className="text-center text-sm text-gray-200 italic mt-2">
										<strong>Figure 3</strong> - Polarized calcite.
									</p>
								</div>
							</div>

							<Image
								className="pointer-events-none mx-auto border border-gray-400 rounded-md mt-6"
								src="/birefringence.png"
								alt="bi"
								width={500}
								height={60}
								priority
							/>
							<p className="text-center text-sm text-gray-200 italic mt-2">
								<strong>Figure 4</strong> - Ordinary and extraordinary ray.
							</p>
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
					<div ref={quizRef} className="bg-neutral-900 rounded-2xl p-6 shadow-md w-full max-w-3xl mx-auto mt-8">
						<h2 className="text-xl font-semibold text-white mb-4 text-center">
							Quiz: Birefringence
						</h2>
						<p className="text-gray-200 mb-6 text-center">
							Which of the following statements correctly describes birefringence?
						</p>

						<div className="grid gap-4">
							{["A", "B", "C", "D"].map((choice) => {
								const answers: Record<string, string> = {
									A: "Birefringence occurs when light travels faster in a vacuum than in glass.",
									B: "Birefringence only occurs in transparent isotropic materials.",
									C: "Birefringence is the same as reflection, where light bounces back at the boundary of two media.",
									D: "Birefringence occurs because a material has two different refractive indices, leading to two separate rays."
								};

								return (
									<button
										key={choice}
										onClick={() => {
											setSelectedAnswer(choice);
											if (choice === "D") setQuizCompleted(true);
										}}
										className={`px-4 py-2 rounded-lg text-left ${selectedAnswer === choice
											? choice === "D"
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
								{selectedAnswer === "D"
									? "Correct!"
									: "Not quite. Try again"}
							</p>
						)}
					</div>
				)}
			</main>
			<footer className="w-full max-w-3xl mx-auto px-4 mt-8">
				<div className="flex justify-between items-center text-white px-6 py-3 rounded-2xl shadow-md">
					<Link href="/pages/isotropy_anisotropy" className="bg-gray-500 text-black px-4 py-2 rounded-lg hover:bg-gray-400">
						Back
					</Link>
					<button
						onClick={() => { setShowBiref(true); setShowQuiz(true); setQuizCompleted(true) }}
						className="bg-gray-500 text-black px-4 py-2 rounded-lg hover:bg-gray-400"
					>
						Show all
					</button>
					<Link
						href="/pages/phaseshift"
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
