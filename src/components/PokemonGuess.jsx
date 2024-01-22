    import { useState } from 'react';

    function PokemonGuess({ onSubmit }) {
    const [guess, setGuess] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(guess);
        setGuess('');
    };

    // Handler for the "Next Pokemon" button
    const handleNextPokemon = () => {
        // Reload the page
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
            Submit Pokemon name
        </button>
        {/* Add the "Next Pokemon" button with the handleNextPokemon function */}
        <button className="next-pokemon" type="button" onClick={handleNextPokemon}>
            Next Pokemon
        </button>
        </form>
    );
    }

    export default PokemonGuess;
