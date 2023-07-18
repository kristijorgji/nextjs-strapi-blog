import { ThemeName } from '@/c/styles/types';

declare global {
    interface Window {
        // make sure that this is injected in sync time by theme-toggle.js script
        __ThemeManager: {
            toggleTheme: VoidFunction;
            getTheme: () => ThemeName;
            addListener: (cb: (theme: ThemeName) => void) => void;
            removeListener: (cb: (theme: ThemeName) => void) => void;
        };
    }
}
