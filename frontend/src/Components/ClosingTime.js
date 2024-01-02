import React, { useState, useEffect } from 'react';
import './ClosingTime.css';

let before = false;

const calculateTimeUntilNextOpening = () => {
  const now = new Date();
  const dayOfWeek = now.getDay(); // 0 is Sunday, 1 is Monday, and so on

  // Define the closing schedule based on the day of the week
  const closingSchedule = {
    0: { open: 9 * 3600, close: 23.5 * 3600 }, // Sunday
    1: { open: 6.5 * 3600, close: 23.5 * 3600 }, // Monday
    2: { open: 6.5 * 3600, close: 23.5 * 3600 }, // Tuesday
    3: { open: 6.5 * 3600, close: 23.5 * 3600 }, // Wednesday
    4: { open: 6.5 * 3600, close: 23.5 * 3600 }, // Thursday
    5: { open: 6.5 * 3600, close: 20 * 3600 }, // Friday
    6: { open: 9 * 3600, close: 20 * 3600 }, // Saturday
  };

  const schedule = closingSchedule[dayOfWeek];

  if (!schedule) {
    // Default to closed if the day is not found in the schedule
    return 0;
  }

  const currentTimeInSeconds =
    now.getHours() * 3600 + now.getMinutes() * 60 + now.getSeconds();

  if (currentTimeInSeconds < schedule.open) {
    // If the current time is before opening, return time until opening
    before = true;
    return schedule.open - currentTimeInSeconds;
  }

  // If the current time is after opening, return time until closing
  before = false;
  return schedule.close - currentTimeInSeconds;
};

const formatCountdown = (seconds) => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;

  const pad = (value) => (value < 10 ? `0${value}` : value);

  return `${pad(hours)}:${pad(minutes)}:${pad(remainingSeconds)}`;
};

const ClosingTime = () => {
  const [timeUntilNextOpening, setTimeUntilNextOpening] = useState(
    calculateTimeUntilNextOpening
  );

  useEffect(() => {
    // Set up an interval to update the countdown every second
    const intervalId = setInterval(() => {
      setTimeUntilNextOpening(calculateTimeUntilNextOpening);
    }, 1000);

    // Clean up the interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className='closing-time-outer'>
      <div className='closing-time-inner'>
        {timeUntilNextOpening > 0 ? (
          <>
            <span className='closing-label'>
              {before ? 'Opening in: ' : 'Closing in: '}
            </span>
            {formatCountdown(timeUntilNextOpening)}
          </>
        ) : (
          'We are currently closed'
        )}
      </div>
    </div>
  );
};

export default ClosingTime;
