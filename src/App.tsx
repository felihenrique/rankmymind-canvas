import { useEffect, useRef, useState } from 'react';
import './App.css';

interface Point {
  x: number;
  y: number;
}

function generateAngles(quantity: number) {
  const angles: number[] = [];
  const step = 360 / quantity;
  for(let angle = 0; angle < 360; angle += step) {
    angles.push(angle * (Math.PI / 180));
  }
  return angles;
}

function generatePoints(radius: number, angles: number[]): Point[] {
  return angles.map(angle => {
    return {
      x: radius * Math.cos(angle),
      y: radius * Math.sin(angle),
    };
  });
}

function App() {
  const [context, setContext] = useState<CanvasRenderingContext2D | null>();
  const canvas = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const context = canvas.current?.getContext("2d");
    setContext(context);
  }, [canvas]);

  useEffect(() => {
    if(!context) return;
    const radius = 100;
    const angles = generateAngles(4);
    const points = generatePoints(radius, angles);
    context.fillStyle = 'blue';
    context.beginPath();
    points.forEach(({ x, y }) => {
      context.lineTo(x + 300, y + 240);
    });
    context.closePath();
    context.fill();
  }, [context]);

  return (
    <div className={'container'}>
      <canvas ref={canvas} id="mycanvas" width={600} height={480} />
    </div>
  );
}

export default App;
