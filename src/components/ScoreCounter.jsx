import { useEffect, useState } from 'react';
import { PokemonGame } from '../context/GameContext';
import useRandomPokemon from '../hooks/useRandomPokemon';
import PokemonGuess from './PokemonGuess';
import PokemonPhoto from './PokemonPhoto';
import fetchPokemonById from '../services/fetchPokemonById';
import PopUp from './PopUp';
import ResetButton from './ResetButton';
import '../style/PopUp.css';
import '../style/ScoreCounter.css'; 

function ScoreCounter() {
    const { point, setPoint } = PokemonGame();
    const randomPokemon = useRandomPokemon();
    const [showPopUp, setShowPopUp] = useState(false);
    const [popUpMessage, setPopUpMessage] = useState('');
    const [guessedPokemonName, setGuessedPokemonName] = useState('');
    const [shouldReload, setShouldReload] = useState(false);

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
                setGuessedPokemonName(randomPokemon.pokemon.name);
                setPopUpMessage('Congratulations! You guessed it right.');
                setShouldReload(true);

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
                setGuessedPokemonName('');
                setPopUpMessage('Oops! Try again.');
                setShouldReload(false);
            }
        } else {
            setShowPopUp(true);
            setGuessedPokemonName('');
            setPopUpMessage('Error: Cannot fetch or display Pokemon. Please try again.');
            setShouldReload(false);
        }
    };

    const handleNextPokemon = () => {
        setShowPopUp(true);
        setPopUpMessage(`The correct answer is: ${randomPokemon.pokemon.name}`);
        setGuessedPokemonName('');
        setShouldReload(true);
    };

    const handlePopUpClose = () => {
        setShowPopUp(false);
        if (shouldReload) {
            window.location.reload();
        }
    };

    return (
        <section className="score-section">
            {randomPokemon && randomPokemon.pokemon && randomPokemon.pokemon.sprites && randomPokemon.pokemon.sprites.other.home.front_default ? (
                <PokemonPhoto imageUrl={randomPokemon.pokemon.sprites.other.home.front_default} altText={randomPokemon.pokemon.name} />
            ) : (
                <p>Loading...</p>
            )}
            <p className="score-text">Score: {point}</p>
            <ResetButton />
            <PokemonGuess onSubmit={handleGuess} onNextPokemonClick={handleNextPokemon} />
            {showPopUp && (
                <PopUp message={popUpMessage} onClose={handlePopUpClose} guessedPokemonName={guessedPokemonName} />
            )}
        </section>
    );
}

export default ScoreCounter;
