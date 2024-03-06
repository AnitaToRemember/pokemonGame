import '../style/PopUp.css';

function PopUp ({ message, onClose, show }) {
    return (
        <section className={`popup ${show ? 'show' : ''}`}>
            <section className="popup-content">
                <p>{message}</p>
                <button onClick={onClose}>Close</button>
            </section>
        </section>
    );
}

export default PopUp;
