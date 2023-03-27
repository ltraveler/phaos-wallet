// Tokens.ts
// This file contains function for storing and retrieving tokens from local storage

import { getBalance , getSymbol, getName, getDecimals} from './idena'
// import localStorage from 
import { Idena } from '@/components/icons/idena';

export const saveToken = (token_contract: string) => {
    // array
    if(typeof window !== "undefined") {
        let tokens = JSON.parse(localStorage.getItem('tokens') || '[]')
        if (tokens === null) {
            tokens = []
        }
        let token  = {
            contract: token_contract,
            symbol: getSymbol(token_contract),
            name: getName(token_contract),
            decimals: getDecimals(token_contract),
            icon: "Idena",
        }
        tokens.push(token)
        localStorage.setItem('tokens', JSON.stringify(tokens))
    } else {
        return null
    }
}

export const saveTokenDemo = () => {
    // array
    if(typeof window !== "undefined") {
        let tokens = JSON.parse(localStorage.getItem('tokens') || '[]')
        if (tokens === null) {
            tokens = []
        }
        let token  = {
            contract: '0x00000000',
            symbol: 'PHOS 1',

            name: 'Phonon',
            decimals: 18,
            icon: "Idena",
        }
        tokens.push(token)
        localStorage.setItem('tokens', JSON.stringify(tokens))
    } else {
        return null
    }
}

export const removeToken = (token_contract: string) => {
    // array
    if(typeof window !== "undefined") {
        let tokens = JSON.parse(localStorage.getItem('tokens') || '[]')
        for (let i = 0; i < tokens.length; i++) {
            if (tokens[i].contract === token_contract) {
                tokens.splice(i, 1)
            } else {
                console.log('not found')
            }
        }
        localStorage.setItem('tokens', JSON.stringify(tokens))
        
    } else {
        return null
    }

}

export const getTokens = () => {
    // array
    if(typeof window !== "undefined") {
        let tokens = JSON.parse(localStorage.getItem('tokens') || '[]')

        if (tokens.length === 0) {
            tokens = [
                {
                    contract: '0x00000000',
                    symbol: 'PHOS',
                    name: 'Phonon',
                    decimals: 18,
                    icon: "Idena"
                },
            ]
            // save 
            localStorage.setItem('tokens', JSON.stringify(tokens))
        }
        return tokens
    } else {
        return null
    }

}


export default {
    saveToken,
    removeToken,
    getTokens,
}
