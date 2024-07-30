import axios from 'axios'

//Sustituir por la ruta de las ordenes yo cómo lo estoy probando con una api en mi local puse esta
const baseURL = 'http://localhost:4000'

export const getAll = async () => {
    try {
        return await axios.get(`${baseURL}/ordenes`)
    } catch (error) {
        return []
    }
}

