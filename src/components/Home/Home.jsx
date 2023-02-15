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
            <img src="https://drive.google.com/file/d/1Twda6VYCmhyrgU9YiQLAdqAMg2jJ-h6a/view?usp=share_link" alt="linkedin icon" width="70px" />
          </a>
          <a href="https://github.com/paulakunning" target="blank">
            <img src="/src/assets/github.png" alt="github icon" width="70px" />
          </a>
          <a href="https://github.com/paulakunning" target="blank">
            <img src="/src/assets/cv.png" alt="link to my resume" width="60px" />
          </a>
        </div>
      </div>
      <div className="draw">
        <img src="/src/assets/pau-draw.png" alt="" />
      </div>
    </div>
  );
}