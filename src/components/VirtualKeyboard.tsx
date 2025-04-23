import React from 'react';
import { Keyboard } from 'lucide-react';

interface VirtualKeyboardProps {
  onKeyPress: (key: string) => void;
  isOpen: boolean;
}

const VirtualKeyboard: React.FC<VirtualKeyboardProps> = ({ onKeyPress, isOpen }) => {
  // Generate numbers 0-9 in random order
  const generateRandomNumbers = () => {
    const numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
    return numbers.sort(() => Math.random() - 0.5);
  };

  const numbers = generateRandomNumbers();
  
  if (!isOpen) return null;
  
  return (
    <div className="bg-white border border-gray-300 rounded-md p-3 shadow-lg">
      <div className="grid grid-cols-5 gap-2">
        {numbers.map((num) => (
          <button
            key={num}
            onClick={() => onKeyPress(num)}
            className="bg-gray-200 hover:bg-gray-300 rounded-md py-2 transition-colors duration-200"
          >
            {num}
          </button>
        ))}
      </div>
      <div className="mt-2 flex justify-end">
        <button 
          onClick={() => onKeyPress('backspace')}
          className="text-sm text-blue-700 hover:underline"
        >
          Borrar
        </button>
      </div>
    </div>
  );
};

export default VirtualKeyboard;