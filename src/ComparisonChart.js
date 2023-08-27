import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const ComparisonChart = ({ data }) => {
  console.log(data)
  return (
    <LineChart width={800} height={400} data={data}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="t" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Line type="monotone" dataKey="p1" stroke="#8884d8" name="Location A PM 1.0" />
      <Line type="monotone" dataKey="p25" stroke="#82ca9d" name="Location A PM 2.5" />
      <Line type="monotone" dataKey="p10" stroke="#ffc658" name="Location A PM 10" />
      <Line type="monotone" dataKey="p1" stroke="#FF5733" name="Location B PM 1.0" />
      <Line type="monotone" dataKey="p25" stroke="#FFC300" name="Location B PM 2.5" />
      <Line type="monotone" dataKey="p10" stroke="#FF5733" name="Location B PM 10" />
      <Line type="monotone" dataKey="p1" stroke="#00C49F" name="Location C PM 1.0" />
      <Line type="monotone" dataKey="p25" stroke="#FF7300" name="Location C PM 2.5" />
      <Line type="monotone" dataKey="p10" stroke="#00C49F" name="Location C PM 10" />
    </LineChart>
  );
};

export default ComparisonChart;
