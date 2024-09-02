const searchInput = document.querySelector("#search-input");
const searchForm = document.getElementById("search-form");
const spriteContainer = document.getElementById("sprite-container");
const pokemonName = document.querySelector("#pokemon-name");
const pokemonID = document.querySelector("#pokemon-id");
const types = document.getElementById("types");
const height = document.getElementById("height");
const weight = document.getElementById("weight");
const hp = document.getElementById("hp");
const attack = document.getElementById("attack");
const defense = document.getElementById("defense");
const specialAttack = document.getElementById("special-attack");
const specialDefense = document.getElementById("special-defense");
const speed = document.getElementById("speed");

const fetchapi = async () => {
  try {
    const pokemonIDorName = searchInput.value.toLowerCase();
    const pokemon = await fetch(
      `https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/${pokemonIDorName}`
    );
    const data = await pokemon.json();

    pokemonName.textContent = `${data.name.toUpperCase()}`;
    pokemonID.textContent = `#${data.id}`;
    weight.textContent = `Weight: ${data.weight}`;
    height.textContent = `Height: ${data.height}`;
    spriteContainer.innerHTML = `
      <img id="sprite" src="${data.sprites.front_default}" alt="${data.name} front default sprite">
    `;

    types.innerHTML = data.types
      .map(
        (obj) =>
          `<span class="type ${
            obj.type.name
          }">${obj.type.name.toUpperCase()}</span>`
      )
      .join("||");

    // stats
    hp.textContent = data.stats[0].base_stat;
    attack.textContent = data.stats[1].base_stat;
    defense.textContent = data.stats[2].base_stat;
    specialAttack.textContent = data.stats[3].base_stat;
    specialDefense.textContent = data.stats[4].base_stat;
    speed.textContent = data.stats[5].base_stat;
  } catch (error) {
    resetDisplay();
    alert("Pokémon not found");
    console.log(`Pokémon not found: ${error}`);
  }
};

const resetDisplay = () => {
  const sprite = document.getElementById("sprite");
  if (sprite) sprite.remove();

  // reset stats
  pokemonName.textContent = "";
  pokemonID.textContent = "";
  types.innerHTML = "";
  height.textContent = "";
  weight.textContent = "";
  hp.textContent = "";
  attack.textContent = "";
  defense.textContent = "";
  specialAttack.textContent = "";
  specialDefense.textContent = "";
  speed.textContent = "";
};

searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  fetchapi();
});
