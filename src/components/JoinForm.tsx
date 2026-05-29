import { useState } from "react";
import { Send, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import { SITE_CONFIG } from "../constants/siteConfig";

export default function JoinForm() {
    const { dark } = useTheme();
    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false);
    const [sent, setSent] = useState(false);
    const [form, setForm] = useState({
        name: "",
        phone: "",
        email: "",
        zone: "",
        experience: "",
        motivation: ""
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const nextStep = () => setStep(prev => prev + 1);
    const prevStep = () => setStep(prev => prev - 1);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        
        // Simulation d'envoi (on pourrait utiliser emailService.ts ici)
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        setLoading(false);
        setSent(true);
    };

    const t = {
        cardBg: dark ? "rgba(255,255,255,0.03)" : "white",
        inputBg: dark ? "rgba(255,255,255,0.05)" : "#f8fafc",
        border: dark ? "rgba(255,255,255,0.1)" : "#e2e8f0",
        text: dark ? "#fff" : "#1e293b",
        muted: dark ? "#94a3b8" : "#64748b",
        primary: "#00A651"
    };

    if (sent) {
        return (
            <div className="text-center py-12 px-6 animate-fadeIn">
                <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 color="#00A651" size={40} />
                </div>
                <h3 className="text-2xl font-bold mb-4" style={{ color: t.text }}>Demande envoyée !</h3>
                <p className="max-w-md mx-auto mb-8" style={{ color: t.muted }}>
                    Merci {form.name} ! Votre candidature a été transmise avec succès. 
                    Notre équipe va l'étudier et vous contactera sur WhatsApp d'ici 24h.
                </p>
                <div className="p-4 rounded-xl bg-orange-500/10 border border-orange-500/20 text-sm text-orange-500 max-w-sm mx-auto">
                    <AlertCircle size={16} className="inline mr-2" />
                    Pensez à surveiller vos messages WhatsApp !
                </div>
            </div>
        );
    }

    return (
        <div 
            className="rounded-3xl p-6 sm:p-10 shadow-2xl transition-all border animate-fadeInUp"
            style={{ background: t.cardBg, borderColor: t.border }}
        >
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h3 className="text-xl font-bold" style={{ color: t.text }}>Candidature Relais</h3>
                    <p className="text-sm" style={{ color: t.muted }}>Étape {step} sur 3</p>
                </div>
                <div className="flex gap-1">
                    {[1, 2, 3].map(i => (
                        <div 
                            key={i} 
                            className="h-1.5 w-8 rounded-full transition-all"
                            style={{ 
                                background: i <= step ? t.primary : t.border,
                                opacity: i <= step ? 1 : 0.5
                            }}
                        />
                    ))}
                </div>
            </div>

            <form onSubmit={step === 3 ? handleSubmit : (e) => e.preventDefault()}>
                {step === 1 && (
                    <div className="space-y-5 animate-slideInRight">
                        <div>
                            <label className="block text-sm font-semibold mb-2" style={{ color: t.text }}>Nom complet *</label>
                            <input 
                                type="text" name="name" value={form.name} onChange={handleChange} required
                                placeholder="Ex: Jean Koffi"
                                className="w-full px-5 py-4 rounded-xl outline-none transition-all focus:ring-2 focus:ring-green-500/50"
                                style={{ background: t.inputBg, border: `1px solid ${t.border}`, color: t.text }}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold mb-2" style={{ color: t.text }}>Numéro WhatsApp *</label>
                            <input 
                                type="tel" name="phone" value={form.phone} onChange={handleChange} required
                                placeholder="+229 XX XX XX XX"
                                className="w-full px-5 py-4 rounded-xl outline-none transition-all focus:ring-2 focus:ring-green-500/50"
                                style={{ background: t.inputBg, border: `1px solid ${t.border}`, color: t.text }}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold mb-2" style={{ color: t.text }}>Email (optionnel)</label>
                            <input 
                                type="email" name="email" value={form.email} onChange={handleChange}
                                placeholder="votre@email.com"
                                className="w-full px-5 py-4 rounded-xl outline-none transition-all focus:ring-2 focus:ring-green-500/50"
                                style={{ background: t.inputBg, border: `1px solid ${t.border}`, color: t.text }}
                            />
                        </div>
                        <button 
                            type="button" 
                            onClick={nextStep}
                            disabled={!form.name || !form.phone}
                            className="btn-primary w-full py-4 rounded-xl mt-4 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Continuer →
                        </button>
                    </div>
                )}

                {step === 2 && (
                    <div className="space-y-5 animate-slideInRight">
                        <div>
                            <label className="block text-sm font-semibold mb-2" style={{ color: t.text }}>Votre zone de résidence *</label>
                            <select 
                                name="zone" value={form.zone} onChange={handleChange} required
                                className="w-full px-5 py-4 rounded-xl outline-none transition-all focus:ring-2 focus:ring-green-500/50 appearance-none"
                                style={{ background: t.inputBg, border: `1px solid ${t.border}`, color: t.text }}
                            >
                                <option value="">Sélectionnez votre ville</option>
                                <option value="cotonou">Cotonou</option>
                                <option value="abomey-calavi">Abomey-Calavi</option>
                                <option value="porto-novo">Porto-Novo</option>
                                <option value="parakou">Parakou</option>
                                <option value="autre">Autre commune</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-semibold mb-2" style={{ color: t.text }}>Expérience réseaux sociaux *</label>
                            <select 
                                name="experience" value={form.experience} onChange={handleChange} required
                                className="w-full px-5 py-4 rounded-xl outline-none transition-all focus:ring-2 focus:ring-green-500/50 appearance-none"
                                style={{ background: t.inputBg, border: `1px solid ${t.border}`, color: t.text }}
                            >
                                <option value="">Niveau d'expérience</option>
                                <option value="debutant">Débutant (0-500 contacts)</option>
                                <option value="intermediaire">Intermédiaire (500-2000 contacts)</option>
                                <option value="influenceur">Influenceur (+2000 contacts)</option>
                            </select>
                        </div>
                        <div className="flex gap-4 mt-6">
                            <button 
                                type="button" onClick={prevStep}
                                className="w-1/3 py-4 rounded-xl font-bold"
                                style={{ background: t.inputBg, border: `1px solid ${t.border}`, color: t.text }}
                            >
                                Retour
                            </button>
                            <button 
                                type="button" onClick={nextStep}
                                disabled={!form.zone || !form.experience}
                                className="btn-primary w-2/3 py-4 rounded-xl disabled:opacity-50"
                            >
                                Continuer →
                            </button>
                        </div>
                    </div>
                )}

                {step === 3 && (
                    <div className="space-y-5 animate-slideInRight">
                        <div>
                            <label className="block text-sm font-semibold mb-2" style={{ color: t.text }}>Pourquoi voulez-vous nous rejoindre ? *</label>
                            <textarea 
                                name="motivation" value={form.motivation} onChange={handleChange} required
                                rows={4}
                                placeholder={`Dites-nous pourquoi vous ferez un bon relais ${SITE_CONFIG.name}...`}
                                className="w-full px-5 py-4 rounded-xl outline-none transition-all focus:ring-2 focus:ring-green-500/50 resize-none"
                                style={{ background: t.inputBg, border: `1px solid ${t.border}`, color: t.text }}
                            />
                        </div>
                        <div className="p-4 rounded-xl text-xs flex gap-3" style={{ background: dark ? "rgba(0,166,81,0.05)" : "#f0fdf4", border: `1px solid ${dark ? "rgba(0,166,81,0.1)" : "#dcfce7"}` }}>
                            <CheckCircle2 size={16} color="#00A651" className="flex-shrink-0" />
                            <p style={{ color: t.muted }}>
                                En envoyant votre candidature, vous confirmez être âgé de 18 ans ou plus et posséder un compte WhatsApp actif.
                            </p>
                        </div>
                        <div className="flex gap-4 mt-6">
                            <button 
                                type="button" onClick={prevStep}
                                className="w-1/3 py-4 rounded-xl font-bold"
                                style={{ background: t.inputBg, border: `1px solid ${t.border}`, color: t.text }}
                            >
                                Retour
                            </button>
                            <button 
                                type="submit" 
                                disabled={loading || !form.motivation}
                                className="btn-primary w-2/3 py-4 rounded-xl flex items-center justify-center gap-2"
                            >
                                {loading ? <Loader2 className="animate-spin" size={20} /> : <Send size={20} />}
                                {loading ? "Envoi..." : "Envoyer ma candidature"}
                            </button>
                        </div>
                    </div>
                )}
            </form>
        </div>
    );
}
