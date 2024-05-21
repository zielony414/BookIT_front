import React, { useState } from 'react';
import Checkbox from '@mui/material/Checkbox';

const MyCheckbox = () => {
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  return (
    <Checkbox
      checked={isChecked}
      onChange={handleCheckboxChange}
    />
  );
};

export default MyCheckbox;