console.log("duration.js chargé avec succès");

// Fonction pour convertir la durée en heures et minutes
function formatDuration(minutes) {
    const hrs = Math.floor(minutes / 60); // Calcul des heures
    const mins = minutes % 60; // Calcul des minutes restantes
    if (hrs > 0) {
        return `${hrs}h${mins > 0 ? `${mins < 10 ? `0${mins}` : mins}` : ''}`; // Affiche l'heure, et les minutes si nécessaire
    }
    return `${mins < 10 ? `0${mins}` : mins} min`; // Si moins d'une heure, affiche uniquement les minutes avec "min"
}

// Traduire la durée et l'afficher
const duree = parseInt(getURLParameter('duree') || '0', 10); // Exemple : récupération de la durée
const formattedDuration = formatDuration(duree);
document.getElementById('duration').textContent = formattedDuration || '';
//
