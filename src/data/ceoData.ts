// ─── Types ────────────────────────────────────────────────────
export interface RelaisData {
    id: number;
    name: string;
    whatsapp: string;
    zone: string;
    points: number;
    level: string;
    status: string;
    gains: number;
    screenshots: number;
    lastActive: string;
}

export interface ScreenshotData {
    id: number;
    relais: string;
    client: string;
    platform: string;
    submittedAt: string;
    status: string;
    points: number;
}

export interface BilanData {
    relais: string;
    whatsapp: string;
    points: number;
    gains: number;
    level: string;
}

// ─── Statistiques ──────────────────────────────────────────────
export const mockStats = {
    totalRelais: 254,
    activeClients: 87,
    monthlyRevenue: 2850000,
    relayBudget: 485000,
    pendingScreenshots: 18,
    validatedToday: 42,
};

// ─── Relais ────────────────────────────────────────────────────
export const mockRelais: RelaisData[] = [
    {
        id: 1,
        name: "Mariama Kounde",
        whatsapp: "+229 97 65 43 21",
        zone: "Cotonou Centre",
        points: 674,
        level: "Or",
        status: "active",
        gains: 18500,
        screenshots: 12,
        lastActive: "2026-05-28",
    },
    {
        id: 2,
        name: "Kolade Adjovi",
        whatsapp: "+229 95 32 10 87",
        zone: "Porto-Novo",
        points: 412,
        level: "Argent",
        status: "active",
        gains: 10500,
        screenshots: 8,
        lastActive: "2026-05-27",
    },
    {
        id: 3,
        name: "Farida Soumanou",
        whatsapp: "+229 96 78 44 23",
        zone: "Parakou",
        points: 1150,
        level: "Diamant",
        status: "active",
        gains: 28000,
        screenshots: 22,
        lastActive: "2026-05-28",
    },
    {
        id: 4,
        name: "Brice Hounton",
        whatsapp: "+229 97 11 99 55",
        zone: "Bohicon",
        points: 80,
        level: "Bronze",
        status: "inactive",
        gains: 2000,
        screenshots: 3,
        lastActive: "2026-05-10",
    },
    {
        id: 5,
        name: "Aissatou Dansou",
        whatsapp: "+229 94 66 22 88",
        zone: "Abomey",
        points: 520,
        level: "Or",
        status: "active",
        gains: 13000,
        screenshots: 10,
        lastActive: "2026-05-26",
    },
];

// ─── Screenshots ───────────────────────────────────────────────
export const mockScreenshots: ScreenshotData[] = [
    {
        id: 1,
        relais: "Mariama Kounde",
        client: "Boutique Mode Cotonou",
        platform: "WhatsApp Status",
        submittedAt: "2026-05-28 14:32",
        status: "pending",
        points: 5,
    },
    {
        id: 2,
        relais: "Kolade Adjovi",
        client: "Restaurant Saveurs",
        platform: "Facebook",
        submittedAt: "2026-05-28 12:15",
        status: "pending",
        points: 8,
    },
    {
        id: 3,
        relais: "Farida Soumanou",
        client: "Pharmacie Centrale",
        platform: "Instagram",
        submittedAt: "2026-05-28 10:00",
        status: "approved",
        points: 10,
    },
    {
        id: 4,
        relais: "Aissatou Dansou",
        client: "Boutique Mode Cotonou",
        platform: "WhatsApp Status",
        submittedAt: "2026-05-27 18:44",
        status: "rejected",
        points: 5,
    },
];

// ─── Bilan ─────────────────────────────────────────────────────
export const mockBilan: BilanData[] = [
    {
        relais: "Farida Soumanou",
        whatsapp: "+229 96 78 44 23",
        points: 1150,
        gains: 28000,
        level: "Diamant",
    },
    {
        relais: "Mariama Kounde",
        whatsapp: "+229 97 65 43 21",
        points: 674,
        gains: 18500,
        level: "Or",
    },
    {
        relais: "Aissatou Dansou",
        whatsapp: "+229 94 66 22 88",
        points: 520,
        gains: 13000,
        level: "Or",
    },
    {
        relais: "Kolade Adjovi",
        whatsapp: "+229 95 32 10 87",
        points: 412,
        gains: 10500,
        level: "Argent",
    },
    {
        relais: "Brice Hounton",
        whatsapp: "+229 97 11 99 55",
        points: 80,
        gains: 2000,
        level: "Bronze",
    },
];

// ─── Helper ────────────────────────────────────────────────────
export function levelColor(l: string): string {
    const m: Record<string, string> = {
        Bronze: "#CD7F32",
        Argent: "#9ca3af",
        Or: "#d97706",
        Diamant: "#1E3A8A",
    };
    return m[l] || "#888";
}
