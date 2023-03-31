import type { GetStaticProps, InferGetStaticPropsType } from 'next';
import { NextSeo } from 'next-seo';
import type { NextPageWithLayout } from '@/types';
import Image from '@/components/ui/image';
import Avatar from '@/components/ui/avatar';
import Profile from '@/components/profile/profile';
// static data
import { authorData } from '@/data/static/author';
import RootLayout from '@/layouts/_root-layout';
import { claimTx } from '@/components/idena/idena';
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
          .then((response) => response.json())
          .then((data) => {
            console.log(data);
            if (data.result.blockHeight > 0) {
              setStatus('Success ');
              // redirect to home page
              router.push('/');
              // break out of loop
              clearInterval(refreshIntervalId);
            } else {
              setStatus('Pending');
            }
          });
      }, 7000);
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
      {/*Message */}
      <div className="flex min-h-full flex-col bg-white pt-16 pb-12">
        <div className="mx-auto flex w-full max-w-7xl flex-grow flex-col justify-center px-4 sm:px-6 lg:px-8">
          <div className="flex flex-shrink-0 justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="64"
              height="64"
              data-name="Layer 1"
              viewBox="0 0 430 430"
            >
              <g fill="#000000">
                <path d="M102 376.088V261.391c1.836-.083 3.507-.223 5.179-.224 42.965-.012 85.932.175 128.896-.077 27.895-.163 49.096-12.615 62.316-37.195 20.49-38.097-.475-86.228-42.301-97.604a88.937 88.937 0 00-19.712-2.647c-10.783-.426-21.594-.117-32.392-.117h-4.116V66.469a13.398 13.398 0 012.24-.364c13.786.02 27.609-.578 41.348.234 41.647 2.462 74.701 20.94 98.317 55.353 21.346 31.106 27.282 65.477 17.953 101.897-9.196 35.9-30.844 62.647-63.417 80.335-18.746 10.18-38.954 14.756-60.275 14.683-24.01-.082-48.02-.017-72.031-.016h-4.427v57.497z"></path>
                <path d="M102.03 221.123V66.397h57.39v96.913c1.756.098 3.204.25 4.652.25 24.352.013 48.704-.071 73.055.034 17.465.075 30.497 14.36 28.95 31.462a28.248 28.248 0 01-26.519 25.752c-7.425.487-14.898.31-22.349.314q-55.653.032-111.305 0h-3.873z"></path>
              </g>
              <path
                fill="#000000"
                d="M215 2a213.057 213.057 0 0182.909 409.262A213.056 213.056 0 01132.09 18.738 211.664 211.664 0 01215 2m0-2C96.259 0 0 96.259 0 215s96.259 215 215 215 215-96.259 215-215S333.741 0 215 0z"
              ></path>
              <path
                fill="#000000"
                d="M215 7a208.055 208.055 0 0180.962 399.655 208.054 208.054 0 01-161.924-383.31A206.697 206.697 0 01215 7m0-2C99.02 5 5 99.02 5 215s94.02 210 210 210 210-94.02 210-210S330.98 5 215 5z"
              ></path>
              <path
                fill="#000000"
                d="M215 12a203.054 203.054 0 0179.016 390.048A203.053 203.053 0 01135.984 27.952 201.726 201.726 0 01215 12m0-2C101.782 10 10 101.782 10 215s91.782 205 205 205 205-91.782 205-205S328.218 10 215 10z"
              ></path>
            </svg>
          </div>
          <div className="py-8">
            <div className="text-center">
              <h1 className="mt-2 text-xl font-extrabold tracking-tight text-gray-900 sm:text-xl">
                Transaction in progress
              </h1>
              <p className="mt-2 text-base text-gray-500">{tx}</p>
            </div>
          </div>
        </div>
        <div className="mx-auto w-full max-w-7xl flex-shrink-0 px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center space-x-4">
            <div className="overflow-hidden bg-white shadow sm:rounded-lg">
              <div className="px-4 py-5 sm:px-6">
                <h3 className="text-lg font-medium leading-6 text-gray-900">
                  Transaction Details
                </h3>
                <p className="mt-1 max-w-2xl text-sm text-gray-500">
                  To ensure that your transaction is successful, and to avoid
                  any issues, please wait until the transaction is confirmed on
                  the blockchain!
                </p>
              </div>
              <div className="border-t border-gray-200">
                <dl>
                  <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">TX</dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                      {tx}
                    </dd>
                  </div>
                  <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">Age</dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                      8
                    </dd>
                  </div>
                  <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">
                      Status
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                      Human
                    </dd>
                  </div>
                  <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">
                      Status
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                      {status}
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* The end of message */}
    </>
  );
};

export default Tx;
