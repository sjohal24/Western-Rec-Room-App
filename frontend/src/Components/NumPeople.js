import React, { useEffect, useState } from 'react';
import './NumPeople.css';

export default function NumPeople() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const checkCapacity = (numOfStudents) => {
    const capacity = document.querySelector('.avg-people');
    if (capacity) {
      capacity.textContent =
        numOfStudents <= 40
          ? 'Empty'
          : numOfStudents <= 60
          ? 'Light'
          : numOfStudents <= 100
          ? 'Moderate'
          : numOfStudents <= 120
          ? 'Busy'
          : 'Very Busy';
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          'http://localhost:8000/api/avg/all/recent'
        );

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const result = await response.json();
        setData(result);

        // Call the capacity check function with the latest numOfStudents
        checkCapacity(result[0].numOfStudents);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchData();
  }, [data]);

  // Render based on the data
  return (
    <div className='outer-box'>
      {data ? (
        <>
          <h1 className='num-people-header'>Current Capacity</h1>
          <div className='num-people'>{data[0].numOfStudents}</div>
          <h2 className='avg-people-header'>Capacity Level</h2>
          <div className='avg-people'>Unknown</div>
          <h2 className='last-update-header'>Last Updated</h2>
          <div className='last-update'>{data[0].time} EST</div>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
