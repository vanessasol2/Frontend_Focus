import React from 'react';

export const CheckboxGroup = ({ options, selectedValues, onChange, type }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
    {options.map((option) => (
      <label key={option.value} className="flex items-center space-x-2 cursor-pointer">
        <input
          type="checkbox"
          checked={selectedValues.includes(option.value)}
          onChange={() => onChange(type, option.value)}
          className="h-4 w-4 accent-primary-color focus:ring-primary-color border-gray-300 rounded"
        />
        <span className="text-sm text-gray-700">{option.label}</span>
      </label>
    ))}
  </div>
);
