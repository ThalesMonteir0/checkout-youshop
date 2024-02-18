export const AddMaskToPhone = (value) => { 
    let enteredValueWithoutLetters = value.replace(/\D/g, '')
    if(enteredValueWithoutLetters.length < 2){
        return enteredValueWithoutLetters
    }
    let telephoneFormated = ''

    if(enteredValueWithoutLetters.length >= 2){
        telephoneFormated += `(${enteredValueWithoutLetters.substring(0,2)})`
    }

    if(enteredValueWithoutLetters.length > 2){
        telephoneFormated += `${enteredValueWithoutLetters.substring(2,7)}`
    }

    if(enteredValueWithoutLetters.length > 7){
        telephoneFormated += `-${enteredValueWithoutLetters.substring(7,11)}`
    }

    return telephoneFormated
}

export const RemoveMaskToPhone = (value) => {
    return value.replace(/\D/g, '');
}

export const formatStringToCurrency = (value) => { 
    return value.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    })
}