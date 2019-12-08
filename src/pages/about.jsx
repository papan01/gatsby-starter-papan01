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
            大學念數學，碩士唸資工，自學程式，目前學習前端約半年，一直以來都想自己做個blog來記錄與分享自己的學習路程，
            而這個blog也成為我第一個獨立完成的網頁，想聯絡我最底下有我的聯絡方式。
          </p>
        </section>
      </article>
    </Layout>
  );
};

export default About;
