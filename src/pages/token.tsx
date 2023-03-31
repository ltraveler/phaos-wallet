import type { GetStaticProps, InferGetStaticPropsType } from 'next';
import { NextSeo } from 'next-seo';
import type { NextPageWithLayout } from '@/types';
import Image from '@/components/ui/image';
import IdenaPretty from '../assets/images/phaos_p_symbol.jpg';
import Avatar from '@/components/ui/avatar';
import Profile from '@/components/profile/profile';
// static data
import { authorData } from '@/data/static/author';
import RootLayout from '@/layouts/_root-layout';
import { claimTx } from '@/components/idena/idena';
import Button from '@/components/ui/button';

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {},
  };
};

const AuthorProfilePage: NextPageWithLayout<
  InferGetStaticPropsType<typeof getStaticProps>
> = () => {
  // render default profile
  const address =
    localStorage.getItem('address') ||
    '0x0000000000000000000000000000000000000000';

  return (
    <>
      <NextSeo
        title="Profile"
        description="Phaos - 1st Proof-of-Personhood wallet based on the Idena Blockchain"
      />
      <div className="relative h-36 w-full overflow-hidden rounded-lg sm:h-44 md:h-64 xl:h-80 2xl:h-96 3xl:h-[448px]">
        <Image
          src={authorData?.cover_image?.thumbnail}
          placeholder="blur"
          fill
          className="object-cover"
          alt="Cover Image"
        />
      </div>

      <div className="mx-auto flex w-full shrink-0 flex-col md:px-4 xl:px-6 3xl:max-w-[1700px] 3xl:px-12">
        {/* PHO Intro */}
        <div className="relative bg-white">
          <div className="hidden lg:absolute lg:inset-0 lg:block">
            <div className="lg:absolute lg:inset-y-0 lg:left-0 lg:w-1/2">
              <Image
                src={IdenaPretty}
                className="h-56 w-full object-cover opacity-80 grayscale-[90%] lg:absolute lg:h-full"
                alt="Idena Pretty"
              ></Image>
            </div>
          </div>
          <div className="relative px-4 pt-12 pb-16 sm:px-6 sm:pt-16 lg:mx-auto lg:grid lg:max-w-7xl lg:grid-cols-2 lg:px-8">
            <div className="lg:col-start-2 lg:pl-8">
              <div className="mx-auto max-w-prose text-base lg:ml-auto lg:mr-0 lg:max-w-lg">
                <h2 className="font-semibold uppercase leading-6 tracking-wide text-stone-700">
                  PHO
                </h2>
                <h3 className="mt-2 text-3xl font-extrabold leading-8 tracking-tight text-gray-900 sm:text-4xl">
                  Phaos token
                  <br /> on Phaos-Wallet
                </h3>
                <div className="m-5 hidden xs:block lg:hidden">
                  <div className="lg:absolute lg:inset-y-0 lg:left-0 lg:w-1/2">
                    <Image
                      src={IdenaPretty}
                      className="h-56 w-full object-cover lg:absolute lg:h-full"
                      alt="Idena Pretty"
                    ></Image>
                  </div>
                </div>
                <div className="prose prose-indigo mt-5 text-gray-500">
                  <p>
                    In the global Idena community, a group of technology
                    enthusiasts (Fireshift, Toni and Zen) found each other by
                    coincidence. They shared a passion for blockchain innovation
                    and were drawn to Idena&apos;s unique Proof of Personhood
                    concept.
                  </p>
                  <p>
                    During the Idena Hackathon, the team faced challenges but
                    never gave up on their vision of creating a product to
                    revolutionize DeFi with Proof of Personhood.
                  </p>
                  <p>
                    With the help of their individual skills and expertise, they
                    launched the Phaos-Wallet, a secure and easy-to-use wallet
                    that quickly gained popularity among crypto enthusiasts.
                  </p>
                  <h3>How to claim PHO</h3>
                  <p>
                    The value of claimed tokens would be based on a formula,
                    such as:
                  </p>
                  <p className="prose">
                    <blockquote>100 - floor(500 / age)</blockquote>
                  </p>
                  <p>
                    To claim the token, please authorize your wallet by clicking
                    the &quot;Connect&quot; button and then click the
                    &quot;Claim&quot; button.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/*Account info*/}
        <div className="overflow-hidden bg-white shadow sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6">
            <h3 className="text-lg font-medium leading-6 text-gray-900">
              iDNA Wallet Information
            </h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">
              Your identity details.
            </p>
          </div>
          <div className="border-t border-gray-200">
            <dl>
              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Address</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                  {address}
                </dd>
              </div>
              <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Age</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                  8
                </dd>
              </div>
              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Status</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                  Human
                </dd>
              </div>
              <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">
                  PHO to claim
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                  64 / Already claimed
                </dd>
              </div>
              <div>
                <Button
                  size="large"
                  shape="rounded"
                  fullWidth={true}
                  className="mt-6 uppercase xs:mt-8 xs:tracking-widest xl:px-2 2xl:px-9"
                  onClick={() => {
                    claimTx(address).then((txHash) => {
                      console.log(txHash);
                      // go to https://app.idena.io/dna/raw?tx=
                      window.location.href =
                        'https://app.idena.io/dna/raw?tx=' +
                        txHash +
                        '&callback_format=html&callback_url=' +
                        process.env.NEXT_PUBLIC_WALLET_DOMAIN +
                        '/tx/';
                    });
                  }}
                >
                  Claim
                </Button>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </>
  );
};

AuthorProfilePage.getLayout = function getLayout(page) {
  return <RootLayout>{page}</RootLayout>;
};

export default AuthorProfilePage;
