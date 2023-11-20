import React from 'react';
import { Outlet } from 'react-router-dom';
import 'src/services/socket';

const AppGuard: React.FC = () => {
  return <Outlet />;
};

export default AppGuard;
