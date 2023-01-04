import React, { lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import AppGuard from 'src/components/AppGuard';
import Loadable from 'src/components/Loadable';

const HomePage = Loadable(lazy(() => import('src/pages/home')));
const ExamplePage = Loadable(lazy(() => import('src/pages/example')));

function MainRoute() {
  return (
    <Routes>
      <Route path="/" element={<AppGuard />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/example" element={<ExamplePage />} />
      </Route>
    </Routes>
  );
}

export default MainRoute;
