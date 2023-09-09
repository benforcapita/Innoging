import React, { useEffect, useRef } from 'react';

const drawShape = (ctx, x, y, shape, color) => {
  ctx.beginPath();
  ctx.strokeStyle = color;
  switch (shape) {
    case 'line':
      ctx.moveTo(x, y);
      ctx.lineTo(x + 100, y + 100);
      break;
    case 'circle':
      ctx.arc(x, y, 50, 0, 2 * Math.PI);
      break;
    case 'square':
      ctx.rect(x - 50, y - 50, 100, 100);
      break;
    case 'triangle':
      ctx.moveTo(x, y - 50);
      ctx.lineTo(x - 50, y + 50);
      ctx.lineTo(x + 50, y + 50);
      ctx.closePath();
      break;
    case 'rectangle':
      ctx.rect(x - 50, y - 25, 100, 50);
      break;
    case 'ellipse':
      ctx.ellipse(x, y, 50, 30, 0, 0, 2 * Math.PI);
      break;
    default:
      break;
  }
  ctx.stroke();
};

const Canvas = ({ shape, color }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height); // clear canvas

    const drawAtCoordinates = (e) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      drawShape(ctx, x, y, shape, color);
    };

    canvas.addEventListener('click', drawAtCoordinates);

    // Cleanup
    return () => {
      canvas.removeEventListener('click', drawAtCoordinates);
    };
  }, [shape, color]);

  return (
    <canvas ref={canvasRef} width={800} height={600}></canvas>
  );
};

export default Canvas;
