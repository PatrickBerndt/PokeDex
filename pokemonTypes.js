function addTypeBg(currentPokemon,i){
    let id = document.getElementById(`pokemonMiniCard${i}`);
    let typ = currentPokemon['types'][0]['type']['name'];
    id.classList.add(`${typ}`);
}   
function fullscreenBg(currentPokemon){
    let id = document.getElementById(`fullscreenBg`);
    let typ = currentPokemon['types'][0]['type']['name'];
    let types = currentPokemon['types'];
    id.classList.add(`${typ}`);
    for (let j = 0; j < types.length; j++) {
        const currentType = types[j];
        document.getElementById('typeBox').innerHTML += /*html*/`
        <div class="boxForType"><h3>${currentType['type']['name']}</h3></div>
        `;
    }
}   
