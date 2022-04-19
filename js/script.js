const openPage = (a) => {
    let main = document.querySelector('.main')
    let page = new XMLHttpRequest()

    page.onreadystatechange = () => {
        if (page.readyState === 4 && page.status === 200 && page.response && main !== null) {
            main.innerHTML = page.response
        }
    }
    page.open('GET', `./${a}.html`)
    page.send()

}


const clickProcurar = () => {
    openPage('procurar')
}


const buscar = () => {
    const input = document.getElementById('name').value
    if (input !== '') {


        fetch(`https://pokeapi.co/api/v2/pokemon/${input}`)
            .then((resp) => resp.json())
            .then(function(data) {

                let pokemon = data;

                if (pokemon) {
                    document.querySelector('.image').innerHTML = `<img src='${pokemon.sprites.front_default}' alt=${pokemon.name}/>`
                    document.querySelector('.name_pokemon').innerHTML = `${pokemon.name}`
                    document.querySelector('.id_pokemon').innerHTML = `ID: ${pokemon.id}`
                    document.querySelector('.type').innerHTML = `${pokemon.types[0].type.name}`
                    document.querySelector('.type').className += ` ${pokemon.types[0].type.name || ''}`

                    if (pokemon.types[1]) {
                        document.querySelector('.btnTeste').innerHTML = `${pokemon.types[1].type.name}`
                        document.querySelector('.btnTeste').className += ` ${pokemon.types[1].type.name || ''}`
                    }




                    document.querySelector('.card_pokemon').className += ' show'
                    document.querySelector('.img_bg').className += ' hidden'
                }





            })

        .catch(function(error) {

        });
    }
    document.getElementById('name').value = ''

}

const listarAll = () => {

    fetch(`https://pokeapi.co/api/v2/pokemon?limit=20`)
        .then((resp) => resp.json())
        .then(function(data) {

            let pokemons = data.results;


            if (pokemons) {
                const list = document.querySelector('.list')
                list.innerHTML = ''
                pokemons.map((pokemon) => {

                    let data = {}
                    fetch(pokemon.url).then((resp) => resp.json())
                        .then(function(result) {

                            list.innerHTML += ` <div class="card_pokemon">
                            <i class="material-icons icon" onclick="favoritar()">favorite_border</i>
                            <div class="image" id="image">
            <img src="${result.sprites.front_default}"/>
                            </div>
            
                            <div class="dados">
                                <h2 class="name_pokemon" id="name_pokemon">${result.name}</h2>
                                <h3 class="id_pokemon" id="id_pokemon">ID: ${result.id}</h3>
                                <div class="buttonTypes">
                                    <button class="type ${result.types[0].type.name || ''}">${result.types[0].type.name}</button>
                                    <button class="type  ${result.types[1].type.name || ''}">  ${result.types[1].type.name || ''}</button>
                                </div>
                                <button id="detalhes">ver detalhes</button>
                            </div>
                        </div> `

                        })

                })
            }





        })

    .catch(function(error) {

    });
}


const favoritar = () => {
    let favoritesList = new Array()
    const favorites = localStorage.getItem('favorites')
    if (favorites) {
        favoritesList = JSON.parse(favorites)

    } else {

        favoritesList.push({

            name: document.getElementById('name_pokemon').innerText,
            id: document.getElementById('id_pokemon').innerText
        })

        localStorage.setItem("favorites", JSON.stringify(favoritesList))
    }
}


const openFavorites = () => {
    openPage('favorites')
        // let favoritesList = new Array()
        // const favorites = localStorage.getItem('favorites')
        // if (favorites) {
        //     favoritesList = JSON.parse(favorites)

    //     document.getElementById('conteudo').innerHTML = favoritesList[0].name


    // } else {
    //     document.getElementById('conteudo').innerHTML = `<img src="../images/astronaut.png" alt="astronaut">
    //     <div class="content">
    //         <h1>Está meio vazio por aqui!</h1>
    //         <h2>Procure por pokémons para adicioná-los aos seus favoritos.</h2>
    //         <button id="buttonProcurar" onclick="clickProcurar()">Procurar pokémons</button>
    //     </div> `
    //     openPage('favorites')
    // }


}

