import '../style/ResetButton.css';

function ResetButton({ onReset }) {
    return (
        <section className="reset-button-container">
            <button className='reset-button' onClick={onReset}>
                Reset Points
            </button>
        </section>
    );
}

export default ResetButton;
