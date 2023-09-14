import React, { useEffect, useRef, useState } from 'react';
const drawShape = (ctx, x, y, width, height, shape, color) => {
  ctx.beginPath();
  ctx.strokeStyle = color;
  switch (shape) {
    case 'rectangle':
      ctx.rect(x, y, width, height);
      break;
    case 'circle':
      const centerX = x + width / 2;
      const centerY = y + height / 2;
      const radius = Math.sqrt(Math.pow(width / 2, 2) + Math.pow(height / 2, 2));
      ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
      break;
    case 'square':
      const side = Math.min(Math.abs(width), Math.abs(height));
      ctx.rect(x - side / 2, y - side / 2, side, side);
      break;
    case 'triangle':
      ctx.moveTo(x, y);
      ctx.lineTo(x + width, y + height);
      ctx.lineTo(2 * x - (x + width), y + height);
      ctx.closePath();
      break;
    case 'line':
      ctx.moveTo(x, y);
      ctx.lineTo(x + width, y + height);
      break;
    case 'ellipse':
      const ellipseCenterX = x;
      const ellipseCenterY = y;
      const radiusX = Math.abs(width / 2);
      const radiusY = Math.abs(height / 2);
      ctx.ellipse(ellipseCenterX, ellipseCenterY, radiusX, radiusY, 0, 0, 2 * Math.PI);
      break;
    default:
      break;
  }
  ctx.stroke();
};



const Canvas = ({ shape, color, reset, onResetComplete }) => {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
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

  useEffect(() => {
    const resizeCanvas = () => {
      if (containerRef.current && canvasRef.current) {
        const { width, height } = containerRef.current.getBoundingClientRect();
        canvasRef.current.width = width;
        canvasRef.current.height = height;
      }
    };

    // Initial resize
    resizeCanvas();

    // Handle window resize
    window.addEventListener('resize', resizeCanvas);

    // Cleanup
    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <div ref={containerRef} className="canvas-container">
      <div>Current Shape: {shape}</div>
      <div>Current Color: {color}</div>
      <canvas ref={canvasRef} width={800} height={600}></canvas>
    </div>
  );
};

export default Canvas;
