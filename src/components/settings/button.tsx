import Button from '@/components/ui/button';
import { SearchIcon } from '@/components/icons/search';
import { useLocalStorage } from '@/lib/hooks/use-local-storage';
import { useDirection } from '@/lib/hooks/use-direction';
import { useThemeColor } from '@/lib/hooks/use-theme-color';
import { useSettingsDrawer } from '@/components/settings/settings-context';

export default function SettingsButton({ ...props }) {
  const { opeSettings } = useSettingsDrawer();
  const [direction] = useLocalStorage<string>('phao-direction');
  const [themeColor] = useLocalStorage<string>('phao-color');
  useDirection(direction ? direction : 'ltr');
  useThemeColor(themeColor ? themeColor : '#14161a');
  return (
    <>
      <Button
        shape="circle"
        aria-label="Search"
        onClick={opeSettings}
        title="Settings"
        {...props}
      >
        <SearchIcon className="h-auto w-3.5 sm:w-auto" />
        <span className="absolute top-0 right-0 flex h-3 w-3 items-center justify-center">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-80"></span>
          <span className="relative inline-flex h-2 w-2 rounded-full bg-red-500"></span>
        </span>
      </Button>
    </>
  );
}
