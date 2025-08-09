import { Plus, MessageSquare, Trash2 } from 'lucide-react';

export default function Sidebar({ conversations, onNewChat, onSelectChat, onDeleteChat, activeConversationId }) {
    return (
        <div className="w-72 bg-slate-800 p-4 flex flex-col h-screen border-r border-slate-700">
            <button
                onClick={onNewChat}
                className="flex items-center gap-3 w-full p-3 rounded-lg text-lg font-semibold text-white bg-blue-600 hover:bg-blue-700 transition-colors mb-6"
            >
                <Plus size={22} />
                New Chat
            </button>
            <h2 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-2">History</h2>
            <div className="flex-grow overflow-y-auto -mr-2 pr-2">
                {conversations.map((convo) => (
                    <div
                        key={convo.id}
                        className={`group flex items-center justify-between p-3 rounded-lg cursor-pointer transition-colors ${activeConversationId === convo.id ? 'bg-slate-700' : 'hover:bg-slate-700/50'}`}
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
                            className="text-slate-500 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                            <Trash2 size={18} />
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}