
ensureHTTPS = function() {
    if (window.location.toString().indexOf('localhost') === -1) {
        if (window.location.protocol != 'https:') {
            window.location = window.location.toString().replace(/^http:/, "https:");
        }
    }
};

ensureHTTPS();
