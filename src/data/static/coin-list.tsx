import { Bitcoin } from '@/components/icons/bitcoin';
import { Idena } from '@/components/icons/idena';
import { Ethereum } from '@/components/icons/ethereum';
import { Tether } from '@/components/icons/tether';
import { Bnb } from '@/components/icons/bnb';
import { Usdc } from '@/components/icons/usdc';
import { Cardano } from '@/components/icons/cardano';
import { Doge } from '@/components/icons/doge';



// get icon from string
export function getIconFromName(name: string) {
  switch (name) {
    case 'Bitcoin':
      return <Bitcoin />;
    case 'Idena':
      return <Idena />;
    case 'Ethereum':
      return <Ethereum />;
    case 'Tether':
      return <Tether />;
    case 'Binance Coin':
      return <Bnb />;
    case 'Cardano':
      return <Cardano />;
    case 'Dogecoin':
      return <Doge />;
    case 'USD Coin':
      return <Usdc />;
    default:
      return <Bitcoin />;
  }
}

