import React from 'react';
import { Outlet } from 'react-router-dom';

const AppGuard: React.FC = () => {
  return <Outlet />;
};

export default AppGuard;
