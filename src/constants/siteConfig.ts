/**
 * Configuration globale du site AYIHA BOOST
 * Centralisation des coordonnées et liens pour faciliter la maintenance
 */

export const SITE_CONFIG = {
    name: "AYIHA BOOST",
    region: "BEN/AFRICA",
    description: "Le premier réseau de relais digitaux couvrant les 77 communes du Bénin.",
    
    // Coordonnées
    contact: {
        phone: "0156202023",
        phoneFull: "+229 0156202023",
        whatsapp: "22901562020",
        email: "contact@ayihaboost.com",
        address: "Cotonou, Bénin",
        workingHours: "Lun–Sam : 8h – 20h",
    },

    // Liens externes
    links: {
        whatsapp: (text = "") => {
            const baseUrl = `https://wa.me/22901562020`;
            return text ? `${baseUrl}?text=${encodeURIComponent(text)}` : baseUrl;
        },
        googleFormJoin: "https://forms.google.com", // À remplacer par le vrai lien si disponible
        facebook: "https://facebook.com/ayihaboost",
        instagram: "https://instagram.com/ayihaboost",
        twitter: "https://twitter.com/ayihaboost",
        youtube: "https://youtube.com/ayihaboost",
    },

    // Paramètres métier
    business: {
        communesCount: 77,
        relaisCount: "500+",
        campaignStartDelay: "24h",
    }
};
