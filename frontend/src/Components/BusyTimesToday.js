import React, { useEffect, useState } from 'react';
import './BusyTimesToday.css'; // Make sure to adjust the path based on your project structure

const BusyTimesToday = () => {
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
        const today = new Date().toLocaleDateString('en-US', {
          weekday: 'long',
        });

        if (!daysOfWeek.includes(today)) {
          throw new Error(`Invalid day: ${today}`);
        }

        const response = await fetch(
          `http://localhost:8000/api/avg/${today.toLowerCase()}`
        );
        if (!response.ok) {
          throw new Error(`Error fetching data for ${today}`);
        }

        const data = await response.json();

        // Find the top 3 least and most busy times for today
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
    <div className='busy'>
      <h1>Today's Busy Times</h1>
      <div className='busy-times-container'>
        {busyTimes.leastBusy.length > 0 && busyTimes.mostBusy.length > 0 ? (
          <>
            <div className='busy-times-list'>
              <h2>Least Busy Hours:</h2>
              <ul>
                {busyTimes.leastBusy.map((time) => (
                  <li
                    key={time.hour}
                  >{`${time.hour}:00 - ${time.avg_numOfStudents} students`}</li>
                ))}
              </ul>
            </div>
            <div className='busy-times-list'>
              <h2>Most Busy Hours:</h2>
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

export default BusyTimesToday;
