import cn from 'classnames';
import { useState } from 'react';
import { PieChart, Pie, Tooltip, Cell, ResponsiveContainer } from 'recharts';
import { ArrowUp } from '@/components/icons/arrow-up';
import { LongArrowUp } from '@/components/icons/long-arrow-up';
// import { walletCurrencies } from '@/data/static/wallet-currencies';
import { Phaos } from '@/components/icons/phaos';
import { getTokens, removeToken, saveToken,saveTokenDemo } from '@/components/idena/tokens';

import { getBalance } from '../idena/idena';

export const walletCurrencies = getTokens();
import { getIconFromName } from '@/data/static/coin-list';

export default function WalletCard() {
  const [isChangePositive, setChangeStatus] = useState(true);
  const address =
    localStorage.getItem('address') ||
    '0x0000000000000000000000000000000000000000';
  const [walletBalances, setWalletBalances] = useState([]);
  const [first, setFirst] = useState(0);
  const [loaded, setLoaded] = useState(0);
  // get balances from getTokens
  if (first === 0) {
    setFirst(1);
    setLoaded(1);

    walletCurrencies.forEach(async (item, index) => {

      const balance = await getBalance(item.contract, address);
      console.log(balance);
      walletCurrencies[index].balance = balance;
      // parse float for pieChart
      walletCurrencies[index].balance = parseFloat(balance);
      setWalletBalances(walletCurrencies);
      // wait
      await new Promise((r) => setTimeout(r, 500));
    });
    // wait until all have been loaded
    
  }
  console.log(walletCurrencies);
  const [balance, setBalance] = useState(0);

  const [percentage, setPercentage] = useState(walletCurrencies[0].balance);
  // set symbol
  const [symbol, setSymbol] = useState(walletCurrencies[0].code);
  const data = walletCurrencies;
  return (
    <div className="rounded-lg bg-white p-6 shadow-card dark:bg-light-dark sm:p-8">
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
      {
        loaded !== 1 ? (
          <div className="mt-6 flex items-center justify-between">
            <p>
              Loading balances <span className="text-blue-500">...</span>
            </p>
            <small>If balances are not loading, please refresh the page.</small>

          </div>
        ) : (
          <p>

          </p>
        )
      }
      <div className="mt-20">
        <div className="mb-5 flex items-center justify-between text-sm font-medium text-gray-400">
          <span>Token Name</span>
          <span>Sybmbol</span>

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
              <span className="text-center">{currency.symbol}</span>
              <span className="text-right"> {
                currency.balance === undefined ? (
                  <span className="text-blue-500">...</span>
                ) : (
                  <span>{currency.balance}</span>
                )
              }
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
