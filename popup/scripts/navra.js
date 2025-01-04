console.log("navra.js chargé avec succès");

// Liste des variables et des sélecteurs correspondants
const variableSelectorMap = {
  prix: '.navra-info-price',
  longueur: '.navra-info-length',
  duree: '.navra-info-duration',
  difficulte: '.navra-info-difficulty',
  cuisine: '.navra-info-cuisine',
};

// Indicateur pour savoir si le script `displayPrice.js` doit être chargé
let shouldLoadDisplayPriceScript = false;

// Parcourir chaque variable et afficher ou masquer l'élément correspondant
Object.entries(variableSelectorMap).forEach(([variable, selector]) => {
  const value = getURLParameter(variable); // Récupère la valeur de la variable
  const element = document.querySelector(selector);

  if (element) {
    if (value) {
      if (variable === 'difficulte' && !['1', '2', '3'].includes(value)) {
        // Si la difficulté n'est pas 1, 2, ou 3, on masque l'élément
        element.style.display = 'none';
      } else {
        element.style.display = 'block'; // Affiche si la variable a une valeur
        if (variable === 'prix') {
          shouldLoadDisplayPriceScript = true; // Indique que le prix est défini
        }
      }
    } else {
      element.style.display = 'none'; // Masque si la variable est vide
    }
  }
});

// Charger le script `displayPrice.js` si nécessaire
if (shouldLoadDisplayPriceScript) {
  const script = document.createElement('script');
  script.src = 'scripts/displayPrice.js';
  document.getElementById('navra-container').appendChild(script);
}

// Ajuster les boutons si aucun élément `.navra-info-*` n'est visible
const visibleInfoElements = Array.from(document.querySelectorAll(Object.values(variableSelectorMap).join(',')))
  .some(element => element.style.display !== 'none');

if (!visibleInfoElements) {
  document.querySelectorAll('[class^="navra-button-"]').forEach(element => {
    element.style.flex = '1'; // Permet aux boutons de s'étendre uniformément
    element.style.aspectRatio = 'auto'; // Supprime l'aspect carré
    element.style.margin = '0'; // Supprime les marges
    element.style.width = 'auto'; // Laisse la largeur se gérer via flexbox
  });
}
//
