import React from 'react';
import { Link } from 'gatsby';
import Layout from '../layout';

const NotFound = () => {
  return (
    <Layout>
      <div className="text-center">
        <h1>Not found :(</h1>
        <Link to="/">
          <i className="far fa-arrow-alt-circle-left fa-2x" />
          <span style={{ fontSize: '2rem', marginLeft: '1rem' }}>Go to home</span>
        </Link>
      </div>
    </Layout>
  );
};

export default React.memo(NotFound);
