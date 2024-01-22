import { useEffect, useState } from 'react';
import { PokemonGame } from '../context/GameContext';
import useRandomPokemon from '../hooks/useRandomPokemon';
import PokemonGuess from './PokemonGuess';
import PokemonPhoto from './PokemonPhoto';
import fetchPokemonById from '../services/fetchPokemonById';
import '../style/PopUp.css'

function ScoreCounter() {
    const { point, setPoint } = PokemonGame();
    const randomPokemon = useRandomPokemon();
    const [showPopUp, setShowPopUp] = useState(false);
    const [popUpMessage, setPopUpMessage] = useState('');

    useEffect(() => {
    const savedScore = localStorage.getItem('pokemonGameScore');
    if (savedScore !== null) {
        setPoint(Number(savedScore));
    }
    }, [setPoint]);

    const handleGuess = async (guess) => {
    if (randomPokemon && randomPokemon.pokemon) {
        if (guess.toLowerCase() === randomPokemon.pokemon.name.toLowerCase()) {
        setShowPopUp(true);
        setPopUpMessage('Congratulations! You guessed it right.');

        const newPoint = point + 1;
        setPoint(newPoint);
        localStorage.setItem('pokemonGameScore', String(newPoint));

        try {
            const newRandomPokemonId = Math.floor(Math.random() * 1025) + 1;
            const newRandomPokemon = await fetchPokemonById(newRandomPokemonId);
            console.log('New Random Pokemon:', newRandomPokemon);
        } catch (error) {
            console.error('Error fetching new random Pokemon:', error);
        }
        } else {
        setShowPopUp(true);
        setPopUpMessage('Oops! Try again.');
        }
    } else {
        setShowPopUp(true);
        setPopUpMessage('Error: Cannot fetch or display Pokemon. Please try again.');
    }
    };

    const handlePopUpClose = () => {
    setShowPopUp(false);
    window.location.reload();
    };

    return (
    <div>
        {randomPokemon && randomPokemon.pokemon && randomPokemon.pokemon.sprites && randomPokemon.pokemon.sprites.other.home.front_default ? (
        <PokemonPhoto imageUrl={randomPokemon.pokemon.sprites.other.home.front_default} altText={randomPokemon.pokemon.name} />
        ) : (
        <p>Loading...</p>
        )}
        <p>Score: {point}</p>
        <PokemonGuess onSubmit={handleGuess} />
        {/* Conditionally render the pop-up */}
        {showPopUp && (
        <div className="popup">
            <div className="popup-content">
            <p>{popUpMessage}</p>
            <button onClick={handlePopUpClose}>Close</button>
            </div>
        </div>
        )}
    </div>
    );
}

export default ScoreCounter;
