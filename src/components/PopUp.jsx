import { useEffect, useRef } from 'react';
import '../style/PopUp.css';

function PopUp({ message, onClose, show }) {
    const popupRef = useRef(null);

    useEffect(() => {
        if (!show) return; // if popup isn't shown, don't add listeners

        const handleKeyDown = (e) => {
            if (e.key === 'Escape') {
                onClose();
            }
        };

        const handleClickOutside = (e) => {
            if (popupRef.current && !popupRef.current.contains(e.target)) {
                onClose();
            }
        };

        document.addEventListener('keydown', handleKeyDown);
        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [show, onClose]);

    if (!show) return null;

    return (
        <div className="popup-overlay">
            <div className="popup-content" ref={popupRef}>
                <p>{message}</p>
                <button className="popup-close-btn" onClick={onClose}>Close</button>
            </div>
        </div>
    );
}

export default PopUp;
