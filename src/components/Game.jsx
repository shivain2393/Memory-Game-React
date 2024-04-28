import React, { useState, useEffect } from 'react';
import shuffle from 'lodash/shuffle';
import MicrosoftIcon from '../assets/microsoft.svg';
import GoogleIcon from '../assets/google.svg';
import ReactIcon from '../assets/react.svg';
import AndroidIcon from '../assets/android.svg';
import HtmlIcon from '../assets/html.svg';
import CppIcon from '../assets/cpp.svg';
import AppleIcon from '../assets/apple.svg';
import GithubIcon from '../assets/github.svg';

const icons = [MicrosoftIcon, GoogleIcon, ReactIcon, AndroidIcon, HtmlIcon, CppIcon, AppleIcon, GithubIcon];

const Game = ({prop}) => {
  const [countdown, setCountdown] = useState(30);
  const [gridIcons, setGridIcons] = useState([]);
  const [prevIcon, setPrevIcon] = useState(-1);
  const [score, setScore] = useState(0);
  const [isFlipping, setIsFlipping] = useState(false);
  const [newHighScore, setNewHighScore] = useState(false);
  const [gameKey, setGameKey] = useState(0);
  const [highScore, setHighScore] = useState(parseInt(prop));
  const [isWin, setIsWin] = useState(false);
  const [showMsg, setShowMsg] = useState(false);
  const [disableButtons, setDisableButtons] = useState(false);
  const [isAllFlipped, setIsAllFlipped] = useState(false);
  

  const shuffleIcons = () => {
    const shuffledIcons = shuffle([...icons, ...icons]);
    setGridIcons(shuffledIcons.map(icon => ({ icon, flipped: false })));
  }

  const flipAllTilesBack = () => {
    const newGridIcons = gridIcons.map(tile => ({ ...tile, flipped: false }));
    setGridIcons(newGridIcons);
  }

  const handleClick = (index) => {
    if (isFlipping || gridIcons[index].flipped) {
      return;
    }

    setIsFlipping(true);

    const newGridIcons = [...gridIcons];
    newGridIcons[index].flipped = true;
    setGridIcons(newGridIcons);

    if (prevIcon === -1) {
      setPrevIcon(index);
      setIsFlipping(false);
    } else {
      if (gridIcons[prevIcon].icon === gridIcons[index].icon) {
        setPrevIcon(-1);
        setScore(score + 1);
        setIsFlipping(false);

      } else {
        setTimeout(() => {
          const resetGridIcons = [...gridIcons];
          resetGridIcons[prevIcon].flipped = false;
          resetGridIcons[index].flipped = false;
          setGridIcons(resetGridIcons);
          setPrevIcon(-1);
          setIsFlipping(false);
        }, 800);
      }
    }
    const allTilesFlipped = newGridIcons.every(icon => icon.flipped);
    if(allTilesFlipped){
      setIsAllFlipped(true);
    }
  }
 
  useEffect(() => {
      if (isAllFlipped) {
        setIsWin(true);
        setDisableButtons(true);
        if (highScore < score) {
          setNewHighScore(true);
          localStorage.setItem("high-score", score);
        }
      }

    if(countdown === 0){
      setDisableButtons(true);
      if(highScore < score){
        setNewHighScore(true);
        localStorage.setItem("high-score", score);
      }
      if(isWin === false){
        setShowMsg(true);
      }
    }
  },[countdown])


  useEffect(() => {
    shuffleIcons();
    let intervalId;
    if(isWin === false){
      intervalId = setInterval(() => {
        setCountdown(prevCountdown => {
          if (prevCountdown === 0) {
            clearInterval(intervalId);
            return prevCountdown;
          }
          return prevCountdown - 1;
        });
      }, 1000);
    }
    return () => {
      clearInterval(intervalId);
    }
  },[gameKey]);

  const resetGame = () => {
    flipAllTilesBack();
    setIsAllFlipped(false);
    setDisableButtons(false);
    setIsWin(false);
    setNewHighScore(false);
    setCountdown(30);
    setScore(0);
    setPrevIcon(-1); 
    setShowMsg(false);
    setTimeout(() => {
      shuffleIcons(); 
    }, 1000);
    setGameKey(prevKey => prevKey + 1);
  }

  return (
    <>
      <div>Your Score : {score}</div>
      {!isWin && <div>Time Left : {countdown}</div>}
      <div className='game-container'>
        {gridIcons.map(({ icon, flipped }, index) => (
          <button onClick={() => handleClick(index)} className={`btn ${flipped ? 'flipped' : ''}`} key={index} disabled={disableButtons}>
            <img src={icon} width={50} alt="" />
          </button>
        ))}
      </div>
      {showMsg && !isWin && <div>No Time Left! You lose!</div>}
      {isWin && <div>Congratulations! You won!</div>}
      {newHighScore && <div>Congratulations! A new High Score has been set</div>}
      <button onClick={() => {resetGame()}} className='play-again-btn'>Play Again</button>
    </>
  )
}

export default Game;
