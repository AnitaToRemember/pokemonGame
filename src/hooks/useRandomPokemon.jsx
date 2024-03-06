import { useState, useEffect, useCallback } from "react";
import fetchPokemonById from "../services/fetchPokemonById";

function useRandomPokemon() {
    const maxPokemonId = 1025;
    const [randomPokemon, setRandomPokemon] = useState(null);

    const fetchRandomPokemon = useCallback(async () => {
        try {
            const randomPokemonId = Math.floor(Math.random() * maxPokemonId) + 1;
            const data = await fetchPokemonById(randomPokemonId);
            setRandomPokemon({ pokemon: data, error: null });
        } catch (error) {
            setRandomPokemon({
                pokemon: null,
                error: `Failed to fetch random Pokemon. ${error.message}`,
            });
        }
    }, [maxPokemonId]);

    const fetchNewPokemon = useCallback(() => {
        fetchRandomPokemon();
    }, [fetchRandomPokemon]);

    useEffect(() => {
        if (!randomPokemon) {
            fetchRandomPokemon();
        }
    }, [randomPokemon, fetchRandomPokemon]);

    return { randomPokemon, fetchNewPokemon }; 
}

export default useRandomPokemon;
