import React from 'react'
import { useTranslation } from 'react-i18next'
import "./Home.scss"

export default function Home() {
    const [t] = useTranslation("global")

  return (
    <div id="home" className="home-bg">
      <div className="home-text">
        <h1>{t("home.title")} Paula Kunning </h1>
        <h2>{t("home.subtitle")}</h2>
        <div className="icons">
          <a href="https://www.linkedin.com/in/paula-kunning/" target="blank">
            <img src="https://i.postimg.cc/X7YTDqYZ/linkedin.png" alt="linkedin icon" width="70px" />
          </a>
          <a href="https://github.com/paulakunning" target="blank">
            <img src="https://i.postimg.cc/QtgRvW77/github.png" alt="github icon" width="70px" />
          </a>
          <a href="https://github.com/paulakunning" target="blank">
            <img src="https://i.postimg.cc/sgqdWzyM/cv.png" alt="link to my resume" width="60px" />
          </a>
        </div>
      </div>
      <div className="draw">
        <img src="/src/assets/pau-draw.png" alt="" />
      </div>
    </div>
  );
}