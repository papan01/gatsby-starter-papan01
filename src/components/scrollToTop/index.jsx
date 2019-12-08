import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import './style.scss';

const ScrollToTop = () => {
  const [scroller, setScroller] = useState(0);

  const clickToTop = () => {
    if (typeof window !== 'undefined') {
      window.scroll({ top: 0, left: 0, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    if (typeof window !== 'undefined' && typeof document !== 'undefined') {
      const handleScroll = () => {
        setScroller(document.documentElement.scrollTop);
      };
      window.addEventListener('scroll', handleScroll);
      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }
    return () => {};
  }, []);

  const toTopClass = classNames({
    'to-top': true,
    'to-top-active': scroller > 400,
  });

  return (
    <div
      role="button"
      tabIndex="-1"
      className={toTopClass}
      onClick={clickToTop}
      onKeyPress={clickToTop}
      aria-label="scroll to top"
    >
      <i className="fas fa-arrow-up" />
    </div>
  );
};

export default ScrollToTop;
