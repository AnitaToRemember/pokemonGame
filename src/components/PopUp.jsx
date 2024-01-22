import '../style/PopUp.css'

function PopUp ({ message, onClose, guessedPokemonName }) {
    return (
    <section className="popup">
        <section className="popup-content">
            <p>{message}</p>
            {guessedPokemonName && <p>Guessed Pokémon: {guessedPokemonName}</p>}
            <button onClick={onClose}>Close</button>
        </section>
    </section>
    );
}

export default PopUp;
