const getPokemonUrl = id => `https://pokeapi.co/api/v2/pokemon/${id}`

const generatePokemons = () => Array(151).fill().map((_, index) =>
  fetch(getPokemonUrl(index + 1)).then(response => response.json()))

const fetchPokemon = () => {
  const pokemonsPromises = generatePokemons()

  Promise.all(pokemonsPromises)
    .then(pokemons => {
      return pokemons = pokemons.reduce((acc, pokemon) => {
        const types = pokemon.types.map(typeInfo => typeInfo.type.name)
        acc += `
      <li class='card ${types[0]}'>
      <img class='card-image'  alt='${pokemon.name}' src= 'animated/${pokemon.id}.gif'/>
      <h2 class='card-title'>${pokemon.id}. ${pokemon.name}</h2>
      <p class='card-subtitle'>${types.join(' | ')}</p>
      </li>
      `
        return acc
      }, '')
    })
    .then(pokemons => {
      const ul = document.querySelector('[data-js="pokedex"]')
      ul.innerHTML = pokemons;
    })
}

fetchPokemon();