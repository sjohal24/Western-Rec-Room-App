import React, { useEffect, useState } from 'react';
import './NumPeople.css';

export default function NumPeople() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

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

        // Log the fetched data
        console.log('Fetched Data:', result[0].time, result[0].numOfStudents);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchData();
  }, []);

  // Render based on the data
  return (
    <div className='outer-box'>
      {data ? (
        <>
          <div className='num-people'>{data[0].numOfStudents}</div>
          <div className='avg-people'>Empty</div>
          <div className='last-update'>{data[0].time} EST</div>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
