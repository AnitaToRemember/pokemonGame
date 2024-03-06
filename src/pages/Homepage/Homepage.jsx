import PokemonGameLayout from "../../components/PokemonGameLayout"
import ScoreCounter from "../../components/ScoreCounter"
import { GameScore } from "../../context/GameContext"
import './Homepage.css'

function Homepage() {
    
    return (
    <main className="main-game"> 
        <GameScore>
            <PokemonGameLayout>
                <ScoreCounter/>
            </PokemonGameLayout>
    </GameScore>
    </main>
    )
}

export default Homepage