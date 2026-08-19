import React from 'react';
import '../styles/Numpad.css'; // Add CSS for keypad styling

type Props = {
  onKeyPress: (key: string) => void;
};

const Numpad: React.FC<Props> = ({ onKeyPress }) => {
  const handleButtonClick = (value: string) => {
    onKeyPress(value);
  };

  return (
    <>
      <div className="keypad">
        <div className="key" onClick={() => handleButtonClick('1')}>1</div>
        <div className="key" onClick={() => handleButtonClick('2')}>2</div>
        <div className="key" onClick={() => handleButtonClick('3')}>3</div>
        <div className="key" onClick={() => handleButtonClick('4')}>4</div>
        <div className="key" onClick={() => handleButtonClick('5')}>5</div>
        <div className="key" onClick={() => handleButtonClick('6')}>6</div>
        <div className="key" onClick={() => handleButtonClick('7')}>7</div>
        <div className="key" onClick={() => handleButtonClick('8')}>8</div>
        <div className="key" onClick={() => handleButtonClick('9')}>9</div>
        <div className="key" onClick={() => handleButtonClick('*')}>*</div>
        <div className="key" onClick={() => handleButtonClick('0')}>0</div>
        <div className="key" onClick={() => handleButtonClick('backspace')}>&#8617;</div>
      </div>
    </>
  );
};

export default Numpad;
