/* eslint-disable no-underscore-dangle */
import React, { useState, useContext } from 'react';
import { Link } from 'gatsby';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Helmet from 'react-helmet';
import ThemeContext from '../../context';
import Logo from '../../../static/favicons/logo.png';
import Dark from '../../../static/material/moon.png';
import Light from '../../../static/material/sun.png';
import config from '../../../config/siteConfig';
import './style.scss';

const NavList = ({ navStyle, closeMenu }) => {
  const overflowHidden = navStyle.includes('open');
  return (
    <nav className={navStyle}>
      {overflowHidden ? (
        <Helmet>
          <style>{'body { overflow : hidden; }'}</style>
        </Helmet>
      ) : null}
      <ul className="nav-list">
        {config.navbarLinks.map(item => (
          <li key={item.label}>
            <Link to={item.url} activeClassName="active" onClick={() => closeMenu(false)}>
              <i className={`${item.iconClassName} fa-2x`} />
              <span>{item.label}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

NavList.propTypes = {
  navStyle: PropTypes.string.isRequired,
  closeMenu: PropTypes.func.isRequired,
};

const ThemeToggle = () => {
  const themeContext = useContext(ThemeContext);
  const themeToggle = () => {
    window.__setPreferredTheme(themeContext.theme === 'dark' ? 'light' : 'dark');
  };

  const toggleStyle = classNames({
    'theme-toggle': true,
    'theme-toggle--checked': themeContext.theme === 'dark',
  });
  return (
    <div
      role="checkbox"
      aria-checked={themeContext.theme === 'dark'}
      aria-label="theme-toggle"
      tabIndex="-1"
      className={toggleStyle}
      onClick={themeToggle}
      onKeyPress={themeToggle}
    >
      <div className="theme-toggle-track">
        <div className="theme-toggle-track-dark">
          <img src={Dark} alt="theme dark" />
        </div>
        <div className="theme-toggle-track-light">
          <img src={Light} alt="theme light" />
        </div>
      </div>
      <div className="theme-toggle-thumb" />
      <input
        className="theme-toggle-screenreader-only"
        type="checkbox"
        aria-label="Switch between Dark and Light mdoe"
      />
    </div>
  );
};

const Header = () => {
  const [isOpenMenu, toggleOpenMenu] = useState(false);

  const navClass = classNames({
    'top-nav-bar': true,
    open: isOpenMenu,
  });
  const mobileIcon = classNames({
    fa: true,
    'fa-bars': !isOpenMenu,
    'fa-times': isOpenMenu,
    'fa-3x': true,
  });
  return (
    <header className="top-bar">
      <div className="container">
        <div className="logo">
          <Link to="/">
            <img src={Logo} alt={config.siteTitle} loading="lazy" />
          </Link>
        </div>
        <NavList navStyle={navClass} closeMenu={toggleOpenMenu} />
        <ThemeToggle />
        <div className="mobile-actions">
          <button
            type="button"
            className="menu-button"
            aria-label="mobile-menu"
            onClick={() => toggleOpenMenu(!isOpenMenu)}
          >
            <i className={mobileIcon} />
          </button>
        </div>
      </div>
    </header>
  );
};

export default React.memo(Header);
