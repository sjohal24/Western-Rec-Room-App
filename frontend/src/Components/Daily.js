import * as React from 'react';
import { LineChart } from '@mui/x-charts/LineChart';
import './Hourly.css';

export default function Daily() {
  const xLabels = ['Sun', 'Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat'];
  return (
    <div className='chart-container'>
      <h2>Daily Chart</h2>
      <div className='line-chart'>
        <LineChart
          xAxis={[{ scaleType: 'point', data: xLabels }]}
          series={[
            {
              data: [2, 5.5, 2, 8.5, 1.5, 5, 8],
              area: false,
            },
          ]}
          width={1000}
          height={600}
        />
      </div>
    </div>
  );
}
