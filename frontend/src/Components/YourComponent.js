import React, { useState, useEffect } from 'react';

const YourComponent = () => {
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
        console.log('Fetched Data:', result[0].time);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchData();
  }, []);

  return <div></div>;
};

export default YourComponent;
