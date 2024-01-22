import '../style/PopUp.css'
const PopUp = ({ message, onClose }) => {
    return (
        <div className="popup">
        <div className="popup-content">
            <p>{message}</p>
            <button onClick={onClose}>Close</button>
        </div>
        </div>
    );
};

export default PopUp;
