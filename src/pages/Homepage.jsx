import PokemonGameLayout from "../components/PokemonGameLayout"
import ScoreCounter from "../components/ScoreCounter"
import { GameScore } from "../context/GameContext"

function Homepage() {
    
    return (
    <main> 
        <GameScore>
            <PokemonGameLayout>
                <ScoreCounter/>
            </PokemonGameLayout>
    </GameScore>
    </main>
    )
}

export default Homepage