import { Navigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { getCurrentUser, type User } from "../services/authService";

interface PrivateRouteProps {
    children: React.ReactNode;
    allowedRoles?: ("relais" | "ceo" | "admin")[];
    redirectTo?: string;
}

export default function PrivateRoute({
    children,
    allowedRoles,
    redirectTo = "/login",
}: PrivateRouteProps) {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(
        null,
    );
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const location = useLocation();

    useEffect(() => {
        checkAuth();
    }, []);

    async function checkAuth() {
        try {
            const currentUser = await getCurrentUser();
            setUser(currentUser);
            setIsAuthenticated(!!currentUser);

            // Vérifier les rôles si spécifiés
            if (currentUser && allowedRoles) {
                const hasRole = allowedRoles.includes(currentUser.role);
                if (!hasRole) {
                    // Rediriger vers la page d'accueil si pas le bon rôle
                    setIsAuthenticated(false);
                }
            }
        } catch {
            setIsAuthenticated(false);
        } finally {
            setIsLoading(false);
        }
    }

    // Affichage pendant le chargement
    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-bg-primary">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-green-brand border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                    <p className="text-text-muted">Chargement...</p>
                </div>
            </div>
        );
    }

    // Redirection si non authentifié ou pas le bon rôle
    if (!isAuthenticated) {
        // Sauvegarder la position actuelle pour redirection après connexion
        return <Navigate to={redirectTo} state={{ from: location }} replace />;
    }

    // Affichage du contenu protégé
    return <>{children}</>;
}

/**
 * Composant pour les routes publiques (redirige vers l'accueil si déjà connecté)
 */
export function PublicRoute({ children }: { children: React.ReactNode }) {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(
        null,
    );
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        getCurrentUser().then((user) => {
            setIsAuthenticated(!!user);
            setIsLoading(false);
        });
    }, []);

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-bg-primary">
                <div className="w-16 h-16 border-4 border-green-brand border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    if (isAuthenticated) {
        return <Navigate to="/" replace />;
    }

    return <>{children}</>;
}
