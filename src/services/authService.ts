/**
 * Service d'authentification pour AYIHA BOOST
 *
 * Options supportées:
 * 1. Supabase Auth - Gratuit, complet, recommandé
 * 2. Firebase Auth - Alternative
 * 3. LocalStorage (simulation) - Pour développement
 *
 * Configuration Supabase:
 * - Créez un projet sur https://supabase.com
 * - Ajoutez VITE_SUPABASE_URL et VITE_SUPABASE_ANON_KEY
 */

import { useState, useEffect } from "react";

export interface User {
    id: string;
    email: string;
    phone?: string;
    name?: string;
    role: "relais" | "ceo" | "admin";
    createdAt: Date;
    lastLogin?: Date;
}

export interface AuthState {
    user: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;
}

export interface LoginCredentials {
    email?: string;
    phone?: string;
    password: string;
}

export interface RegisterData extends LoginCredentials {
    name: string;
    role: "relais" | "ceo";
}

export interface AuthResponse {
    success: boolean;
    user?: User;
    error?: string;
}

// Provider configuré
const AUTH_PROVIDER = import.meta.env.VITE_AUTH_PROVIDER || "local";

const STORAGE_KEY = "ayiha_auth";
const USER_KEY = "ayiha_user";

/**
 * Initialise Supabase si configuré
 * Utilise une approche dynamique pour éviter les erreurs de build
 */
async function getSupabase() {
    const url = import.meta.env.VITE_SUPABASE_URL;
    const key = import.meta.env.VITE_SUPABASE_ANON_KEY;

    if (!url || !key) {
        return null;
    }

    try {
        // Utilise eval pour éviter l'analyse statique de Rollup
        // @ts-expect-error - dynamic import via eval
        const createClient = new Function(
            "return import('@supabase/supabase-js').then(m => m.createClient)",
        )();
        const clientFactory = await createClient;
        return clientFactory(url, key);
    } catch {
        console.warn(
            "Supabase module not available. Install @supabase/supabase-js for production auth.",
        );
        return null;
    }
}

/**
 * Inscrit un nouvel utilisateur
 */
export async function register(data: RegisterData): Promise<AuthResponse> {
    if (AUTH_PROVIDER === "supabase") {
        return registerWithSupabase(data);
    }

    // Simulation locale
    return simulateRegister(data);
}

/**
 * Connecte un utilisateur
 */
export async function login(
    credentials: LoginCredentials,
): Promise<AuthResponse> {
    if (AUTH_PROVIDER === "supabase") {
        return loginWithSupabase(credentials);
    }

    // Simulation locale
    return simulateLogin(credentials);
}

/**
 * Déconnecte un utilisateur
 */
export async function logout(): Promise<void> {
    if (AUTH_PROVIDER === "supabase") {
        const supabase = await getSupabase();
        if (supabase) {
            await supabase.auth.signOut();
        }
    }

    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(USER_KEY);
}

/**
 * Récupère la session courante
 */
export async function getCurrentUser(): Promise<User | null> {
    if (AUTH_PROVIDER === "supabase") {
        return getCurrentUserSupabase();
    }

    return getStoredUser();
}

/**
 * Vérifie si l'utilisateur a un rôle spécifique
 */
export function hasRole(user: User | null, roles: string[]): boolean {
    if (!user) return false;
    return roles.includes(user.role);
}

/**
 * Protège une route - à utiliser dans les composants
 */
export function requireAuth(allowedRoles?: string[]): {
    requiresAuth: boolean;
    redirectTo?: string;
} {
    const stored = localStorage.getItem(USER_KEY);
    if (!stored) {
        return { requiresAuth: true, redirectTo: "/login" };
    }

    const user: User = JSON.parse(stored);

    if (allowedRoles && !hasRole(user, allowedRoles)) {
        return { requiresAuth: true, redirectTo: "/" };
    }

    return { requiresAuth: false };
}

// ═══════════════════════════════════════════════════════════
// Implémentation Supabase
// ═══════════════════════════════════════════════════════════

async function registerWithSupabase(data: RegisterData): Promise<AuthResponse> {
    try {
        const supabase = await getSupabase();
        if (!supabase) {
            return simulateRegister(data);
        }

        const { data: authData, error } = await supabase.auth.signUp({
            email: data.email,
            password: data.password,
        });

        if (error) throw error;

        // Créer le profil utilisateur
        if (authData.user) {
            const { error: profileError } = await supabase
                .from("profiles")
                .insert({
                    id: authData.user.id,
                    email: data.email as string,
                    name: data.name,
                    phone: data.phone ?? null,
                    role: data.role,
                });

            if (profileError) throw profileError;

            const user: User = {
                id: authData.user.id,
                email: data.email,
                name: data.name,
                phone: data.phone,
                role: data.role,
                createdAt: new Date(),
            };

            localStorage.setItem(USER_KEY, JSON.stringify(user));

            return { success: true, user };
        }

        return { success: false, error: "Erreur lors de l'inscription" };
    } catch (error) {
        return {
            success: false,
            error: error instanceof Error ? error.message : "Erreur inconnue",
        };
    }
}

