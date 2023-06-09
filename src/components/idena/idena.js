
let url = process.env.NEXT_PUBLIC_SHARED_API_URL;
let api_key = process.env.NEXT_PUBLIC_SHARED_API_KEY;

function hexToDec(hexString) {
  let num = parseInt(hexString, 16);
  return num;
}

function formatString(string, decimals) {
  let result;
  if (string.length - decimals <= 0) {
    result = '0.';
    while (string.length - decimals < 0) {
      result = result + '0';
      decimals--;
    }
    result = result + string;
    return result;
  }
  result =
    string.slice(0, string.length - decimals) +
    '.' +
    string.slice(string.length - decimals);
  for (var i = result.length - 1; result[i] == '0'; i--);
  if (result[i] == '.') i--;
  result = result.slice(0, i + 1);
  return result;
}

function addDecimals(string, decimals) {
  console.log(string, decimals);
  let a = string.indexOf('.');
  if (a == -1) return BigInt(string) * 10n ** BigInt(decimals);
  let len = Number(decimals) - string.slice(a + 1).length;
  string = string.slice(0, a) + string.slice(a + 1);
  let num = BigInt(string);
  return num * 10n ** BigInt(len);
}

function hexToBigInt(hexString) {
  return BigInt(hexString);
}

function hex_to_ascii(str1) {
  var hex = str1.toString();
  var str = '';
  for (var n = 2; n < hex.length; n += 2) {
    str += String.fromCharCode(parseInt(hex.substr(n, 2), 16));
  }
  return str;
}

