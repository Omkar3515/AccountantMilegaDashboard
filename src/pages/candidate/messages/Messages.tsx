import React, { useState, useRef, useEffect } from "react";
import {
    Search,
    SlidersHorizontal,
    Phone,
    Video,
    MoreVertical,
    Paperclip,
    Smile,
    Send,
    Check,
    CheckCheck,
    Lightbulb,
    Headphones,
    PenSquare,
} from "lucide-react";

interface Message {
    id: number;
    from: "me" | "them";
    text: string;
    time: string;
    date?: string;
    read?: boolean;
}

interface Conversation {
    id: string;
    name: string;
    subtitle: string;
    initials: string;
    color: string;
    time: string;
    unread: number;
    messages: Message[];
}

const initialConversations: Conversation[] = [
    {
        id: "sc",
        name: "Sharma & Co.",
        subtitle: "Regarding Senior Accountant Position",
        initials: "SC",
        color: "bg-blue-700 text-white",
        time: "10:32 AM",
        unread: 2,
        messages: [
            {
                id: 1,
                from: "them",
                text: "Hi Rahul,\n\nWe have reviewed your application for the Senior Accountant position. Your profile matches our requirements.\n\nWe would like to invite you for a HR Round.\n\nPlease confirm your availability.\n\nBest Regards,\nHR Team, Sharma & Co.",
                time: "10:15 AM",
                date: "20 May 2025",
            },
            {
                id: 2,
                from: "me",
                text: "Hi Team,\n\nThank you for the update.\n\nI am available for the HR Round.\n\nPlease let me know the date and time.",
                time: "10:20 AM",
                read: true,
            },
            {
                id: 3,
                from: "them",
                text: "Great! Please find the details below:\n\nHR Round\nDate: 24 May 2025 (Friday)\nTime: 10:00 AM - 11:00 AM\nMode: Online (Google Meet)\n\nWe will share the meeting link shortly.\nLooking forward to speaking with you.",
                time: "10:32 AM",
            },
        ],
    },
    {
        id: "fs",
        name: "FinTax Solutions Pvt. Ltd.",
        subtitle: "HR Round Update",
        initials: "FS",
        color: "bg-emerald-600 text-white",
        time: "Yesterday",
        unread: 1,
        messages: [
            {
                id: 1,
                from: "them",
                text: "Hi Rahul, your HR round has been scheduled. We will share details shortly.",
                time: "4:10 PM",
                date: "Yesterday",
            },
        ],
    },
    {
        id: "sk",
        name: "SK Enterprises",
        subtitle: "Thanks for your interest",
        initials: "SK",
        color: "bg-amber-500 text-white",
        time: "2 Days Ago",
        unread: 0,
        messages: [
            {
                id: 1,
                from: "them",
                text: "Thank you for applying. We will get back to you soon.",
                time: "11:00 AM",
                date: "2 Days Ago",
            },
        ],
    },
    {
        id: "ka",
        name: "Khandelwal & Associates",
        subtitle: "Document Verification",
        initials: "KA",
        color: "bg-violet-600 text-white",
        time: "3 Days Ago",
        unread: 0,
        messages: [
            {
                id: 1,
                from: "them",
                text: "Please submit the following documents for verification: PAN Card, Aadhar Card, and latest salary slips.",
                time: "3:30 PM",
                date: "3 Days Ago",
            },
        ],
    },
    {
        id: "af",
        name: "AG Financial Services",
        subtitle: "Profile shortlisted for next round",
        initials: "AF",
        color: "bg-teal-600 text-white",
        time: "4 Days Ago",
        unread: 0,
        messages: [
            {
                id: 1,
                from: "them",
                text: "Congratulations! Your profile has been shortlisted for the next round. We will contact you shortly.",
                time: "2:00 PM",
                date: "4 Days Ago",
            },
        ],
    },
    {
        id: "rb",
        name: "RB Associates",
        subtitle: "Interview schedule confirmation",
        initials: "RB",
        color: "bg-indigo-600 text-white",
        time: "5 Days Ago",
        unread: 0,
        messages: [
            {
                id: 1,
                from: "them",
                text: "Please confirm your interview schedule for next Monday at 11:00 AM.",
                time: "10:00 AM",
                date: "5 Days Ago",
            },
        ],
    },
    {
        id: "se",
        name: "SE Enterprises",
        subtitle: "Thank you for applying",
        initials: "SE",
        color: "bg-slate-500 text-white",
        time: "6 Days Ago",
        unread: 0,
        messages: [
            {
                id: 1,
                from: "them",
                text: "Thank you for applying to our company. We will review your application and get back to you.",
                time: "9:00 AM",
                date: "6 Days Ago",
            },
        ],
    },
];

