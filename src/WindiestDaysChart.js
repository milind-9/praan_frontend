import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const getDayOfWeek = (timestamp) => {
  const day = new Date(timestamp).getDay();
  return day;
};

const aggregateWindSpeedsByDay = (data) => {
  const aggregatedData = {};

  data.forEach((entry) => {
    const dayOfWeek = getDayOfWeek(entry.t);
    if (!aggregatedData[dayOfWeek]) {
      aggregatedData[dayOfWeek] = { totalWindSpeed: 0, count: 0 };
    }
    aggregatedData[dayOfWeek].totalWindSpeed += entry.w;
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
