import { useState, useRef, useEffect, useCallback } from "react";
import {
    MessageCircle,
    X,
    Send,
    Bot,
    User,
    AlertTriangle,
    Zap,
    Trash2,
    ChevronDown,
    Sparkles,
    Shield,
} from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import { sendMessageToAI, type ChatMessage } from "../ai/geminiService";
import { isConfidential, QUICK_QUESTIONS } from "../ai/knowledgeBase";

// ─── Message unique ───────────────────────────────────────────
function MessageBubble({ msg, dark }: { msg: ChatMessage; dark: boolean }) {
    const isUser = msg.role === "user";

    if (msg.isConfidential) {
        return (
            <div className="flex gap-2 justify-start">
                <div
                    className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 mt-1"
                    style={{ background: "rgba(239,68,68,0.15)" }}
                >
                    <Shield size={14} color="#ef4444" />
                </div>
                <div className="max-w-xs">
                    <div
                        className="px-4 py-3 rounded-2xl rounded-tl-sm text-sm"
                        style={{
                            background: dark
                                ? "rgba(239,68,68,0.1)"
                                : "#fef2f2",
                            border: "1px solid rgba(239,68,68,0.3)",
                            color: dark ? "#fca5a5" : "#b91c1c",
                        }}
                    >
                        <div className="flex items-center gap-2 mb-1 font-bold text-xs">
                            <AlertTriangle size={12} />
                            INFORMATION CONFIDENTIELLE
                        </div>
                        <p>
                            🔒 Je ne peux pas répondre à cette question. Elle
                            concerne des informations confidentielles d'AYIHA
                            BOOST.
                        </p>
                        <p className="mt-2 text-xs opacity-75">
                            Pour toute demande urgente, contactez directement
                            l'équipe sur WhatsApp : <strong>0156202023</strong>
                        </p>
                    </div>
                    <div
                        className="text-xs mt-1 ml-1"
                        style={{ color: dark ? "var(--text-faint)" : "#aaa" }}
                    >
                        {msg.timestamp.toLocaleTimeString("fr-FR", {
                            hour: "2-digit",
                            minute: "2-digit",
                        })}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div
            className={`flex gap-2 ${isUser ? "flex-row-reverse" : "flex-row"}`}
        >
            {/* Avatar */}
            <div
                className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 mt-1"
                style={{
                    background: isUser
                        ? "linear-gradient(135deg,#1E3A8A,#2d4fa0)"
                        : "linear-gradient(135deg,#00A651,#009045)",
                }}
            >
                {isUser ? (
                    <User size={13} color="white" />
                ) : (
                    <Bot size={13} color="white" />
                )}
            </div>

            {/* Bubble */}
            <div
                className={`max-w-[75%] ${isUser ? "items-end" : "items-start"} flex flex-col`}
            >
                <div
                    className="px-4 py-3 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap"
                    style={
                        isUser
                            ? {
                                  background:
                                      "linear-gradient(135deg,#00A651,#009045)",
                                  color: "white",
                                  borderRadius: "18px 18px 4px 18px",
                              }
                            : {
                                  background: dark ? "var(--bg-card)" : "white",
                                  color: dark ? "var(--text-primary)" : "#222",
                                  border: `1px solid ${dark ? "var(--border-color)" : "#eee"}`,
                                  borderRadius: "18px 18px 18px 4px",
                                  boxShadow: "0 1px 6px rgba(0,0,0,0.06)",
                              }
                    }
                    dangerouslySetInnerHTML={{
                        __html: msg.isError
                            ? `<span style="color:#ef4444">${formatMessage(msg.content)}</span>`
                            : formatMessage(msg.content),
                    }}
                />
                <div
                    className="text-xs mt-1 mx-1"
                    style={{ color: dark ? "var(--text-faint)" : "#bbb" }}
                >
                    {msg.timestamp.toLocaleTimeString("fr-FR", {
                        hour: "2-digit",
                        minute: "2-digit",
                    })}
                </div>
            </div>
        </div>
    );
}

// Formattage markdown simple
function formatMessage(text: string): string {
    return text
        .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
        .replace(/\*(.*?)\*/g, "<em>$1</em>")
        .replace(/^• /gm, "&bull; ")
        .replace(/\n/g, "<br/>");
}

// ─── Indicateur de frappe ────────────────────────────────────
function TypingIndicator({ dark }: { dark: boolean }) {
    return (
        <div className="flex gap-2">
            <div
                className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0"
                style={{
                    background: "linear-gradient(135deg,#00A651,#009045)",
                }}
            >
                <Bot size={13} color="white" />
            </div>
            <div
                className="px-4 py-3 rounded-2xl rounded-tl-sm flex items-center gap-1"
                style={{
                    background: dark ? "var(--bg-card)" : "white",
                    border: `1px solid ${dark ? "var(--border-color)" : "#eee"}`,
                    boxShadow: "0 1px 6px rgba(0,0,0,0.06)",
                }}
            >
                {[0, 1, 2].map((i) => (
                    <span
                        key={i}
                        className="w-2 h-2 rounded-full inline-block"
                        style={{
                            background: "#00A651",
                            animation: `float ${0.6 + i * 0.15}s ease-in-out ${i * 0.15}s infinite alternate`,
                        }}
                    />
                ))}
            </div>
        </div>
    );
}

const STORAGE_KEY = "ayiha_chat_history";

const WELCOME_MESSAGE: ChatMessage = {
    id: "welcome",
    role: "assistant",
    content: `Bonjour ! 👋 Je suis **AYIHA AI**, l'assistant intelligent de **AYIHA BOOST BEN/AFRICA**.\n\nJe réponds à toutes vos questions sur notre réseau de relais digitaux. Comment puis-je vous aider aujourd'hui ?`,
    timestamp: new Date(),
};

function loadMessages(): ChatMessage[] {
    try {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
            const parsed = JSON.parse(saved) as Array<ChatMessage & { timestamp: string }>;
            return parsed.map((m) => ({ ...m, timestamp: new Date(m.timestamp) }));
        }
    } catch {
        // ignore parse errors
    }
    return [WELCOME_MESSAGE];
}

