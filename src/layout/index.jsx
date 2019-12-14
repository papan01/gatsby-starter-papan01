/* eslint-disable no-underscore-dangle */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Navigation from '../components/navigation';
import ThemeContext from '../context';
import './style/style.scss';

const Layout = ({ children }) => {
  let websiteTheme;
  if (typeof window !== `undefined`) {
    websiteTheme = window.__theme;
  }
  const [theme, setTheme] = useState(websiteTheme);

  useEffect(() => {
    if (typeof window !== `undefined`) {
      setTheme(window.__theme);
      window.__onThemeChange = () => {
        setTheme(window.__theme);
      };
    }
  }, [theme]);
  return (
    <ThemeContext.Provider value={{ theme }}>
      <Navigation>
        <main className="page-wrap">{children}</main>
      </Navigation>
    </ThemeContext.Provider>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
