import React, { useEffect } from 'react';
import Routes from '../routes/Routes';
import Navigation from './navigation/Navigation';

const Layout = () => {
  return (
    <>
      <Navigation />
      <Routes />
    </>
  );
};

export default Layout;