// ─── Composant principal ─────────────────────────────────────
export default function AIChatbot() {
    const { dark } = useTheme();
    const [open, setOpen] = useState(false);
    const [minimized, setMinimized] = useState(false);
    const [messages, setMessages] = useState<ChatMessage[]>(loadMessages);
    const [input, setInput] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const [showQuick, setShowQuick] = useState(messages.length <= 1);
    const [unread, setUnread] = useState(0);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    // Persist messages to localStorage
    useEffect(() => {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
        } catch {
            // ignore storage errors (quota exceeded, etc.)
        }
    }, [messages]);

    // Auto-scroll
    useEffect(() => {
        if (open && !minimized) {
            messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages, isTyping, open, minimized]);

    // Focus input quand on ouvre
    useEffect(() => {
        if (open && !minimized) {
            setTimeout(() => inputRef.current?.focus(), 200);
        }
    }, [open, minimized]);

    // Badge unread
    useEffect(() => {
        if (!open) {
            const assistantMsgs = messages.filter(
                (m) => m.role === "assistant",
            ).length;
            if (assistantMsgs > 1) setUnread(assistantMsgs - 1);
        } else {
            setUnread(0);
        }
    }, [messages, open]);

    const sendMessage = useCallback(
        async (text?: string) => {
            const messageText = (text ?? input).trim();
            if (!messageText || isTyping) return;

            setInput("");
            setShowQuick(false);

            const userMsg: ChatMessage = {
                id: `user-${Date.now()}`,
                role: "user",
                content: messageText,
                timestamp: new Date(),
            };

            // Vérification confidentialité AVANT d'envoyer à l'IA
            if (isConfidential(messageText)) {
                setMessages((prev) => [
                    ...prev,
                    userMsg,
                    {
                        id: `conf-${Date.now()}`,
                        role: "assistant",
                        content: "",
                        timestamp: new Date(),
                        isConfidential: true,
                    },
                ]);
                return;
            }

            setMessages((prev) => [...prev, userMsg]);
            setIsTyping(true);

            try {
                const response = await sendMessageToAI(messageText, messages);
                setMessages((prev) => [
                    ...prev,
                    {
                        id: `ai-${Date.now()}`,
                        role: "assistant",
                        content: response,
                        timestamp: new Date(),
                    },
                ]);
            } catch {
                setMessages((prev) => [
                    ...prev,
                    {
                        id: `err-${Date.now()}`,
                        role: "assistant",
                        content:
                            "⚠️ Une erreur est survenue. Veuillez réessayer ou contacter notre équipe sur WhatsApp : 0156202023",
                        timestamp: new Date(),
                        isError: true,
                    },
                ]);
            } finally {
                setIsTyping(false);
            }
        },
        [input, isTyping, messages],
    );

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    };

    const clearChat = () => {
        const resetMsg: ChatMessage = {
            id: "welcome-new",
            role: "assistant",
            content: `Conversation réinitialisée ! 🔄\n\nBonjour ! Je suis **AYIHA AI**, comment puis-je vous aider ?`,
            timestamp: new Date(),
        };
        setMessages([resetMsg]);
        setShowQuick(true);
        try { localStorage.removeItem(STORAGE_KEY); } catch { /* ignore */ }
    };

    // ── Styles ──
    const panelBg = dark ? "#181c25" : "#ffffff";
    const headerBg = dark ? "#0f1117" : "#1E3A8A";
    const bodyBg = dark ? "#0f1117" : "#f8fafc";
    const inputBg = dark ? "#1e2433" : "#ffffff";
    const borderC = dark ? "rgba(255,255,255,0.08)" : "#e5e7eb";

    return (
        <>
            {/* ── Chat Panel ── */}
            {open && (
                <div
                    className="fixed z-50 flex flex-col"
                    style={{
                        bottom: "96px",
                        right: "20px",
                        width: "min(380px, calc(100vw - 32px))",
                        height: minimized
                            ? "auto"
                            : "min(580px, calc(100vh - 140px))",
                        background: panelBg,
                        borderRadius: "20px",
                        boxShadow:
                            "0 20px 60px rgba(0,0,0,0.25), 0 4px 20px rgba(0,0,0,0.15)",
                        border: `1px solid ${borderC}`,
                        animation: "fadeInUp 0.25s ease-out",
                        overflow: "hidden",
                        transition: "height 0.3s ease",
                    }}
                >
                    {/* Header */}
                    <div
                        className="flex items-center justify-between px-4 py-3 flex-shrink-0"
                        style={{ background: headerBg }}
                    >
                        <div className="flex items-center gap-3">
                            <div className="relative">
                                <div
                                    className="w-9 h-9 rounded-xl flex items-center justify-center"
                                    style={{
                                        background: "rgba(0,166,81,0.2)",
                                        border: "2px solid #00A651",
                                    }}
                                >
                                    <Zap
                                        size={16}
                                        color="#00A651"
                                        fill="#00A651"
                                    />
                                </div>
                                <div
                                    className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-white"
                                    style={{ background: "#00A651" }}
                                />
                            </div>
                            <div>
                                <div className="font-bold text-sm text-white flex items-center gap-1">
                                    AYIHA AI
                                    <Sparkles size={12} color="#fbbf24" />
                                </div>
                                <div
                                    className="text-xs"
                                    style={{ color: "rgba(255,255,255,0.6)" }}
                                >
                                    {isTyping ? (
                                        <span style={{ color: "#00c960" }}>
                                            En train d'écrire...
                                        </span>
                                    ) : (
                                        "Assistant AYIHA BOOST · En ligne"
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center gap-1">
                            <button
                                onClick={clearChat}
                                title="Effacer la conversation"
                                className="w-7 h-7 rounded-lg flex items-center justify-center transition-all"
                                style={{
                                    background: "rgba(255,255,255,0.1)",
                                    border: "none",
                                    cursor: "pointer",
                                }}
                                onMouseEnter={(e) =>
                                    (e.currentTarget.style.background =
                                        "rgba(255,255,255,0.2)")
                                }
                                onMouseLeave={(e) =>
                                    (e.currentTarget.style.background =
                                        "rgba(255,255,255,0.1)")
                                }
                            >
                                <Trash2
                                    size={13}
                                    color="rgba(255,255,255,0.7)"
                                />
                            </button>
                            <button
                                onClick={() => setMinimized((m) => !m)}
                                title={minimized ? "Agrandir" : "Réduire"}
                                className="w-7 h-7 rounded-lg flex items-center justify-center transition-all"
                                style={{
                                    background: "rgba(255,255,255,0.1)",
                                    border: "none",
                                    cursor: "pointer",
                                }}
                            >
                                <ChevronDown
                                    size={14}
                                    color="rgba(255,255,255,0.7)"
                                    style={{
                                        transform: minimized
                                            ? "rotate(180deg)"
                                            : "rotate(0deg)",
                                        transition: "transform 0.3s",
                                    }}
                                />
                            </button>
                            <button
                                onClick={() => setOpen(false)}
                                title="Fermer"
                                className="w-7 h-7 rounded-lg flex items-center justify-center transition-all"
                                style={{
                                    background: "rgba(255,255,255,0.1)",
                                    border: "none",
                                    cursor: "pointer",
                                }}
                                onMouseEnter={(e) =>
                                    (e.currentTarget.style.background =
                                        "rgba(239,68,68,0.3)")
                                }
                                onMouseLeave={(e) =>
                                    (e.currentTarget.style.background =
                                        "rgba(255,255,255,0.1)")
                                }
                            >
                                <X size={14} color="rgba(255,255,255,0.7)" />
                            </button>
                        </div>
                    </div>

                    {!minimized && (
                        <>
                            {/* Messages */}
                            <div
                                className="flex-1 overflow-y-auto px-4 py-4 space-y-4"
                                style={{ background: bodyBg }}
                            >
                                {messages.map((msg) => (
                                    <MessageBubble
                                        key={msg.id}
                                        msg={msg}
                                        dark={dark}
                                    />
                                ))}

                                {isTyping && <TypingIndicator dark={dark} />}

                                {/* Questions rapides */}
                                {showQuick &&
                                    messages.length === 1 &&
                                    !isTyping && (
                                        <div className="space-y-2 pt-2">
                                            <p
                                                className="text-xs font-semibold"
                                                style={{
                                                    color: dark
                                                        ? "var(--text-faint)"
                                                        : "#aaa",
                                                }}
                                            >
                                                Questions fréquentes :
                                            </p>
                                            <div className="flex flex-wrap gap-2">
                                                {QUICK_QUESTIONS.map((q) => (
                                                    <button
                                                        key={q.text}
                                                        onClick={() =>
                                                            sendMessage(q.text)
                                                        }
                                                        className="text-xs px-3 py-1.5 rounded-full transition-all"
                                                        style={{
                                                            background: dark
                                                                ? "rgba(0,166,81,0.1)"
                                                                : "rgba(0,166,81,0.08)",
                                                            color: "#00A651",
                                                            border: "1px solid rgba(0,166,81,0.25)",
                                                            cursor: "pointer",
                                                            fontFamily:
                                                                "Inter, sans-serif",
                                                        }}
                                                        onMouseEnter={(e) =>
                                                            (e.currentTarget.style.background =
                                                                "rgba(0,166,81,0.18)")
                                                        }
                                                        onMouseLeave={(e) =>
                                                            (e.currentTarget.style.background =
                                                                dark
                                                                    ? "rgba(0,166,81,0.1)"
                                                                    : "rgba(0,166,81,0.08)")
                                                        }
                                                    >
                                                        {q.label}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                <div ref={messagesEndRef} />
                            </div>

                            {/* Input */}
                            <div
                                className="px-3 py-3 flex-shrink-0"
                                style={{
                                    borderTop: `1px solid ${borderC}`,
                                    background: panelBg,
                                }}
                            >
                                <div className="flex items-center gap-2">
                                    <input
                                        ref={inputRef}
                                        type="text"
                                        value={input}
                                        onChange={(e) =>
                                            setInput(e.target.value)
                                        }
                                        onKeyDown={handleKeyDown}
                                        placeholder="Posez votre question..."
                                        disabled={isTyping}
                                        style={{
                                            flex: 1,
                                            padding: "10px 14px",
                                            borderRadius: "12px",
                                            border: `1.5px solid ${borderC}`,
                                            background: inputBg,
                                            color: dark
                                                ? "var(--text-primary)"
                                                : "#111",
                                            fontSize: "13px",
                                            fontFamily: "Inter, sans-serif",
                                            outline: "none",
                                            transition: "border-color 0.2s",
                                            opacity: isTyping ? 0.6 : 1,
                                        }}
                                        onFocus={(e) =>
                                            (e.target.style.borderColor =
                                                "#00A651")
                                        }
                                        onBlur={(e) =>
                                            (e.target.style.borderColor =
                                                borderC)
                                        }
                                    />
                                    <button
                                        onClick={() => sendMessage()}
                                        disabled={!input.trim() || isTyping}
                                        className="w-10 h-10 rounded-xl flex items-center justify-center transition-all flex-shrink-0"
                                        style={{
                                            background:
                                                input.trim() && !isTyping
                                                    ? "linear-gradient(135deg,#00A651,#009045)"
                                                    : dark
                                                      ? "rgba(255,255,255,0.08)"
                                                      : "#f0f0f0",
                                            border: "none",
                                            cursor:
                                                input.trim() && !isTyping
                                                    ? "pointer"
                                                    : "not-allowed",
                                            transform:
                                                input.trim() && !isTyping
                                                    ? "scale(1)"
                                                    : "scale(0.95)",
                                        }}
                                    >
                                        <Send
                                            size={15}
                                            color={
                                                input.trim() && !isTyping
                                                    ? "white"
                                                    : dark
                                                      ? "rgba(255,255,255,0.3)"
                                                      : "#ccc"
                                            }
                                        />
                                    </button>
                                </div>
                                <div className="text-center mt-2">
                                    <span
                                        className="text-xs"
                                        style={{
                                            color: dark
                                                ? "rgba(255,255,255,0.2)"
                                                : "#ccc",
                                        }}
                                    >
                                        ⚡ Propulsé par Gemini AI · AYIHA BOOST
                                        BEN/AFRICA
                                    </span>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            )}

            {/* ── FAB Button ── */}
            <button
                onClick={() => {
                    setOpen((o) => !o);
                    setUnread(0);
                }}
                className="fixed z-50 flex items-center justify-center transition-all btn-floating"
                style={{
                    bottom: "24px",
                    right: "24px",
                    width: "60px",
                    height: "60px",
                    borderRadius: "50%",
                    background: open
                        ? "linear-gradient(135deg,#1E3A8A,#0f2460)"
                        : "linear-gradient(135deg,#00A651,#009045)",
                    border: "none",
                    cursor: "pointer",
                    boxShadow: open
                        ? "0 4px 20px rgba(30,58,138,0.5)"
                        : "0 4px 20px rgba(0,166,81,0.5)",
                    transform: open
                        ? "rotate(0deg) scale(1)"
                        : "rotate(0deg) scale(1)",
                    transition: "all 0.3s ease",
                }}
                title={open ? "Fermer l'assistant" : "Ouvrir AYIHA AI"}
                onMouseEnter={(e) =>
                    (e.currentTarget.style.transform = "scale(1.1)")
                }
                onMouseLeave={(e) =>
                    (e.currentTarget.style.transform = "scale(1)")
                }
            >
                {open ? (
                    <X size={24} color="white" />
                ) : (
                    <MessageCircle size={24} color="white" />
                )}

                {/* Badge unread */}
                {!open && unread > 0 && (
                    <div
                        className="absolute -top-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold text-white"
                        style={{ background: "#FF6B00" }}
                    >
                        {unread}
                    </div>
                )}

                {/* Pulse ring */}
                {!open && (
                    <div
                        className="absolute inset-0 rounded-full"
                        style={{
                            border: "2px solid #00A651",
                            animation: "pulse-green 2s infinite",
                        }}
                    />
                )}
            </button>
        </>
    );
}
