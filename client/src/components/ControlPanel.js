import React from 'react' 
import { Button } from '@mui/material'

function ControlPanel ({setShape,setColor,onReset})
{
  const getRandomShape = async () => {
    try {
      const response = await fetch('http://localhost:3001/randomShape');
      if (response.ok) {
        const data = await response.json();
        setShape(data.Shape);
        console.log(data.Shape)
      } else {
        console.error('Failed to fetch shape');
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };

  const getRandomColor = async () => {
    try {
      const response = await fetch('http://localhost:3001/randomColor');
      if (response.ok) {
        const data = await response.json();
        console.log(data)
        setColor(data.Color);
        console.log(data.Color)
      } else {
        console.error('Failed to fetch color');
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };

  return (
      <div className="control-panel">
        <Button
            variant="contained"
            style={{ flexGrow: 1, background: '#4a90e2', color: '#ffffff', fontWeight: 'bold', margin: '0 5px' }}
            onClick={getRandomShape}
        >
          Choose Random Shape
        </Button>
        <Button
            variant="contained"
            style={{ flexGrow: 1, background: '#4a90e2', color: '#ffffff', fontWeight: 'bold', margin: '0 5px' }}
            onClick={getRandomColor}
        >
          Choose Random Color
        </Button>
        <Button
            variant="contained"
            style={{ flexGrow: 1, background: '#4a90e2', color: '#ffffff', fontWeight: 'bold', margin: '0 5px' }}
            onClick={onReset}
        >
          Reset
        </Button>
      </div>
  );
}

export default ControlPanel;
