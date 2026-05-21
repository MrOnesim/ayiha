/**
 * Service d'envoi d'emails pour AYIHA BOOST
 *
 * Options supportées:
 * 1. EmailJS - Gratuit jusqu'à 200 emails/mois
 * 2. Formspree - Gratuit jusqu'à 50 submissions/mois
 * 3. Fallback - Simulation (développement)
 *
 * Configuration:
 * - Créez un compte sur emailjs.com ou formspree.io
 * - Ajoutez les variables d'environnement dans .env
 * - VITE_EMAILJS_PUBLIC_KEY, VITE_EMAILJS_SERVICE_ID, VITE_EMAILJS_TEMPLATE_ID
 * - ou VITE_FORMSPREE_ENDPOINT
 */

export interface ContactFormData {
    name: string;
    email: string;
    phone: string;
    subject: string;
    message: string;
}

export interface JoinFormData {
    name: string;
    phone: string;
    email?: string;
    zone: string;
    experience: string;
    motivation: string;
}

export interface EmailResponse {
    success: boolean;
    message: string;
    error?: string;
}

// Provider d'email configuré (emailjs, formspree, ou fallback)
const EMAIL_PROVIDER = import.meta.env.VITE_EMAIL_PROVIDER || "fallback";

/**
 * Envoie un email via EmailJS
 */
async function sendViaEmailJS(
    templateId: string,
    params: Record<string, unknown>,
): Promise<EmailResponse> {
    try {
        // Dynamic import to avoid bundling if not used
        const emailjs = await import("@emailjs/browser");

        const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
        const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

        if (!serviceId || !publicKey) {
            throw new Error(
                "Configuration EmailJS incomplète. Vérifiez les variables d'environnement.",
            );
        }

        emailjs.init(publicKey);

        const result = await emailjs.send(serviceId, templateId, params);

        return {
            success: result.status === 200,
            message: "Message envoyé avec succès !",
        };
    } catch (error) {
        console.error("Erreur EmailJS:", error);
        return {
            success: false,
            message: "Erreur lors de l'envoi",
            error: error instanceof Error ? error.message : "Erreur inconnue",
        };
    }
}

/**
 * Envoie un email via Formspree
 */
async function sendViaFormspree(
    formData: Record<string, unknown>,
): Promise<EmailResponse> {
    try {
        const endpoint = import.meta.env.VITE_FORMSPREE_ENDPOINT;

        if (!endpoint) {
            throw new Error(
                "Configuration Formspree incomplète. Vérifiez les variables d'environnement.",
            );
        }

        const response = await fetch(endpoint, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            body: JSON.stringify(formData),
        });

        if (response.ok) {
            return {
                success: true,
                message: "Message envoyé avec succès !",
            };
        }

        const errorData = await response.json();
        return {
            success: false,
            message: "Erreur lors de l'envoi",
            error: errorData.error || "Erreur inconnue",
        };
    } catch (error) {
        console.error("Erreur Formspree:", error);
        return {
            success: false,
            message: "Erreur lors de l'envoi",
            error: error instanceof Error ? error.message : "Erreur inconnue",
        };
    }
}

/**
 * Simulation d'envoi (fallback pour développement)
 */
function simulateEmailSend(): Promise<EmailResponse> {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                success: true,
                message:
                    "Message envoyé avec succès ! (mode simulation - configurez un vrai service pour production)",
            });
        }, 1500);
    });
}

/**
 * Envoie un formulaire de contact
 */
export async function sendContactForm(
    data: ContactFormData,
): Promise<EmailResponse> {
    const templateParams = {
        to_name: "Équipe AYIHA BOOST",
        from_name: data.name,
        from_email: data.email,
        phone: data.phone,
        subject: getSubjectLabel(data.subject),
        message: data.message,
        date: new Date().toLocaleDateString("fr-FR"),
    };

    switch (EMAIL_PROVIDER) {
        case "emailjs":
            return sendViaEmailJS(
                import.meta.env.VITE_EMAILJS_CONTACT_TEMPLATE ||
                    "contact_template",
                templateParams,
            );
        case "formspree":
            return sendViaFormspree({
                ...templateParams,
                type: "contact",
            });
        default:
            console.log("Formulaire de contact (simulation):", data);
            return simulateEmailSend();
    }
}

