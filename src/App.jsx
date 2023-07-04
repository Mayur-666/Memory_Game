import React, { useState, useEffect} from 'react';
import "./App.css";
import SingleCard from './Components/SingleCard';

const {cardImages} = require("./imgexp")

export default function App() {
        
    const [cards,setCards] = useState([])
    const [turns,setTurns] = useState(0)
    const [choiceOne,setChoiceOne] = useState(null)
    const [choiceTwo,setChoiceTwo] = useState(null)
    const [disabled,setDisabled] = useState(false)
    
    const mixCards = () => {
        const mixedCards = [...cardImages,...cardImages]
        .sort(() => Math.random() - 0.5)
        .map((card) => ({card, id: Math.random(), matched: false }))

        setChoiceOne(null)
        setChoiceTwo(null)
        setCards(mixedCards)
        setTurns(0)
    }

    const handleChoice = (card) => {
        choiceOne ? setChoiceTwo(card) : setChoiceOne(card)
    }

    useEffect(() => {
        if (choiceOne && choiceTwo){
            setDisabled(true)
            if (choiceOne.card === choiceTwo.card && choiceTwo.id !== choiceOne.id){
                setCards(prevCards => {
                    return prevCards.map(card => {
                        if (card.card === choiceOne.card ){
                            return {...card, matched:true}
                        }
                        else{
                            return card
                        }
                    })
                })
            }
            setTimeout(() => resetTurn(),500)
        }
    }, [choiceOne, choiceTwo])

    const resetTurn = () => {
        setChoiceOne(null)
        setChoiceTwo(null)
        setTurns(preTurn => preTurn + 1)
        setDisabled(false)
    }   
    
    useEffect(() => {
        mixCards()
    },[])

    return (
        <div className='App'>
            <h1>Memory Game</h1>
            <button onClick={mixCards}>New Game</button>

            <div className="card-grid">
                { cards.map(card => (
                    <SingleCard
                        key={card.id}
                        card={card}
                        handleChoice={handleChoice}
                        disabled={disabled}
                        flipped={ card === choiceOne || card === choiceTwo || card.matched }
                    />
                    
                ))}
            </div>
            <p>Turns : {turns}</p>
        </div>
    )
}
