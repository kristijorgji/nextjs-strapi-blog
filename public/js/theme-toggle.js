const themeStorageKey = 'theme-preference';

window.__ThemeManager = {};

(function (scope) {
    // Declarations

    scope.theme = getColorPreference();

    scope.setPreference = (theme) => {
        scope.theme = theme;
        localStorage.setItem(themeStorageKey, theme);
        reflectPreference();
    };

    scope.toggleTheme = () => {
        scope.setPreference(scope.theme === 'light' ? 'dark' : 'light');
    }

    const reflectPreference = () => {
        document.firstElementChild.setAttribute('data-theme', scope.theme);
        document.querySelector('#theme-toggle')?.setAttribute('aria-label', scope.theme);
    };

    function getColorPreference() {
        if (localStorage.getItem(themeStorageKey)) {
            return localStorage.getItem(themeStorageKey);
        }

        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }

    // Immediate side-effects and event listeners

    // set early so no page flashes / CSS is made aware
    reflectPreference();

    window.onload = () => {
        // set on load so screen readers can see latest value on the button
        reflectPreference();
    };

    // sync with system changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', ({matches: isDark}) => {
        scope.setPreference(isDark ? 'dark' : 'light');
    });
})(window.__ThemeManager);