async function rpcCall(callData) {
  let response = await fetch(url, {
    method: 'POST',
    body: JSON.stringify(callData),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  let result;
  try {
    result = await response.json();
  } catch (err) {
    console.log(err);
    //toast.error("Something went wrong!");
    return;
  }
  return result;
}

async function getName(tokenAddr) {
  let callData = {
    method: 'contract_estimateCall',
    params: [
      {
        contract: tokenAddr,
        method: 'name',
        amount: null,
        args: [],
      },
    ],
    id: 1,
    key: api_key,
  };
  let response = await rpcCall(callData);
  let name = hex_to_ascii(response.result.actionResult.outputData);
  //console.log(name)
  return name;
}

async function getSymbol(tokenAddr) {
  let callData = {
    method: 'contract_estimateCall',
    params: [
      {
        contract: tokenAddr,
        method: 'symbol',
        amount: null,
        args: [],
      },
    ],
    id: 1,
    key: api_key,
  };
  let response = await rpcCall(callData);
  let symbol = hex_to_ascii(response.result.actionResult.outputData);
  //console.log(symbol)
  return symbol;
}

async function getDecimals(tokenAddr) {
  let callData = {
    method: 'contract_estimateCall',
    params: [
      {
        contract: tokenAddr,
        method: 'decimals',
        amount: null,
        args: [],
      },
    ],
    id: 1,
    key: api_key,
  };
  console.log(callData);
  let response = await rpcCall(callData);
  console.log('GET DEC', response);

  let decimals = hexToDec(response.result.actionResult.outputData);
  //console.log(decimals)
  return decimals;
}

async function getBalance(tokenAddr, address) {
  // wait 1 sec
  new Promise((resolve) => setTimeout(resolve, 1000));
  let decimals = await getDecimals(tokenAddr);
  let callData = {
    method: 'contract_estimateCall',
    params: [
      {
        contract: tokenAddr,
        method: 'getBalance',
        amount: null,
        args: [
          {
            index: 0,
            format: 'hex',
            value: address,
          },
        ],
      },
    ],
    id: 1,
    key: api_key,
  };

  // remove things that can break hex

  console.log(callData);
  let response = await rpcCall(callData);
  console.log('GET BALANCE', response);

  let balance = hexToBigInt(response.result.actionResult.outputData);
  if (balance == 0) {
    console.log('0');
    return '0';
  }

  return formatString(balance.toString(), decimals);
}
async function getBalanceInfo(tokenAddr, address,decimals) {
    // wait 1 sec
    let callData = {
      method: 'contract_estimateCall',
      params: [
        {
          contract: tokenAddr,
          method: 'getBalance',
          amount: null,
          args: [
            {
              index: 0,
              format: 'hex',
              value: address,
            },
          ],
        },
      ],
      id: 1,
      key: api_key,
    };
  
    // remove things that can break hex
  
    console.log(callData);
    let response = await rpcCall(callData);
    console.log('GET BALANCE', response);
  
    let balance = hexToBigInt(response.result.actionResult.outputData);
    if (balance == 0) {
      console.log('0');
      return '0';
    }
  
    return formatString(balance.toString(), decimals);
  }
async function estimateGasCost(tokenAddr, args) {
  let callData = {
    method: 'contract_estimateCall',
    params: [
      {
        contract: tokenAddr,
        method: 'transfer',
        args: args,
      },
    ],
    id: 1,
    key: api_key,
  };
  console.log(callData);
  let response = await rpcCall(callData);
  console.log('ESTIMATE GAS COST', response);
  return Number(response.result.txFee) + Number(response.result.gasCost) + 0.02;
}

async function hasClaimed(address) {
  let callData = {
    method: 'contract_readMap',
    params: [
      '0xF3845AE80f86ef29a061C71bc66f7B4700FcFC87', // Our token address
      'c:',
      address,
      'byte',
    ],
    id: 1,
    key: api_key,
  };
  let response = await rpcCall(callData);
  if (response.result) return 1; // claimed
  return 0; // not claimed
}

async function claimTx(address) {
  if (await hasClaimed(address)) {
    // ADDRESS FROM IDENA AUTH SIGN IN
    // do something
    return 0;
  }
  let callData = {
    method: 'bcn_getRawTx',
    params: [
      {
        type: 16,
        from: address, // ADDRESS FROM IDENA AUTH SIGN IN
        to: '0xF3845AE80f86ef29a061C71bc66f7B4700FcFC87', // Our token address
        amount: 0,
        maxFee: 0.5,
        payload: '0x0a05636c61696d', // claim method
        useProto: true,
      },
    ],
    id: 1,
    key: api_key,
  };
  let response = await rpcCall(callData);
  if (response.error) {
    console.log(response.error);
    return;
  }
  //console.log(response.result);
  return response.result;
}

async function getTransferCall(tokenAddr, destination, from, amount, maxFee) {
  let bigAmount = addDecimals(amount, await getDecimals(tokenAddr));
  console.log(tokenAddr, destination, amount, maxFee);
  console.log(bigAmount);
  if (!maxFee) {
    // estimate fee if not provided
    let args = [
      {
        index: 0,
        format: 'hex',
        value: destination,
      },
      {
        index: 1,
        format: 'bigint',
        value: bigAmount.toString(),
      },
    ];
    maxFee = await estimateGasCost(tokenAddr, args);
  }
  let callData = {
    method: 'bcn_getRawTx',
    params: [
      {
        type: 16,
        from: from, // ADDRESS FROM IDENA AUTH SIGN IN
        to: tokenAddr,
        amount: 0,
        maxFee: maxFee,
        payload: transferPayload(destination, bigAmount),
        useProto: true,
      },
    ],
    id: 1,
    key: api_key,
  };

  let response = await rpcCall(callData);
  if (response.error) {
    console.log(response.error);
    return;
  }
  //console.log(response.result);
  return response.result;
}

async function getTransferCallInfo(
  tokenAddr,
  destination,
  from,
  amount,
  Decimals
) {
  let bigAmount = addDecimals(amount, Decimals);
  console.log(tokenAddr, destination, amount);
  console.log(bigAmount);
  let args = [
    {
      index: 0,
      format: 'hex',
      value: destination,
    },
    {
      index: 1,
      format: 'bigint',
      value: bigAmount.toString(),
    },
  ];
  let maxFee = await estimateGasCost(tokenAddr, args);
  let callData = {
    method: 'bcn_getRawTx',
    params: [
      {
        type: 16,
        from: from, // ADDRESS FROM IDENA AUTH SIGN IN
        to: tokenAddr,
        amount: 0,
        maxFee: maxFee,
        payload: transferPayload(destination, bigAmount),
        useProto: true,
      },
    ],
    id: 1,
    key: api_key,
  };

  let response = await rpcCall(callData);
  if (response.error) {
    console.log(response.error);
    return;
  }
  //console.log(response.result);
  return response.result;
}
function transferPayload(dest, amount) {
  dest = dest.slice(2);
  let payload = '0x0a';
  payload = payload + '087472616e73666572';
  payload = payload + '12';
  payload = payload + '14';
  payload = payload + dest;
  payload = payload + '12';
  let amountHex = amount.toString(16);
  if (amountHex.length % 2 == 1) {
    amountHex = '0' + amountHex;
  }
  let amountLength = (amountHex.length / 2).toString(16);
  if (amountLength.length % 2 == 1) {
    amountLength = '0' + amountLength;
  }
  payload = payload + amountLength;
  payload = payload + amountHex;
  return payload;
}
async function txReceipt(tx_hash){
  let callData={
     "method": "bcn_txReceipt",
      "params": [
          tx_hash
      ],
      "id": 1,
      "key": api_key
  };
  let response = await rpcCall(callData);
  return response;
}

// export all functions
module.exports = {
  getBalance,
  getBalanceInfo,
  getSymbol,
  getName,
  getDecimals,
  getTransferCall,
  getTransferCallInfo,
  claimTx,
  hasClaimed,
  txReceipt
};
