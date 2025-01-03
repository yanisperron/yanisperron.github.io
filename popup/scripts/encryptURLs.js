// Double encodage pour les URL
function encodeURL(url) {
    let firstEncoded = encodeURIComponent(url);
    let secondEncoded = encodeURIComponent(firstEncoded);
    return secondEncoded;
}

// Tester les URL
function setURL(url) {
    if (!url) {
        console.error('No URL provided');
        return null;
    }

    if (/<.*?>/.test(url)) {
        console.error('URL contains invalid characters');
        return null;
    }

    return encodeURL(url);
}

// Tester et encoder les URLs dynamiques
const encodedMaps = setURL(maps);
const encodedWebsite = setURL(website);

// Si l'URL est valide et encodée, l'afficher ou l'utiliser
if (encodedMaps) {
    console.log('Encoded Maps URL:', encodedMaps);
} else {
    console.error('Failed to encode Maps URL.');
}

if (encodedWebsite) {
    console.log('Encoded Website URL:', encodedWebsite);
} else {
    console.error('Failed to encode Website URL.');
}