const listarFire = () => {

    fetch(`https://pokeapi.co/api/v2/type/fire`)
        .then((resp) => resp.json())
        .then(function(data) {

            let pokemons = data.pokemon;


            if (pokemons) {
                const list = document.querySelector('.list')
                list.innerHTML = ''
                pokemons.map((pokemon) => {

                    let data = {}
                    fetch(pokemon.pokemon.url).then((resp) => resp.json())
                        .then(function(result) {

                            list.innerHTML += ` <div class="card_pokemon">
                            <i class="material-icons icon" onclick="favoritar()">favorite_border</i>
                            <div class="image" id="image">
            <img src="${result.sprites.front_default}"/>
                            </div>
            
                            <div class="dados">
                                <h2 class="name_pokemon" id="name_pokemon">${result.name}</h2>
                                <h3 class="id_pokemon" id="id_pokemon">ID: ${result.id}</h3>
                                <div>
                                    <button class="type ${result.types[0].type.name}">${result.types[0].type.name}</button>
                                    <button class="type  ${result.types[1].type.name || ''}">  ${result.types[1].type.name || ''}</button>
                                </div>
                                <button id="detalhes">ver detalhes</button>
                            </div>
                        </div> `
                        })
                })

            }
        })
        .catch(function(error) {

        });
}

listarWater = () => {

    fetch(`https://pokeapi.co/api/v2/type/water`)
        .then((resp) => resp.json())
        .then(function(data) {

            let pokemons = data.pokemon;


            if (pokemons) {
                const list = document.querySelector('.list')
                list.innerHTML = ''
                pokemons.map((pokemon) => {

                    let data = {}
                    fetch(pokemon.pokemon.url).then((resp) => resp.json())
                        .then(function(result) {

                            list.innerHTML += ` <div class="card_pokemon">
                            <i class="material-icons icon" onclick="favoritar()">favorite_border</i>
                            <div class="image" id="image">
            <img src="${result.sprites.front_default}"/>
                            </div>
            
                            <div class="dados">
                                <h2 class="name_pokemon" id="name_pokemon">${result.name}</h2>
                                <h3 class="id_pokemon" id="id_pokemon">ID: ${result.id}</h3>
                                <div>
                                    <button class="type ${result.types[0].type.name}">${result.types[0].type.name}</button>
                                    <button class="type  ${result.types[1].type.name || ''}">  ${result.types[1].type.name || ''}</button>
                                </div>
                                <button id="detalhes">ver detalhes</button>
                            </div>
                        </div> `
                        })
                })

            }
        })
        .catch(function(error) {

        });
}

listarEletric = () => {

    fetch(`https://pokeapi.co/api/v2/type/electric`)
        .then((resp) => resp.json())
        .then(function(data) {

            let pokemons = data.pokemon;
            (pokemons)

            if (pokemons) {
                const list = document.querySelector('.list')
                list.innerHTML = ''
                pokemons.map((pokemon) => {

                    let data = {}
                    fetch(pokemon.pokemon.url).then((resp) => resp.json())
                        .then(function(result) {

                            list.innerHTML += ` <div class="card_pokemon">
                            <i class="material-icons icon" onclick="favoritar()">favorite_border</i>
                            <div class="image" id="image">
            <img src="${result.sprites.front_default}"/>
                            </div>
            
                            <div class="dados">
                                <h2 class="name_pokemon" id="name_pokemon">${result.name}</h2>
                                <h3 class="id_pokemon" id="id_pokemon">ID: ${result.id}</h3>
                                <div>
                                    <button class="type ${result.types[0].type.name}">${result.types[0].type.name}</button>
                                    <button class="type  ${result.types[1].type.name || ''}">  ${result.types[1].type.name || ''}</button>
                                </div>
                                <button id="detalhes">ver detalhes</button>
                            </div>
                        </div> `
                        })
                })

            }
        })
        .catch(function(error) {

        });
}