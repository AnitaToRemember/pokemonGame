import { useState } from 'react';
import '../style/PokemonGuess.css';

function PokemonGuess({ onSubmit, onNextPokemonClick }) {
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
        <form className="guess-form" onSubmit={handleSubmit}>
        <input
            type="text"
            value={guess}
            onChange={(e) => setGuess(e.target.value)}
            placeholder="Enter the Pokemon name"
        />
        <section className='buttons'>
            <button className="submit-button" type="submit">
                Guess Pokémon name
            </button>
            <button className="skip-pokemon" type="button" onClick={handleNextPokemon}>
                Skip Pokémon
            </button>
        </section>
        </form>
    );
}

export default PokemonGuess;
