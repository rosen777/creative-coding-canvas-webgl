const canvasSketch = require('canvas-sketch');
const {lerp} = require('canvas-sketch-util/math');
const random = require('canvas-sketch-util/random');
const palettes = require('nice-color-palettes');

const settings = {
  dimensions: [2048, 2048],
};

const sketch = () => {
  // Everytime we run the code, we chop of the color palettes to be a number
  // between the first color and a max of 5 colors
  const colorCount = random.rangeFloor(1, 6);
  const palette = random.shuffle(random.pick(palettes).slice(0, colorCount));
  const createGrid = () => {
    // points is the points on a grid
    const points = [];
    const count = 30;
    for (let x = 0; x < count; x++) {
      for (let y = 0; y < count; y++) {
        const u = count <= 1 ? 0.5 : x / (count - 1);
        const v = count <= 1 ? 0.5 : y / (count - 1);
        // noise2D(x, y) horizonal and vertical coord
        const radius = Math.abs(random.noise2D(u, v)) * 0.0225;
        points.push({
          color: random.pick(palette),
          // random gaussian between -3.5 and +3.5
          radius,
          // position is assigned to the uv coordinates
          position: [ u, v ]
        });
      }
    }
    return points;
  }

  random.setSeed(512);
  const points = createGrid().filter(() => random.value() > 0.5);
  const margin = 400;

  return ({ context, width, height }) => {
    context.fillStyle = 'white';
    context.fillRect(0,0, width, height);

    points.forEach(data => {
      const {
        position,
        radius, 
        color
       } = data;
      const [u, v] = position;
      const x = lerp(margin, width -  margin, u);
      const y = lerp(margin, height - margin, v);

      // Draw a circle
      context.beginPath();
      // arc(x, y, radius, startAngle, endAngle, anticlockwise)
      // arc(x, y, radius, startAngle, endAngle, anticlockwise)
      context.arc(x, y, radius * width, 0, Math.PI * 2, false);
      context.fillStyle= 'red';
      context.fillStyle = color;
      context.fill();
    })
  };
};

canvasSketch(sketch, settings);
