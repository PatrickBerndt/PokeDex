let load = 40;
let searchedPokemon = [];

/* initial handshake with the pokemon API */

async function init(){          
    let url = `https://pokeapi.co/api/v2/pokemon/?limit=100000&offset=0`;
    let response = await fetch(url);
    let respondPokemon = await response.json();
    let allPokemon = respondPokemon['results']
    globalThis.allPokemons= allPokemon;
    for (let i = 0; i < load; i++) {
        let thisPokemonUrl = allPokemon[i]['url'];
        let thisPokemon = await fetch(thisPokemonUrl);
        let currentPokemon = await thisPokemon.json();
        renderMiniCarts(currentPokemon,i);            
    }   
}

function loadMore(){
    load = load+40;
    document.getElementById('pokemonNames').innerHTML ='';
    init();
}
/* this part renders the mini Carts for the Landing Page  */

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

/* this part renders the detailview and call the menu function */ 

async function enterFullscreen(currentPokemon,i){
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


/* this part builds the 4 digits long number  */ 

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

/* switch to previous and next pokemon */

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
    globalThis.currentPokemons = currentPokemon;

    enterFullscreen(currentPokemon,i);
}

/* this part close the fullscreenview */

function closeFullScreen(){
    document.getElementById('fullscreenView').classList.add('dNone');
}

/* this is the part what renders the lower part of the detail view */

function renderCardMenu(i){
    document.getElementById('fullScreenContainer').innerHTML += /*html*/`
    <div class="cardMenu">
        <div><img src="img/arrow_left.png" onclick="previous(${i})"></div>
        <div class="cardMenuText" id="menu1" onclick="contentAbout()">About</div>
        <div class="cardMenuText" id="menu2" onclick="contentBaseStats()">Base Stats</div>
        <div class="cardMenuText" id="menu3" onclick="contentEvonution()">Evolution</div>
        <div><img src="img/arrow_right.png" onclick="next(${i})"></div>
    </div>
    <div class="cardMenuContend" id="cardMenuContend"></div>
    `;
    contentBaseStats();
}

function contentAbout(){
    setIsActiv(1);
    document.getElementById('cardMenuContend').innerHTML='';
    let height = currentPokemons['height']/10;
    let weight = currentPokemons['weight']/10;

    document.getElementById('cardMenuContend').innerHTML=/*html*/`
    <table>
    <tr>
        <td>Height:</td>
        <td>${height}m</td>
    </tr>
    <tr>
        <td>Weight:</td>
        <td>${weight}kg</td>
    </tr>

    </table>
    `; 
}

function contentBaseStats(){
    setIsActiv(2);
    let pokemonStat = currentPokemons['stats'];
    document.getElementById('cardMenuContend').innerHTML='';
    for (let x = 0; x < pokemonStat.length; x++) {
       document.getElementById('cardMenuContend').innerHTML += /*html*/`
        <div class="statBar">
            <div id="statName">${currentPokemons['stats'][x]['stat']['name']}</div>
            <div class="progress">
            <div class="progress-bar progress-bar-striped" role="progressbar" style="width: ${currentPokemons['stats'][x]['base_stat']-15}%" aria-valuenow="0" aria-valuemin="0" aria-valuemax="150"></div>
            </div>
        </div> 
        `;
    }
}



function contentEvonution(currentPokemon){
    setIsActiv(3);
    document.getElementById('cardMenuContend').innerHTML='';
    document.getElementById('cardMenuContend').innerHTML=/*html*/`
        
    `;
}

function setIsActiv(isActiv){
    if(isActiv==1){
        document.getElementById('menu1').classList.add('isActiv');
        document.getElementById('menu2').classList.remove('isActiv');
        document.getElementById('menu3').classList.remove('isActiv'); 
    }else if(isActiv==2){
        document.getElementById('menu2').classList.add('isActiv');
        document.getElementById('menu1').classList.remove('isActiv');
        document.getElementById('menu3').classList.remove('isActiv'); 
    }else{
        document.getElementById('menu3').classList.add('isActiv');
        document.getElementById('menu1').classList.remove('isActiv');
        document.getElementById('menu2').classList.remove('isActiv'); 
    }
}

function getSearchInput() {
    let search = document.getElementById('searchInput').value;
    let searchValue = search.toLocaleLowerCase();
    document.getElementById('searchInput').value ='';
    filterPokemon(searchValue);
}

async function filterPokemon(searchValue) {
    for (let i = 0; i < allPokemons.length; i++) {
        const pokemon = allPokemons[i];
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
        for (let i = 0; i < searchedPokemon.length; i++) {
            let currentPokemons= searchedPokemon[i];
            renderMiniCarts(currentPokemons,i); 
        }
    }
}

function noPokemonFoundTemplate(){
    document.getElementById('pokemonNames').innerHTML ='';
    document.getElementById('pokemonNames').innerHTML =/*html*/`
        <h1>Sorry i could chatch anything</h1>
        <button class="btn">Back</button>
    `;

}