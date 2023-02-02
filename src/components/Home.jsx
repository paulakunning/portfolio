import React from 'react'
import { useTranslation } from 'react-i18next'

export default function Home() {
    const [t, i18n] = useTranslation("global")
  return (
    <div>
      <button onClick={()=> i18n.changeLanguage("es")}> ES </button>
      <button onClick={()=> i18n.changeLanguage("en")}> EN </button>
      <h1>{t("home.hello")} Paula Kunning </h1>

    </div>
  )
}
