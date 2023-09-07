import React, { useRef, useEffect } from 'react';

function Canvas({ currentShape, currentColor }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    // TODO: Setup your canvas drawing logic here
  }, [currentShape, currentColor]);

  return (
    <canvas ref={canvasRef} width={400} height={400}></canvas>
  );
}

export default Canvas;
