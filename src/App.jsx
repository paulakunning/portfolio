import About from "./components/About"
import Contact from "./components/Contact"
import Home from "./components/Home"
import Nav from "./components/Nav"
import Projects from "./components/Projects"

export default function App() {

  return (
    <div>
      <Nav/>
      <Home/>
      <About/>
      <Projects/>
      <Contact/>
    </div>
  )
}