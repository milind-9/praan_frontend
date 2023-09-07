import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const ComparisonChart = ({ data }) => {
  console.log(data, '==============');

  // Function to generate lines for a specific PM value
  const renderLines = (dataKey, name, strokeColor) => (
    <Line
      type="monotone"
      dataKey={dataKey}
      stroke={strokeColor}
      name={name}
    />
  );

  // Generate a random color for each line
  const getRandomColor = () => `#${Math.floor(Math.random() * 16777215).toString(16)}`;

  return (
    <LineChart width={800} height={400} data={data.locations[0].data}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="time" />
      <YAxis />
      <Tooltip />
      <Legend />

      {/* Render lines for PM1 */}
      {renderLines('pm1', `${data.locations[0].name} PM 1.0`, getRandomColor())}

      {/* Render lines for PM2.5 */}
      {renderLines('pm25', `${data.locations[0].name} PM 2.5`, getRandomColor())}

      {/* Render lines for PM10 */}
      {renderLines('pm10', `${data.locations[0].name} PM 10`, getRandomColor())}
    </LineChart>
  );
};

export default ComparisonChart;
