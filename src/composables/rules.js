import { RemoveMaskToPhone } from "./useMasks"
import { validCPF } from "./verify"

export const verifyNameInput = [
    v => v.trim().length > 0 || "Campo Obrigatório. preencha seu nome completo!"

]

export const verifyTelephoneNumber = [
    v => v.trim().length > 0 || "Campo Obrigatório. preencha seu Telefone!",
    v => RemoveMaskToPhone(v).trim().length === 11 || "Número inválido, por favor informe um número válido! ex: (xx)xxxxxxxxx"
]

export const verifyNeighborhoodInput = [
    v => v.trim().length > 0 || "Campo Obrigatório. preencha o Bairro!"

]
export const verifyStreetOrAvenueInput = [
    v => v.trim().length > 0 || "Campo Obrigatório. preencha a avenia/Rua!"

]

export const verifyHouseNumberInput = [
    v => v.trim().length > 0 || "Campo Obrigatório. preencha o número da casa/apartamento!"
]


export const verifyCepRules = [
    v => v.trim().length > 0 || "Campo Obrigatório, preencha o CEP",
    v => v.trim().length === 8 || "Por Favor, informe um CEP válido nesse formato Ex: xxxxx-xxx"
]

export const verifyCpf = [
    v => v.trim().length > 0 || 'Campo obrigatório, por favor digite seu CPF!',
    v => validCPF(v) || 'CPF inválido!'
]

export const verifyCardNumber = [
    v => v.length > 0 || 'Campo obrigatório, por favor digite o número do seu cartão!',
]

export const verifyDueDate = [
    v => v.trim().length > 0 || 'Campo obrigatório, por favor digite a data de vencimento!',
]

export const verifyCVV = [
    v => v.trim().length > 0 || 'Campo obrigatório, por favor digite o CVV!',
]