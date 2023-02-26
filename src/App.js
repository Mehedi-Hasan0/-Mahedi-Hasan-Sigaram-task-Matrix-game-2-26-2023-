import logo from './logo.svg';
import './App.css';
import { useState } from 'react';

const App = () => {
  const [colors, setColors] = useState(Array(16).fill('blue'));
  const [redIndexes, setRedIndexes] = useState([-1, -1]);
  const [boxLabels, setBoxLabels] = useState(Array(16).fill(''));


  const handleClick = (index) => {
    const newColors = [...colors];
    const newLabels = [...boxLabels];

    if (newColors[index] === 'blue') {
      // set the color of the newly clicked box to red
      newColors[index] = 'red';

      // set the label of the newly clicked box to the next available box number
      const label = `Box #${newLabels.filter(l => l !== '').length + 1}`;
      newLabels[index] = label;

      if (redIndexes[0] !== -1) {
        if (redIndexes[1] !== -1) {
          // toggle the color of the second box to blue
          newColors[redIndexes[1]] = 'blue';
        }
        // update the red indexes
        setRedIndexes([index, redIndexes[0]]);
      } else {
        setRedIndexes([index, -1]);
      }
      setColors(newColors);
      setBoxLabels(newLabels);
    }
  };


  const matrix = [];
  for (let i = 0; i < 4; i++) {
    const row = [];
    for (let j = 0; j < 4; j++) {
      const index = i * 4 + j;
      row.push(
        <div
          key={`${i}-${j}`}
          className={`box ${colors[index]}`}
          onClick={() => handleClick(index)}
        >
          {boxLabels[index]}
        </div>
      );
    }
    matrix.push(<div key={i} className="row">{row}</div>);
  }

  return (
    <div className="matrix">
      {matrix}
    </div>
  );
};

export default App;
