import { useState } from 'react';
import { PokemonGame } from '../context/GameContext';
import PopUp from './PopUp';
import '../style/ResetButton.css'

function ResetButton() {
    const { setPoint } = PokemonGame();
    const [showPopUp, setShowPopUp] = useState(false);

    const handleReset = () => {
        setPoint(0);
        localStorage.setItem('pokemonGameScore', '0');
        setShowPopUp(true);
    };

    const handlePopUpClose = () => {
        setShowPopUp(false);
    };

    return (
        <section className="reset-button-container">
            <button className='reset-button' onClick={handleReset}>Reset Points</button>
            {showPopUp && (
                <PopUp message="Your points counter has been reset." onClose={handlePopUpClose} />
            )}
        </section>
    );
}

export default ResetButton;
