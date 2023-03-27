import { useEffect, useState } from 'react';
import { NextSeo } from 'next-seo';
import Avatar from '@/components/ui/avatar';
import TransactionTable from '@/components/transaction/transaction-table';
import WalletCard from '@/components/ui/wallet-card';
import TransactCoin from '@/components/ui/transact-coin';
import PriceFeedSlider from '@/components/ui/live-price-feed';
import { priceFeedData } from '@/data/static/price-feed';
import { useBreakpoint } from '@/lib/hooks/use-breakpoint';
import { add } from 'lodash';
//images
// import AuthorImage from '@/assets/images/author.jpg';

const topPoolsLimit = (breakpoint: string) => {
  switch (breakpoint) {
    case 'md':
      return 5;
    case '2xl':
      return 5;
    default:
      return 4;
  }
};

export default function MinimalScreen() {
  const [limit, setLimit] = useState(4);
  const breakpoint = useBreakpoint();
  // local
  const address = localStorage.getItem('address');

  // GET BALANCE  
  useEffect(() => {
    setLimit(topPoolsLimit(breakpoint));
  }, [breakpoint]);
  return (
    <>
      <NextSeo
        title="Phao Wallet"
        description="1st Proof-of-Personhood Idena Wallet"
      />
      <div className="">
        {/* <PriceFeedSlider
          limit={4}
          priceFeeds={priceFeedData}
          gridClassName="grid-cols-1 gap-6 2xl:grid-cols-4"
        /> */}
        <div className="mt-6 grid grid-cols-1 items-start gap-6 md:grid-cols-2 lg:grid-cols-12">
          <div className="flex items-center rounded-lg bg-white p-6 shadow-card dark:bg-light-dark md:col-span-1 md:h-[678px] lg:col-span-6 lg:h-[678px] xl:col-span-6 xl:row-start-1 xl:row-end-2 xl:h-auto 2xl:col-span-6 2xl:h-full 2xl:p-6 3xl:col-span-6 3xl:p-8">
            <div className="w-full">
              <div className="mb-8 h-full">
  
                {address ? (
                  <div>
                    <Avatar
                      alt="Author"
                      className="mx-auto mb-6"
                      size="lg"
                    />
                    <h6 className="mb-2 text-center text-sm uppercase tracking-wider text-gray-500 dark:text-gray-400 3xl:mb-3">
                      {address}
                    </h6>
                    <h3 className="mb-2 text-center text-sm uppercase tracking-wider text-gray-500 dark:text-gray-400 3xl:mb-3">
                      My Balance
                    </h3>
                    <div className="mb-7 text-center font-medium tracking-tighter text-gray-900 dark:text-white xl:text-2xl 3xl:mb-8 3xl:text-[32px]">
                      ?
                    </div>
                  </div>
                ) : (
                  <div>

                    <h3 className="mb-2 text-center text-sm uppercase tracking-wider text-gray-500 dark:text-gray-400 3xl:mb-3">
                      Connect your wallet
                    </h3>
                    <div className="mb-7 text-center font-medium tracking-tighter text-gray-900 dark:text-white xl:text-2xl 3xl:mb-8 3xl:text-[32px]">
                      0
                    </div>
                  </div>
                )}
              </div>
              <span className="-mx-6 block border-t border-dashed border-t-gray-200 dark:border-t-gray-700 3xl:-mx-8" />
              <TransactCoin className="mt-6" />
            </div>
          </div>

          <div className="md:col-span-2 lg:col-span-full xl:col-start-1 xl:col-end-13 xl:row-start-2 xl:row-end-3 2xl:col-start-1 2xl:col-end-13 2xl:row-start-2 2xl:row-end-3 3xl:col-span-12 3xl:row-start-2 3xl:row-end-3">
            <TransactionTable />
          </div>

          <div className="3xl:col-spart-7 md:col-start-2 md:col-end-3 md:row-start-1 md:row-end-2 lg:col-span-6 lg:col-start-7 lg:row-start-1 lg:row-end-2 xl:col-start-7 xl:col-end-13 xl:row-start-1 xl:row-end-2 2xl:col-start-7 2xl:col-end-13 2xl:row-start-1 2xl:row-end-2 3xl:col-span-6 3xl:row-start-1 3xl:row-end-2">
            <WalletCard />
          </div>
        </div>
      </div>
    </>
  );
}
