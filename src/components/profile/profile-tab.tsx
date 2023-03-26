import ListCard from '@/components/ui/list-card';
import ParamTab, { TabPanel } from '@/components/ui/param-tab';
import TransactionSearchForm from '@/components/author/transaction-search-form';
import TransactionHistory from '@/components/author/transaction-history';
// static data
import {
  authorWallets,
  authorNetworks,
  authorProtocols,
} from '@/data/static/author-profile';

const tabMenu = [
  {
    title: 'Portfolio',
    path: 'portfolio',
  },
  {
    title: 'History',
    path: 'history',
  },
];

export default function ProfileTab() {
  return (
    <ParamTab tabMenu={tabMenu}>
      <TabPanel className="focus:outline-none">
        <div className="space-y-8 md:space-y-10 xl:space-y-12">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-2 2xl:grid-cols-3 3xl:grid-cols-4">
            {authorWallets?.map((wallet) => (
              <ListCard
                item={wallet}
                key={`wallet-key-${wallet?.id}`}
                variant="medium"
              />
            ))}
          </div>
          <div className="block">
            <h3 className="text-heading-style mb-3 uppercase text-gray-900 dark:text-white">
              Protocols
            </h3>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2">
              {authorProtocols?.map((protocol) => (
                <ListCard
                  item={protocol}
                  key={`protocol-key-${protocol?.id}`}
                  variant="large"
                />
              ))}
            </div>
          </div>
          <div className="block">
            <h3 className="text-heading-style mb-3 uppercase text-gray-900 dark:text-white">
              Networks
            </h3>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-2 2xl:grid-cols-3 3xl:grid-cols-4">
              {authorNetworks?.map((network) => (
                <ListCard
                  item={network}
                  key={`network-key-${network?.id}`}
                  variant="medium"
                />
              ))}
            </div>
          </div>
        </div>
      </TabPanel>
      <TabPanel className="focus:outline-none">
        <div className="space-y-8 xl:space-y-9">
          <TransactionSearchForm />
          <TransactionHistory />
        </div>
      </TabPanel>
    </ParamTab>
  );
}
