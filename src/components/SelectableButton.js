import React, { useState } from 'react';

const SelectableButton = ({ isSelected, onClick, label }) => {
  return (
    <button
      className={`px-4 py-2 text-4xl ${isSelected ? 'bg-blue-500 text-white' : 'bg-white text-black'} border-2 border-black rounded-lg`}
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default SelectableButton;