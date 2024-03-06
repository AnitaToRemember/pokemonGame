import { useEffect, useState } from 'react';
import { PokemonGame } from '../context/GameContext';
import useRandomPokemon from '../hooks/useRandomPokemon';
import PokemonGuess from './PokemonGuess';
import PokemonPhoto from './PokemonPhoto';
import PopUp from './PopUp';
import ResetButton from './ResetButton';
import '../style/PopUp.css';
import '../style/ScoreCounter.css'; 

function ScoreCounter() {
    const { point, setPoint } = PokemonGame();
    const [showPopUp, setShowPopUp] = useState(false);
    const [popUpMessage, setPopUpMessage] = useState('');
    const [guessedPokemonName, setGuessedPokemonName] = useState('');
    const { randomPokemon, fetchNewPokemon } = useRandomPokemon();

    useEffect(() => {
        const savedScore = localStorage.getItem('pokemonGameScore');
        if (savedScore !== null) {
            setPoint(Number(savedScore));
        }
    }, [setPoint]);

    const handleGuess = async (guess) => {
        if (randomPokemon && randomPokemon.pokemon) {
            if (guess.toLowerCase() === randomPokemon.pokemon.name.toLowerCase()) {
                // Update the score
                const newPoint = point + 1;
                setPoint(newPoint);
                localStorage.setItem('pokemonGameScore', String(newPoint));
    
                // Show pop-up for correct guess and fetch new Pokémon
                setShowPopUp(true);
                setGuessedPokemonName(randomPokemon.pokemon.name);
                setPopUpMessage('Congratulations! You guessed it right.');
                fetchNewPokemon(); // Fetch new random Pokemon after correct guess
            } else {
                // Show pop-up for incorrect guess
                setShowPopUp(true);
                setGuessedPokemonName('');
                setPopUpMessage('Oops! Try again.');
            }
        } else {
            // Show pop-up for error
            setShowPopUp(true);
            setGuessedPokemonName('');
            setPopUpMessage('Error: Cannot fetch or display Pokemon. Please try again.');
        }
    };    

    const handleSkip = () => {
        setShowPopUp(true);
        setPopUpMessage(`The correct answer is: ${randomPokemon.pokemon.name}`);
        fetchNewPokemon(); // Fetch new random Pokemon after skipping
    };

    const handlePopUpClose = () => {
        setShowPopUp(false);
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
            <PokemonGuess onSubmit={handleGuess} onNextPokemonClick={handleSkip} /> {/* Pass handleSkip as onNextPokemonClick */}
            {showPopUp && (
                <PopUp message={popUpMessage} onClose={handlePopUpClose} guessedPokemonName={guessedPokemonName} />
            )}
        </section>
    );
}

export default ScoreCounter;
