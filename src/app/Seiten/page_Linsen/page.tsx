"use client";

import { useState } from "react";
import { Check, X } from "lucide-react";

export default function PolarisationDemo() {
  const [angle, setAngle] = useState(0); // Winkel in Grad

  const normalizedAngle = (angle % 180); // zwischen 0 und 180°
  const intensity = Math.pow(Math.cos((normalizedAngle * Math.PI) / 180), 2); // Malus-Gesetz

  return (
    <div className="min-h-screen flex items-center justify-center p-6 sm:p-15">
    <div className="bg-[#f0f0f0] dark:bg-[#1e1e1e] rounded-2xl p-8 sm:p-5 shadow-lg w-full max-w-5xl flex flex-col gap-12">
    <div className="min-h-[80vh] rounded-2xl flex flex-col items-center justify-center gap-22 bg-white text-black p-8">
      <h1 className="text-xl font-semibold">Polarisation durch zwei Linsen</h1>

      {/* Visualisierung */}
      <div className="relative w-55 h-55 flex items-center justify-center">
        {/* Hintergrund: Lichtintensität */}
        <div
          className="absolute inset-0 rounded-full transition-colors duration-200"
          style={{
            backgroundColor: `rgba(0, 0, 0, ${1 - intensity})`,
          }}
        />

        {/* Feste Linse (0°) */}
        <div className="absolute w-65 h-65 border-4 border-blue-400 rounded-full flex items-center justify-center rotate-0">
          <div className="w-0.5 h-24 bg-blue-400"/>
          <div className="absolute bottom-[-60px] left-1/2 -translate-x-1/2 w-2 h-15 bg-blue-400 rounded-md" />
        </div>

        {/* Drehbare Linse */}
        <div
          className="absolute w-56 h-56 border-4 border-red-400 rounded-full flex items-center justify-center transition-transform duration-300"
          style={{ transform: `rotate(${angle}deg)` }}
        >
          <div className="w-0.5 h-24 bg-red-400"/>
          <div className="absolute bottom-[-60px] left-1/2 -translate-x-1/2 w-2 h-15 bg-red-400 rounded-md" />
        </div>
      </div>

      {/* Slider */}
      <div className="flex flex-col items-center gap-2">
        <label htmlFor="angle" className="text-sm">
          Winkel der zweiten Linse: {angle}°
          Lichtintensität: {Math.round((intensity*100))}%
        </label>
        <input
          type="range"
          id="angle"
          min={0}
          max={180}
          step={5}
          value={angle}
          onChange={(e) => setAngle(parseInt(e.target.value))}
          className="w-64"
          list="tickmarks"
        />
        <datalist id="tickmarks" className="flex justify-between w-full text-xs">
          <option value="0" label=" 0°" />
          <option value="45" label="45°" />
          <option value="90" label="90°" />
          <option value="135" label="135°" />
          <option value="180" label="180°" />
        </datalist>
      </div>

    </div>
    <QuizFrage/>
    </div>
    </div>
  );


  function QuizFrage() {
  const [selected, setSelected] = useState<number | null>(null);
  const [answered, setAnswered] = useState(false);

  const correctAnswer = 90;
  const options = [0, 45, 90, 180];

  const handleAnswer = (value: number) => {
    if (!answered) {
      setSelected(value);
      setAnswered(true);
    }
  };

  return (
    <div className="mt-12 p-6 rounded-xl bg-white dark:bg-[#2a2a2a] shadow-md w-full max-w-xl">
      <h2 className="text-lg font-semibold mb-4 text-center">
        Wie müssen die beiden Linsen zueinander eingestellt werden, damit kein Licht mehr durchkommt?
      </h2>
      <div className="grid grid-cols-2 gap-4">
        {options.map((option) => {
          const isCorrect = option === correctAnswer;
          const isSelected = selected === option;
          const showResult = answered;

          return (
            <button
              key={option}
              onClick={() => handleAnswer(option)}
              className={`relative flex items-center justify-center h-16 rounded-lg border text-lg font-medium transition-colors duration-200
                ${showResult && isSelected && isCorrect ? "bg-green-100 border-green-500 text-green-700" : ""}
                ${showResult && isSelected && !isCorrect ? "bg-red-100 border-red-500 text-red-700" : ""}
                ${!isSelected ? "bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600" : ""}
              `}
            >
              {option}°
              {showResult && isSelected && (
                isCorrect ? (
                  <Check className="absolute top-1 right-1 text-green-600 w-5 h-5" />
                ) : (
                  <X className="absolute top-1 right-1 text-red-600 w-5 h-5" />
                )
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}}
