import { useState, useEffect } from 'react';
import useRandomPokemon from '../hooks/useRandomPokemon';
import PokemonGuess from './PokemonGuess';
import PokemonPhoto from './PokemonPhoto';
import PopUp from './PopUp';
import ResetButton from './ResetButton';
import '../style/PopUp.css';
import '../style/ScoreCounter.css';

function ScoreCounter() {
    const [score, setScore] = useState(() => Number(localStorage.getItem('pokemonGameScore') || 0));
    const [showPopUp, setShowPopUp] = useState(false);
    const [popUpMessage, setPopUpMessage] = useState('');
    const [guessedPokemonName, setGuessedPokemonName] = useState('');
    
    const { randomPokemon, fetchNewPokemon } = useRandomPokemon();

    useEffect(() => {
        localStorage.setItem('pokemonGameScore', score);
    }, [score]);

    const handleGuessSubmit = (guess) => {
        if (guess.trim().toLowerCase() === randomPokemon.pokemon.name.toLowerCase()) {
            setScore((prevScore) => {
                const newScore = prevScore + 1;
                localStorage.setItem('pokemonGameScore', newScore);
                return newScore;
            });
            setPopUpMessage('🎉 Congratulations! You guessed correctly!');
        } else {
            setPopUpMessage(`❌ Oops! Correct answer was ${randomPokemon.pokemon.name}`);
        }
        setGuessedPokemonName(randomPokemon.pokemon.name);
        setShowPopUp(true);
        fetchNewPokemon();
    };

    const handleSkip = () => {
        setGuessedPokemonName(randomPokemon.pokemon.name);
        setPopUpMessage(`You skipped! The correct answer was: ${randomPokemon.pokemon.name}`);
        setShowPopUp(true);
        fetchNewPokemon();
    };

    const handlePopUpClose = () => {
        setShowPopUp(false);
    };

    return (
        <section className="pokedex-container">
            <PokemonPhoto
                imageUrl={randomPokemon?.pokemon?.sprites?.other?.home?.front_default}
                altText={randomPokemon?.pokemon?.name || 'Pokémon'}
            />

            <div className="score-text">SCORE: {score}</div>
            <ResetButton onReset={() => {
                setScore(0);
                localStorage.setItem('pokemonGameScore', 0);
            }} />

            <PokemonGuess 
                onSubmit={handleGuessSubmit}
                onNextPokemonClick={handleSkip}
            />

            <PopUp
                message={popUpMessage}
                show={showPopUp}
                onClose={handlePopUpClose}
                guessedPokemonName={guessedPokemonName}
            />
        </section>
    );
}

export default ScoreCounter;
