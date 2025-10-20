import './App.css'
import Card from "./comp/card.jsx"
import Navbar from './comp/nav.jsx'
import Top from './comp/top.jsx'

function App() {


  return (
    <>
     <Navbar />
      <Top />
      <div
        className="mt-4 py-6 overflow-x-auto md:overflow-visible scroll-smooth"
        id="scroll-container"
      >
        <div className="flex gap-4 w-max md:w-full md:justify-center px-4 " id='pro'>
          <Card
            title="Quiz"
            description="AI Quiz generator. Groq api key required."
            image="quiz.jpg"
            site='/eretsegi'
          />
          <Card
            title="Projekt 2"
            description="Comming soon"
            image="https://placehold.co/600x400.png"
          />
          <Card
            title="Projekt 3"
            description="Comming soon"
            image="https://placehold.co/600x400.png"
          />
          <Card
            title="Projekt 4"
            description="Comming soon"
            image="https://placehold.co/600x400.png"
          />
        </div>
      </div>


    </>
  )
}

export default App
