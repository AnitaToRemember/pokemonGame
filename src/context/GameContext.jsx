import { createContext, useContext, useState } from "react";

export const GameContext = createContext();

export function PokemonGame(){
    const context = useContext(GameContext);
    if (!context) {
        throw new Error('usePokemonGame must be used within a PokemonGameProvider');
    }
    return context;} 

export function GameScore ({ children }) {
    const [point, setPoint] = useState(0);

    return (
    <GameContext.Provider value={{ point, setPoint }}>
        {children}
    </GameContext.Provider>
    );
}
