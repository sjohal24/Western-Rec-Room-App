import React, { useState, useEffect } from 'react';
import './TimeChart.css';

export default function TimeChart() {
  const [scheduleData, setScheduleData] = useState({});

  const getCellStyle = (value) => {
    if (value > 100) {
      return { color: 'red' };
    } else if (value < 60) {
      return { color: 'green' };
    } else {
      return {};
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const sundayData = await fetch(
          'http://localhost:8000/api/avg/sunday'
        ).then((res) => res.json());
        const mondayData = await fetch(
          'http://localhost:8000/api/avg/monday'
        ).then((res) => res.json());
        const tuesdayData = await fetch(
          'http://localhost:8000/api/avg/tuesday'
        ).then((res) => res.json());
        const wednesdayData = await fetch(
          'http://localhost:8000/api/avg/wednesday'
        ).then((res) => res.json());
        const thursdayData = await fetch(
          'http://localhost:8000/api/avg/thursday'
        ).then((res) => res.json());
        const fridayData = await fetch(
          'http://localhost:8000/api/avg/friday'
        ).then((res) => res.json());
        const saturdayData = await fetch(
          'http://localhost:8000/api/avg/saturday'
        ).then((res) => res.json());

        setScheduleData({
          S: sundayData,
          M: mondayData,
          T: tuesdayData,
          W: wednesdayData,
          Th: thursdayData,
          F: fridayData,
          Sa: saturdayData,
        });
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  // Generate the table cells
  const generateTableCells = () => {
    const rows = [];

    for (let hour = 6; hour <= 23; hour++) {
      const cells = [<td key={`hour-${hour}`}>{`${hour}:00`}</td>];

      for (const day in scheduleData) {
        const data = scheduleData[day];
        const hourData = data.find((entry) => entry.hour === hour);
        const avgStudents = hourData ? hourData.avg_numOfStudents : null;

        cells.push(
          <td key={`${day}-${hour}`} style={getCellStyle(avgStudents)}>
            {avgStudents}
          </td>
        );
      }

      rows.push(<tr key={`row-${hour}`}>{cells}</tr>);
    }

    return rows;
  };

  return (
    <div className='outer-box'>
      <h1>Weekly Schedule</h1>
      <table>
        <thead>
          <tr>
            <th>Timeslot</th>
            <th>S</th>
            <th>M</th>
            <th>T</th>
            <th>W</th>
            <th>T</th>
            <th>F</th>
            <th>S</th>
          </tr>
        </thead>
        <tbody>{generateTableCells()}</tbody>
      </table>
    </div>
  );
}
