import React from 'react';
import "./SingleCard.css";
import back2 from "../Assets/back2.png";
import a from "../Assets/a.mp3"; 

export default function SingleCard({ card, handleChoice, disabled, flipped }) {

  const pla = () => {
    new Audio(a).play()
    setTimeout(new Audio(a).pause(),100)
  }

  const clickHandle = () => {
      if (!disabled){
        pla()
        handleChoice(card)
     }
  }

  return (
    <div className='card'>
        <div className={flipped ? "flipped" : " " }>
            <img className='front' src={card.card} alt="Front_Image" />  
            <img onClick={clickHandle} className='back' src={back2} alt='Back_Image'/> 
        </div>
    </div>
  )
}
