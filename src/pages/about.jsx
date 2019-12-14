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
        <img src={papan01} className="user-avatar" alt="papan01" />
        <section className="about-context">
          <div>
            <h3>關於我</h3>
            <p className="time">2019-12-11</p>
            <p>
              大學念數學，碩士唸資工，自學程式，目前主要學習的方向為JavaScript與ReactJS，因為工作的關係
              ，也有架設過整個後端資料庫與編寫API的經驗。 一直以來都想自己做個blog來記錄與分享自己的學習路程，
              而這個blog也成為我第一個獨立完成的網頁，這個blog使用GatsbyJS所寫，若有興趣可以看看
              <a href="https://github.com/papan01/gatsby-starter-papan01">gatsby-starter-papan01</a>
              ，若有任何問題歡迎使用下方連結與我聯繫。
            </p>
          </div>
        </section>
      </article>
    </Layout>
  );
};

export default About;
