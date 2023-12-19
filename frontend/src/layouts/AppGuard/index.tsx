import { APP_NAME } from '@local/common/configs';
import React from 'react';
import { Helmet } from 'react-helmet';
import { Outlet } from 'react-router-dom';
import 'src/services/socket';

const AppGuard: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>{APP_NAME}</title>
      </Helmet>
      <Outlet />
    </>
  );
};

export default AppGuard;
