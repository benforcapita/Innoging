import React, { useState } from 'react';
import Canvas from './components/Canvas';
import ControlPanel from './components/ControlPanel';
import './App.css'; 

function App() {
  const [shape, setShape] = useState('rectangle');
  const [color, setColor] = useState('blue');
  const [reset, setReset] = useState(false);

  const handleReset = () => {
    setReset(!reset);
  };

  const handleResetComplete = () => {
    setReset(false);  // Set it back to false so you can trigger another reset later
  };
  

  return (
    <div className="App">
      <h1>Drawing App</h1>
      <Canvas shape={shape} color={color} reset={reset} onResetComplete={handleResetComplete} />
      <ControlPanel setShape={setShape} setColor={setColor} onReset={handleReset}/>
    </div>
  );
}

export default App;
