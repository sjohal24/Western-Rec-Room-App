import React, { useState, useEffect } from 'react';
import './BusyTimes.css'; // Import your CSS file

const BusyTimes = () => {
  const [busyData, setBusyData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/avg/hours');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const result = await response.json();
        setBusyData(result.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  // Function to get top 3 busiest and least busy hours
  const getTopAndBottomHours = () => {
    const sortedData = [...busyData].sort(
      (a, b) => a.avg_numOfStudents - b.avg_numOfStudents
    );
    const topThreeBusy = sortedData.slice(-3).reverse();
    const topThreeLeastBusy = sortedData.slice(0, 3);

    return {
      topThreeBusy,
      topThreeLeastBusy,
    };
  };

  const { topThreeBusy, topThreeLeastBusy } = getTopAndBottomHours();

  return (
    <div className='busy-times'>
      <h1>Busy Times During the Week</h1>
      <div className='busy-times-container'>
        <div className='busy-times-list'>
          <h2>Most Busy Hours:</h2>
          <ul>
            {topThreeBusy.map((item, index) => (
              <li key={index}>
                {item.day} {item.hour}:00 - {item.avg_numOfStudents} students
              </li>
            ))}
          </ul>
        </div>

        <div className='busy-times-list'>
          <h2>Least Busy Hours:</h2>
          <ul>
            {topThreeLeastBusy.map((item, index) => (
              <li key={index}>
                {item.day} {item.hour}:00 - {item.avg_numOfStudents} students
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default BusyTimes;
