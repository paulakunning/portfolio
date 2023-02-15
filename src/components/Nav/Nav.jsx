import React from 'react'
import "../Nav/Nav.scss"
import { useTranslation } from 'react-i18next'

export default function Nav() {
  const [t, i18n] = useTranslation("global")
  
  return (
    <div>
      <nav className="burger-menu">
        <div className="menu-toggle">
          <input className="checkbox" type="checkbox" />
          <span className="line"></span>
          <span className="line"></span>
          <span className="line"></span>
          <div className="menu-list">
            <a className="list-text" href="#home">
              <img
                className="icon"
                src="/src/assets/home.png"
                alt="Home icon"
              />
              {t("nav.link1")}
            </a>
            <a className="list-text" href="#about">
              <img
                className="icon"
                src="/src/assets/girl.png"
                alt="About icon"
              />
              {t("nav.link2")}
            </a>
            <a className="list-text" href="#projects">
              <img
                className="icon"
                src="/src/assets/coding.png"
                alt="Projects icon"
              />
              {t("nav.link3")}
            </a>
            <a className="list-text" href="#contact">
              <img
                className="icon"
                src="/src/assets/phone-book.png"
                alt="Contact icon"
              />
              {t("nav.link4")}
            </a>
            <div className="translation-container">
              <div className="translation-btn">
                <button onClick={() => i18n.changeLanguage("es")}> ES </button>
              </div>
              <div className="translation-btn">
                <button onClick={() => i18n.changeLanguage("en")}> EN </button>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}