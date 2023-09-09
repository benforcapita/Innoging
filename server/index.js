const express = require('express');
const app = express();
const port = 3001;

const shapes = ['line', 'circle', 'square', 'triangle', 'rectangle', 'ellipse', 'polygon', 'polyline', 'path'];
const colors = ['red', 'blue', 'green', 'yellow', 'purple', 'orange', 'pink', 'black', 'white'];

app.get('/randomShape', (req, res) => {
    const randomShape = shapes[Math.floor(Math.random() * shapes.length)];
    res.send(randomShape);
    }
);

app.get('/randomColor', (req, res) => {
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    res.send(randomColor);
    }
);

app.listen(port, () => console.log(`server running on port ${port}`));