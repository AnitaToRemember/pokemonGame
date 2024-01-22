const fetchPokemonById = async (id) => {
const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);

if (!response.ok) {
    throw new Error(`Failed to fetch Pokemon with ID ${id}. Status: ${response.status}`);
}

const pokemon = await response.json();
return pokemon;
}; 

export default fetchPokemonById;