async function loginWithSupabase(
    credentials: LoginCredentials,
): Promise<AuthResponse> {
    try {
        const supabase = await getSupabase();
        if (!supabase) {
            return simulateLogin(credentials);
        }

        if (!credentials.email) {
            return { success: false, error: "Email requis" };
        }

        const { data: authData, error } =
            await supabase.auth.signInWithPassword({
                email: credentials.email,
                password: credentials.password,
            });

        if (error) throw error;

        // Récupérer le profil
        const { data: profile } = await supabase
            .from("profiles")
            .select("*")
            .eq("id", authData.user.id)
            .single();

        if (profile) {
            const user: User = {
                id: profile.id,
                email: profile.email,
                name: profile.name,
                phone: profile.phone,
                role: profile.role,
                createdAt: new Date(profile.created_at),
                lastLogin: new Date(),
            };

            localStorage.setItem(USER_KEY, JSON.stringify(user));

            return { success: true, user };
        }

        return { success: false, error: "Profil non trouvé" };
    } catch (error) {
        return {
            success: false,
            error: error instanceof Error ? error.message : "Erreur inconnue",
        };
    }
}

async function getCurrentUserSupabase(): Promise<User | null> {
    try {
        const supabase = await getSupabase();
        if (!supabase) {
            return getStoredUser();
        }

        const {
            data: { session },
        } = await supabase.auth.getSession();
        if (!session) return null;

        const { data: profile } = await supabase
            .from("profiles")
            .select("*")
            .eq("id", session.user.id)
            .single();

        if (profile) {
            return {
                id: profile.id,
                email: profile.email,
                name: profile.name,
                phone: profile.phone,
                role: profile.role,
                createdAt: new Date(profile.created_at),
            };
        }

        return null;
    } catch {
        return getStoredUser();
    }
}

// ═══════════════════════════════════════════════════════════
// Implémentation locale (simulation/développement)
// ═══════════════════════════════════════════════════════════

function simulateRegister(data: RegisterData): AuthResponse {
    // Vérifier si l'utilisateur existe déjà
    const existing = localStorage.getItem(`user_${data.email || data.phone}`);
    if (existing) {
        return { success: false, error: "Cet utilisateur existe déjà" };
    }

    const user: User = {
        id: `user_${Date.now()}`,
        email: data.email || `${data.phone}@ayihaboost.com`,
        phone: data.phone,
        name: data.name,
        role: data.role,
        createdAt: new Date(),
    };

    // Stocker l'utilisateur (simulation)
    localStorage.setItem(
        `user_${data.email || data.phone}`,
        JSON.stringify({
            ...user,
            password: data.password, // Ne jamais faire en prod !
        }),
    );

    localStorage.setItem(USER_KEY, JSON.stringify(user));

    return { success: true, user };
}

function simulateLogin(credentials: LoginCredentials): AuthResponse {
    const stored = localStorage.getItem(
        `user_${credentials.email || credentials.phone}`,
    );

    if (!stored) {
        // Pour le développement, permettre la connexion avec n'importe quel mot de passe
        const demoUser: User = {
            id: "demo_user",
            email: credentials.email || "demo@ayihaboost.com",
            phone: credentials.phone,
            name: "Utilisateur Demo",
            role: credentials.email?.includes("ceo") ? "ceo" : "relais",
            createdAt: new Date(),
        };

        localStorage.setItem(USER_KEY, JSON.stringify(demoUser));
        return { success: true, user: demoUser };
    }

    const userData = JSON.parse(stored);
    if (userData.password !== credentials.password) {
        return { success: false, error: "Mot de passe incorrect" };
    }

    const user: User = {
        id: userData.id,
        email: userData.email,
        phone: userData.phone,
        name: userData.name,
        role: userData.role,
        createdAt: new Date(userData.createdAt),
        lastLogin: new Date(),
    };

    localStorage.setItem(USER_KEY, JSON.stringify(user));

    return { success: true, user };
}

function getStoredUser(): User | null {
    const stored = localStorage.getItem(USER_KEY);
    if (!stored) return null;

    try {
        return JSON.parse(stored) as User;
    } catch {
        return null;
    }
}

/**
 * Hook personnalisé pour l'authentification
 * À utiliser dans les composants React
 */
export function useAuth() {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        loadUser();
    }, []);

    const loadUser = async () => {
        const currentUser = await getCurrentUser();
        setUser(currentUser);
        setIsLoading(false);
    };

    const doLogin = async (
        credentials: LoginCredentials,
    ): Promise<AuthResponse> => {
        const result = await login(credentials);
        if (result.success && result.user) {
            setUser(result.user);
        }
        return result;
    };

    const doLogout = async () => {
        await logout();
        setUser(null);
    };

    return {
        user,
        isLoading,
        login: doLogin,
        logout: doLogout,
        isAuthenticated: !!user,
    };
}
