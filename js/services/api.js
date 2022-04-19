import axios from 'axios'


const apiPoke = axios.create({
    baseURL: 'https://pokeapi.co/api/v2/'
})


export const getPokemon = async(name) => {
    const response = await apiPoke.get(`pokemon/${name}`)
    return response.data
}

export default apiPoke