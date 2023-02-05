let load = 40;
let currentPokemon;
let searchedPokemon = [];

function init(){
    getPokemons();
    
}

async function getPokemons(){          
        let url = `https://pokeapi.co/api/v2/pokemon/?limit=100000&offset=0`;
        let response = await fetch(url);
        let respondPokemon = await response.json();
        let allPokemons = respondPokemon['results']
        for (let i = 0; i < load; i++) {
            let thisPokemonUrl = allPokemons[i]['url'];
            let thisPokemon = await fetch(thisPokemonUrl);
            currentPokemon = await thisPokemon.json();
            renderMiniCarts(currentPokemon,i);            
        }      
}

function loadMore(){
    load = load+40;
    document.getElementById('pokemonNames').innerHTML ='';
    init();
}

function renderMiniCarts(currentPokemon,i){       
       document.getElementById('pokemonNames').innerHTML+=/*html*/`
        <div class="pokemonMiniCard" id="pokemonMiniCard${i}" onclick="callSelection(${i+1})">
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
    let j = i+1
    let str = j.toString();
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
        <img src="img/close.png" class="closeTag" onclick="closeFullScreen()">
        <div class="fullscreenBg" id="fullscreenBg">            
            <h3> ${currentPokemon['name']}</h3>
           <div class="pokeIdFull" id="pokeIdFull${i}"></div> 
            <div class="typeBox" id="typeBox"></div>
        </div>
        <div class="fullscreenBgbottom"></div>
            <img class="pokePic" src="${currentPokemon['sprites']['other']['official-artwork']['front_default']}">
        </div> 
    `;
    fullscreenBg(currentPokemon);
    pokeIndexNrFull(i);
    renderCardMenu(i);
}
function previous(i){
    callSelection(i-1);
}
function next(i){
    callSelection(i+1);
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

function renderCardMenu(i){
    document.getElementById('fullScreenContainer').innerHTML += /*html*/`
    <div class="cardMenu">
        <div><img src="img/arrow_left.png" onclick="previous(${i})"></div>
        <div class="cardMenuText isActiv" id="menu1" onclick="contentAbout(${i})">About</div>
        <div class="cardMenuText" id="menu2" onclick="contentBaseStats(${i})">Base Stats</div>
        <div class="cardMenuText" id="menu3" onclick="contentEvonution(${i})">Evoluton</div>
        <div><img src="img/arrow_right.png" onclick="next(${i})"></div>
    </div>
`;
}

function contentAbout(i){
    setIsActiv(1);
    
}

function contentBaseStats(i){
    setIsActiv(2);
    

    document.getElementById('menu2').innerHTML += /*html*/`
<div class="progress">
  <div class="progress-bar progress-bar-striped" role="progressbar" style="width: 10%" aria-valuenow="10" aria-valuemin="0" aria-valuemax="100"></div>
</div>
`;
}



function contentEvonution(i){
    setIsActiv(3);
    

}

function setIsActiv(isActiv){
    document.getElementById('menu3').classList.add('isActiv');
    document.getElementById('menu1').classList.remove('isActiv');
    document.getElementById('menu2').classList.remove('isActiv');

}

function getSearchInput() {
    let search = document.getElementById('searchInput').value;
    let searchValue = search.toLocaleLowerCase();
    loadSearchedPokemon(searchValue);
}

async function loadSearchedPokemon(searchValue) {
    let searchUrl = 'https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0';
    let responseSearch = await fetch(searchUrl);
    let responseAsJsonSearch = await responseSearch.json();
    filterPokemon(responseAsJsonSearch, searchValue);
}


async function filterPokemon(responseAsJsonSearch, searchValue) {
    for (let i = 0; i < responseAsJsonSearch['results'].length; i++) {
        const pokemon = responseAsJsonSearch['results'][i];
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
    let pokemonContainer = document.getElementById('pokemonNames');
    pokemonContainer.innerHTML = '';
    if (searchedPokemon.length == 0) {
        pokemonContainer.innerHTML = noPokemonFoundTemplate();
    } else {
        loadedPokemon = searchedPokemon;
        currentPokemon = 0;
        renderAllPokemon();
    }
}

function noPokemonFoundTemplate(){
    document.getElementById('pokemonNames').innerHTML ='';
    document.getElementById('pokemonNames').innerHTML =/*html*/`
        <h1>Sorry i could chatch anything</h1>
        <button class="btn">Back</button>
    `;

}