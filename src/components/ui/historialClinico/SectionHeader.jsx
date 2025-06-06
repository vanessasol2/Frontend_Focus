import React from 'react';

export const SectionHeader = ({ icon: Icon, title, color = "text-primary-color" }) => (
  <div className="flex items-center mb-4 pb-2 border-b border-gray-200">
    <Icon className={`w-5 h-5 mr-2 ${color}`} />
    <h2 className={`text-lg font-semibold ${color}`}>{title}</h2>
  </div>
);