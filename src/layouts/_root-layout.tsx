import dynamic from 'next/dynamic';
import Loader from '@/components/ui/loader';
import { useIsMounted } from '@/lib/hooks/use-is-mounted';
// dynamic imports
const MinimalLayout = dynamic(() => import('@/layouts/_minimal'), {
  loading: () => <FallbackLoader />,
});

function FallbackLoader() {
  return (
    <div className="fixed z-50 grid h-full w-full place-content-center">
      <Loader variant="blink" />
    </div>
  );
}

export default function RootLayout({
  children,
}: React.PropsWithChildren<{ contentClassName?: string }>) {
  const isMounted = useIsMounted();

  // fix the `Hydration failed because the initial UI does not match` issue
  if (!isMounted) return null;

  // render default layout which is modern
  return <MinimalLayout>{children}</MinimalLayout>;
}
