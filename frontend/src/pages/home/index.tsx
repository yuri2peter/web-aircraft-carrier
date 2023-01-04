import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div>
      <h1>Home</h1>
      <ul>
        <li>
          <Link to="/example">example</Link>
        </li>
      </ul>
    </div>
  );
};

export default HomePage;
