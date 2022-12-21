
const openPage = (a) => {
    let main = document.querySelector('.main')
    let page = new XMLHttpRequest()

    page.onreadystatechange = () => {
        if (page.readyState === 4 && page.status === 200 && page.response && main !== null) {
            main.innerHTML = page.response
        }
        if(a == 'todos'){
             listarAll()
        }
        if(a == 'favorites'){
            console.log('passou aquiiiiiiiiiiiiiiiii')
            openFavorites()
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
                console.log(data)
                let pokemon = data;
                document.querySelector('span').innerHTML = '1 resultado encontrado'
                if (pokemon) {
                    console.log('aq')
                    document.querySelector('.image').innerHTML = `<img src='${pokemon.sprites.front_default}' alt=${pokemon.name}/>`
                    document.querySelector('.name_pokemon').innerHTML = `${pokemon.name}`
                    document.querySelector('.id_pokemon').innerHTML = `ID: ${pokemon.id}`
                    document.querySelector('.type').innerHTML = `${pokemon.types[0].type.name}`
                    document.querySelector('.type').className += ` ${pokemon.types[0].type.name || ''}`
                    console.log(pokemon.types, 'aq2')
                    if (pokemon.types[1]) {
                        console.log(document.querySelector('.btnTeste'))
                        document.querySelector('.btnTeste').innerHTML = `${pokemon.types[1].type.name}`
                        document.querySelector('.btnTeste').className += ` ${pokemon.types[1].type.name || ''}`
                        document.querySelector('.btnTeste').style.display = 'flex'
                    }




                    document.querySelector('.card_pokemon').className += ' show'
                    document.querySelector('.img_bg').className += ' hidden'
                }





            })

        .catch(function(error) {
            document.querySelector('span').innerHTML = '0 resultados encontrados'
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
                            <i class="material-icons icon" onclick="favoritar(this)">favorite_border</i>
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

    eventBtn(document.querySelector(`[id=all]`))
}


function geraCard(result){
    return ` <div class="card_pokemon">
    <i class="material-icons icon" onclick="favoritar(this)">favorite_border</i>
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
}

function buscarNome(nome){
    fetch(`https://pokeapi.co/api/v2/pokemon/${nome}`)
    .then((resp) => resp.json())
    .then(function(data) {
        console.log(data)
        document.getElementById('conteudo').innerHTML += geraCard(data)
    })
}


const favoritar = (icone) => {
    let favoritesList = new Array()
    const favorites = localStorage.getItem('favorites')
    const card = icone.closest('.card_pokemon')
    const newFavorite = {
        name: card.querySelector('#name_pokemon').innerText,
        id: card.querySelector('#id_pokemon').innerText
    }
    let isExist = false
    console.log(favorites)
    if (favorites) {
        favoritesList = JSON.parse(favorites)

    }
    favoritesList.map(item => {
        console.log(item ,newFavorite,newFavorite == item )
        if(newFavorite.id == item.id){
            isExist = true
        }
    })
    if(!isExist){
        favoritesList.push({
            name: card.querySelector('#name_pokemon').innerText,
            id: card.querySelector('#id_pokemon').innerText
        })
        icone.style.color = 'red'
    }else{
       favoritesList = favoritesList.filter(item => item.id !== newFavorite.id)
    }
    

   



    localStorage.setItem("favorites", JSON.stringify(favoritesList))
}

 const openFavorites = async() => {
    document.getElementById('conteudo').innerHTML = ''
         let favoritesList = new Array()
         const favorites = localStorage.getItem('favorites')
         if (favorites) {
             favoritesList = JSON.parse(favorites)
        console.log(favoritesList)
             favoritesList.forEach(item => {
               console.log(item)
                 buscarNome(item.name)
             })
         
     } else {
         document.getElementById('conteudo').innerHTML = `<img src="../images/astronaut.png" alt="astronaut">
         <div class="content">
             <h1>Está meio vazio por aqui!</h1>
             <h2>Procure por pokémons para adicioná-los aos seus favoritos.</h2>
             <button id="buttonProcurar" onclick="clickProcurar()">Procurar pokémons</button>
         </div> `
       
     }

    
}


listarPorCategoria = (categoria) => {
   eventBtn(document.querySelector(`[id=${categoria}]`))
    fetch(`https://pokeapi.co/api/v2/type/${categoria}`)
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
                            <i class="material-icons icon" onclick="favoritar(this)">favorite_border</i>
                            <div class="image" id="image">
            <img src="${result.sprites.front_default}"/>
                            </div>
            
                            <div class="dados">
                                <h2 class="name_pokemon" id="name_pokemon">${result.name}</h2>
                                <h3 class="id_pokemon" id="id_pokemon">ID: ${result.id}</h3>
                                <div class="buttonTypes">
                                    <button class="type ${result.types[0].type.name}">${result.types[0].type.name}</button>
                                   ${result.types[1] ?  `<button class="type  ${result.types[1].type.name}">  ${result.types[1].type.name || ''}</button> `: ''}
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

eventBtn = (btn) => {
    if(btn){
        const btns = document.querySelectorAll('.buttonOption')
    const arr = Array.from(btns)
    console.log(btns, btn)

    const btnsDesativados = arr.filter(item => item != btn)
    
    btn.classList.add('active')
    btnsDesativados.forEach(button => button.classList.remove('active'))
    }

}


openPage('favorites')
