
async function loadPage(url, addToHistory = true) {
    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error("Page could not be loaded");
        }

        const html = await response.text();
        const newDocument = new DOMParser().parseFromString(html, "text/html");

        document.title = newDocument.title;

        const scripts = Array.from(newDocument.body.querySelectorAll("script"));

        document.body.innerHTML = newDocument.body.innerHTML;

        // Run inline page scripts without reloading shared JavaScript files
        for (const oldScript of scripts) {
            if (oldScript.src) continue;

            const newScript = document.createElement("script");
            newScript.textContent = oldScript.textContent;
            document.body.appendChild(newScript);
        }

        if (addToHistory) {
            history.pushState({}, "", url);
        }

        if (typeof updateCartCount === "function") {
            updateCartCount();
        }

        if (typeof initializeApp === "function") {
            initializeApp();
        }

        window.scrollTo(0, 0);

    } catch (error) {
        console.error(error);
        window.location.href = url;
    }
}

// Handle navigation
document.addEventListener("click", function(event) {
    const link = event.target.closest("a");

    if (!link || link.target === "_blank") return;

    const url = new URL(link.href);

    if (url.origin !== location.origin) return;
    if (!url.pathname.endsWith(".html")) return;

    event.preventDefault();
    loadPage(url.href);
});

// Browser Back and Forward
window.addEventListener("popstate", function() {
    loadPage(location.href, false);
});
