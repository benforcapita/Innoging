import React, { useState } from 'react';
import Canvas from './components/Canvas';
import ControlPanel from './components/ControlPanel';

function App() {
  const [shape, setShape] = useState('rectangle');
  const [color, setColor] = useState('blue');

  return (
    <div className="App">
      <h1>Drawing App</h1>
      <ControlPanel setShape={setShape} setColor={setColor} />
      <Canvas shape={shape} color={color} />
    </div>
  );
}

export default App;
