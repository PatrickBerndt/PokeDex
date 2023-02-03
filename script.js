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

function addTypeBg(currentPokemon,i){
    let id = document.getElementById(`pokemonMiniCard${i}`);
    let typ = currentPokemon['types'][0]['type']['name'];
    if(typ=='grass'){
        id.classList.add('grass');
    }else if(typ=='water'){
        id.classList.add('water');
    }else if(typ=='fire'){
        id.classList.add('fire');
    }else if(typ=='bug'){
        id.classList.add('bug');
    }else if(typ=='poison'){
        id.classList.add('poison');
    }else if(typ=='psychic'){
        id.classList.add('psychic');
    }else if(typ=='normal'){
        id.classList.add('normal');
    }else if(typ=='electric'){
        id.classList.add('electric');
    }else if(typ=='ground'){
        id.classList.add('ground');
    }else if(typ=='fighting'){
        id.classList.add('fighting');
    }else if(typ=='fairy'){
        id.classList.add('fairy');
    }else if(typ=='ghost'){
        id.classList.add('ghost');
    }else if(typ=='rock'){
        id.classList.add('rock');
    }else if(typ=='ice'){
        id.classList.add('ice');
    }else if(typ=='dragon'){
        id.classList.add('dragon');
    }else if(typ=='dark'){
        id.classList.add('dark');
    }
}   
