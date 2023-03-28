import type { GetStaticProps, InferGetStaticPropsType } from 'next';
import { NextSeo } from 'next-seo';
import type { NextPageWithLayout } from '@/types';
import Image from '@/components/ui/image';
import Avatar from '@/components/ui/avatar';
import Profile from '@/components/profile/profile';
// static data
import { authorData } from '@/data/static/author';
import RootLayout from '@/layouts/_root-layout';
import { claimTx  } from '@/components/ui/idena';
import Button from '@/components/ui/button';
// react
import { useRouter } from 'next/router';
import { useIsMounted } from '@/lib/hooks/use-is-mounted';
import { useIsDarkMode } from '@/lib/hooks/use-is-dark-mode';
import { useState } from 'react';
import { useEffect } from 'react';

const Tx = () => {
    // check for base64 encoded string
    const router = useRouter();
    const {
        query: { layout },
    } = router;
    const isMounted = useIsMounted();
    const { isDarkMode } = useIsDarkMode();
    let [tx, setTx] = useState('');
    let [status, setStatus] = useState('');
    let [tryCount, setTryCount] = useState(0);
    // fisrt time
    // decode base64 string and set as local storage
    // redirect to home page
    if (typeof window !== 'undefined') {
        // http://localhost:3000/tx/?tx=hash
        const tx = window.location.href.split('tx=')[1];
            

         
        useEffect(() => {
          setTx(tx);
          let refreshIntervalId = setInterval(() => {
            fetch('https://api.idena.io/api/Transaction/' + tx)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                if (data.result.blockHeight > 0) {
                    setStatus('Success ');
                    // redirect to home page
                    router.push('/');
                    // break out of loop
                    clearInterval(refreshIntervalId);                  
                }
                else {
                    setStatus('Pending');
                }
            });
          }
          , 1000);

      }, []);

    } 
    // check status every 5 seconds


    return (
      <>
        <NextSeo
          title="Transaction Tracker"
          description="Phaos - 1st Proof-of-Personhood wallet based on the Idena Blockchain"
        />
        {/* Tracking: {tx}
            Status: {status} */}
        <div className="relative h-36 w-full overflow-hidden rounded-lg sm:h-44 md:h-64 xl:h-80 2xl:h-96 3xl:h-[448px]">
            <div className="flex flex-col items-center justify-center w-full">
            {tx}
            </div>
            <div className="flex flex-col items-center justify-center w-full">
            Status:  {status}
            </div>
            
            <div className="flex flex-col items-center justify-center w-full">
            To insure that your transaction is successful, and to avoid any issues, please wait until the transaction is confirmed on the blockchain!
            </div>
        </div>
        

      </>
    );
};

export default Tx;
