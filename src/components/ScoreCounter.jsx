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

  // Correct reset handler now clearly working here:
  const handleReset = () => {
    setScore(0);
    localStorage.setItem('pokemonGameScore', '0');
    setPopUpMessage("Your points counter has been reset.");
    setShowPopUp(true);
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

      <ResetButton onReset={handleReset} /> {/* Proper prop used now! */}

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
