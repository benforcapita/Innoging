import React, { useEffect, useRef, useState } from 'react';
const drawShape = (ctx, x, y, width, height, shape, color) => {
  ctx.beginPath();
  ctx.strokeStyle = color;
  switch (shape) {
    case 'rectangle':
      ctx.rect(x, y, width, height);
      break;
    case 'circle':
      ctx.arc(x + width / 2, y + height / 2, Math.min(width, height) / 2, 0, 2 * Math.PI);
      break;
    case 'square':
      let side = Math.min(width, height);
      ctx.rect(x, y, side, side);
      break;
    case 'triangle':
      ctx.moveTo(x, y);
      ctx.lineTo(x + width, y);
      ctx.lineTo(x + width / 2, y - height);
      ctx.closePath();
      break;
    case 'line':
      ctx.moveTo(x, y);
      ctx.lineTo(x + width, y + height);
      break;
    case 'ellipse':
      ctx.ellipse(x + width / 2, y + height / 2, width / 2, height / 2, 0, 0, 2 * Math.PI);
      break;
    case 'polygon':
      // Drawing a hexagon for demonstration purposes
      let numberOfSides = 6,
          size = Math.min(width, height) / 2,
          Xcenter = x + width / 2,
          Ycenter = y + height / 2;

      ctx.moveTo(Xcenter + size * Math.cos(0), Ycenter + size * Math.sin(0));
      
      for (let i = 1; i <= numberOfSides; i += 1) {
        ctx.lineTo(
          Xcenter + size * Math.cos(i * 2 * Math.PI / numberOfSides),
          Ycenter + size * Math.sin(i * 2 * Math.PI / numberOfSides)
        );
      }
      ctx.closePath();
      break;
    default:
      break;
  }
  ctx.stroke();
};


const Canvas = ({ shape, color, reset, onResetComplete }) => {
  const canvasRef = useRef(null);
  const [drawnShapes, setDrawnShapes] = useState([]);

  const [isDrawing, setIsDrawing] = useState(false);
  const [startX, setStartX] = useState(0);
  const [startY, setStartY] = useState(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height); // clear canvas

    drawnShapes.forEach(({ x, y, width, height, shape, color }) => {
      drawShape(ctx, x, y, width, height, shape, color);
    });

    const handleMouseDown = (e) => {
      setIsDrawing(true);
      const rect = canvas.getBoundingClientRect();
      setStartX(e.clientX - rect.left);
      setStartY(e.clientY - rect.top);
    };

    const handleMouseUp = (e) => {
      setIsDrawing(false);
      const rect = canvas.getBoundingClientRect();
      const endX = e.clientX - rect.left;
      const endY = e.clientY - rect.top;

      setDrawnShapes([...drawnShapes, {
        x: startX,
        y: startY,
        width: endX - startX,
        height: endY - startY,
        shape,
        color
      }]);
    };

    const handleMouseMove = (e) => {
      if (isDrawing) {
        const rect = canvas.getBoundingClientRect();
        const currentX = e.clientX - rect.left;
        const currentY = e.clientY - rect.top;

        ctx.clearRect(0, 0, canvas.width, canvas.height); // clear canvas
        drawnShapes.forEach(({ x, y, width, height, shape, color }) => {
          drawShape(ctx, x, y, width, height, shape, color);
        });
        drawShape(ctx, startX, startY, currentX - startX, currentY - startY, shape, color);
      }
    };

    canvas.addEventListener('mousedown', handleMouseDown);
    canvas.addEventListener('mouseup', handleMouseUp);
    canvas.addEventListener('mousemove', handleMouseMove);

    return () => {
      canvas.removeEventListener('mousedown', handleMouseDown);
      canvas.removeEventListener('mouseup', handleMouseUp);
      canvas.removeEventListener('mousemove', handleMouseMove);
    };
  }, [shape, color, drawnShapes, isDrawing, startX, startY]);

  useEffect(() => {
    if (reset) {
      setDrawnShapes([]);  // This clears the canvas by emptying the drawnShapes array.
      if (onResetComplete) {
        onResetComplete();  // Call the function to set reset flag back to false
      }
    }
  }, [reset]);

  return (
    <div>
      <div>Current Shape: {shape}</div>
      <div>Current Color: {color}</div>
      <canvas ref={canvasRef} width={800} height={600}></canvas>
    </div>
  );
};

export default Canvas;
