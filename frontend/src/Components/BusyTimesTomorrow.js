import React, { useEffect, useState } from 'react';
import './BusyTimesTomorrow.css';

const BusyTimesTomorrow = () => {
  const [busyTimes, setBusyTimes] = useState({
    leastBusy: [],
    mostBusy: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const daysOfWeek = [
          'Sunday',
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday',
          'Saturday',
        ];
        const today = new Date();
        today.setDate(today.getDate() + 1); // Get tomorrow's date
        const tomorrow = today.toLocaleDateString('en-US', { weekday: 'long' });

        if (!daysOfWeek.includes(tomorrow)) {
          throw new Error(`Invalid day: ${tomorrow}`);
        }

        const response = await fetch(
          `http://localhost:8000/api/avg/${tomorrow.toLowerCase()}`
        );
        if (!response.ok) {
          throw new Error(`Error fetching data for ${tomorrow}`);
        }

        const data = await response.json();

        // Find the top 3 least and most busy times for tomorrow
        const sortedData = [...data].sort(
          (a, b) => a.avg_numOfStudents - b.avg_numOfStudents
        );

        const leastBusy = sortedData.slice(0, 3);
        const mostBusy = sortedData.slice(-3).reverse();

        setBusyTimes({ leastBusy, mostBusy });
      } catch (error) {
        console.error('Error fetching data:', error.message);
      }
    };

    fetchData();
  }, []);

  return (
    <div className='busy-tomorrow'>
      <h1>Tomorrow's Busy Times</h1>
      <div className='busy-times-container'>
        {busyTimes.leastBusy.length > 0 && busyTimes.mostBusy.length > 0 ? (
          <>
            <div className='busy-times-list'>
              <h2>Least Busy Times:</h2>
              <ul>
                {busyTimes.leastBusy.map((time) => (
                  <li
                    key={time.hour}
                  >{`${time.hour}:00 - ${time.avg_numOfStudents} students`}</li>
                ))}
              </ul>
            </div>
            <div className='busy-times-list'>
              <h2>Most Busy Times:</h2>
              <ul>
                {busyTimes.mostBusy.map((time) => (
                  <li
                    key={time.hour}
                  >{`${time.hour}:00 - ${time.avg_numOfStudents} students`}</li>
                ))}
              </ul>
            </div>
          </>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
};

export default BusyTimesTomorrow;
