import React from 'react'
import "./Projects.scss"
import { useTranslation } from 'react-i18next'


export default function Projects() {
  const [t] = useTranslation("global");

  

  return (
    <div id="projects" className="projects-bg">
      <h1>{t("projects.title")}</h1>


      <swiper-container navigation="true" >

      <swiper-slide>
        <div className="project-container">
          <h2>{t("projects.project6-title")}</h2>
          <div className="project-info">
            <img src="https://i.postimg.cc/tJKQHKCm/olatrek.png" alt="olatrek" />
            <div className="project-btns">
              <button>
                <a href={t("projects.project6-deploy")} target="blank">
                  LIVE
                </a>
              </button>
              <button>
                <a href={t("projects.project6-repository")} target="blank">
                  FIGMA
                </a>
              </button>
            </div>
            <h3>{t("projects.project6-description")}</h3>
            <h4>{t("projects.project6-tecnologies")}</h4>
          </div>
        </div>
      </swiper-slide>

      <swiper-slide>
        <div className="project-container">
          <h2>{t("projects.project7-title")}</h2>
          <div className="project-info">
            <img src="https://i.postimg.cc/kgd3YPH2/ags-inc.png" alt="ags-inc"/>
            <div className="project-btns">
              <button>
                <a href={t("projects.project7-deploy")} target="blank">
                  LIVE
                </a>
              </button>
              <button>
                <a href={t("projects.project7-repository")} target="blank">
                  DESIGN
                </a>
              </button>
            </div>
            <h3>{t("projects.project7-description")}</h3>
            <h4>{t("projects.project7-tecnologies")}</h4>
          </div>
        </div>
      </swiper-slide>

      <swiper-slide>
        <div className="project-container">
          <h2>{t("projects.project8-title")}</h2>
          <div className="project-info">
            <img src="https://i.postimg.cc/cLMqV5qX/triumph-modular.png" alt="triumph-modular"/>
            <div className="project-btns">
              <button>
                <a href={t("projects.project8-deploy")} target="blank">
                  LIVE
                </a>
              </button>
              <button>
                <a href={t("projects.project8-repository")} target="blank">
                  DESIGN
                </a>
              </button>
            </div>
            <h3>{t("projects.project8-description")}</h3>
            <h4>{t("projects.project8-tecnologies")}</h4>
          </div>
        </div>
      </swiper-slide>

      <swiper-slide>
        <div className="project-container">
          <h2>{t("projects.project9-title")}</h2>
          <div className="project-info">
            <img src="https://i.postimg.cc/QM8Lskhs/friosur.png" alt="friosur"/>
            <div className="project-btns">
              <button>
                <a href={t("projects.project9-deploy")} target="blank">
                  LIVE
                </a>
              </button>
              <button>
                <a href={t("projects.project9-repository")} target="blank">
                  DESIGN
                </a>
              </button>
            </div>
            <h3>{t("projects.project9-description")}</h3>
            <h4>{t("projects.project9-tecnologies")}</h4>
          </div>
        </div>
      </swiper-slide>

      <swiper-slide>
        <div className="project-container">
          <h2>{t("projects.project10-title")}</h2>
          <div className="project-info">
            <img src="https://i.postimg.cc/PrDnM5SG/aeropuerto-el-loa.png" alt="aeropuerto el loa"/>
            <div className="project-btns">
              <button>
                <a href={t("projects.project10-deploy")} target="blank">
                  LIVE
                </a>
              </button>
              <button>
                <a href={t("projects.project10-repository")} target="blank">
                  DESIGN
                </a>
              </button>
            </div>
            <h3>{t("projects.project10-description")}</h3>
            <h4>{t("projects.project10-tecnologies")}</h4>
          </div>
        </div>
      </swiper-slide>



        <swiper-slide>
          <div className="project-container">
            <h2>{t("projects.project1-title")}</h2>
            <div className="project-info">
              <img src="https://i.postimg.cc/vZcwDTRR/acmetronics-shop.png" alt="acmetronics project" />
              <div className="project-btns">
                <button>
                  <a href={t("projects.project1-deploy")} target="blank">
                    LIVE
                  </a>
                </button>
                <button>
                  <a href={t("projects.project1-repository")} target="blank">
                    CODE
                  </a>
                </button>
              </div>
              <h3>{t("projects.project1-description")}</h3>
              <h4>{t("projects.project1-tecnologies")}</h4>
            </div>
          </div>
        </swiper-slide>

        <swiper-slide>
          <div className="project-container">
              <h2>{t("projects.project2-title")}</h2>
              <div className="project-info">
                <img src="https://i.postimg.cc/L4NWfS3m/pi-2.png" alt="countries app" />
                <div className="project-btns">
                  <button>
                    <a href={t("projects.project2-deploy")} target="blank">                   
                      LIVE 
                    </a>
                  </button>
                  <button>
                    <a href={t("projects.project2-repository")} target="blank">                  
                      CODE 
                    </a>
                  </button>
                </div>
                <h3>{t("projects.project2-description")}</h3>
                <h4>{t("projects.project2-tecnologies")}</h4>
              </div>
            </div>
        </swiper-slide>
        <swiper-slide>
          <div className="project-container">
            <h2>{t("projects.project3-title")}</h2>
            <div className="project-info">
              <img src="https://i.postimg.cc/prG1tQLm/Weather-App.png" alt="weather app" />
              <div className="project-btns">
                <button>
                  <a href={t("projects.project3-deploy")} target="blank">                   
                    LIVE 
                  </a>
                </button>
                <button>
                  <a href={t("projects.project3-repository")} target="blank">                   
                    CODE 
                  </a>
                </button>
              </div>
              <h3>{t("projects.project3-description")}</h3>
              <h4>{t("projects.project3-tecnologies")}</h4>
            </div>
          </div>

        </swiper-slide>

        <swiper-slide>
          <div className="project-container">
            <h2>{t("projects.project4-title")}</h2>
            <div className="project-info">
              <img src="https://i.postimg.cc/MTwL0KLp/id-project.png" alt="imagine dragons landing page" />
              <div className="project-btns">
                <button>
                  <a href={t("projects.project4-deploy")} target="blank">                   
                    LIVE 
                  </a>
                </button>
                <button>
                  <a href={t("projects.project4-repository")} target="blank">                   
                    CODE 
                  </a>
                </button>
              </div>
              <h3>{t("projects.project4-description")}</h3>
              <h4>{t("projects.project4-tecnologies")}</h4>
            </div>
          </div>
        </swiper-slide>

        <swiper-slide>
          <div className="project-container">
            <h2>{t("projects.project5-title")}</h2>
            <div className="project-info">
              <img src="https://i.postimg.cc/N0mVrrpn/github-profile.png" alt="github profile" />
              <div className="project-btns">               
                <button>                 
                  <a href={t("projects.project5-deploy")} target="blank">                   
                    Github 
                  </a>
                </button> 
              </div>
              <h3 id="check">{t("projects.project5-description")}</h3>
              <h4></h4>
            </div>
          </div>
        </swiper-slide>

      </swiper-container>

    </div>
  );
}