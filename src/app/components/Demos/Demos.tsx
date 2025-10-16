import { useState } from "react";

type DemosProps = {
  choice: "refraction" | "birefringence";
};

export default function Demos({ choice }: DemosProps) {
  return (
    <div className="flex flex-col items-center gap-12">
      {choice === "refraction" && <RefractionDemo />}
      {choice === "birefringence" && <BirefringenceDemo />}
    </div>
  );
}


function RefractionDemo() {
  const [angleIn, setAngleIn] = useState(-50);
  const nAir = 1.0;
  const nWater = 1.333;
  const surfaceX = 250;
  const waterWidth = 150;

  const rad = (deg: number) => (deg * Math.PI) / 180;
  const deg = (rad: number) => (rad * 180) / Math.PI;

  const entryX = surfaceX;
  const entryY = 200;
  const backX = entryX - 200;
  const backY = entryY - Math.tan(rad(angleIn)) * 200;

  const sinTheta2 = (nAir / nWater) * Math.sin(rad(angleIn));
  const theta2 = Math.asin(Math.min(Math.max(sinTheta2, -1), 1));

  const midX = entryX + waterWidth / 2;
  const midY = entryY + Math.tan(theta2) * (waterWidth / 2);
  const exitX = entryX + waterWidth;
  const exitY = entryY + Math.tan(theta2) * waterWidth;
  const outX = exitX + 200;
  const outY = exitY + Math.tan(Math.asin((nWater / nAir) * Math.sin(theta2))) * 200;

  const arcRadius = 60;

  return (
    <div className="flex flex-col items-center gap-6">
      <h2 className="text-xl font-semibold text-white">Refraction in water</h2>
      <input
        type="range"
        min={-60}
        max={60}
        value={angleIn}
        onChange={(e) => setAngleIn(Number(e.target.value))}
        className="w-80 accent-blue-600"
      />
     

      <svg width="600" height="400" className="bg-neutral-800 rounded-lg">
        <rect x={surfaceX} y="0" width={waterWidth} height="400" fill="rgba(0,120,255,0.3)" />
        <line x1={surfaceX} y1="0" x2={surfaceX} y2="400" stroke="lightblue" strokeWidth="2" />
        <line x1={surfaceX + waterWidth} y1="0" x2={surfaceX + waterWidth} y2="400" stroke="lightblue" strokeWidth="2" />
        <line x1={0} y1={entryY} x2={600} y2={entryY} stroke="white" strokeDasharray="5,5" />
        <line x1={backX} y1={0} x2={backX} y2={400} stroke="white" strokeWidth="2" />
        <line x1={backX} y1={backY} x2={entryX} y2={entryY} stroke="yellow" strokeWidth="2" />
        <line x1={entryX} y1={entryY} x2={midX} y2={midY} stroke="yellow" strokeWidth="2" />
        <line x1={midX} y1={midY} x2={exitX} y2={exitY} stroke="yellow" strokeWidth="2" />
        <line x1={exitX} y1={exitY} x2={outX} y2={outY} stroke="yellow" strokeWidth="2" />

       
        <path
          d={`M ${entryX - arcRadius} ${entryY} A ${arcRadius} ${arcRadius} 0 0 ${angleIn > 0 ? 1 : 0} ${entryX - arcRadius * Math.cos(rad(angleIn))} ${entryY - arcRadius * Math.sin(rad(angleIn))}`}
          stroke="lime"
          strokeWidth="2"
          fill="none"
        />
        <path
          d={`M ${entryX + arcRadius} ${entryY} A ${arcRadius} ${arcRadius} 0 0 ${theta2 > 0 ? 1 : 0} ${entryX + arcRadius * Math.cos(theta2)} ${entryY + arcRadius * Math.sin(theta2)}`}
          stroke="orange"
          strokeWidth="2"
          fill="none"
        />

        
        <text x={entryX - 54} y={entryY + (angleIn > 0 ? 18 : -7)} fill="lime" fontSize="15">
          {`θ₁ = ${Math.round(Math.abs(angleIn))}°`}
        </text>
        <text x={entryX + 4} y={entryY + (theta2 > 0 ? -7 : 18)} fill="orange" fontSize="15">
          {`θ₂ = ${Math.round(Math.abs(deg(theta2)))}°`} 
        </text>
        <text x= {305} y={40} fill="white" fontSize="15">Water</text>
        <text x={293} y={60} fill="white" fontSize="15"> n₂ = 1.3330</text>
        <text x= {170} y={40} fill="white" fontSize="15">Air</text>
        <text x={145} y={60} fill="white" fontSize="15"> n₁ = 1.0003</text>
      </svg>
    </div>
  );
}

