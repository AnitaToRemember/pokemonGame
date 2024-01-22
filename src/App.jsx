import './App.css'
import PokemonGameLayout from './components/PokemonGameLayout';
import ScoreCounter from './components/ScoreCounter';
import { GameScore } from './context/GameContext';

function App() {
    return (
      <div className="App">
      <GameScore>
        <PokemonGameLayout>
          <ScoreCounter/>
        </PokemonGameLayout>
      </GameScore>
    </div>
    );
  }

export default App
