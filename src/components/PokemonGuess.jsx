import { useState } from 'react';
import '../style/PokemonGuess.css';

function PokemonGuess({ onSubmit, onNextPokemonClick, score }) {
    const [guess, setGuess] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(guess);
        setGuess('');
    };

    const handleNextPokemon = () => {
        onNextPokemonClick();
    };

    return (
        <div className="pokedex-container">
            <form className="guess-form" onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Enter Pokémon Name"
                    value={guess}
                    onChange={(e) => setGuess(e.target.value)}
                    className="guess-input"
                />
                <div className="controls">
                    <button type="submit" className="submit-button">
                        Guess Pokémon Name
                    </button>
                    <button type="button" className="skip-button" onClick={handleNextPokemon}>
                        Skip Pokémon
                    </button>
                </div>
            </form>
        </div>
    );
}

export default PokemonGuess;
