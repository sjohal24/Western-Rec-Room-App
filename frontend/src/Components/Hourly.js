import React, { useState, useEffect } from 'react';
import { LineChart } from '@mui/x-charts/LineChart';
import './Hourly.css';

export default function Hourly() {
  const [chartData, setChartData] = useState([]);
  const [timestamps, setTimestamps] = useState([]);

  useEffect(() => {
    // Fetch data from the API
    fetch('http://localhost:8000/api/avg/all/recent')
      .then((response) => response.json())
      .then((data) => {
        // Extract timestamps and corresponding numOfStudents
        const extractedTimestamps = data.map((item) => item.time);
        const numOfStudents = data.map((item) => item.numOfStudents);

        // Reverse the timestamps array
        const reversedTimestamps = extractedTimestamps.reverse();

        // Create a new series object using the fetched data
        const newSeries = {
          data: numOfStudents,
          area: false,
        };

        // Update the chart data state
        setChartData([newSeries]);
        // Update the timestamps state
        setTimestamps(reversedTimestamps);
      })
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  return (
    <div className='chart-container'>
      <h2>Hourly Chart</h2>
      <div className='line-chart'>
        <LineChart
          xAxis={[{ scaleType: 'point', data: timestamps }]}
          series={chartData}
          width={1000}
          height={600}
        />
      </div>
    </div>
  );
}
