import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

function MyDatePicker({PickDate}) {
    const [startDate, setStartDate] = useState(new Date());

    const handleDateChange = (date) => {
      setStartDate(date);
      PickDate(date); // Przekazanie wybranej daty do komponentu nadrzędnego
    };

    return (
      <DatePicker
        selected={startDate}
        onChange={handleDateChange}
        inline
      />
    );
  };

export default MyDatePicker;
