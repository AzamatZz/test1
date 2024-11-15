import React, { useEffect, useState } from 'react';
import PokemonCard from './PokemonCard';
import './PokemonList.scss';

function PokemonList() {
    const [pokemonList, setPokemonList] = useState([]); // Список всех покемонов
    const [currentPage, setCurrentPage] = useState(1); // Текущая страница
    const pokemonsPerPage = 12; // Количество карточек на странице

    useEffect(() => {

        fetch('https://pokeapi.co/api/v2/pokemon?limit=100')
            .then(response => response.json())
            .then(data => setPokemonList(data.results));
    }, []);

    const indexOfLastPokemon = currentPage * pokemonsPerPage;
    const indexOfFirstPokemon = indexOfLastPokemon - pokemonsPerPage;
    const currentPokemons = pokemonList.slice(indexOfFirstPokemon, indexOfLastPokemon);


    const handlePrevPage = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };

    const handleNextPage = () => {
        if (indexOfLastPokemon < pokemonList.length) setCurrentPage(currentPage + 1);
    };

    return (
        <div className="pokemon-list-container">
            <div className="pokemon-list">
                {currentPokemons.map((pokemon) => (
                    <PokemonCard key={pokemon.name} pokemon={pokemon} />
                ))}
            </div>

            <div className="pagination">
                <button onClick={handlePrevPage} disabled={currentPage === 1}>
                    Prev
                </button>
                <span>Page {currentPage}</span>
                <button onClick={handleNextPage} disabled={indexOfLastPokemon >= pokemonList.length}>
                    Next
                </button>
            </div>
        </div>
    );
}

export default PokemonList;
