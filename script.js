let load = 40;
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
async function callSelection(i){
    let url = `https://pokeapi.co/api/v2/pokemon/${i}`;
    let response = await fetch(url);
    let currentPokemon = await response.json();
    enterFullscreen(currentPokemon,i);
}


function renderMiniCarts(currentPokemon,i){
    
    document.getElementById('pokemonNames').innerHTML+=/*html*/`
       <div class="pokemonMiniCard" id="pokemonMiniCard${i}" onclick="callSelection(${i})">
            <h3> ${currentPokemon['name']}</h3>
            <div class="pokeId" id="pokeId${i}"></div>
            <img src="${currentPokemon['sprites']['other']['official-artwork']['front_default']}">
            <div class="types" id="type${i}">
            </div>
    `;
    pokeIndexNr(i);
    addTypeBg(currentPokemon,i);
    
}

function pokeIndexNr(i){
    let str = i.toString();
    while(str.length<4)str = "0"+str;
    document.getElementById(`pokeId${i}`).innerHTML= `#${str}`;
   
}
function pokeIndexNrFull(i){
    let str = i.toString();
    while(str.length<4)str = "0"+str;
    document.getElementById(`pokeIdFull${i}`).innerHTML= `#${str}`;
}

function enterFullscreen(currentPokemon,i){

    document.getElementById('fullscreenView').classList.remove('dNone');
    document.getElementById('fullscreenView').innerHTML = /*html*/`
     <div class="fullScreenContainer" id="fullScreenContainer" onclick="event.stopPropagation()">
        <div class="fullscreenBg" id="fullscreenBg">
            <h3> ${currentPokemon['name']}</h3>
           <div class="pokeIdFull" id="pokeIdFull${i}"></div> 
            <div class="typeBox" id="typeBox"></div>
        </div>
        <div class="fullscreenBgbottom"></div>
            <img src="${currentPokemon['sprites']['other']['official-artwork']['front_default']}">
        </div>   
    `;
    fullscreenBg(currentPokemon);
    pokeIndexNrFull(i);
    renderType(currentPokemon,i);
}

function closeFullScreen(){
    document.getElementById('fullscreenView').classList.add('dNone');
}

function renderType(currentPokemon,i){
    
}