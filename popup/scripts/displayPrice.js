console.log("displayPrice.js chargé avec succès");

// Table de correspondance des devises
const currencySymbols = {
    USD: '$',
    GBP: '£',
    EUR: '€',
    JPY: '¥',
    AUD: 'A$',
    CAD: 'C$',
    ISK: 'kr',
    DZD: 'DA',
    CNY: '¥',
    CZK: 'Kč',
    TWD: 'NT$',
};

// Table de correspondance pays => devise
const currencyGroups = {
    "EUR": ["France", "Irlande", "Allemagne", "Espagne", "Italie", "Portugal", "Grèce", "Belgique", "Pays-Bas", "Autriche"],
    "USD": ["États-Unis", "Porto Rico"],
    "GBP": ["Royaume-Uni", "Irlande du Nord", "Angleterre", "Pays de Galles", "Écosse"],
    "ISK": ["Islande"],
    "DZD": ["Algérie"],
    "JPY": ["Japon"],
    "CNY": ["Chine"],
    "CZK": ["Tchéquie"],
    "TWD": ["Taïwan"],
};

// Fonction pour récupérer la devise à partir du pays
function getCurrencyForCountry(country) {
    for (const [currency, countries] of Object.entries(currencyGroups)) {
        if (countries.includes(country)) {
            return currency;
        }
    }
    return "EUR"; // Devise par défaut
}

// Fonction pour récupérer les taux de change
async function fetchExchangeRate() {
    try {
        const response = await fetch('https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/eur.json');
        const data = await response.json();
        return data.eur; // Retourne uniquement l'objet contenant les taux
    } catch (error) {
        console.error('Erreur lors de la récupération des taux de change:', error);
        return null;
    }
}

// Fonction principale pour afficher le prix
async function displayConvertedPrice(price, currency, ticket) {
    const priceContainer = document.getElementById('navra-info-price');
    let priceText = '';

    console.log('Prix reçu:', price);
    console.log('Devise reçue:', currency);

    if (price === '0') {
        priceText = '<span class="price-text">Gratuit</span>';
    } else if (!price || price.trim() === '') {
        if (priceContainer) {
            priceContainer.style.display = 'none';
        }
        return;
    } else {
        const rates = await fetchExchangeRate();
        const numericPrice = parseFloat(price.toString().replace(',', '.'));

        if (rates) {
            const conversionRate = rates[currency.toLowerCase()];
            if (conversionRate) {
                // Conversion vers EUR
                const convertedPrice = numericPrice / conversionRate;
                const displayPrice = Number.isInteger(convertedPrice)
                    ? convertedPrice.toFixed(0)
                    : convertedPrice.toFixed(2).replace('.', ',');

                const originalPriceDisplay = Number.isInteger(numericPrice)
                    ? numericPrice.toFixed(0)
                    : numericPrice.toFixed(2).replace('.', ',');

                priceText = currency === 'EUR'
                    ? `<span class="price-text">${displayPrice}€</span>`
                    : `<span class="price-text">${displayPrice}€ <span class="converted-price">(${originalPriceDisplay}${currencySymbols[currency] || currency})</span></span>`;
            } else {
                console.warn('Aucun taux de conversion trouvé pour la devise:', currency);
                const originalPriceDisplay = Number.isInteger(numericPrice)
                    ? numericPrice.toFixed(0)
                    : numericPrice.toFixed(2).replace('.', ',');
                priceText = `<span class="price-text">${originalPriceDisplay}${currencySymbols[currency] || currency}</span>`;
            }
        } else {
            console.error('Impossible de récupérer les taux de conversion.');
            const originalPriceDisplay = Number.isInteger(numericPrice)
                ? numericPrice.toFixed(0)
                : numericPrice.toFixed(2).replace('.', ',');
            priceText = `<span class="price-text">${originalPriceDisplay}${currencySymbols[currency] || currency}</span>`;
        }

        if (numericPrice > 0 && ticket) {
            const ticketText = `<div class="ticket-info">${ticket}</div>`;
            priceText += ticketText;
        }
    }

    console.log('Contenu final du prix:', priceText);

    if (priceContainer) {
        priceContainer.innerHTML = priceText;
    }

}

let currency = getURLParameter('devise')?.toUpperCase() || '';
console.log(country);
const ticket = getURLParameter('ticket') || '';

// Définir la devise si non spécifiée
if (!currency || currency.trim() === '') {
    currency = getCurrencyForCountry(country);
    console.log(`Aucune devise spécifiée, utilisation de la devise par défaut pour le pays ${country}: ${currency}`);
}

// Appeler la fonction pour afficher le prix
displayConvertedPrice(price, currency, ticket).then(() => {
    adjustLayout();
});
