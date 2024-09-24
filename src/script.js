// Til ma'lumotlari
const translations = {
    en: {
        welcome: "🌐 Welcome to the WebSocket Server Application!",
        features: "✨ Features",
        realTimeTracking: "🔄 Real-time tracking of online users",
        userOriginTracking: "📍 User origin tracking via API",
        optionalStaticFiles: "📂 Optional static file serving",
        apiEndpoint: "📡 API Endpoint",
        trackUserOrigin: "Track User Origin",
        sendPostRequest: "Send a POST request to the following endpoint:",
        requestBody: "Request Body:",
        response: "Response:",
        license: "📜 License",
        projectLicense: "This project is licensed under the MIT License. 📝",
        madeBy: "Made with ❤️ by D. Abdujabborov"
    },
    uz: {
        welcome: "🌐 WebSocket Server Dasturiga Xush Kelibsiz!",
        features: "✨ Xususiyatlar",
        realTimeTracking: "🔄 Online foydalanuvchilarni real vaqt rejimida kuzatish",
        userOriginTracking: "📍 Foydalanuvchi manzilini API orqali kuzatish",
        optionalStaticFiles: "📂 Statik faylni xizmat ko'rsatish imkoniyati",
        apiEndpoint: "📡 API Endpoint",
        trackUserOrigin: "Foydalanuvchi manzilini kuzatish",
        sendPostRequest: "Quyidagi endpointga POST so'rov yuboring:",
        requestBody: "So'rov Tanasi:",
        response: "Javob:",
        license: "📜 Litsenziya",
        projectLicense: "Ushbu loyiha MIT Litsenziyasi ostida litsenziyalangan. 📝",
        madeBy: "❤️ bilan tayyorlandi D. Abdujabborov"
    },
};

// Tilni o'rnatish (default: inglizcha)
let currentLanguage = 'en';

// Matnlarni yangilash
function updateText() {
    document.querySelector('header h1').textContent = translations[currentLanguage].welcome;
    document.querySelector('header p').textContent = translations[currentLanguage].features;

    // Xususiyatlar
    const featuresList = [
        translations[currentLanguage].realTimeTracking,
        translations[currentLanguage].userOriginTracking,
        translations[currentLanguage].optionalStaticFiles
    ];
    const featuresSection = document.querySelector('section:nth-of-type(1) ul');
    featuresSection.innerHTML = '';
    featuresList.forEach(feature => {
        const li = document.createElement('li');
        li.textContent = feature;
        featuresSection.appendChild(li);
    });

    // API Endpoint
    document.querySelector('section:nth-of-type(2) h2').textContent = translations[currentLanguage].apiEndpoint;
    document.querySelector('section:nth-of-type(2) h3').textContent = translations[currentLanguage].trackUserOrigin;
    document.querySelector('section:nth-of-type(2) p:nth-of-type(1)').textContent = translations[currentLanguage].sendPostRequest;
    document.querySelector('section:nth-of-type(2) pre:nth-of-type(1) code').textContent = "POST /api/track";
    document.querySelector('section:nth-of-type(2) p:nth-of-type(2)').textContent = translations[currentLanguage].requestBody;
    document.querySelector('section:nth-of-type(2) pre:nth-of-type(2) code').textContent = JSON.stringify({ origin: "<user-origin>" }, null, 2);
    document.querySelector('section:nth-of-type(2) p:nth-of-type(3)').textContent = translations[currentLanguage].response;
    document.querySelector('section:nth-of-type(2) pre:nth-of-type(3) code').textContent = JSON.stringify({ message: "Origin tracked" }, null, 2);

    // Litsenziya
    document.querySelector('section:nth-of-type(4) h2').textContent = translations[currentLanguage].license;
    document.querySelector('section:nth-of-type(4) p').textContent = translations[currentLanguage].projectLicense;

    // Footer
    document.querySelector('footer p').textContent = translations[currentLanguage].madeBy;
}

// Tilni o'zgartirish
function changeLanguage(lang) {
    currentLanguage = lang;
    updateText();
}

// Tilni dastlabki yuklash
updateText();
