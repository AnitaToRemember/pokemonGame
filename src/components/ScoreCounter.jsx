import { useEffect, useState, useCallback } from 'react';
import PokemonGuess from './PokemonGuess';
import PokemonPhoto from './PokemonPhoto';
import PopUp from './PopUp';
import ResetButton from './ResetButton';
import useRandomPokemon from '../hooks/useRandomPokemon';
import '../style/ScoreCounter.css';

function ScoreCounter() {
  const [score, setScore] = useState(() => Number(localStorage.getItem('pokemonGameScore') || 0));
  const [showPopUp, setShowPopUp] = useState(false);
  const [popUpMessage, setPopUpMessage] = useState('');
  const { randomPokemon, fetchNewPokemon } = useRandomPokemon();

  const loadNewPokemon = useCallback(() => {
    fetchNewPokemon();
  }, [fetchNewPokemon]);

  useEffect(() => {
    loadNewPokemon();
  }, [loadNewPokemon]);

  useEffect(() => {
    localStorage.setItem('pokemonGameScore', score);
  }, [score]);

  const handleGuessSubmit = (guess) => {
    if (randomPokemon && randomPokemon.pokemon) {
      if (guess.toLowerCase().trim() === randomPokemon.pokemon.name.toLowerCase()) {
        setScore(prev => prev + 1);
        setPopUpMessage('Correct! 🎉');
      } else {
        setPopUpMessage(`Wrong! Correct Pokémon: ${randomPokemon.pokemon.name}`);
      }
      setShowPopUp(true);
      loadNewPokemon();
    }
  };

  const handleSkip = () => {
    setPopUpMessage(`Skipped! The correct Pokémon was: ${randomPokemon.pokemon.name}`);
    setShowPopUp(true);
    loadNewPokemon();
  };

  const handlePopUpClose = () => {
    setShowPopUp(false);
  };

  const handleReset = () => {
    setScore(0);
    setPopUpMessage("Score has been reset.");
    setShowPopUp(true);
    localStorage.setItem('pokemonGameScore', '0');
    loadNewPokemon();
  };

  return (
    <section className="score-section">
      {randomPokemon?.pokemon && (
        <PokemonPhoto
          imageUrl={randomPokemon.pokemon.sprites.other.home.front_default}
          altText={randomPokemon.pokemon.name}
        />
      )}

      <p className="score-text">Score: {score}</p>

      <ResetButton onReset={handleReset} />

      <PokemonGuess
        onSubmit={handleGuessSubmit}
        onNextPokemonClick={handleSkip}
      />

      <PopUp
        message={popUpMessage}
        show={showPopUp}
        onClose={handlePopUpClose}
      />
    </section>
  );
}

export default ScoreCounter;
