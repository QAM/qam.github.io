/* Site theme: light / dark / follow-system.
   Runs from <head> before paint so the page never flashes the wrong palette. */
(function () {
    'use strict';

    var KEY = 'site_theme';
    var MODES = ['light', 'dark', 'system'];

    function getCookie(name) {
        var parts = document.cookie ? document.cookie.split('; ') : [];
        for (var i = 0; i < parts.length; i++) {
            var eq = parts[i].indexOf('=');
            if (eq > -1 && parts[i].slice(0, eq) === name) return parts[i].slice(eq + 1);
        }
        return null;
    }
    function setCookie(name, value) {
        document.cookie = name + '=' + value + ';max-age=' + (60 * 60 * 24 * 730) + ';path=/;SameSite=Lax';
    }

    function apply(mode) {
        var root = document.documentElement;
        if (mode === 'light' || mode === 'dark') root.setAttribute('data-theme', mode);
        else root.removeAttribute('data-theme');
    }

    var stored = getCookie(KEY);
    var mode = MODES.indexOf(stored) > -1 ? stored : 'system';
    apply(mode);

    var LABEL = { light: '☀️', dark: '🌙', system: '🖥️' };
    var TITLE = { light: 'Light', dark: 'Dark', system: 'System' };
    var NEXT  = { light: 'dark', dark: 'system', system: 'light' };

    function wire() {
        var btn = document.getElementById('theme-toggle');
        if (!btn) return;
        function render() {
            btn.textContent = LABEL[mode];
            btn.title = 'Theme: ' + TITLE[mode] + ' (click to change)';
            btn.setAttribute('aria-label', 'Theme: ' + TITLE[mode] + '. Click to change.');
        }
        btn.addEventListener('click', function () {
            mode = NEXT[mode];
            apply(mode);
            setCookie(KEY, mode);
            render();
        });
        render();
    }

    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', wire);
    else wire();
})();
