import React from 'react';

function ControlPanel({ currentShape, currentColor, setCurrentShape, setCurrentColor }) {
  return (
    <div>
      <button onClick={() => {/* TODO: Reset canvas */}}>Reset</button>
      <button onClick={() => {/* TODO: Fetch random shape from server */}}>Choose Random Shape</button>
      <button onClick={() => {/* TODO: Fetch random color from server */}}>Choose Random Color</button>
      <div>
        Current Shape: {currentShape}
        Current Color: {currentColor}
      </div>
    </div>
  );
}

export default ControlPanel;
