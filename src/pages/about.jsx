import React from 'react';
import Layout from '../layout';
import papan01 from '../../static/Konfest.png';
import SEO from '../components/SEO';
import './about.scss';

const About = () => {
  return (
    <Layout>
      <SEO title="About" path="/about" />
      <article className="about">
        <section className="about-head">
          <img src={papan01} className="user-avatar" alt="papan01" />
          <p>
            I am a self-taught Frontend Developer with only half a year of experience. Now I am keen on Javascript and
            React.
          </p>
        </section>
      </article>
    </Layout>
  );
};

export default About;
