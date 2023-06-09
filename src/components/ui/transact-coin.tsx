import cn from 'classnames';
import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Tab, TabPanels, TabPanel } from '@/components/ui/tab';
import { ChevronDown } from '@/components/icons/chevron-down';
import { CustomToken } from '@/components/icons/custom-token';
import { CustomTokenErc20 } from '@/components/icons/custom-token-erc20';
import { AddTokenPlus } from '@/components/icons/add-token-plus';
import { RemoveTokenMinus } from '@/components/icons/remove-token-minus';
import { SendToken } from '@/components/icons/send-token';
import { AddRemoveCtrl } from '@/components/icons/add-remove-ctrl';
// import { coinList } from '@/data/static/coin-list';
import {
  getTokens,
  removeToken,
  saveToken,
  saveTokenDemo,
  saveTokenInfo,
} from '@/components/idena/tokens';
import { getTransferCall, getTransferCallInfo } from '../idena/idena';

// let coinList = getTokens();
import Button from '@/components/ui/button';
import { IconUSFlag } from '@/components/icons/icon-us-flag';
import { useIsMounted } from '@/lib/hooks/use-is-mounted';
import { useBreakpoint } from '@/lib/hooks/use-breakpoint';
import CoinListBox from '@/components/ui/coin-listbox';

const tabMenu = [
  {
    title: (
      <>
        <SendToken className="mr-1 inline-block h-auto w-5 fill-white" />
        Send
      </>
    ),
    path: 'send',
  },
  {
    title: (
      <>
        <CustomTokenErc20 className="mr-1 inline-block h-auto w-5 fill-white" />
        IRC20
      </>
    ),
    path: 'erc20',
  },
  {
    title: (
      <>
        <CustomToken className="mr-1 inline-block h-auto w-5 fill-white" />
        Custom
      </>
    ),
    path: 'custom',
  },
];

function TabItem({
  children,
  className,
}: React.PropsWithChildren<{ className?: string }>) {
  return (
    <Tab
      className={({ selected }) =>
        cn(
          'relative z-0 uppercase tracking-wider hover:text-gray-900 focus:outline-none dark:hover:text-white',
          {
            'font-medium text-white hover:text-white focus:text-white':
              selected,
          },
          className
        )
      }
    >
      {({ selected }) => (
        <>
          <span className="justify-stretch flex w-full px-3 md:px-0">
            {children}
          </span>
          {selected && (
            <motion.span
              className={cn(
                'absolute bottom-0 left-0 right-0 -z-[1] h-full w-full rounded-lg bg-brand shadow-button'
              )}
              layoutId="activeTabIndicator"
            />
          )}
        </>
      )}
    </Tab>
  );
}

type CoinTransactionProps = {
  transactionType: string;
};