function BirefringenceDemo() {
  const angleIn = 0;
  const nAir = 1.0;
  const nOrd = 1.55; 
  const nExtra = 1.95; 
  const surfaceX = 250;
  const materialWidth = 150;

  const rad = (deg: number) => (deg * Math.PI) / 180;
  const deg = (rad: number) => (rad * 180) / Math.PI;

  const thetaOptic = rad(3);
  const nEff = 1 / Math.sqrt((Math.cos(thetaOptic) ** 2) / (nExtra ** 2) + (Math.sin(thetaOptic) ** 2) / (nOrd ** 2));
  const entryX = surfaceX;
  const entryY = 200;
  const backX = entryX - 200;
  const backY = entryY - Math.tan(rad(angleIn)) * 200;


  const sinThetaOrd = (nAir / nOrd) * Math.sin(rad(angleIn));
  const thetaOrd = Math.asin(Math.min(Math.max(sinThetaOrd, -1), 1));

 
  const sinThetaExtra = (nAir / nExtra) * Math.sin(rad(angleIn));
  const thetaExtra = Math.asin(Math.min(Math.max(sinThetaExtra, -1), 1)-0.46);

  const midX = entryX + materialWidth / 2;
  const midYOrd = entryY + Math.tan(thetaOrd) * (materialWidth / 2);
  const midYExtra = entryY + Math.tan(thetaExtra) * (materialWidth / 2);

  const exitX = entryX + materialWidth;
  const exitYOrd = entryY + Math.tan(thetaOrd) * materialWidth;
  const exitYExtra = entryY + Math.tan(thetaExtra) * materialWidth;

  const outX = exitX + 200;
  const outYOrd = exitYOrd + Math.tan(Math.asin((nOrd / nAir) * Math.sin(thetaOrd))) * 200;
  const outYExtra = exitYExtra + Math.tan(Math.asin((nExtra / nAir) * Math.sin(thetaExtra))) * 200;

  const arcRadius = 60;

  return (
    <div className="flex flex-col items-center gap-6">
      {/*<h2 className="text-xl font-semibold text-white">Birefringence Demo</h2>
      <input
        type="range"
        min={-60}
        max={60}
        value={angleIn}
        onChange={(e) => setAngleIn(Number(e.target.value))}
        className="w-80"
      />
      <p className="text-gray-300">Incident angle: {angleIn}°</p>*/}

      <svg width="600" height="400" className="bg-neutral-800 rounded-lg">
        <rect x={surfaceX} y={50} width={materialWidth} height={300} fill="rgba(255, 255, 255, 0.37)" />
        <line x1={surfaceX} y1={50} x2={surfaceX} y2={350} stroke="lightgray" strokeWidth="2" />
  <line x1={surfaceX + materialWidth} y1={50} x2={surfaceX + materialWidth} y2={350} stroke="lightgray" strokeWidth="2" />
  <line x1={surfaceX} y1={50} x2={surfaceX + materialWidth} y2={50} stroke="lightgray" strokeWidth="2" />
  <line x1={surfaceX} y1={350} x2={surfaceX + materialWidth} y2={350} stroke="lightgray" strokeWidth="2" />
        <line x1={0} y1={entryY} x2={600} y2={entryY} stroke="white" strokeDasharray="5,5" />
        <line x1={backX} y1={0} x2={backX} y2={400} stroke="white" strokeWidth="2" />

       
        <line x1={backX} y1={backY} x2={entryX} y2={entryY} stroke="yellow" strokeWidth="2" />

       
        <line x1={entryX} y1={entryY} x2={exitX} y2={exitYOrd} stroke="yellow" strokeWidth="2" />
        <line x1={entryX} y1={entryY} x2={exitX} y2={exitYExtra} stroke="cyan" strokeWidth="2" />

     
        <line x1={exitX} y1={exitYOrd} x2={outX} y2={outYOrd} stroke="yellow" strokeWidth="2" />
        <line x1={exitX} y1={exitYExtra} x2={outX} y2={outYOrd-80} stroke="cyan" strokeWidth="2" />

        <path
          d={`M ${entryX - arcRadius} ${entryY} A ${arcRadius} ${arcRadius} 0 0 ${angleIn > 0 ? 1 : 0} ${entryX - arcRadius * Math.cos(rad(angleIn))} ${entryY - arcRadius * Math.sin(rad(angleIn))}`}
          stroke="orange"
          strokeWidth="2"
          fill="none"
        />
        <path
          d={`M ${entryX + arcRadius} ${entryY} A ${arcRadius} ${arcRadius} 0 0 ${thetaOrd > 0 ? 1 : 0} ${entryX + arcRadius * Math.cos(thetaOrd)} ${entryY + arcRadius * Math.sin(thetaOrd)}`}
          stroke="yellow"
          strokeWidth="2"
          fill="none"
        />
        <path
          d={`M ${entryX + arcRadius} ${entryY} A ${arcRadius} ${arcRadius} 0 0 ${thetaExtra > 0 ? 1 : 0} ${entryX + arcRadius * Math.cos(thetaExtra)} ${entryY + arcRadius * Math.sin(thetaExtra)}`}
          stroke="cyan"
          strokeWidth="2"
          fill="none"
        />
        

        {/* Beschriftungen 
        <text x={entryX - 54} y={entryY + (angleIn > 0 ? 18 : -7)} fill="lime" fontSize="15">
          {`θ₁`}
        </text>*/}
          
        <text x={entryX + 50} y={entryY + (thetaOrd > 0 ? -7 : 18)} fill="yellow" fontSize="15">
          {`ordinary ray`}
        </text>
        <text x={entryX + 20} y={entryY + (thetaOrd > 0 ? -7 : -80)} fill="cyan" fontSize="15">
          {`extraordinary ray`}
        </text>
      </svg>
    </div>
  );
}
