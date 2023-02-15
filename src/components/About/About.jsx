import React from 'react'
import { useTranslation } from 'react-i18next'
import "./About.scss"

export default function About() {
  const [t] = useTranslation("global")
  
  return (
    <div id="about" className="about-bg">
      <div className="title-container">
        <h1>{t("about.title")}</h1>
      </div>
      <div className="aboutme-wrapper">
        <div className="aboutme-description">
          <div className="aboutme-img">
            <img
              className="profile-img"
              src="/src/assets/profile_picture.jpg"
              alt={t("about.alt")}
            />
          </div>
          <div className="aboutme-text">
            <h3>{t("about.p1")}</h3>
            <h3>{t("about.p2")}</h3>
            <h3>{t("about.p3")}</h3>
            <h3>{t("about.p4")}</h3>
            <h3>{t("about.p5")}</h3>
          </div>
        </div>

        <div className="aboutme-skills">
          <div className="skills-title">
            <h2>{t("about.skills")}</h2>
          </div>

          <div className="skills-icons">
            <div className="language">
              <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" />
              <p>HTML</p>
            </div>
            <div className="language">
              <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" />
              <p>CSS</p>
            </div>
            <div className="language">
              <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" />
              <p>Javascript</p>
            </div>

            <div className="language">
              <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" />
              <p>React</p>
            </div>
            <div className="language">
              <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redux/redux-original.svg" />
              <p>Redux</p>
            </div>

            <div className="language">
              <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sass/sass-original.svg" />
              <p>SASS</p>
            </div>

            <div className="language">
              <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg" />
              <p>Boostrap</p>
            </div>

            <div className="language">
              <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/materialui/materialui-original.svg" />
              <p>Material UI</p>
            </div>
            <div className="language">
              <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" />
              <p>Node Js</p>
            </div>

            <div className="language">
              <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg" />
              <p>Express</p>
            </div>

            <div className="language">
              <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sequelize/sequelize-original.svg" />
              <p>Sequelize</p>
            </div>

            <div className="language">
              <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" />
              <p>PostgreSQL</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}