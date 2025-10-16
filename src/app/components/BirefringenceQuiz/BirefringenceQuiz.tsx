"use client";

import { useState, useRef } from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

const DRAGGABLE_TYPE = "WORD";

interface MaterialItem {
  id: number;
  name: string;
}
interface BirefringenceQuizProps {
  onComplete?: () => void;
}

const initialItems: MaterialItem[] = [
  { id: 1, name: "Glass" },
  { id: 2, name: "Calcite" },
  { id: 3, name: "Sodium chloride" },
  { id: 4, name: "Plastic wrap" },
  { id: 5, name: "Quartz" },
  { id: 6, name: "Air" },
  { id: 7, name: "Ice" },
  { id: 8, name: "Ethanol" },
];

export default function BirefringenceQuiz({ onComplete }: BirefringenceQuizProps) {
  const [leftItems, setLeftItems] = useState<MaterialItem[]>([]);
  const [rightItems, setRightItems] = useState<MaterialItem[]>([]);
  const [middleItems, setMiddleItems] = useState<MaterialItem[]>(initialItems);
  const [showSolution, setShowSolution] = useState(false);
  const [quizComplete, setQuizComplete] = useState(false);
  const [feedback, setFeedback] = useState("");

  const correctLeft = ["Quartz", "Plastic wrap", "Ice", "Calcite"];
  const correctRight = ["Sodium chloride", "Air", "Ethanol", "Glass"];

  const checkAnswer = () => {
    const leftNames = [...leftItems.map(i => i.name)].sort();
    const rightNames = [...rightItems.map(i => i.name)].sort();
    const isCorrect =
      JSON.stringify(leftNames) === JSON.stringify([...correctLeft].sort()) &&
      JSON.stringify(rightNames) === JSON.stringify([...correctRight].sort());

    setQuizComplete(isCorrect);
    setFeedback(isCorrect ? "Correct! Well done." : "That's not correct yet. Try again or view the solution.");
    if (isCorrect && onComplete) {
      onComplete();
    }
  };

  const moveItem = (
    item: MaterialItem,
    fromList: MaterialItem[],
    setFromList: React.Dispatch<React.SetStateAction<MaterialItem[]>>,
    toList: MaterialItem[],
    setToList: React.Dispatch<React.SetStateAction<MaterialItem[]>>
  ) => {
    if (toList.find(i => i.id === item.id) || toList.length >= 4) return;
    setFromList(fromList.filter(i => i.id !== item.id));
    setToList([...toList, item]);
  };

  const resetQuiz = () => {
    setMiddleItems(initialItems);
    setLeftItems([]);
    setRightItems([]);
    setShowSolution(false);
    setQuizComplete(false);
    setFeedback("");
  };

  const showSolutionAndComplete = () => {
    const left = initialItems.filter(i => correctLeft.includes(i.name));
    const right = initialItems.filter(i => correctRight.includes(i.name));
    setLeftItems(left);
    setRightItems(right);
    setMiddleItems([]);
    setShowSolution(true);

    setQuizComplete(true);
    setFeedback("Correct! Well done.");
    if (onComplete) {
      onComplete();
    }
  };

  const DraggableItem = ({ item }: { item: MaterialItem }) => {
    const [{ isDragging }, dragRef] = useDrag(() => ({
      type: DRAGGABLE_TYPE,
      item,
      collect: (monitor) => ({ isDragging: monitor.isDragging() })
    }), [item]);

    return (
      <div
        ref={dragRef as unknown as (instance: HTMLDivElement | null) => void}
        className={`cursor-move bg-blue-700 text-white px-4 py-2 m-2 rounded-lg shadow ${isDragging ? "opacity-30" : "opacity-100"}`}
      >
        {item.name}
      </div>
    );
  };

  const DropZone = ({
    items,
    setItems,
    label,
    acceptFrom,
  }: {
    items: MaterialItem[];
    setItems: React.Dispatch<React.SetStateAction<MaterialItem[]>>;
    label: string;
    acceptFrom: MaterialItem[][];
  }) => {
    const ref = useRef<HTMLDivElement>(null);
    const [, drop] = useDrop({
      accept: DRAGGABLE_TYPE,
      drop: (draggedItem: MaterialItem) => {
        for (const fromList of acceptFrom) {
          if (fromList.find(i => i.id === draggedItem.id)) {
            const fromSetter =
              fromList === leftItems ? setLeftItems :
                fromList === rightItems ? setRightItems :
                  setMiddleItems;
            moveItem(draggedItem, fromList, fromSetter, items, setItems);
            break;
          }
        }
      },
    });

    drop(ref);

    return (
      <div ref={ref} className="flex flex-col items-center bg-neutral-800 rounded-xl p-4 min-w-[200px] min-h-[220px] mx-2 border-2 border-dashed border-gray-400">
        <h2 className="text-white mb-2 font-semibold">{label}</h2>
        {items.map(item => <DraggableItem key={item.id} item={item} />)}
        {Array.from({ length: Math.max(0, 4 - items.length) }).map((_, i) => (
          <div key={i} className="w-full h-10 bg-neutral-700 my-1 rounded opacity-50" />
        ))}
      </div>
    );
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="flex flex-col items-center space-y-8 py-8 w-full">
        <div className="w-full max-w-5xl text-white text-center">
          <h2 className="text-xl font-semibold mb-4">Assignment Quiz</h2>
          <p className="mb-4 max-w-xl mx-auto">Drag each material to its correct category: <br />
            (room temperature except for the ice)<br />
            Reminder: Birefringent materials are anisotropic. Otherwise, they cannot exhibit birefringence.<br/>
          (No touchscreen support, so in case just think about the solution and click "Show Solution" afterwards.)</p>
          <div className="flex justify-center mb-4">
            <DropZone items={leftItems} setItems={setLeftItems} label="Birefringent (4)" acceptFrom={[middleItems, rightItems]} />
            <DropZone items={middleItems} setItems={setMiddleItems} label="Materials" acceptFrom={[leftItems, rightItems]} />
            <DropZone items={rightItems} setItems={setRightItems} label="Not Birefringent (4)" acceptFrom={[middleItems, leftItems]} />
          </div>

          <button
            onClick={checkAnswer}
            className="bg-blue-700 hover:bg-blue-600 text-white px-4 py-2 rounded-lg mb-2"
          >
            Check Answer
          </button>

          {!quizComplete && (
            <button
              onClick={showSolutionAndComplete}
              className="bg-gray-600 hover:bg-gray-500 text-white px-4 py-2 rounded-lg ml-2"
            >
              Show Solution
            </button>
          )}

          <p className="mt-4 text-lg">{feedback}</p>

          {quizComplete && (
            <div className="mt-4 bg-neutral-800 p-4 rounded-xl text-left max-w-xl mx-auto">
              <h3 className="font-semibold mb-2">Explanations:</h3>
              <ul className="list-disc ml-6">
                <li><strong>Glass:</strong> In the liquid state, the particles in glass are distributed randomly.
                  When the material solidifies, the particles remain frozen in place, preserving this random structure. → isotropic </li>
                <li><strong>Calcite:</strong> It allignes in a common direction. → anisotropic</li>
                <li><strong>Sodium chloride:</strong> Cubic crystal structure → isotropic</li>
                <li><strong>Plastic wrap:</strong> Polymer chains are stretched and have therefore an induced common alignment. → anisotropic </li>
                <li><strong>Quarz:</strong> Forms a direction dependent structure. → anisotropic</li>
                <li><strong>Air:</strong> Gas particles move freely and randomly in all directions → isotropic</li>
                <li><strong>Ice:</strong> Hexagonal structures. → anisotropic</li>
                <li><strong>Ethanol:</strong> Liquid with no long-range structure. → isotropic</li>
              </ul>
            </div>
          )}

          {quizComplete && (
            <button
              onClick={resetQuiz}
              className="mt-4 bg-gray-700 text-white px-4 py-2 rounded-lg"
            >
              Reset Quiz
            </button>
          )}
        </div>
      </div>
    </DndProvider>
  );
}
