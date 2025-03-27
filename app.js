if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/service-worker.js')
    .then((registration) => {
        console.log('Service Worker registered with scope:', registration.scope);
    })
    .catch((error) => {
        console.log('Service Worker registration failed:', error);
    });
}

// Redirect user to offline page if they are not online
if (!navigator.onLine) {
    window.location.href = 'offline.html';
}

// Redirect user to appropriate page based on their connection status
window.addEventListener('online', function() {
    window.location.href = 'index.html';
});

window.addEventListener('offline', function() {
    window.location.href = 'offline.html';
});

let deferredPrompt;
const installBtn = document.getElementById('installBtn');

// Handle the install prompt for PWA
window.addEventListener('beforeinstallprompt', (event) => {
    event.preventDefault();
    deferredPrompt = event;
    installBtn.style.display = 'block';

    installBtn.addEventListener('click', () => {
        deferredPrompt.prompt();
        deferredPrompt.userChoice.then((choiceResult) => {
            if (choiceResult.outcome === 'accepted') {
                console.log('User accepted the A2HS prompt');
            } else {
                console.log('User dismissed the A2HS prompt');
            }
            deferredPrompt = null;
        });
    });
});
