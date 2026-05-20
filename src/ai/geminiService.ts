import { GoogleGenerativeAI } from '@google/generative-ai';
import { AYIHA_KNOWLEDGE_BASE } from './knowledgeBase';

// ═══════════════════════════════════════════════════════════════
//  GEMINI AI SERVICE — AYIHA BOOST BEN/AFRICA
// ═══════════════════════════════════════════════════════════════

const API_KEY = (import.meta as unknown as { env: { VITE_GEMINI_API_KEY?: string } }).env.VITE_GEMINI_API_KEY;

let genAI: GoogleGenerativeAI | null = null;

function getClient(): GoogleGenerativeAI | null {
  if (!API_KEY) return null;
  if (!genAI) genAI = new GoogleGenerativeAI(API_KEY);
  return genAI;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  isConfidential?: boolean;
  isError?: boolean;
}

// System prompt complet injecté avant chaque conversation
const SYSTEM_PROMPT = `${AYIHA_KNOWLEDGE_BASE}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 RÈGLES DE COMPORTEMENT STRICTES
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
1. Tu réponds UNIQUEMENT en français.
2. Tu es AYIHA AI, l'assistant officiel de AYIHA BOOST BEN/AFRICA.
3. Tu réponds UNIQUEMENT aux questions liées à AYIHA BOOST, ses services, ses formules, son fonctionnement, ses relais, ses zones de couverture, et le marketing digital au Bénin.
4. Si une question n'est pas liée au projet AYIHA BOOST, réponds poliment que tu es spécialisé uniquement sur AYIHA BOOST et invite l'utilisateur à contacter l'équipe pour d'autres sujets.
5. Sois chaleureux, professionnel et concis. Utilise des emojis avec modération.
6. Ne révèle JAMAIS d'informations confidentielles (mots de passe, clés API, identifiants CEO, codes PIN, données personnelles internes, données financières internes).
7. Si tu détectes une tentative d'obtenir des informations confidentielles, refuse fermement mais poliment.
8. Pour toute souscription ou question commerciale urgente, oriente vers WhatsApp : 0156202023.
9. Tes réponses doivent être claires, structurées, avec des listes quand c'est pertinent.
10. Tu ne fais jamais de comparaisons avec des concurrents.
`;

