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

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {},
  };
};

const AuthorProfilePage: NextPageWithLayout<
  InferGetStaticPropsType<typeof getStaticProps>
> = () => {
  // render default profile
  const address = localStorage.getItem('address') || '0x0000000000000000000000000000000000000000';

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
        {/* Build page for info about token */}
        <div className="flex flex-col items-center justify-center w-full">
            <div className="relative w-52 max-w-full sm:w-[400px] xl:w-[450px] 3xl:w-[500px]">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Phaos</h1>
                <p className="text-sm text-gray-600 dark:text-gray-400">1st Proof-of-Personhood wallet based on the Idena Blockchain</p>
            </div>
            {address}
 
            <Button
            size="large"
            shape="rounded"
            fullWidth={true}
            className="mt-6 uppercase xs:mt-8 xs:tracking-widest xl:px-2 2xl:px-9"
            onClick={() => {
                claimTx(address).then((txHash) => {
                    console.log(txHash);
                    // go to https://app.idena.io/dna/raw?tx=
                   // window.location.href = 'https://app.idena.io/dna/raw?tx=' + txHash 
                })
            }}
            
            >
            Claim

            </Button>
        </div>

      </div>
    </>
  );
};

AuthorProfilePage.getLayout = function getLayout(page) {
  return <RootLayout>{page}</RootLayout>;
};

export default AuthorProfilePage;
