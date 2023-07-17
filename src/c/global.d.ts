interface Window {
    // make sure that this is injected in sync time by theme-toggle.js script
    __ThemeManager: {
        toggleTheme: VoidFunction;
    };
}
