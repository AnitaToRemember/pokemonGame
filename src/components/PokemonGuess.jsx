import { useState } from 'react';
import '../style/PokemonGuess.css'

function PokemonGuess({ onSubmit }) {
    const [guess, setGuess] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(guess);
        setGuess('');
    };

    const handleNextPokemon = () => {
        window.location.reload();
    };

    return (
        <form className="guess-form" onSubmit={handleSubmit}>
        <input
            type="text"
            value={guess}
            onChange={(e) => setGuess(e.target.value)}
            placeholder="Enter the Pokemon name"
        />
        <button className="submit-button" type="submit">
            Guess Pokémon name
        </button>
        {/* Add the "Next Pokemon" button with the handleNextPokemon function */}
        <button className="next-pokemon" type="button" onClick={handleNextPokemon}>
            Next Pokémon
        </button>
        </form>
    );
}

    export default PokemonGuess;