/**
 * Envoie un formulaire d'inscription relais
 */
export async function sendJoinForm(data: JoinFormData): Promise<EmailResponse> {
    const templateParams = {
        to_name: "Équipe AYIHA BOOST",
        from_name: data.name,
        from_email: data.email || "Non fourni",
        phone: data.phone,
        zone: data.zone,
        experience: data.experience,
        motivation: data.motivation,
        date: new Date().toLocaleDateString("fr-FR"),
    };

    switch (EMAIL_PROVIDER) {
        case "emailjs":
            return sendViaEmailJS(
                import.meta.env.VITE_EMAILJS_JOIN_TEMPLATE || "join_template",
                templateParams,
            );
        case "formspree":
            return sendViaFormspree({
                ...templateParams,
                type: "join",
            });
        default:
            console.log("Formulaire d'inscription (simulation):", data);
            return simulateEmailSend();
    }
}

/**
 * Envoie une notification WhatsApp (via API WhatsApp Business)
 * Note: Nécessite une configuration supplémentaire avec Meta Developer
 */
export async function sendWhatsAppNotification(
    phone: string,
    message: string,
): Promise<EmailResponse> {
    // Cette fonctionnalité nécessite l'API WhatsApp Business
    // Pour l'instant, on retourne un lien wa.me pour l'ouverture manuelle
    const waLink = `https://wa.me/${phone.replace(/\D/g, "")}?text=${encodeURIComponent(message)}`;
    window.open(waLink, "_blank");

    return {
        success: true,
        message: "Ouverture de WhatsApp...",
    };
}

/**
 * Convertit le code sujet en libellé lisible
 */
function getSubjectLabel(subject: string): string {
    const subjects: Record<string, string> = {
        starter: "Formule Starter (15 000 FCFA)",
        pro: "Formule Pro (35 000 FCFA)",
        premium: "Formule Premium (75 000 FCFA)",
        relais: "Devenir Relais",
        info: "Demande d'information",
        autre: "Autre demande",
    };
    return subjects[subject] || subject;
}

/**
 * Valide les données d'un formulaire de contact
 */
export function validateContactForm(data: ContactFormData): {
    valid: boolean;
    errors: Record<string, string>;
} {
    const errors: Record<string, string> = {};

    if (!data.name || data.name.trim().length < 2) {
        errors.name = "Le nom doit contenir au moins 2 caractères";
    }

    if (!data.phone || !/^\+?\d{8,15}$/.test(data.phone.replace(/\s/g, ""))) {
        errors.phone = "Numéro de téléphone invalide";
    }

    if (data.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
        errors.email = "Email invalide";
    }

    if (!data.subject) {
        errors.subject = "Veuillez sélectionner un sujet";
    }

    if (!data.message || data.message.trim().length < 10) {
        errors.message = "Le message doit contenir au moins 10 caractères";
    }

    return {
        valid: Object.keys(errors).length === 0,
        errors,
    };
}

/**
 * Valide les données d'un formulaire d'inscription
 */
export function validateJoinForm(data: JoinFormData): {
    valid: boolean;
    errors: Record<string, string>;
} {
    const errors: Record<string, string> = {};

    if (!data.name || data.name.trim().length < 2) {
        errors.name = "Le nom doit contenir au moins 2 caractères";
    }

    if (!data.phone || !/^\+?\d{8,15}$/.test(data.phone.replace(/\s/g, ""))) {
        errors.phone = "Numéro de téléphone invalide";
    }

    if (data.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
        errors.email = "Email invalide";
    }

    if (!data.zone) {
        errors.zone = "Veuillez sélectionner une zone";
    }

    if (!data.motivation || data.motivation.trim().length < 20) {
        errors.motivation =
            "La motivation doit contenir au moins 20 caractères";
    }

    return {
        valid: Object.keys(errors).length === 0,
        errors,
    };
}
