console.log("layout.js chargé avec succès");

function adjustLayout() {
    requestAnimationFrame(() => {
        const infoContainer = document.getElementById("info-container");
        const infoWrapper = document.getElementById("info-wrapper");
        const imageContainer = document.getElementById("image-container");
        const body = document.body;

        if (infoContainer && imageContainer) {
            const infoWrapperHeight = infoWrapper.getBoundingClientRect().height;
            const availableHeight = body.offsetHeight - infoWrapperHeight;

            imageContainer.style.height = `${Math.max(availableHeight, 0)}px`;
            infoContainer.style.flexGrow = "0";
            infoContainer.style.height = `${infoWrapperHeight}px`;

            console.log({
                infoWrapperHeight,
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

window.addEventListener('DOMContentLoaded', adjustLayout);
window.addEventListener('resize', adjustLayout);

resetContent();

handleImageDisplay(image);
