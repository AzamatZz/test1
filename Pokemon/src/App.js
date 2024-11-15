import React from 'react';
import PokemonList from './components/Pokemon/PokemonList';
import './App.scss';

function App() {
    return (
        <div className="App">
            <h1>Pokemon</h1>
            <PokemonList />
        </div>
    );
}

export default App;
