import axios from "axios";

export const getCepService = async (cepValue) => {
    return await axios.get(`https://viacep.com.br/ws/${cepValue}/json`)
}