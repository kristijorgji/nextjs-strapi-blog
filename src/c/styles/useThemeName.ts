import { useState } from 'react';

import useDidMountEffect from '@/c/hooks/useDidMountEffect';
import { ThemeName } from '@/c/styles/types';

export default function useThemeName(): ThemeName {
    const [theme, setTheme] = useState<ThemeName>('light');

    useDidMountEffect(() => {
        setTheme(window.__ThemeManager.getTheme());
        window.__ThemeManager.addListener(onThemeChange);

        return () => window.__ThemeManager.removeListener(onThemeChange);
    });

    const onThemeChange = (theme: ThemeName) => {
        setTheme(theme);
    };

    return theme;
}
