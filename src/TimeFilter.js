import React, { useState } from 'react';

const TimeFilter = ({ onFilterChange }) => {
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');

  const handleFilterChange = () => {
    onFilterChange({ startTime, endTime });
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Start Time"
        value={startTime}
        onChange={(e) => setStartTime(e.target.value)}
      />
      <input
        type="text"
        placeholder="End Time"
        value={endTime}
        onChange={(e) => setEndTime(e.target.value)}
      />
      <button onClick={handleFilterChange}>Apply Filter</button>
    </div>
  );
};

export default TimeFilter;
