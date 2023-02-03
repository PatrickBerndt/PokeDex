let load = 20;
let currentPokemon;

function init(){
    for (let i = 1; i <= load; i++) {       
        getPokemons(i);
    }
}

async function getPokemons(i){
    let url = `https://pokeapi.co/api/v2/pokemon/${i}`;
    let response = await fetch(url);
    let currentPokemon = await response.json();
    renderMiniCarts(currentPokemon,i);
    
}
function renderMiniCarts(currentPokemon,i){
    document.getElementById('pokemonNames').innerHTML+=/*html*/`
       <div class="pokemonMiniCard" id="pokemonMiniCard${i}" onclick="enterFullscreen(${i})">
            <h3> ${currentPokemon['name']}</h3>
            <img src="${currentPokemon['sprites']['other']['official-artwork']['front_default']}">
            <div class="types" id="type${i}">
            </div>
    `;
    addTypeBg(currentPokemon,i);
}

