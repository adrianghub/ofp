import { useState } from 'react';
import { add, divide, multiply, subtract } from './functions';

const App = () => {
  const [firstNumber, setFirstNumber] = useState(0);
  const [secondNumber, setSecondNumber] = useState(0);
  const [result, setResult] = useState(0);

  const performCalculation = (
    calculateCb: (a: number, b: number) => number
  ) => {
    setResult(calculateCb(firstNumber, secondNumber));
  };

  return (
    <div>
      <div className="grid grid-cols-2 gap-x-4">
        <input
          type="number"
          className="rounded-md shadow-md p-4"
          value={firstNumber}
          onChange={(e) => setFirstNumber(parseFloat(e.target.value))}
        />
        <input
          type="number"
          className="rounded-md shadow-md p-4"
          value={secondNumber}
          onChange={(e) => setSecondNumber(parseFloat(e.target.value))}
        />
      </div>
      <div className="grid grid-cols-4 gap-x-4 my-4">
        <CalculatorButton onClick={() => performCalculation(add)} sign="+" />
        <CalculatorButton
          onClick={() => performCalculation(subtract)}
          sign="-"
        />
        <CalculatorButton
          onClick={() => performCalculation(multiply)}
          sign="*"
        />
        <CalculatorButton onClick={() => performCalculation(divide)} sign="/" />
      </div>
      <div>Result: {result}</div>
    </div>
  );
};

export default App;

const CalculatorButton = ({
  onClick,
  sign,
}: {
  onClick: () => void;
  sign: string;
}) => (
  <button
    className="bg-blue-200 px-2 py-4 text-lg hover:bg-blue-500 hover:text-white rounded-md"
    onClick={onClick}
  >
    {sign}
  </button>
);
