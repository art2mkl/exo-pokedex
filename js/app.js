let allPokemon = [];
let allPokemonFr = [];
const search = document.querySelector('#search');
const label = document.querySelector('.label');
const form = document.querySelector('.form');
const listePokemon = document.querySelector('.listePokemon')
const chargement = document.querySelector('.chargement');


    const types = {
        grass: '#78c850',
        ground: '#E2BF65',
        dragon: '#6F35FC',
        fire: '#F58271',
        electric: '#F7D02C',
        fairy: '#D685AD',
        poison: '#966DA3',
        bug: '#B3F594',
        water: '#6390F0',
        normal: '#D9D5D8',
        psychic: '#F95587',
        flying: '#A98FF3',
        fighting: '#C25956',
        rock: '#B6A136',
        ghost: '#735797',
        ice: '#96D9D6'
    };
    
function fetchPokemonBase() {
    fetch("https://pokeapi.co/api/v2/pokemon?limit=151")
        .then(reponse => reponse.json())
        .then(data => {

            data.results.forEach(pokemon => {

                fetchPokemonComplet(pokemon);

            })

        })
}

fetchPokemonBase();
//icone de chargement
chargement.style.opacity = "0"
if(chargement.style.opacity = "0") {
    setTimeout(() => chargement.style.display = "none",1000)
}

function fetchPokemonComplet(pokemon) {
    let objPokemonFull = {};
    let url = pokemon.url;
    let nameUs = pokemon.name;

    fetch(url)
        .then(reponse => reponse.json())
        .then((pokeData) => {

            objPokemonFull.picture = pokeData.sprites.front_default;
            objPokemonFull.type = pokeData.types[0].type.name;
            objPokemonFull.id = pokeData.id

            fetch(`https://pokeapi.co/api/v2/pokemon-species/${nameUs}`)
                .then(reponse => reponse.json())
                .then((pokeData) => {

                    objPokemonFull.name = pokeData.names[4].name;
                    allPokemon.push(objPokemonFull);
                    
                    //Trier tableau par rapport à l'index
                    
                    if (allPokemon.length === 151) {
                        allPokemon.sort((a, b) => {
                            return a.id - b.id;
                        });

                        allPokemonFr = allPokemon.slice(0,28);
                        createCard(allPokemonFr);

                    }


                })

        })
}

function createCard(arr){
    
    for (let i = 0; i < arr.length; i++) {
     
        const card = document.createElement('li');
        let couleur = types[arr[i].type];
        card.style.background = couleur;
        const txtCard = document.createElement('h5');
        txtCard.innerText = arr[i].name;
        const idCard = document.createElement('p');
        idCard.innerText = `ID : #${arr[i].id}`;
        const imgCard = document.createElement('img');
        imgCard.src = arr[i].picture;
        card.appendChild(imgCard);
        card.appendChild(txtCard);
        card.appendChild(idCard);
        listePokemon.appendChild(card)
        card.classList.add("card")  

    }
}












//scroll Infinity
window.addEventListener('scroll', () => {
    
 const {scrollTop, scrollHeight, clientHeight} = document.documentElement;   
 // scrolltop = scroll depuis top, scrollheight = hauteur totale de scroll, clientheight = hauteur de la fenetre de vision
 console.log(`scrollTop : ${scrollTop}, scrollHeight :${scrollHeight}, clientHeight${clientHeight}`);
 
 if(clientHeight + scrollTop >= scrollHeight - 20) {
    addPoke(6);

}
})

let index = 28;


function addPoke(nb) {
    if(index > 151 ) {
        return
    }
    const arrToadd = allPokemon.slice(index, index + nb)
    createCard(arrToadd)
    index += nb
}


//Recherche 

search.addEventListener('keyup', recherche);
form.addEventListener('submit', e => {
    e.preventDefault();
    recherche();
    console.log('recherche faite');
})

function recherche() {
    if(index <151 ) {
        addPoke(123);
    }
    let filter, allLi, titleValue, allTitles;
    filter = search.value.toUpperCase();
    
    allLi = document.querySelectorAll('.card')
    
    allTitles = document.querySelectorAll('.card > h5')
    

    for(let i = 0 ; i < allLi.length ; i++) {
        titleValue = allTitles[i].innerText

        if(titleValue.toUpperCase().indexOf(filter) > -1) {
            allLi[i].style.display = "flex";
        } else {
            allLi[i].style.display = "none";
        }
    }
}


//anim imput
search.addEventListener('input', e => {
    if (e.target.value !== "") {
        form.classList.add('active');
    } else if (e.target.value === "") {
        form.classList.remove('active');

    }
})
