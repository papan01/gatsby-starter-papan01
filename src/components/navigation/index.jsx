import React from 'react';
import PropTypes from 'prop-types';
import Header from '../header';
import Footer from '../footer';
import ScrollToTop from '../scrollToTop';

const Navigation = ({ children }) => {
  return (
    <div>
      <Header />
      {children}
      <ScrollToTop />
      <Footer />
    </div>
  );
};

Navigation.propTypes = {
  children: PropTypes.node.isRequired,
};

export default React.memo(Navigation);
