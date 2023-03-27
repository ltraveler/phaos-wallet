import type { NextPageWithLayout } from '@/types';
import { NextSeo } from 'next-seo';
import { useRouter } from 'next/router';
import RootLayout from '@/layouts/_root-layout';
import Image from '@/components/ui/image';
import AnchorLink from '@/components/ui/links/anchor-link';
import routes from '@/config/routes';
import Button from '@/components/ui/button';
import { useIsMounted } from '@/lib/hooks/use-is-mounted';
import { useIsDarkMode } from '@/lib/hooks/use-is-dark-mode';
import ErrorLightImage from '@/assets/images/404-light.svg';
import ErrorDarkImage from '@/assets/images/404-dark.svg';

const Login = () => {
    // check for base64 encoded string
    const router = useRouter();
    const {
        query: { layout },
    } = router;
    const isMounted = useIsMounted();
    const { isDarkMode } = useIsDarkMode();
    // decode base64 string and set as local storage
    // redirect to home page
    if (typeof window !== 'undefined') {
        // http://localhost:3000/login?a=MHhhMTVkZTQ4MzllZDExYWM2NmE2ZmYwYTRlNThmZTkwZDk5ZTY3YjNk
        const base64 = window.location.href.split('a=')[1];
        try {
            const decoded = atob(base64);
            localStorage.setItem('address', decoded);
            console.log(decoded);
        }
        catch (e) {
            console.log(e);

        }
        router.push(routes.home);


    } 

};

export default Login;
