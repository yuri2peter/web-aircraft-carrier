import React from 'react';
import { Link } from 'react-router-dom';

const ExamplePage = () => {
  return (
    <div>
      <h1>Example</h1>
      <ul>
        <li>
          <Link to="/">home</Link>
        </li>
      </ul>
    </div>
  );
};

export default ExamplePage;