function CoinTransaction({ transactionType }: CoinTransactionProps) {
  let [amount, setAmount] = useState<any>(0);
  console.log('GET TOKENS', getTokens());
  let coinList = getTokens();
  const [firstCoin, setFirstCoin] = useState(coinList[0]);
  const [secondCoin, setSecondCoin] = useState(coinList[1]);
  const [conversionRate, setConversionRate] = useState(0);
  const [exchangeRate, setExchangeRate] = useState(0);
  const [customType, setCustomType] = useState(0);
  let decimalPattern = /^[0-9]*[.,]?[0-9]*$/;

  const handleOnChangeFirstCoin = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.value.match(decimalPattern)) {
      setAmount(event.target.value);
      const price = amount * firstCoin.price;
      setConversionRate(price || 0);
    }
  };
  const handleOnChangeSecondCoin = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.value.match(decimalPattern)) {
      setAmount(event.target.value);
      const price = parseFloat(event.target.value) * secondCoin.price;
      setConversionRate(price || 0);
    }
  };

  return (
    <>
      {/* <div className="relative mt-4 flex h-11 w-full items-center justify-between rounded-lg border border-gray-100 bg-body px-4 pl-3 text-sm text-gray-900 dark:border-gray-700 dark:bg-light-dark dark:text-white sm:h-13 sm:pl-4">
        <span className="relative flex items-center gap-3 font-medium">
          <IconUSFlag className="h-6 w-6 sm:h-[30px] sm:w-[30px]" /> USD
        </span>
        <span className="absolute top-0 h-full w-[1px] bg-gray-100 ltr:left-24 rtl:right-24 dark:bg-gray-700" />
        <span className="text-sm sm:text-base">
          {conversionRate.toFixed(4)}
        </span>
      </div> */}

      {transactionType === 'send' && (
        <div>
          <div className="group relative flex rounded-lg border border-gray-200 transition-colors duration-200 hover:border-gray-900 dark:border-gray-700 dark:hover:border-gray-600">
            <CoinListBox
              coins={coinList}
              selectedCoin={firstCoin}
              setSelectedCoin={setFirstCoin}
            />

            <input
              type="text"
              value={amount}
              placeholder="0.0"
              inputMode="decimal"
              onChange={handleOnChangeFirstCoin}
              id="amount-input"
              className="md w-full rounded-lg border-0 text-base outline-none focus:ring-0 ltr:text-right rtl:text-left dark:bg-light-dark"
            />
          </div>
          <div className="mt-4">
            <input
              type="text"
              placeholder="Wallet address"
              id="wallet-address"
              className="h-11 w-full rounded-lg border border-gray-200 text-sm dark:border-gray-700 dark:bg-light-dark sm:h-13 sm:text-base"
            />
          </div>
          <Button
            size="large"
            shape="rounded"
            fullWidth={true}
            className="mt-6 uppercase xs:mt-8 xs:tracking-widest xl:px-2 2xl:px-9"
            onClick={() => {
              let token_contract = firstCoin.contract;
              let destination = document.getElementById('wallet-address').value;
              let amount = document.getElementById('amount-input').value;
              console.log('TOKEN', token_contract);
              console.log('DESTINATION', destination);
              console.log('AMOUNT', amount);
              console.log('DECIMALS', firstCoin.decimals);
              console.log('TYPE', firstCoin.type);
              let address = localStorage.getItem('address' || '');
              let walletContract = localStorage.getItem(
                'walletCurrencies' || ''
              );
              console.log('walletContract', walletContract);
              // json
              walletContract = JSON.parse(walletContract || '');
              for (let i = 0; i < walletContract.length; i++) {
                console.log('COIN', walletContract[i]);

                if (walletContract[i].contract === token_contract) {
                  console.log('BALANCE', walletContract[i].balance);
                  if (walletContract[i].balance < amount) {
                    alert('Insufficient balance');
                    // stop
                    return;
                  }
                }
              }
              // make sure all inputs are good
              if (destination === '') {
                alert('Please enter a valid wallet address');
                return;
              }
              if (amount === '') {
                alert('Please enter a valid amount');
                return;
              }
              if (destination.length !== 42) {
                alert('Please enter a valid wallet address');
                return;
              }
              if (amount <= 0) {
                alert('Please enter a valid amount');
                return;
              }

              if (firstCoin.type === 'info') {
                console.log(
                  'INFO',
                  token_contract,
                  destination,
                  address,
                  amount,
                  firstCoin.decimals
                );
                try {
                  getTransferCallInfo(
                    token_contract,
                    destination,
                    address,
                    amount,
                    firstCoin.decimals
                  ).then((res) => {
                    console.log('RES', res);
                    window.location.href =
                      'https://app.idena.io/dna/raw?tx=' +
                      res +
                      '&callback_format=html&callback_url=' +
                      process.env.NEXT_PUBLIC_WALLET_DOMAIN +
                      '/tx/'; //PHAOS.APP CHANGE
                  });
                } catch (error) {
                  console.log('ERROR', error);
                  alert('Transaction failed, please check your inputs');
                }
              } else {
                try {
                  getTransferCall(
                    token_contract,
                    destination,
                    address,
                    amount
                  ).then((res) => {
                    console.log('RES', res);
                    window.location.href =
                      'https://app.idena.io/dna/raw?tx=' +
                      res +
                      '&callback_format=html&callback_url=' +
                      process.env.NEXT_PUBLIC_WALLET_DOMAIN +
                      '/tx/'; //PHAOS.APP CHANGE
                  });
                } catch (error) {
                  console.log('ERROR', error);
                  alert('Transaction failed, please check your inputs');
                }
              }
            }}
          >
            Process
          </Button>
        </div>
      )}
      {transactionType === 'erc20' && (
        <div>
          <div className="mt-4 flex items-center gap-x-2">
            <div className="group relative flex w-9/12 rounded-lg border border-gray-200 transition-colors duration-200 hover:border-gray-900 dark:border-gray-700 dark:hover:border-gray-600">
              <CoinListBox
                coins={coinList}
                selectedCoin={firstCoin}
                setSelectedCoin={setFirstCoin}
                className="w-auto"
              />
              <input
                type="text"
                placeholder="Contract Address"
                className="h-11 w-full rounded-lg border-0 text-sm dark:bg-light-dark  sm:h-13 sm:text-base"
                id="contract-address-erc20"
              />
            </div>
            <Button
              size="medium"
              shape="rounded"
              fullWidth={false}
              className="uppercase xs:tracking-widest xl:px-2 2xl:px-9"
              onClick={() => {
                // check if contract is valid
                let contract = document.getElementById(
                  'contract-address-erc20'
                ).value;
                if (contract === '') {
                  alert('Please enter a valid contract address');
                  return;
                }
                if (contract.length !== 42) {
                  alert('Please enter a valid contract address');
                  return;
                }
                saveToken(
                  document.getElementById('contract-address-erc20').value
                );
                // wait for 1 second
                setTimeout(function () {
                  window.location.reload();
                }, 1000);
              }}
            >
              <AddTokenPlus className="h-auto w-5 fill-white" />
            </Button>
            <Button
              size="medium"
              shape="rounded"
              fullWidth={false}
              className="uppercase xs:tracking-widest xl:px-2 2xl:px-9"
              onClick={() => {
                removeToken(firstCoin.contract);
                console.log(firstCoin.contract);
                // reload
                window.location.reload();
              }}
            >
              <RemoveTokenMinus className="h-auto w-5 fill-white" />
            </Button>
          </div>
          <div className="grid grid-cols-3 gap-x-4"></div>
        </div>
      )}
      {transactionType === 'custom' && (
        <div>
          <div className="mt-4 flex items-center gap-x-2">
            <div className="group relative flex w-full rounded-lg border border-gray-200 transition-colors duration-200 hover:border-gray-900 dark:border-gray-700 dark:hover:border-gray-600">
              <CoinListBox
                coins={coinList}
                selectedCoin={firstCoin}
                setSelectedCoin={setFirstCoin}
                className="w-auto"
              />
              <input
                type="text"
                placeholder="Contract Address"
                className="h-11 w-full rounded-lg border-0 text-sm dark:bg-light-dark  sm:h-13 sm:text-base"
                id="contract-address-custom"
              />
            </div>
            <Button
              size="medium"
              shape="rounded"
              fullWidth={false}
              className="w-1/12 uppercase xs:tracking-widest xl:px-2 2xl:px-9"
              onClick={() => {
                let contract = document.getElementById(
                  'contract-address-custom'
                ).value;
                if (contract === '') {
                  alert('Please enter a valid contract address');
                  return;
                }
                if (contract.length !== 42) {
                  alert('Please enter a valid contract address');
                  return;
                }
                // oken_contract: string, token_symbol: string, token_name: string, token_decimals: number
                saveTokenInfo(
                  document.getElementById('contract-address-custom').value,
                  document.getElementById('token-symbol').value,
                  document.getElementById('token-name').value,
                  document.getElementById('token-decimals').value
                );
                // wait for 1 second
                setTimeout(function () {
                  window.location.reload();
                }, 1000);
              }}
            >
              <AddTokenPlus className="h-auto w-5 fill-white" />
            </Button>
          </div>
          <div className="mt-2 flex items-center gap-x-2">
            <div className="group relative flex w-full rounded-lg border border-gray-200 transition-colors duration-200 hover:border-gray-900  dark:border-gray-700 dark:hover:border-gray-600">
              <input
                type="text"
                placeholder="Name"
                id="token-name"
                className="h-11 w-full rounded-l-lg border-r text-sm dark:bg-light-dark sm:h-13 sm:text-base"
              />

              <input
                type="text"
                placeholder="Symbol"
                id="token-symbol"
                className="h-11 w-full border-r text-sm  dark:bg-light-dark sm:h-13 sm:text-base"
              />
              <input
                type="number"
                placeholder="Decimal"
                id="token-decimals"
                className="h-11 w-full rounded-r-lg border-r text-sm dark:bg-light-dark sm:h-13 sm:text-base"
              />
            </div>
            <Button
              size="medium"
              shape="rounded"
              fullWidth={false}
              className="w-1/12 uppercase xs:tracking-widest xl:px-2 2xl:px-9"
              onClick={() => {
                removeToken(firstCoin.contract);
                console.log(firstCoin.contract);
                // reload
                window.location.reload();
              }}
            >
              <RemoveTokenMinus className="h-auto w-5 fill-white" />
            </Button>
          </div>
        </div>
      )}
      {transactionType === 'exchange' && (
        <div className="group relative mt-4 flex rounded-lg border border-gray-200 transition-colors duration-200 hover:border-gray-900 dark:border-gray-700 dark:hover:border-gray-600">
          <CoinListBox
            coins={coinList}
            selectedCoin={secondCoin}
            setSelectedCoin={setSecondCoin}
          />

          <input
            type="text"
            value={exchangeRate.toFixed(4)}
            placeholder="0.0"
            inputMode="decimal"
            onChange={handleOnChangeSecondCoin}
            className="w-full rounded-lg border-0 text-right text-base outline-none focus:ring-0 ltr:text-right rtl:text-left dark:bg-light-dark"
          />
        </div>
      )}
    </>
  );
}

