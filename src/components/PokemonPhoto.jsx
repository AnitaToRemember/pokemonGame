    const PokemonPhoto = ({ imageUrl, altText }) => {
    console.log('PokemonPhoto - imageUrl:', imageUrl);
    // You can also use debugger to pause execution and inspect the props
    // debugger;

    return (
        <img src={imageUrl} alt={altText} />
    );
    };

    export default PokemonPhoto;
