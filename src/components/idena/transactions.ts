// Transaction.ts

// api.idena.io/api/Address/{address}/Txs?limit=100



export const getTransactionData = async (address: string) => {
  const response = await fetch(`https://api.idena.io/api/Address/${address}/Txs?limit=100`);
  let data = await response.json();
  let TransactionData = [];
  console.log(data);
  data = data.result;

  data.forEach((item, index) => {
    TransactionData[index] = {
      id: index,
      transactionType: item.type,
      createdAt: item.timestamp,
      // symbol: "SOON",
      // status: "soon",
      txid: item.hash,
      address: item.to,
      amount: {
        balance: parseFloat(item.amount),
        // usdBalance: "SOON",
      },
    }
    if (item.type === "SendTx") {
      // set RECIVE or SEND
      if (item.to.toLowerCase() === address.toLowerCase()) {
        TransactionData[index].transactionType = "RECIVE";
      }
      else {
        TransactionData[index].transactionType = "SEND";
      }

    }
    else if (item.type === "CallContract") {
      // for now noting
      TransactionData[index].transactionType = item.txReceipt.method 
    }
    else {
      // remove the tx if its not a send or call
      TransactionData.splice(index, 1);
    }
  });
  return TransactionData;
  
}