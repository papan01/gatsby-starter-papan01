import React, { useState, useContext, useEffect } from 'react';
import Disqus from 'disqus-react';
import PropTypes from 'prop-types';
import ThemeContext from '../../context';
import config from '../../../config/siteConfig';

const useForceUpdateDisqus = theme => {
  const [isReady, setReady] = useState(false);
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setTimeout(() => {
        setReady(theme);
      }, 200);
    }
  }, [isReady, theme]);
};

const DisqusIndex = ({ slug, title }) => {
  const { disqusShortname } = config;
  const disqusConfig = {
    url: `${config.siteUrl + config.pathPrefix + slug}`,
    identifier: title,
    title,
  };
  const themeContext = useContext(ThemeContext);
  useForceUpdateDisqus(themeContext.theme); // Just for the disqus re-render to change the theme, meaning of no other.
  return <Disqus.DiscussionEmbed theme={themeContext.theme} shortname={disqusShortname} config={disqusConfig} />;
};
DisqusIndex.propTypes = {
  slug: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

export default DisqusIndex;
