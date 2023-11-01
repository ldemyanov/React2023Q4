import React from 'react';
import { Outlet } from 'react-router-dom';
import commonStyles from '../../styles/common.module.scss';

function Layout() {
  return (
    <>
      <div className={commonStyles.container}>
        <Outlet />
      </div>
    </>
  );
}

export default Layout;
