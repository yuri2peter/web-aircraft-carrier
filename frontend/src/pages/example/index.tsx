import React from 'react';
import { Link } from 'react-router-dom';

const ExamplePage = () => {
  return (
    <div>
      <h1>Home</h1>
      <p>
        <ul>
          <li>
            <Link to="/">home</Link>
          </li>
        </ul>
      </p>
    </div>
  );
};

export default ExamplePage;
