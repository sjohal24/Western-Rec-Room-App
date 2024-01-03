import React, { useState, useEffect } from 'react';
import { LineChart } from '@mui/x-charts/LineChart';
import './Hourly.css';

export default function Daily() {
  const [chartData, setChartData] = useState([]);
  const [xLabels, setXLabels] = useState([]);

  useEffect(() => {
    // Fetch data from the API
    fetch('http://localhost:8000/api/avg/total/days')
      .then((response) => response.json())
      .then((data) => {
        // Extract day labels and corresponding average numOfStudents
        const labels = data.map((item) => item.day);
        const yValues = data.map((item) => item.avg_numOfStudents);

        // Create a new series object using the fetched data
        const newSeries = {
          data: yValues,
          area: false,
        };

        // Update the chart data state
        setChartData([newSeries]);

        // Update the xLabels state
        setXLabels(labels);
      })
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  return (
    <div className='chart-container'>
      <h2>Daily Chart</h2>
      <div className='line-chart'>
        <LineChart
          xAxis={[{ scaleType: 'point', data: xLabels }]}
          series={chartData}
          width={1000}
          height={600}
        />
      </div>
    </div>
  );
}
