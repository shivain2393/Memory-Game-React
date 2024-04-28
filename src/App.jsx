import { useState } from 'react'
import Game from './components/Game'
import Footer from './components/Footer'
import GithubButton from './components/GithubButton';
import './App.css'

function App() {
  const [start, setStart] = useState(false);
  const highScore = localStorage.getItem("high-score") || 0;

  return (
    <>
    <GithubButton/>
    <div className="container">
      <h1>Memory Game</h1>
      {!start &&
      <> 
      <div>Your Best Score : {highScore}</div>
      <button className='start-btn' onClick={() => setStart(true)}>Start</button>
      </>
      }
      {start && <Game prop={highScore}/>}
    </div>
    <Footer/>
    </>
  )
}

export default App
