import React, { useState } from "react";
import './pokemon.css';


function Pokemon() {
    const [pokemonName, setPokemonName] = useState("");
    const [pokemonData, setPokemonData] = useState(null);

    const handleSearch = async () => {
        if (pokemonName.trim() === "") {
            alert("Por favor, insira um nome de Pokémon.");
            return;
        }

        try {
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName.toLowerCase()}`);
            if (!response.ok) {
                throw new Error("Pokémon não encontrado.");
            }
            const data = await response.json();
            setPokemonData(data);
        } catch (error) {
            console.error('Error fetching Pokemon data:', error);
            alert("Erro ao buscar dados do Pokémon.");
        }
    };

    return (
        <div className="pokemon-details">
           <div className="search">
                <input
                    type="text"
                    placeholder="Digite o nome do Pokémon"
                    value={pokemonName}
                    onChange={(e) => setPokemonName(e.target.value)}
                />
                <button onClick={handleSearch}>Buscar Pokémon</button>
           </div>

            {pokemonData && (
                <div className="pokemon-infos">
                    <h1>{pokemonData.name}</h1>
                    <img src={pokemonData.sprites.front_default} alt={pokemonData.name} />
                    <h2>Habilidades:</h2>
                    <ul>
                        {pokemonData.abilities.map((ability, index) => (
                            <li key={index}>{ability.ability.name}</li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}

export default Pokemon;
