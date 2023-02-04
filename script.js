let load = 40;
let currentPokemon;
let searchedPokemon = [];

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
    renderCardMenu();
}

async function callSelection(i){
    let url = `https://pokeapi.co/api/v2/pokemon/${i}`;
    let response = await fetch(url);
    let currentPokemon = await response.json();
    enterFullscreen(currentPokemon,i);
}

function closeFullScreen(){
    document.getElementById('fullscreenView').classList.add('dNone');
}

function renderCardMenu(){
    document.getElementById('fullScreenContainer').innerHTML += /*html*/`
    <div class="cardMenu">
    <div class="cardMenuText isActiv" id="menu1">About</div>
    <div class="cardMenuText" id="menu2">Base Stats</div>
    <div class="cardMenuText" id="menu3">Evoluton</div>
    </div>
`;
}

function contentAbout(){
    
}

function contentBaseStats(){
    document.getElementById('menu2').innerHTML += /*html*/`
<div class="progress">
  <div class="progress-bar progress-bar-striped" role="progressbar" style="width: 10%" aria-valuenow="10" aria-valuemin="0" aria-valuemax="100"></div>
</div>
`;
}

function contentEvonution(){

}

function getSearchInput() {
    let search = document.getElementById('searchInput').value;
    let searchValue = search.toLocaleLowerCase();
    loadSearchedPokemon(searchValue);
}

async function loadSearchedPokemon(searchValue) {
    let response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=10000&offset=0');
    let responseAsJson = await response.json();
    filterPokemon(responseAsJson, searchValue);
}


async function filterPokemon(responseAsJson, searchValue) {
    for (let i = 0; i < responseAsJson['results'].length; i++) {
        const pokemon = responseAsJson['results'][i];
        let pokemonName = pokemon['name'];
        if (pokemonName.includes(searchValue)) {
            let pokemonResponse = await fetch(pokemon['url']);
            let pokemonAsJson = await pokemonResponse.json();
            searchedPokemon.push(pokemonAsJson);
        }
    }
    pokemonSearch();
}

function pokemonSearch() {
    let pokemonContainer = document.getElementById('all_pokemon');
    pokemonContainer.innerHTML = '';
    if (searchedPokemon.length == 0) {
        pokemonContainer.innerHTML = noPokemonFoundTemplate();
    } else {
        loadedPokemon = searchedPokemon;
        currentPokemon = 0;
        renderAllPokemon();
    }
}