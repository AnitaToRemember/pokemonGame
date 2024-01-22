    // ScoreCounter.jsx
    import { useEffect } from 'react';
    import { PokemonGame } from '../context/GameContext';
    import useRandomPokemon from '../hooks/useRandomPokemon';
    import PokemonGuess from './PokemonGuess';
    import PokemonPhoto from './PokemonPhoto';
    import fetchPokemonById from '../services/fetchPokemonById'; // Import your actual fetchPokemonById function

    function ScoreCounter() {
    const { point, setPoint } = PokemonGame();
    const randomPokemon = useRandomPokemon();

    // Load the score from localStorage on component mount
    useEffect(() => {
        const savedScore = localStorage.getItem('pokemonGameScore');
        if (savedScore !== null) {
        setPoint(Number(savedScore));
        }
    }, [setPoint]);

    const handleGuess = (guess) => {
        if (randomPokemon && randomPokemon.pokemon) {
        if (guess.toLowerCase() === randomPokemon.pokemon.name.toLowerCase()) {
            alert('Congratulations! You guessed it right.');

            // Update the score and save it to localStorage
            const newPoint = point + 1;
            setPoint(newPoint);
            localStorage.setItem('pokemonGameScore', String(newPoint));

            // Fetch a new random Pokemon when the score changes
            const fetchNewRandomPokemon = async () => {
            try {
                const newRandomPokemonId = Math.floor(Math.random() * 1025) + 1;
                const newRandomPokemon = await fetchPokemonById(newRandomPokemonId);
                console.log('New Random Pokemon:', newRandomPokemon);
            } catch (error) {
                console.error('Error fetching new random Pokemon:', error);
            }
            };

            // Refresh the page immediately after submitting a correct answer
            fetchNewRandomPokemon();
            window.location.reload();
        } else {
            alert('Oops! Try again.');
        }
        } else {
        alert('Error: Cannot fetch or display Pokemon. Please try again.');
        }
    };

    return (
        <div>
        {randomPokemon && randomPokemon.pokemon && randomPokemon.pokemon.sprites && randomPokemon.pokemon.sprites.other.home.front_default ? (
            <PokemonPhoto imageUrl={randomPokemon.pokemon.sprites.other.home.front_default} altText={randomPokemon.pokemon.name} />
        ) : (
            <p>Loading...</p>
        )}
        <p>score={point}</p>
        <PokemonGuess onSubmit={handleGuess} />
        </div>
    );
    }

    export default ScoreCounter;
