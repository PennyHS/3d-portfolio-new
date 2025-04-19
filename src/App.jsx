import { BrowserRouter } from "react-router-dom";
import { About, Contact, Experience, Hero, Navbar, Tech, Projects, Footer } from "./components";
import StarBackground from "./components/canvas/StarBackground";
import { SpeedInsights } from '@vercel/speed-insights/next';

const App = () => {
  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen">
        <StarBackground />
        <div className='relative z-1 bg-transparent flex-grow'>
          <div className='bg-transparent'>
            <Navbar />
            <Hero />
          </div>
          <About />
          <Experience />
          <Tech />
          <Projects />
          <Contact />
          <Footer />
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;