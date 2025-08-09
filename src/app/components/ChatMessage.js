// app/components/ChatMessage.js
'use client';

import { User, Sparkles } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import rehypeHighlight from 'rehype-highlight';
import 'highlight.js/styles/tokyo-night-dark.css';

export default function ChatMessage({ message }) {
    const isAIMessage = message.role === 'ai';

    return (
        <div className={`flex ${isAIMessage ? 'justify-start' : 'justify-end'} mb-4`}>
            {/* Container untuk pesan */}
            <div className={`flex items-start gap-4 max-w-3xl ${isAIMessage ? '' : 'flex-row-reverse'}`}>
                {/* Avatar */}
                <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${isAIMessage ? 'bg-slate-700' : 'bg-blue-600'}`}>
                    {isAIMessage ? <Sparkles size={20} className="text-slate-300" /> : <User size={20} className="text-white" />}
                </div>

                {/* Bubble Pesan */}
                <div className={`p-4 rounded-lg prose prose-invert max-w-none overflow-x-auto text-slate-200 ${isAIMessage ? 'bg-slate-800' : 'bg-slate-700'}`}>
                    <ReactMarkdown rehypePlugins={[rehypeHighlight]}>
                        {message.content}
                    </ReactMarkdown>
                </div>
            </div>
        </div>
    );
}
