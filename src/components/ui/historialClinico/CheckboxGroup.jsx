import React from 'react';

export const CheckboxGroup = ({ options, selectedValues, onChange, type }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
    {options.map((option) => (
      <label
        key={option.value}
        className="flex items-center space-x-3 bg-white border border-gray-300 rounded-lg p-3 shadow-sm hover:border-purple-600 transition-all duration-200 cursor-pointer"
      >
        <input
          type="checkbox"
          checked={selectedValues.includes(option.value)}
          onChange={() => onChange(type, option.value)}
          className="h-5 w-5 accent-primary-color focus:ring-2 focus:ring-purple-600 border-gray-300 rounded"
        />
        <span className="text-sm font-medium text-gray-800">{option.label}</span>
      </label>
    ))}
  </div>
);
