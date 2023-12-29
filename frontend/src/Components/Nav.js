import React from 'react';
import './Nav.css';

export default function Nav() {
  return (
    <div>
      <ul className='nav-links'>
        <li>
          <a href='#'>Home</a>
        </li>
        <li className='center'>
          <a href='#'>Closing</a>
        </li>
        <li className='upward'>
          <a href='#'>Hourly</a>
        </li>
        <li className='forward'>
          <a href='#'>Daily</a>
        </li>
      </ul>
    </div>
  );
}
