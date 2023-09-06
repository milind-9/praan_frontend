import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const ComparisonChart = ({ data }) => {
  console.log(data,'==============');

  // Function to map data and generate lines for a specific PM value
  const renderLines = (dataKey, name, strokeColor) => (
    <Line
      type="monotone"
      dataKey={dataKey}
      stroke={strokeColor}
      name={name}
    />
  );

  return (
    <LineChart width={800} height={400} data={data}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="time" />
      <YAxis />
      <Tooltip />
      <Legend />

      {/* Render lines for PM1 */}
      {data.locations.map((location, index) => (
        renderLines(`locations[${index}].data[].pm1`, `${location.name} PM 1.0`, getRandomColor())
      ))}

      {/* Render lines for PM2.5 */}
      {data.locations.map((location, index) => (
        renderLines(`locations[${index}].data[].pm25`, `${location.name} PM 2.5`, getRandomColor())
      ))}

      {/* Render lines for PM10 */}
      {data.locations.map((location, index) => (
        renderLines(`locations[${index}].data[].pm10`, `${location.name} PM 10`, getRandomColor())
      ))}
    </LineChart>
  );
};

// Generate a random color for each line
const getRandomColor = () => `#${Math.floor(Math.random()*16777215).toString(16)}`;

export default ComparisonChart;
