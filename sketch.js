const canvasSketch = require('canvas-sketch');
const {lerp} = require('canvas-sketch-util/math');

const settings = {
  dimensions: [2048, 2048],
};

const sketch = () => {
  const createGrid = () => {
    // points is the points on a grid
    const points = [];
    const count = 40;
    for (let x = 0; x < count; x++) {
      for (let y = 0; y < count; y++) {
        const u = count <= 1 ? 0.5 : x / (count - 1);
        const v = count <= 1 ? 0.5 : y / (count - 1);
        points.push([ u, v ]);
      }
    }
    return points;
  }

  const points = createGrid().filter(() => Math.random() > 0.5);
  const margin = 400;

  return ({ context, width, height }) => {
    context.fillStyle='white';
    context.fillRect(0,0, width, height);

    points.forEach(([u, v]) => {
      const x = lerp(margin, width -  margin, u);
      const y = lerp(margin, height - margin, v);

      // Draw a circle
      context.beginPath();
      // arc(x, y, radius, startAngle, endAngle, anticlockwise)
      // arc(x, y, radius, startAngle, endAngle, anticlockwise)
      context.arc(x, y, 100, 0, Math.PI * 2, false);
      context.strokeStyle = 'black';
      context.lineWidth = 10
      context.stroke();
    })
  };
};

canvasSketch(sketch, settings);