export default function TransactCoin({
  className,
}: React.PropsWithChildren<{ className?: string }>) {
  const isMounted = useIsMounted();
  const breakpoint = useBreakpoint();
  const dropdownEl = useRef<HTMLDivElement>(null);
  let [selectedTabIndex, setSelectedTabIndex] = useState(0);
  let [visibleMobileMenu, setVisibleMobileMenu] = useState(false);

  return (
    <div className={cn(className)}>
      <Tab.Group
        selectedIndex={selectedTabIndex}
        onChange={(index) => setSelectedTabIndex(index)}
      >
        <Tab.List className="relative mb-6 text-sm uppercase sm:gap-8 sm:rounded-none">
          {isMounted &&
          ['xs', 'sm', 'md', 'lg', 'xl'].indexOf(breakpoint) !== -1 ? (
            <div
              ref={dropdownEl}
              className="rounded-lg border-2 border-gray-200 dark:border-gray-700"
            >
              <button
                onClick={() => setVisibleMobileMenu(!visibleMobileMenu)}
                className="flex w-full items-center justify-between py-2.5 px-4 uppercase text-gray-400 dark:text-gray-300 sm:px-5 sm:py-3.5"
              >
                <span className="font-medium text-gray-900 dark:text-gray-100">
                  {tabMenu[selectedTabIndex].title}
                </span>
                <ChevronDown className="h-auto w-3.5" />
              </button>
              <div
                className={cn(
                  'absolute top-full left-0 z-10 mt-1 grid w-full gap-0.5 rounded-lg border border-gray-200 bg-white p-2 text-left shadow-large dark:border-gray-700 dark:bg-gray-800 xs:gap-1',
                  visibleMobileMenu
                    ? 'visible opacity-100'
                    : 'invisible opacity-0'
                )}
              >
                {tabMenu.map((item) => (
                  <div
                    key={item.path}
                    onClick={() => setVisibleMobileMenu(false)}
                  >
                    <TabItem className="w-full p-2.5">{item.title}</TabItem>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="flex gap-2 2xl:gap-0.5 3xl:gap-2">
              {tabMenu.map((item) => (
                <TabItem key={item.path} className="py-[5px] px-3">
                  {item.title}
                </TabItem>
              ))}
            </div>
          )}
        </Tab.List>
        <span className="my-6 block h-[1px] border-b border-dashed border-b-gray-200 dark:border-b-gray-700"></span>
        <TabPanels>
          <TabPanel className="focus:outline-none">
            <CoinTransaction transactionType="send" />
          </TabPanel>
          <TabPanel className="focus:outline-none">
            <CoinTransaction transactionType="erc20" />
          </TabPanel>
          <TabPanel className="focus:outline-none">
            <CoinTransaction transactionType="custom" />
          </TabPanel>
          <TabPanel className="relative w-full focus:outline-none md:w-auto">
            <CoinTransaction transactionType="buy" />
          </TabPanel>
          <TabPanel className="focus:outline-none">
            <CoinTransaction transactionType="sell" />
          </TabPanel>

          <TabPanel className="focus:outline-none">
            <CoinTransaction transactionType="exchange" />
          </TabPanel>
        </TabPanels>
      </Tab.Group>
    </div>
  );
}
