import React from 'react';
import PropTypes from 'prop-types';

const ThemeContext = React.createContext({ theme: '' });

ThemeContext.Provider.propTypes = {
  theme: PropTypes.string,
};

export default ThemeContext;
