import { Plus, MessageSquare, Trash2, Menu, X } from 'lucide-react';
import { useState } from 'react';

export default function Sidebar({ conversations, onNewChat, onSelectChat, onDeleteChat, activeConversationId
}) {
    const [open, setOpen] = useState(false);

    return (
        <>
            <button
                className="fixed top-3 left-4 z-40 p-2 rounded-lg hover:bg-slate-800 transition hover:cursor-pointer text-white md:hidden"
                onClick={() => setOpen(true)}
                aria-label="Open sidebar"
            >
                <Menu size={24} />
            </button>

            <div className="hidden md:flex w-72 bg-slate-800 p-4 flex-col h-screen border-r border-slate-700 z-50">
                <button
                    onClick={onNewChat}
                    className="flex items-center gap-3 w-full p-3 rounded-lg text-lg font-semibold text-white bg-blue-600 hover:bg-blue-700 transition-colors mb-6 hover:cursor-pointer"
                >
                    <Plus size={22} />
                    New Chat
                </button>
                <h2 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-2">History</h2>
                <div className="flex-grow overflow-y-auto -mr-2 pr-2">
                    {conversations.map((convo) => (
                        <div
                            key={convo.id}
                            className={`group flex items-center justify-between p-3 rounded-lg cursor-pointer transition-colors ${activeConversationId === convo.id ? 'bg-slate-700' : 'hover:bg-slate-700/50'
                                }`}
                            onClick={() => onSelectChat(convo.id)}
                        >
                            <div className="flex items-center gap-3 truncate">
                                <span className="w-6 flex justify-center items-center flex-shrink-0">
                                    <MessageSquare size={18} className="text-slate-400" />
                                </span>
                                <span className="truncate text-slate-200">{convo.title}</span>
                            </div>
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onDeleteChat(convo.id);
                                }}
                                className="text-slate-500 hover:text-red-500 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity hover:cursor-pointer"
                            >
                                <Trash2 size={18} />
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            {open && (
                <div className="fixed inset-0 z-50 flex">
                    <div className="w-64 bg-slate-800 p-4 flex flex-col h-full border-r border-slate-700 shadow-lg animate-slide-in-left">
                        <button
                            className="mb-4 self-end text-white"
                            onClick={() => setOpen(false)}
                            aria-label="Close sidebar"
                        >
                            <X size={28} />
                        </button>
                        <button
                            onClick={() => {
                                setOpen(false);
                                onNewChat();
                            }}
                            className="flex items-center gap-3 w-full p-3 rounded-lg text-lg font-semibold text-white bg-blue-600 hover:bg-blue-700 transition-colors mb-6 hover:cursor-pointer"
                        >
                            <Plus size={22} />
                            New Chat
                        </button>
                        <h2 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-2">History</h2>
                        <div className="flex-grow overflow-y-auto -mr-2 pr-2">
                            {conversations.map((convo) => (
                                <div
                                    key={convo.id}
                                    className={`group flex items-center justify-between p-3 rounded-lg cursor-pointer transition-colors ${activeConversationId === convo.id ? 'bg-slate-700' : 'hover:bg-slate-700/50'
                                        }`}
                                    onClick={() => {
                                        setOpen(false);
                                        onSelectChat(convo.id);
                                    }}
                                >
                                    <div className="flex items-center gap-3 truncate">
                                        <span className="w-6 flex justify-center items-center flex-shrink-0">
                                            <MessageSquare size={18} className="text-slate-400" />
                                        </span>
                                        <span className="truncate text-slate-200">{convo.title}</span>
                                    </div>
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            onDeleteChat(convo.id);
                                        }}
                                        className="text-slate-500 hover:text-red-500 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity hover:cursor-pointer"
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div
                        className="flex-1 bg-black/40"
                        onClick={() => setOpen(false)}
                    />
                </div>
            )}
        </>
    );
}
