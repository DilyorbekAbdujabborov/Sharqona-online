document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('theme-toggle');
    const langToggle = document.getElementById('lang-toggle');
    const themeText = document.getElementById('theme-text');
    const langText = document.getElementById('lang-text');

    // Detect saved theme from localStorage
    const darkMode = localStorage.getItem('darkMode');
    const userLang = localStorage.getItem('userLang') || 'en'; // Default language is English

    if (darkMode === 'enabled') {
        document.body.classList.add('dark-mode');
        themeText.textContent = 'Switch to Light Mode';
    }

    if (userLang === 'uz') {
        switchToUzbek();
    }

    // Toggle dark mode
    themeToggle.addEventListener('click', () => {
        const isDarkMode = document.body.classList.toggle('dark-mode');
        localStorage.setItem('darkMode', isDarkMode ? 'enabled' : 'disabled');
        themeText.textContent = isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode';
    });

    // Toggle language
    langToggle.addEventListener('click', () => {
        if (langText.textContent === 'Switch to Uzbek') {
            switchToUzbek();
        } else {
            switchToEnglish();
        }
    });

    function switchToUzbek() {
        document.getElementById('page-title').textContent = '🌐 WebSocket Server Ilovasi';
        document.getElementById('welcome-message').textContent = 'Foydalanuvchilarni real vaqtda kuzatib borish va manbani qayd qilish oson! 🎉';
        langText.textContent = 'Switch to English';
        localStorage.setItem('userLang', 'uz');
    }

    function switchToEnglish() {
        document.getElementById('page-title').textContent = '🌐 WebSocket Server Application';
        document.getElementById('welcome-message').textContent = 'Real-time user tracking and origin logging made easy! 🎉';
        langText.textContent = 'Switch to Uzbek';
        localStorage.setItem('userLang', 'en');
    }
});
