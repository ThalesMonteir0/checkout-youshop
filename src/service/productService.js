import { apiInstance } from './api.js'

export const getProduct = async (paramsID) => {
    const urlWithParamsID = `/offers/${paramsID}`
    return await apiInstance.get(urlWithParamsID)
}

export const postProduct = async (paramsID, body) => {
    const urlWithParamsID = `/offers/${paramsID}/create_order`
    return await apiInstance.post(urlWithParamsID, body)
}

