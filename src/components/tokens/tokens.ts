// Tokens.ts
// This file contains function for storing and retrieving tokens from local storage

import { getBalance , getSymbol, getName, getDecimals} from './idena'
// import localStorage from 

export const saveToken = (token_contract: string) => {
    // array

    let tokens = JSON.parse(localStorage.getItem('tokens') || '[]')
    if (tokens === null) {
        tokens = []
    }
    let token  = {
        contract: token_contract,
        symbol: getSymbol(token_contract),
        name: getName(token_contract),
        decimals: getDecimals(token_contract),
    }
    tokens.push(token)
    localStorage.setItem('tokens', JSON.stringify(tokens))
}

export const removeToken = (token_contract: string) => {
    // array
    let tokens = JSON.parse(localStorage.getItem('tokens') || '[]')
    if (tokens === null) {
        tokens = []
    }
    tokens = tokens.filter((token: string) => token !== token_contract)
    localStorage.setItem('tokens', JSON.stringify(tokens))
}

export const getTokens = () => {
    // array
    
    let tokens = JSON.parse(localStorage.getItem('tokens') || '[]')
    if (tokens === null) {
        tokens = [
            {
                contract: '0x00000000',
                symbol: 'Phonon',
                name: 'Phonon',
                decimals: 18,
            },
        ]
    }
    return tokens
}


export default {
    saveToken,
    removeToken,
    getTokens,
}