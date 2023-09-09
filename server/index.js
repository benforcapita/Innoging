const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
const port = 3001;
const shapes = ['line', 'circle', 'square', 'triangle', 'rectangle', 'ellipse'];
const colors = ['red', 'blue', 'green', 'yellow', 'purple', 'orange', 'pink', 'black', 'white'];

app.get('/randomShape', (req, res) => {
    const randomShape = shapes[Math.floor(Math.random() * shapes.length)];
    res.json({ Shape: randomShape });
    }
);

app.get('/randomColor', (req, res) => {
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    res.json({ Color: randomColor });
    }
);

app.listen(port, () => console.log(`server running on port ${port}`));