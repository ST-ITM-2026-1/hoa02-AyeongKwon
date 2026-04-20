const THEME_KEY = 'portfolio-theme';

function getCurrentTheme() {
    return localStorage.getItem(THEME_KEY) || 'day';
}

function applyTheme(theme) {
    if (theme === 'night') {
        document.body.classList.add('theme-night');
    } else {
        document.body.classList.remove('theme-night');
    }
    updateButton(theme);
    localStorage.setItem(THEME_KEY, theme);
}

function updateButton(theme) {
    const btn = document.getElementById('theme-toggle');
    if (!btn) return;
    if (theme === 'night') {
        btn.textContent = '🌿 Day Mode';
    } else {
        btn.textContent = '🌙 Night Mode';
    }
}

function toggleTheme() {
    const current = getCurrentTheme();
    applyTheme(current === 'night' ? 'forest' : 'night');
}

document.addEventListener('DOMContentLoaded', function () {
    applyTheme(getCurrentTheme());

    const btn = document.getElementById('theme-toggle');
    if (btn) {
        btn.addEventListener('click', toggleTheme);
    }
});