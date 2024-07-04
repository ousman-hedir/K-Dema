import React from 'react';
import { SelectingInputsProps } from '../types';

const SelectingInputs: React.FC<SelectingInputsProps> = ({
  id,
  title,
  options,
  selectedOption,
  onChange,
}) => {
  return (
    <div className="mb-4">
      <h2 className="block text-sm font-medium">{title}</h2>
      <div className="mt-1 flex flex-col">
        {options.map((option, index) => (
          <label
            key={index}
            className={`cursor-pointer flex items-center justify-between p-2 border border-transparent rounded-md hover:border-gray-400 focus:ring focus:ring-2 ${
              selectedOption === option ? 'bg-gray-200' : ''
            }`}
          >
            <div className="flex items-center">
              <span className="ml-2">{option}</span>
              {['Black', 'Blue', 'Gold', 'Silver', 'Purple'].includes(option) && (
                <span
                  className="w-5 h-3 rounded border border-gray-300 ml-2"
                  style={{ backgroundColor: option.toLowerCase() }}
                />
              )}
            </div>
            <div
              className={`w-5 h-5 ml-2 border border-gray-300 rounded-md text-sm flex items-center justify-center cursor-pointer ${
                selectedOption === option ? 'bg-gray-200' : ''
              }`}
              onClick={() => onChange(option)}
            >
              {/* Checkmark for selection indication */}
              {selectedOption === option && (
                <span className="block w-3 h-3 bg-yellow-500 rounded-full"></span>
              )}
            </div>
          </label>
        ))}
      </div>
    </div>
  );
};

export default SelectingInputs;
