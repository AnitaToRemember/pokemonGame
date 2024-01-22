    import { useState, useEffect } from "react";
    import fetchPokemonById from "../services/fetchPokemonById";

    const useRandomPokemon = () => {
    const maxPokemonId = 1025;
    const [randomPokemon, setRandomPokemon] = useState(null);

    useEffect(() => {
            if (!randomPokemon) {
            const randomPokemonId = Math.floor(Math.random() * maxPokemonId) + 1;
        
            const fetchRandomPokemon = async () => {
                try {
                const data = await fetchPokemonById(randomPokemonId);
                setRandomPokemon({ pokemon: data, error: null });
                } catch (error) {
                setRandomPokemon({
                    pokemon: null,
                    error: `Failed to fetch random Pokemon. ${error.message}`,
                });
                }
            };
        
            fetchRandomPokemon();
            }
        }, [randomPokemon, maxPokemonId]);
        console.log("Random Pokemon:", randomPokemon);


    return randomPokemon;
    };

    export default useRandomPokemon;