const tips = [
    "Be professional and polite in your conversations.",
    "Respond promptly to employer messages.",
    "Check your messages regularly for important updates.",
    "Avoid sharing personal contact information.",
];

export default function Messages({ onNavigate }: { onNavigate?: (page: string) => void }) {
    const [conversations, setConversations] = useState<Conversation[]>(initialConversations);
    const [activeId, setActiveId] = useState(initialConversations[0].id);
    const [query, setQuery] = useState("");
    const [draft, setDraft] = useState("");
    const scrollRef = useRef<HTMLDivElement>(null);

    const active = conversations.find((c) => c.id === activeId);

    const filtered = conversations.filter(
        (c) =>
            c.name.toLowerCase().includes(query.toLowerCase()) ||
            c.subtitle.toLowerCase().includes(query.toLowerCase())
    );

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [activeId, active?.messages.length]);

    const selectConversation = (id: string) => {
        setActiveId(id);
        setConversations((prev) =>
            prev.map((c) => (c.id === id ? { ...c, unread: 0 } : c))
        );
    };

    const sendMessage = () => {
        const text = draft.trim();
        if (!text) return;
        const now = new Date();
        const time = now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
        setConversations((prev) =>
            prev.map((c) =>
                c.id === activeId
                    ? {
                        ...c,
                        messages: [
                            ...c.messages,
                            { id: c.messages.length + 1, from: "me" as const, text, time, read: false },
                        ],
                        time: "Just now",
                    }
                    : c
            )
        );
        setDraft("");
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    };

    return (
        <div className="flex flex-col" style={{ height: "calc(100vh - 120px)" }}>
            {/* Breadcrumb & Header */}
            <div className="mb-5 shrink-0">
                <p className="text-sm text-slate-500 mb-2">
                    <button
                        onClick={() => onNavigate && onNavigate("dashboard")}
                        className="hover:text-blue-700 hover:underline transition-colors"
                    >
                        Dashboard
                    </button>
                    <span className="mx-1">›</span>
                    <span className="text-slate-600 font-medium">Messages</span>
                </p>
                <div className="flex items-center justify-between flex-wrap gap-3">
                    <div>
                        <h1 className="text-2xl font-bold text-slate-900">Messages</h1>
                        <p className="text-sm text-slate-500 mt-1">
                            Communicate with employers and get updates on your applications.
                        </p>
                    </div>
                    <button className="bg-blue-700 hover:bg-blue-800 transition-colors text-white text-sm font-semibold px-4 py-2.5 rounded-lg flex items-center gap-2 shadow-sm">
                        <PenSquare className="w-4 h-4" />
                        New Message
                    </button>
                </div>
            </div>

            {/* Three-column grid */}
            <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr_296px] gap-5 flex-1 min-h-0">

                {/* Column 1: Conversation list */}
                <div className="bg-white rounded-xl border border-slate-200 flex flex-col overflow-hidden shadow-sm">
                    <div className="p-3.5 border-b border-slate-100 flex items-center gap-2.5 shrink-0">
                        <div className="relative flex-1">
                            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                            <input
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                placeholder="Search messages..."
                                className="w-full pl-9 pr-4 py-2 rounded-lg border border-slate-200 bg-slate-50 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-700/20 focus:border-blue-700 focus:bg-white transition-all"
                            />
                        </div>
                        <button className="w-9 h-9 shrink-0 rounded-lg border border-slate-200 bg-slate-50 grid place-items-center text-slate-500 hover:bg-blue-50 hover:text-blue-700 transition-colors">
                            <SlidersHorizontal className="w-4 h-4" />
                        </button>
                    </div>

                    <div className="flex-1 overflow-y-auto">
                        {filtered.length === 0 && (
                            <p className="text-sm text-slate-400 text-center py-10">No conversations found.</p>
                        )}
                        {filtered.map((c) => {
                            const isActive = c.id === activeId;
                            const lastMsg = c.messages[c.messages.length - 1];
                            return (
                                <button
                                    key={c.id}
                                    onClick={() => selectConversation(c.id)}
                                    className={`w-full text-left px-4 py-3.5 flex items-start gap-3 border-b border-slate-100 transition-all ${isActive
                                            ? "bg-blue-50/70 border-l-[3px] border-l-blue-700"
                                            : "hover:bg-slate-50 border-l-[3px] border-l-transparent"
                                        }`}
                                >
                                    <div className={`w-10 h-10 rounded-lg ${c.color} grid place-items-center text-sm font-bold shrink-0`}>
                                        {c.initials}
                                    </div>
                                    <div className="min-w-0 flex-1">
                                        <div className="flex items-center justify-between gap-2">
                                            <p className="text-sm font-bold text-slate-900 truncate">{c.name}</p>
                                            <span className={`text-[11px] font-semibold shrink-0 ${c.unread > 0 ? "text-blue-700" : "text-slate-400"}`}>
                                                {c.time}
                                            </span>
                                        </div>
                                        <div className="flex items-center justify-between gap-2 mt-0.5">
                                            <p className={`text-xs truncate ${c.unread > 0 ? "text-slate-800 font-semibold" : "text-slate-500"}`}>
                                                {lastMsg ? lastMsg.text.split("\n")[0] : c.subtitle}
                                            </p>
                                            {c.unread > 0 && (
                                                <span className="bg-blue-700 text-white text-[10px] font-bold min-w-[20px] h-5 px-1 rounded-full grid place-items-center shrink-0">
                                                    {c.unread}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Column 2: Chat window */}
                <div className="bg-white rounded-xl border border-slate-200 flex flex-col overflow-hidden shadow-sm">
                    {active ? (
                        <>
                            <div className="px-5 py-3.5 border-b border-slate-200 flex items-center justify-between shrink-0 bg-white">
                                <div className="flex items-center gap-3">
                                    <div className={`w-10 h-10 rounded-lg ${active.color} grid place-items-center text-sm font-bold shrink-0`}>
                                        {active.initials}
                                    </div>
                                    <div>
                                        <p className="text-base font-bold text-slate-900 leading-tight">{active.name}</p>
                                        <p className="text-xs text-slate-500 mt-0.5">{active.subtitle}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-0.5 text-slate-500">
                                    <button className="p-2 hover:bg-blue-50 hover:text-blue-700 rounded-lg transition-colors">
                                        <Phone className="w-4 h-4" />
                                    </button>
                                    <button className="p-2 hover:bg-blue-50 hover:text-blue-700 rounded-lg transition-colors">
                                        <Video className="w-4 h-4" />
                                    </button>
                                    <div className="w-px h-5 bg-slate-200 mx-1" />
                                    <button className="p-2 hover:bg-blue-50 hover:text-blue-700 rounded-lg transition-colors">
                                        <MoreVertical className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>

                            <div ref={scrollRef} className="flex-1 overflow-y-auto px-5 py-5 space-y-4 bg-slate-50/40">
                                {active.messages[0]?.date && (
                                    <div className="flex justify-center mb-4">
                                        <span className="text-xs font-semibold bg-white border border-slate-200 text-slate-500 px-3.5 py-1 rounded-full shadow-sm">
                                            {active.messages[0].date}
                                        </span>
                                    </div>
                                )}
                                {active.messages.map((m) => (
                                    <div
                                        key={m.id}
                                        className={`flex items-end gap-2.5 ${m.from === "me" ? "justify-end" : "justify-start"}`}
                                    >
                                        {m.from === "them" && (
                                            <div className={`w-7 h-7 rounded-lg ${active.color} grid place-items-center text-xs font-bold shrink-0 mb-0.5`}>
                                                {active.initials}
                                            </div>
                                        )}
                                        <div
                                            className={`max-w-[75%] rounded-xl px-4 py-3 text-sm whitespace-pre-line leading-relaxed shadow-sm ${m.from === "me"
                                                    ? "bg-blue-50 border border-blue-200 text-slate-800 rounded-br-none"
                                                    : "bg-white border border-slate-200 text-slate-800 rounded-bl-none"
                                                }`}
                                        >
                                            {m.text}
                                            <div
                                                className={`flex items-center gap-1 mt-1.5 text-[11px] font-semibold ${m.from === "me" ? "justify-end text-blue-600" : "justify-start text-slate-400"
                                                    }`}
                                            >
                                                <span>{m.time}</span>
                                                {m.from === "me" &&
                                                    (m.read ? (
                                                        <CheckCheck className="w-3.5 h-3.5 text-blue-600" />
                                                    ) : (
                                                        <Check className="w-3 h-3 text-blue-600" />
                                                    ))}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="border-t border-slate-200 p-3.5 bg-white shrink-0">
                                <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-xl px-2 py-1.5 focus-within:ring-2 focus-within:ring-blue-700/20 focus-within:border-blue-700 focus-within:bg-white transition-all">
                                    <button className="p-1.5 text-slate-400 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-all shrink-0">
                                        <Paperclip className="w-5 h-5" />
                                    </button>
                                    <input
                                        value={draft}
                                        onChange={(e) => setDraft(e.target.value)}
                                        onKeyDown={handleKeyDown}
                                        placeholder="Type your message..."
                                        className="flex-1 bg-transparent border-none outline-none py-1.5 text-sm text-slate-900 placeholder:text-slate-400"
                                    />
                                    <button className="p-1.5 text-slate-400 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-all shrink-0">
                                        <Smile className="w-5 h-5" />
                                    </button>
                                    <button
                                        onClick={sendMessage}
                                        disabled={!draft.trim()}
                                        className="bg-blue-700 hover:bg-blue-800 active:scale-95 disabled:opacity-50 transition-all text-white w-9 h-9 rounded-lg grid place-items-center shrink-0"
                                    >
                                        <Send className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        </>
                    ) : (
                        <div className="flex-1 grid place-items-center text-slate-400 text-sm font-medium">
                            Select a conversation to start chatting
                        </div>
                    )}
                </div>

                {/* Column 3: Right sidebar */}
                <div className="hidden lg:flex flex-col gap-4 overflow-y-auto pb-1">
                    {/* Recent Contacts */}
                    <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="font-bold text-sm text-slate-900">Recent Contacts</h2>
                            <button className="text-xs text-blue-700 font-semibold hover:underline">View All</button>
                        </div>
                        <div className="space-y-2.5">
                            {conversations.slice(0, 5).map((c) => (
                                <button
                                    key={c.id}
                                    onClick={() => selectConversation(c.id)}
                                    className="w-full flex items-center gap-2.5 text-left hover:bg-blue-50/60 rounded-lg px-2 py-1.5 -mx-2 transition-colors"
                                >
                                    <div className={`w-9 h-9 rounded-lg ${c.color} grid place-items-center text-xs font-bold shrink-0`}>
                                        {c.initials}
                                    </div>
                                    <div className="min-w-0 flex-1">
                                        <div className="flex items-center justify-between gap-1">
                                            <p className="text-xs font-bold text-slate-900 truncate">{c.name}</p>
                                            <span className="text-[10px] font-semibold text-slate-400 shrink-0">{c.time}</span>
                                        </div>
                                        <p className="text-[11px] text-slate-500 truncate mt-0.5">{c.subtitle}</p>
                                    </div>
                                    {c.unread > 0 && (
                                        <span className="bg-blue-700 text-white text-[10px] font-bold min-w-[18px] h-[18px] px-0.5 rounded-full grid place-items-center shrink-0">
                                            {c.unread}
                                        </span>
                                    )}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Messaging Tips */}
                    <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
                        <div className="flex items-center gap-2 mb-4">
                            <Lightbulb className="w-4 h-4 text-amber-500" />
                            <h2 className="font-bold text-sm text-slate-900">Messaging Tips</h2>
                        </div>
                        <ul className="space-y-3">
                            {tips.map((tip, i) => (
                                <li key={i} className="flex items-start gap-2 text-xs text-slate-600 leading-relaxed">
                                    <div className="mt-0.5 shrink-0 w-4 h-4 rounded-full bg-emerald-100 flex items-center justify-center">
                                        <Check className="w-2.5 h-2.5 text-emerald-700" />
                                    </div>
                                    {tip}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Need Help? */}
                    <div className="bg-gradient-to-br from-emerald-50 to-white border border-emerald-100 rounded-xl p-5 shadow-sm">
                        <div className="flex items-center gap-2.5 mb-2">
                            <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white grid place-items-center shrink-0">
                                <Headphones className="w-4 h-4" />
                            </div>
                            <h2 className="font-bold text-sm text-emerald-800">Need Help?</h2>
                        </div>
                        <p className="text-xs text-slate-600 mb-4 leading-relaxed">
                            Facing issues with messaging? Our support team is here to help you.
                        </p>
                        <button className="w-full border border-blue-600 text-blue-700 hover:bg-blue-50 rounded-lg py-2 text-xs font-semibold transition-colors">
                            Contact Support
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
