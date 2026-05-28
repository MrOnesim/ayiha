import {
    Users,
    TrendingUp,
    DollarSign,
    CheckCircle2,
    Clock,
    Star,
} from 'lucide-react';
import { mockStats } from '../../data/ceoData';

interface CEODashboardTabProps {
    setActiveTab: (tab: string) => void;
}

export default function CEODashboardTab({
    setActiveTab,
}: CEODashboardTabProps) {
    return (
        <div className="space-y-6">
            <h2
                className="font-poppins font-bold text-xl"
                style={{ color: 'white' }}
            >
                Vue d'ensemble — Mai 2026
            </h2>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {[
                    {
                        label: 'Total Relais',
                        value: mockStats.totalRelais,
                        color: '#00A651',
                        icon: Users,
                    },
                    {
                        label: 'Clients actifs',
                        value: mockStats.activeClients,
                        color: '#FF6B00',
                        icon: TrendingUp,
                    },
                    {
                        label: 'CA Mensuel',
                        value: `${(mockStats.monthlyRevenue / 1000).toFixed(0)}K`,
                        suffix: 'FCFA',
                        color: '#00A651',
                        icon: DollarSign,
                    },
                    {
                        label: 'Budget Relais',
                        value: `${(mockStats.relayBudget / 1000).toFixed(0)}K`,
                        suffix: 'FCFA',
                        color: '#d97706',
                        icon: Star,
                    },
                    {
                        label: 'En attente',
                        value: mockStats.pendingScreenshots,
                        color: '#ef4444',
                        icon: Clock,
                    },
                    {
                        label: "Validés aujourd'hui",
                        value: mockStats.validatedToday,
                        color: '#00A651',
                        icon: CheckCircle2,
                    },
                ].map((s) => {
                    const Icon = s.icon;
                    return (
                        <div
                            key={s.label}
                            className="p-4 rounded-2xl text-center"
                            style={{
                                background: '#1a1a1a',
                                border: '1px solid rgba(255,255,255,0.08)',
                            }}
                        >
                            <div
                                className="w-10 h-10 rounded-xl flex items-center justify-center mx-auto mb-3"
                                style={{
                                    background: `${s.color}20`,
                                }}
                            >
                                <Icon size={18} color={s.color} />
                            </div>
                            <div
                                className="font-poppins font-black text-2xl"
                                style={{
                                    color: s.color,
                                    lineHeight: 1,
                                }}
                            >
                                {s.value}
                            </div>
                            {s.suffix && (
                                <div
                                    className="text-xs"
                                    style={{
                                        color: 'rgba(255,255,255,0.4)',
                                    }}
                                >
                                    {s.suffix}
                                </div>
                            )}
                            <div
                                className="text-xs mt-1"
                                style={{
                                    color: 'rgba(255,255,255,0.4)',
                                }}
                            >
                                {s.label}
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Revenue chart placeholder */}
            <div
                className="p-6 rounded-2xl"
                style={{
                    background: '#1a1a1a',
                    border: '1px solid rgba(255,255,255,0.08)',
                }}
            >
                <h3
                    className="font-bold text-base mb-5"
                    style={{ color: 'white' }}
                >
                    Évolution du CA (6 derniers mois)
                </h3>
                <div className="flex items-end gap-3 h-32">
                    {[
                        { month: 'Déc', pct: 40 },
                        { month: 'Jan', pct: 55 },
                        { month: 'Fév', pct: 48 },
                        { month: 'Mar', pct: 65 },
                        { month: 'Avr', pct: 75 },
                        { month: 'Mai', pct: 92 },
                    ].map((d) => (
                        <div
                            key={d.month}
                            className="flex-1 flex flex-col items-center gap-1"
                        >
                            <div
                                className="text-xs font-bold"
                                style={{ color: '#00A651' }}
                            >
                                {d.pct}%
                            </div>
                            <div
                                className="w-full rounded-t-lg transition-all"
                                style={{
                                    height: `${d.pct}%`,
                                    background:
                                        d.month === 'Mai'
                                            ? 'linear-gradient(180deg, #00A651, #005c30)'
                                            : 'rgba(0,166,81,0.3)',
                                    minHeight: '8px',
                                }}
                            />
                            <div
                                className="text-xs"
                                style={{
                                    color: 'rgba(255,255,255,0.4)',
                                }}
                            >
                                {d.month}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Alerts */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div
                    className="p-5 rounded-2xl"
                    style={{
                        background: 'rgba(239,68,68,0.08)',
                        border: '1px solid rgba(239,68,68,0.2)',
                    }}
                >
                    <h4
                        className="font-bold text-sm mb-3"
                        style={{ color: '#ef4444' }}
                    >
                        Alertes ({mockStats.pendingScreenshots})
                    </h4>
                    <p
                        className="text-sm"
                        style={{ color: 'rgba(255,255,255,0.6)' }}
                    >
                        {mockStats.pendingScreenshots} screenshots en attente de
                        validation. Vérifiez les soumissions des relais avant la
                        fin du mois.
                    </p>
                    <button
                        onClick={() => setActiveTab('screenshots')}
                        className="mt-4 text-sm font-semibold px-4 py-2 rounded-lg transition-all"
                        style={{
                            background: 'rgba(239,68,68,0.15)',
                            color: '#ef4444',
                            border: 'none',
                            cursor: 'pointer',
                        }}
                    >
                        Voir les screenshots →
                    </button>
                </div>
                <div
                    className="p-5 rounded-2xl"
                    style={{
                        background: 'rgba(0,166,81,0.08)',
                        border: '1px solid rgba(0,166,81,0.2)',
                    }}
                >
                    <h4
                        className="font-bold text-sm mb-3"
                        style={{ color: '#00A651' }}
                    >
                        Budget Relais Disponible
                    </h4>
                    <p
                        className="text-sm"
                        style={{ color: 'rgba(255,255,255,0.6)' }}
                    >
                        {mockStats.relayBudget.toLocaleString()} FCFA
                        disponibles pour les paiements MoMo de fin de mois.
                    </p>
                    <button
                        onClick={() => setActiveTab('bilan')}
                        className="mt-4 text-sm font-semibold px-4 py-2 rounded-lg transition-all"
                        style={{
                            background: 'rgba(0,166,81,0.15)',
                            color: '#00A651',
                            border: 'none',
                            cursor: 'pointer',
                        }}
                    >
                        Générer le bilan →
                    </button>
                </div>
            </div>
        </div>
    );
}
