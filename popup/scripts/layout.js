// Ajuster la taille de l'image et du texte pour adapter le layout
function adjustLayout() {
    requestAnimationFrame(() => {
        const textWrapper = document.getElementById("text-wrapper");
        const infoContainer = document.getElementById("info-container");
        const imageContainer = document.getElementById("image-container");
        const body = document.body;

        if (textWrapper && imageContainer) {
            const infoContainerHeight = infoContainer.getBoundingClientRect().height;
            const availableHeight = body.offsetHeight - infoContainerHeight;

            imageContainer.style.height = `${Math.max(availableHeight, 0)}px`;
            textWrapper.style.flexGrow = "0";
            textWrapper.style.height = `${infoContainerHeight}px`;

            console.log({
                infoContainerHeight,
                availableHeight,
                bodyHeight: body.offsetHeight,
                imageContainerHeight: imageContainer.style.height,
            });
        }
    });
}

// Réinitialiser les contenus dynamiques (utile pour la mise à jour du layout)
function resetContent() {
    document.getElementById('name').textContent = '';
    document.getElementById('original').textContent = '';
    document.getElementById('location').textContent = '';
    document.getElementById('description').innerHTML = '';
    document.getElementById('navra-info-price').innerHTML = '';
}

// Gérer l'affichage de l'image en fonction de sa disponibilité
function handleImageDisplay(image) {
    const imageContainer = document.getElementById('image-container');
    const navraContainer = document.getElementById('navra-container');

    if (!image) {
        imageContainer.style.display = 'none';
        document.body.style.height = 'auto';
        navraContainer.style.backgroundColor = '#888';
        navraContainer.style.position = 'relative';
        navraContainer.style.marginTop = '5px';
    } else {
        imageContainer.style.display = 'block';
        document.body.style.height = '470px';
        navraContainer.style.position = 'absolute';
        navraContainer.style.marginTop = '0';
    }
}

// Ajuster la mise en page lorsque le DOM est chargé ou que la fenêtre est redimensionnée
window.addEventListener('DOMContentLoaded', adjustLayout);
window.addEventListener('resize', adjustLayout);

resetContent();

handleImageDisplay(image);
