import React from 'react'
import "./Contact.scss"
import { useTranslation } from 'react-i18next'

export default function Contact() {
  const [t] = useTranslation("global")

  return (
    <div id="contact" className="contact-bg">
      <h1>{t("contact.title")}</h1>
      <div className="contact-container">
        <h2>{t("contact.subtitle1")}</h2>
        <a href="https://www.linkedin.com/in/paula-kunning/">
          <img
            src="/src/components/assets/linkedin-footer.png"
            width="70px"
            alt="linkedin icon"
          />
        </a>
        <a href="https://github.com/paulakunning">
          <img
            src="/src/components/assets/github-footer.png"
            width="70px"
            alt="github icon"
          />
        </a>
        <a href="https://twitter.com/pau_dev_">
          <img
            src="/src/components/assets/twitter-footer.png"
            width="70px"
            alt="twitter icon"
          />
        </a>
      </div>
      <div className="contact-container">
        <img src="/src/components/assets/gmail.png" width="70px" alt="email icon" />
        <h2>
          {t("contact.subtitle2")}{" "}
          <a href="mailto:paulakunning@gmail.com"> email</a>!
        </h2>
      </div>

      <div className="footer">
        <p>Made with &#x1F496; by Paula Kunning </p>
      </div>
    </div>
  );
}