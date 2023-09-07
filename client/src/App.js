import React, { useState } from 'react';
import Canvas from './Canvas';
import ControlPanel from './ControlPanel';

function App() {
  const [currentShape, setCurrentShape] = useState('circle');
  const [currentColor, setCurrentColor] = useState('red');

  return (
    <div>
      <h1>Drawing App</h1>
      <ControlPanel
        currentShape={currentShape}
        currentColor={currentColor}
        setCurrentShape={setCurrentShape}
        setCurrentColor={setCurrentColor}
      />
      <Canvas currentShape={currentShape} currentColor={currentColor} />
    </div>
  );
}

export default App;
