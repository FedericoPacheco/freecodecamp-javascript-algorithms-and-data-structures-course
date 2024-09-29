const pokemonAPIUrl = "https://pokeapi-proxy.freecodecamp.rocks/api/pokemon";

const searchInput = document.querySelector("#search-input");
const searchButton = document.querySelector("#search-button");
const pokemonId = document.querySelector("#pokemon-id");
const pokemonName = document.querySelector("#pokemon-name");
const pokemonSprite = document.querySelector("#sprite");
const pokemonSpriteBack = document.querySelector("#sprite-back");
const pokemonWeight = document.querySelector("#weight");
const pokemonHeight = document.querySelector("#height");
const pokemonTypes = document.querySelector("#types");

function preprocessSearchInput(input) {
  return input.replace(/\W/g, "").toLowerCase().replace(/female/i, "-f").replace(/male/i, "-m").replace(/ /, "-");
}

async function fetchPokemon(rawInput) {
  const cleanInput = preprocessSearchInput(rawInput);
  if (cleanInput.length > 0) {
    try {
      const res = await fetch(`${pokemonAPIUrl}/${cleanInput}`);
      const {id, name, height, weight, sprites, stats, types} = await res.json();

      pokemonId.textContent = id;
      pokemonName.textContent = name;
      pokemonSprite.src = sprites["front_default"];
      if (sprites["back_default"]) { // Sometimes it isn't present in the response
        pokemonSpriteBack.style.display = "";
        pokemonSpriteBack.src = sprites["back_default"];
      } else {
        pokemonSpriteBack.style.display = "none";
      }
      pokemonHeight.textContent = height;
      pokemonWeight.textContent = weight;
    
      // hp, attack, special-attack, defense, special-defense, speed
      for (const statData of stats) {
        document.querySelector(`#${statData["stat"]["name"]}`).textContent = statData["base_stat"];
      }

      // types
      pokemonTypes.innerHTML = types.map(
        (typeData) => `<span>${typeData["type"]["name"].toUpperCase()}</span>`
      ).join(" ");

    } catch (err) {
      alert("Pokémon not found");
      console.log(err);
    }
  }
}

fetchPokemon("pikachu");
searchButton.addEventListener("click", () => fetchPokemon(searchInput.value));
