import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const getDayOfWeek = (timestamp) => {
  const day = new Date(timestamp).getDay();
  const options = { weekday: 'long' };
const dayOfWeek = new Date(day).toLocaleDateString(undefined, options);
 
  return dayOfWeek;
};

const aggregateWindSpeedsByDay = (data) => {
  const aggregatedData = {};

  data.forEach((entry) => {
    const dayOfWeek = getDayOfWeek(entry.p);
    if (!aggregatedData[dayOfWeek]) {
      aggregatedData[dayOfWeek] = { totalWindSpeed: 0, count: 0 };
    }
    const numericString = entry.w.replace(/[^0-9]/g, "");
    aggregatedData[dayOfWeek].totalWindSpeed += parseFloat(numericString);
    console.log(aggregatedData[dayOfWeek].totalWindSpeed,'poooooooo',dayOfWeek)
    aggregatedData[dayOfWeek].count += 1;
  });

  return aggregatedData;
};

const findWindiestDays = (aggregatedData) => {
  const averageWindSpeeds = [];

  for (const day in aggregatedData) {
    const averageSpeed = aggregatedData[day].totalWindSpeed / aggregatedData[day].count;
    averageWindSpeeds.push({ day, averageSpeed });
  }

  return averageWindSpeeds;
};

const WindiestDaysChart = ({ data }) => {
  const aggregatedData = aggregateWindSpeedsByDay(data);
  const windiestDays = findWindiestDays(aggregatedData);

  return (
    <BarChart width={800} height={400} data={windiestDays}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="day" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="averageSpeed" fill="#8884d8" name="Average Wind Speed" />
    </BarChart>
  );
};

export default WindiestDaysChart;
