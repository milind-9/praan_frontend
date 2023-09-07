import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import generateMockData from './generateMockData'; // Function to generate mock data
 // Your actual data



const LineChartComponent = ({ data }) => {
  const mockData1 = generateMockData(data);
const mockData2 = generateMockData(data);
  return (
    <LineChart width={800} height={400} data={data}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="t" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Line type="monotone" dataKey="p1" stroke="#8884d8" name="PM 1.0" />
      <Line type="monotone" dataKey="p25" stroke="#82ca9d" name="PM 2.5" />
      <Line type="monotone" dataKey="p10" stroke="#ffc658" name="PM 10" />
      <Line type="monotone" dataKey="w" stroke="#ff7300" name="Wind Speed" />
      <Line type="monotone" dataKey="h" stroke="#00C49F" name="Wind Direction" />
      <Line type="monotone" dataKey="p1" stroke="#FF5733" name="Mock PM 1.0" data={mockData1} />
      <Line type="monotone" dataKey="p25" stroke="#FFC300" name="Mock PM 2.5" data={mockData2} />
    </LineChart>
  );
};

export default LineChartComponent;
