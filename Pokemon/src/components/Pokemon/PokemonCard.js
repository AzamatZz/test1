import React, { useEffect, useState } from 'react';
import './PokemonCard.scss';

function PokemonCard({ pokemon }) {
    const [details, setDetails] = useState(null);

    useEffect(() => {

        fetch(pokemon.url)
            .then((response) => response.json())
            .then((data) => setDetails(data));
    }, [pokemon.url]);

    if (!details) return <div>Загрузка...</div>;

    const handleDetailsClick = () => {
        console.log(`Подробная информация ${details.name}:`, details);
        alert(`Подробная информация о ${details.name}`);
    };

    return (
        <div className="pokemon-card">
            <div className="Box">
                <img src={details.sprites.other.dream_world.front_default} alt={details.name}/>
                <h3>{details.name}</h3>
            </div>
            <button onClick={handleDetailsClick}>Подробнее</button>
        </div>
    );
}

export default PokemonCard;