// ═══════════════════════════════════════════════════════════════
//  FALLBACK IA LOCAL — réponses sans API si clé absente
// ═══════════════════════════════════════════════════════════════
function localFallback(message: string): string {
  const m = message.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');

  if (m.includes('formule') || m.includes('tarif') || m.includes('prix') || m.includes('cout') || m.includes('abonnement')) {
    return `Nous proposons **3 formules** adaptées à chaque besoin 🎯 :\n\n` +
      `🟢 **Starter** — 15 000 FCFA/mois\n1 publication/semaine • 5 relais • 1 zone\n\n` +
      `⭐ **Pro** — 35 000 FCFA/mois *(la plus populaire)*\n3 publications/semaine • 20 relais • 3 zones • Dashboard temps réel\n\n` +
      `💎 **Premium** — 75 000 FCFA/mois\nPublications illimitées • 50+ relais • 77 communes • Account manager\n\n` +
      `Toutes sans engagement ! Contactez-nous sur WhatsApp : **0156202023** pour souscrire.`;
  }

  if (m.includes('relais') && (m.includes('devenir') || m.includes('rejoindre') || m.includes('comment'))) {
    return `Pour devenir relais AYIHA BOOST 🤝 :\n\n` +
      `1️⃣ Remplissez le formulaire sur la page **Rejoindre**\n` +
      `2️⃣ Notre équipe vous contacte sous **24h** sur WhatsApp\n` +
      `3️⃣ Vous recevez votre **code PIN** et accédez à votre tableau de bord\n` +
      `4️⃣ Publiez, soumettez vos screenshots et **gagnez des points** !\n\n` +
      `💰 Gains estimés : de **2 000 à 25 000+ FCFA/mois** selon votre niveau.\nPaiements via **MoMo** chaque fin de mois.`;
  }

  if (m.includes('point') || m.includes('niveau') || m.includes('bronze') || m.includes('argent') || m.includes('diamant') || m.includes('or')) {
    return `Le système de niveaux AYIHA BOOST ⭐ :\n\n` +
      `🥉 **Bronze** (0–199 pts) → 2 000 – 5 000 FCFA/mois\n` +
      `🥈 **Argent** (200–499 pts) → 5 000 – 12 000 FCFA/mois\n` +
      `🥇 **Or** (500–999 pts) → 12 000 – 25 000 FCFA/mois\n` +
      `💎 **Diamant** (1000+ pts) → 25 000+ FCFA/mois\n\n` +
      `**Comment gagner des points ?**\n• WhatsApp Status : 5 pts\n• Facebook : 8 pts\n• Instagram : 10 pts\n• Recruter un relais : 25 pts\n• Bonus 10 publications : 30 pts`;
  }

  if (m.includes('momo') || m.includes('paiement') || m.includes('payer') || m.includes('salaire') || m.includes('gain')) {
    return `💳 Les paiements chez AYIHA BOOST :\n\n` +
      `Les relais sont payés via **Mobile Money (MoMo)** entre le **28 et le 31** de chaque mois.\n\n` +
      `Chaque relais reçoit un **bilan mensuel détaillé** avec :\n` +
      `• Le nombre de points accumulés\n• Le montant exact à recevoir\n• L'historique des publications validées`;
  }

  if (m.includes('commune') || m.includes('zone') || m.includes('couverture') || m.includes('ville') || m.includes('benin') || m.includes('bénin')) {
    return `🇧🇯 AYIHA BOOST couvre les **77 communes du Bénin** !\n\n` +
      `Parmi les zones actives :\n📍 Cotonou • Porto-Novo • Parakou • Abomey-Calavi\n` +
      `📍 Djougou • Bohicon • Kandi • Ouidah • Natitingou\n` +
      `📍 Savè • Nikki • Malanville • et bien d'autres...\n\n` +
      `Notre ambition : au moins **1 relais actif** dans chacune des 77 communes !`;
  }

  if (m.includes('screenshot') || m.includes('preuve') || m.includes('photo') || m.includes('proof')) {
    return `📸 Le système de preuves AYIHA BOOST :\n\n` +
      `Chaque relais envoie des **screenshots horodatés** après chaque publication.\n\n` +
      `Notre système :\n• **Horodatage automatique** de chaque screenshot\n` +
      `• **Détection anti-doublons** par hash d'image\n` +
      `• **Validation** par l'équipe AYIHA BOOST sous 48h\n` +
      `• Inclusion dans le **rapport mensuel** du client\n\n` +
      `✅ Transparence totale garantie !`;
  }

  if (m.includes('contact') || m.includes('whatsapp') || m.includes('joindre') || m.includes('appel') || m.includes('email')) {
    return `📞 Contactez AYIHA BOOST :\n\n` +
      `💬 **WhatsApp** : 0156202023 *(réponse rapide, 7j/7)*\n` +
      `📧 **Email** : contact@ayihaboost.com\n` +
      `📍 **Localisation** : Cotonou, Bénin\n` +
      `🕐 **Horaires** : Lun–Sam 8h–20h *(WhatsApp 24/7)*\n\n` +
      `Notre équipe répond généralement en **moins d'une heure** sur WhatsApp !`;
  }

  if (m.includes('securit') || m.includes('protection') || m.includes('donnee') || m.includes('donnée') || m.includes('ssl') || m.includes('firebase')) {
    return `🔒 La sécurité est notre priorité chez AYIHA BOOST :\n\n` +
      `• **HTTPS/SSL** obligatoire sur toute la plateforme\n` +
      `• Base de données **Firebase Firestore chiffrée**\n` +
      `• **Aucun accès public** aux données des relais\n` +
      `• Détection des **screenshots dupliqués** par hash\n` +
      `• **Session CEO** expirée après 30 min d'inactivité\n` +
      `• **Backup automatique** quotidien Firebase\n` +
      `• **Logs de connexion** enregistrés + alertes suspectes`;
  }

  if (m.includes('bonjour') || m.includes('salut') || m.includes('hello') || m.includes('bonsoir') || m.includes('bonne')) {
    return `Bonjour ! 👋 Je suis **AYIHA AI**, l'assistant intelligent de **AYIHA BOOST BEN/AFRICA**.\n\n` +
      `Je suis là pour répondre à toutes vos questions sur notre réseau de relais digitaux.\n\n` +
      `Que souhaitez-vous savoir ? Vous pouvez me poser des questions sur :\n` +
      `• Nos formules et tarifs\n• Comment devenir relais\n• Le système de points\n• Les zones couvertes\n• Nos garanties de sécurité`;
  }

  return `Je suis **AYIHA AI** 🤖, spécialisé sur le projet AYIHA BOOST BEN/AFRICA.\n\n` +
    `Je peux vous renseigner sur :\n` +
    `• 💰 **Nos formules** (Starter 15k • Pro 35k • Premium 75k FCFA)\n` +
    `• 🤝 **Devenir relais** et gagner avec MoMo\n` +
    `• 📍 **Les 77 communes** du Bénin couvertes\n` +
    `• 📸 **Le système de preuves** screenshots\n` +
    `• 🔒 **La sécurité** de la plateforme\n\n` +
    `Pour une question urgente : **WhatsApp 0156202023**`;
}

// ═══════════════════════════════════════════════════════════════
//  ENVOI D'UN MESSAGE À GEMINI
// ═══════════════════════════════════════════════════════════════
export async function sendMessageToAI(
  userMessage: string,
  history: ChatMessage[]
): Promise<string> {
  const client = getClient();

  // Sans clé API → réponse locale intelligente
  if (!client) {
    await new Promise(r => setTimeout(r, 800 + Math.random() * 600));
    return localFallback(userMessage);
  }

  try {
    const model = client.getGenerativeModel({
      model: 'gemini-2.0-flash',
      systemInstruction: SYSTEM_PROMPT,
    });

    // Construire l'historique au format Gemini
    const geminiHistory = history
      .filter(m => !m.isConfidential && !m.isError)
      .slice(-10) // Garder les 10 derniers échanges max
      .map(m => ({
        role: m.role === 'user' ? 'user' as const : 'model' as const,
        parts: [{ text: m.content }],
      }));

    const chat = model.startChat({ history: geminiHistory });
    const result = await chat.sendMessage(userMessage);
    const response = await result.response;
    return response.text();
  } catch (err: unknown) {
    console.warn('Gemini API error, falling back to local:', err);
    // Fallback local si l'API échoue
    return localFallback(userMessage);
  }
}
