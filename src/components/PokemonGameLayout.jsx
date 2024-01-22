function PokemonGameLayout({children}) {
    return (
        <section className="pokemon-game">
            <h1 className="pokemon-game-title">Who&apos;s that pokemon</h1>
            {children}
        </section>
    );
}

export default PokemonGameLayout