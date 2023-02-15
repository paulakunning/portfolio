import About from "./components/About/About"
import Contact from "./components/Contact/Contact"
import Home from "./components/Home/Home"
import Nav from "./components/Nav/Nav"
import Projects from "./components/Projects/Projects"
import "./styles/_root.scss"

export default function App() {

  return (
    <div>
      <Nav/>
      <Home />
      <About />
      <Projects />
      <Contact />

    </div>
  )
}