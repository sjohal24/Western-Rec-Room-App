import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as Chartjs,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

Chartjs.register(LineElement, CategoryScale, LinearScale, PointElement);

export default function Hourly() {
  return <div>Hourly</div>;
}
