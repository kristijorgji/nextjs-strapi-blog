const themeStorageKey = 'theme-preference';

window.__ThemeManager = {};

(function (scope) {
    // Declarations
    let listeners = [];

    scope.theme = getColorPreference();

    scope.setPreference = (theme) => {
        scope.theme = theme;
        localStorage.setItem(themeStorageKey, theme);
        reflectPreference();
        for (let i = 0; i < listeners.length; i++) {
            listeners[i](theme);
        }
    };

    scope.toggleTheme = () => {
        scope.setPreference(scope.theme === 'light' ? 'dark' : 'light');
    }

    scope.getTheme = getColorPreference;

    scope.addListener = (cb) => {
        listeners.push(cb);
    }

    scope.removeListener = (cb) => {
        listeners = listeners.filter(el => el !== cb);
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
