// Tokens.ts
// This file contains function for storing and retrieving tokens from local storage

import { getBalance, getSymbol, getName, getDecimals } from './idena';
// import localStorage from
import { Phaos } from '@/components/icons/phaos';
async function getTokenSymbol(token_contract) {
  const symbol = await getSymbol(token_contract);
  return symbol;
}

export const saveToken = (token_contract: string) => {
  // array
  if (typeof window !== 'undefined') {
    let tokens = JSON.parse(localStorage.getItem('tokens') || '[]');
    if (tokens === null) {
      tokens = [];
    }
    // if we already have this token, don't add it again
    for (let i = 0; i < tokens.length; i++) {
      if (tokens[i].contract === token_contract) {
        return null;
      }
    }
    let token = {
      contract: token_contract,
      symbol: '',
      name: 'test',
      decimals: 0,
      icon: 'Idena',
    };

    // now wait until all promises are resolved
    Promise.all([
      getSymbol(token_contract),
      getName(token_contract),
      getDecimals(token_contract),
    ]).then((values) => {
      console.log(values);
      token.symbol = values[0];
      token.name = values[1];
      token.decimals = values[2];
      console.log(token);
      tokens.push(token);
      localStorage.setItem('tokens', JSON.stringify(tokens));
    });
  } else {
    return null;
  }
};
export const saveTokenInfo = (token_contract: string, token_symbol: string, token_name: string, token_decimals: number) => {
  // array
  if (typeof window !== 'undefined') {
    let tokens = JSON.parse(localStorage.getItem('tokens') || '[]');
    if (tokens === null) {
      tokens = [];
    }
    // if we already have this token, don't add it again
    for (let i = 0; i < tokens.length; i++) {
      if (tokens[i].contract === token_contract) {
        return null;
      }
    }
    let token = {
      contract: token_contract,
      symbol: token_symbol,
      name: token_name,
      decimals: token_decimals,
      icon: 'Idena',
      type: 'info',
    };
    tokens.push(token);
    localStorage.setItem('tokens', JSON.stringify(tokens));

  } else {
    return null;
  }
};

export const saveTokenDemo = () => {
  // array
  if (typeof window !== 'undefined') {
    let tokens = JSON.parse(localStorage.getItem('tokens') || '[]');
    if (tokens === null) {
      tokens = [];
    }
    let random_3nums = Math.floor(Math.random() * 1000);
    let token = {
      contract: '0x00000000' + random_3nums,
      symbol: 'PHO' + random_3nums,

      name: 'Phaos Demo' + random_3nums,
      decimals: 18,
      icon: 'Phaos',
    };
    tokens.push(token);
    localStorage.setItem('tokens', JSON.stringify(tokens));
  } else {
    return null;
  }
};

export const removeToken = (token_contract: string) => {
  if (token_contract == "0xa48B78D1638C4184bcc319Dcd9c2448b7431BF8E") {
    return null;
  }
  if (typeof window !== 'undefined') {
    let tokens = JSON.parse(localStorage.getItem('tokens') || '[]');
    for (let i = 0; i < tokens.length; i++) {
      if (tokens[i].contract === token_contract) {
        tokens.splice(i, 1);
      } else {
        console.log('not found');
      }
    }
    localStorage.setItem('tokens', JSON.stringify(tokens));
  } else {
    return null;
  }
};

export const getTokens = () => {
  // array
  if (typeof window !== 'undefined') {
    let tokens = JSON.parse(localStorage.getItem('tokens') || '[]');

    if (tokens.length === 0) {
      tokens = [
        {
          contract: '0xa48B78D1638C4184bcc319Dcd9c2448b7431BF8E',
          symbol: 'PHO',
          name: 'Phaos',
          decimals: 18,
          icon: 'Phaos',
        },
      ];
      // save
      localStorage.setItem('tokens', JSON.stringify(tokens));
    }
    return tokens;
  } else {
    return null;
  }
};

export default {
  saveToken,
  removeToken,
  getTokens,
};
