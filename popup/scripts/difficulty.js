console.log("difficulty.js chargé avec succès");

// Fonction pour obtenir l'icône et la couleur en fonction de la difficulté
function getDifficultyIcon(value) {
    switch (parseInt(value, 10)) {
        case 1:
            return { icon: "network_wifi_1_bar", color: "#f5a91d" }; // Icône pour "Facile" (vert)
        case 2:
            return { icon: "network_wifi_3_bar", color: "#f25f4c" }; // Icône pour "Moyen" (orange)
        case 3:
            return { icon: "signal_wifi_4_bar", color: "#c2255c" }; // Icône pour "Expert" (rouge)
        default:
            return { icon: "", color: "" }; // Aucun icône si la difficulté n'est pas valide
    }
}


// Obtenir l'icône et la couleur correspondante
const { icon, color } = getDifficultyIcon(difficulty);

// Mettre à jour l'icône et appliquer la couleur via le style inline
const difficultyIconElement = document.getElementById('difficulty-icon');
difficultyIconElement.textContent = icon || "";
difficultyIconElement.style.color = color || "";  // Applique la couleur en fonction de la difficulté
