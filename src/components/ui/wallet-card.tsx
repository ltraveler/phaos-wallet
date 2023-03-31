import cn from 'classnames';
import { useState } from 'react';
import { PieChart, Pie, Tooltip, Cell, ResponsiveContainer } from 'recharts';
import { ArrowUp } from '@/components/icons/arrow-up';
import { LongArrowUp } from '@/components/icons/long-arrow-up';
// import { walletCurrencies } from '@/data/static/wallet-currencies';
import { Phaos } from '@/components/icons/phaos';
import {
  getTokens,
  removeToken,
  saveToken,
  saveTokenDemo,
} from '@/components/idena/tokens';

import { getBalance, getBalanceInfo } from '../idena/idena';
import { useEffect } from 'react';
export const walletCurrencies = getTokens();
import { getIconFromName } from '@/data/static/coin-list';

export default function WalletCard() {
  const [isChangePositive, setChangeStatus] = useState(true);
  const address =
    localStorage.getItem('address') ||
    '0x0000000000000000000000000000000000000000';
  let [walletBalances, setWalletBalances] = useState([]);
  const [first, setFirst] = useState(0);
  const [load, setLoad] = useState(0);

  // get balances from getTokens
  if (first === 0) {
    setFirst(1);

    walletCurrencies.forEach(async (item, index) => {
      console.log('updating balance for: ' + item.name);
      if (item.info !== undefined) {
        // const balance = await getBalance(item.contract, address);
        const balance = await getBalance(item.contract, address);

        console.log(balance);
        walletCurrencies[index].balance = balance;
        walletCurrencies[index].balance = parseFloat(balance);
        // 1 sec
        setWalletBalances(walletCurrencies);
      } else {
        const balance = await getBalanceInfo(
          item.contract,
          address,
          item.decimals
        );

        console.log(balance);
        walletCurrencies[index].balance = balance;
        walletCurrencies[index].balance = parseFloat(balance);
        // 1 sec
        setWalletBalances(walletCurrencies);
      }
    });
    // set to local storage
    localStorage.setItem('walletCurrencies', JSON.stringify(walletCurrencies));
  }

  // time out

  const [balance, setBalance] = useState(0);

  const [percentage, setPercentage] = useState('');

  // set symbol
  const [symbol, setSymbol] = useState('');
  const [first1, setFirst1] = useState(0);

  setTimeout(() => {
    setLoad(load + 1);
    if (first1 === 0) {
      setFirst1(1);
      setSymbol(walletCurrencies[0].symbol);

      setPercentage(walletCurrencies[0].balance);
      localStorage.setItem(
        'walletCurrencies',
        JSON.stringify(walletCurrencies)
      );
    }
  }, 1000);

  const data = walletCurrencies;
  return (
    <div className="h-full rounded-lg bg-white p-6 shadow-card dark:bg-light-dark sm:p-8">
      <h3 className="mb-6 text-base font-medium uppercase">Wallet</h3>

      <div className="relative flex h-[290px] justify-center">
        <ResponsiveContainer width={290} height="100%">
          <PieChart width={290} height={290}>
            <Pie
              data={data}
              cx={140}
              cy={140}
              innerRadius={98}
              outerRadius={135}
              fill="#8884d8"
              paddingAngle={2}
              dataKey="balance"
              onMouseMove={(data) => {
                setChangeStatus(
                  data.payload.payload && data.payload.payload.balance
                );
                setPercentage(
                  data.payload.payload && data.payload.payload.balance
                );
                setSymbol(data.payload.payload && data.payload.payload.symbol);
              }}
            >
              {walletCurrencies.map((currency) => (
                <Cell
                  key={`cell-${currency.symbol}`}
                  fill={'#00BFFF'}
                  stroke="none"
                />
              ))}
            </Pie>
            <Tooltip content={<></>} />
          </PieChart>
        </ResponsiveContainer>
        <div className="absolute left-2/4 top-2/4 flex h-[156px] w-[156px] -translate-x-2/4 -translate-y-2/4 transform items-center justify-center rounded-full border border-dashed border-gray-400 bg-gray-50 dark:border-gray-600 dark:bg-gray-900">
          {percentage} {symbol}
        </div>
      </div>

      <div className="mt-20">
        <div className="mb-5 flex items-center justify-between text-sm font-medium text-gray-400">
          <span>Token Name</span>

          <span>Balance</span>
        </div>
        <ul className="grid gap-5">
          {walletCurrencies.map((currency) => (
            <li
              key={currency.code}
              className="grid grid-cols-[150px_repeat(2,1fr)] items-center justify-between text-sm font-medium text-gray-900 dark:text-white 2xl:grid-cols-[140px_repeat(2,1fr)] 3xl:grid-cols-[150px_repeat(2,1fr)]"
            >
              <span className="flex items-center gap-2.5 whitespace-nowrap">
                {getIconFromName(currency.icon)}
                {currency.name}
              </span>
              <span className="text-centr">{currency.symbol}</span>
              <span className="text-right">
                {currency.balance} {currency.symbol}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
