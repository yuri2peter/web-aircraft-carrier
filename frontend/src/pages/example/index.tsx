import React from 'react';
import { Link } from 'react-router-dom';
import { useAppSelector } from 'src/store/hooks';
import {
  doubleValueAsync,
  selectExampleSlice,
} from 'src/store/reducers/example';

const ExamplePage = () => {
  const { value, loading } = useAppSelector(selectExampleSlice);
  return (
    <div>
      <h1>Example</h1>
      <p>
        <ul>
          <li>
            <Link to="/">home</Link>
          </li>
        </ul>
      </p>
      <p>Value: {value}</p>
      <p>
        <button
          disabled={loading}
          onClick={() => {
            doubleValueAsync();
          }}
        >
          Increment Async
        </button>
      </p>
    </div>
  );
};

export default ExamplePage;
