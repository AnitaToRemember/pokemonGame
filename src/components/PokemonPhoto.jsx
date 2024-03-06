import '../style/PokemonPhoto.css'

const PokemonPhoto = ({ imageUrl, altText }) => {
    return (
        <img src={imageUrl} alt={altText} />
    );
};

export default PokemonPhoto;
