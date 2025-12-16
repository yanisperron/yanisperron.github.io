document.addEventListener("DOMContentLoaded", () => {
    const main = document.querySelector(".fade");

    // Fade-in au chargement
    requestAnimationFrame(() => {
        main.classList.add("fade-in");
    });

    // Intercepter clics sur les liens internes
    document.querySelectorAll('a[href]').forEach(link => {
        const url = link.getAttribute("href");

        // S’assurer que ce n’est pas un lien externe
        if (url.startsWith("http") || url.startsWith("#")) return;

        link.addEventListener("click", (e) => {
            e.preventDefault();

            // Fade-out
            main.classList.remove("fade-in");
            main.classList.add("fade-out");

            // Attendre la fin de l’animation puis naviguer
            setTimeout(() => {
                window.location.href = url;
            }, 500); // même durée que transition CSS
        });
    });
});

window.addEventListener("pageshow", (e) => {
  if (e.persisted) {
    window.location.reload();
  }
});
