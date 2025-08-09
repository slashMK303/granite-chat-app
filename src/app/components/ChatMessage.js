import { User, Sparkles, Copy } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import rehypeHighlight from 'rehype-highlight';
import 'highlight.js/styles/tokyo-night-dark.css';
import { useState } from 'react';

export default function ChatMessage({ message }) {
    const isAIMessage = message.role === 'ai';
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(message.content);
        setCopied(true);
        setTimeout(() => setCopied(false), 1200);
    };

    return (
        <div className={`flex ${isAIMessage ? 'justify-start' : 'justify-end'} mb-4 px-2 sm:px-0`}>
            <div className={`flex items-start gap-2 sm:gap-4 w-full max-w-3xl ${isAIMessage ? '' : 'flex-row-reverse'}`}>

                <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${isAIMessage ? 'bg-slate-700' : 'bg-blue-600'}`}>
                    {isAIMessage ? <Sparkles size={20} className="text-slate-300" /> : <User size={20} className="text-white" />}
                </div>

                <div
                    className={`relative rounded-lg prose prose-invert text-slate-200 break-words ${isAIMessage ? 'bg-slate-800' : 'bg-slate-700'}`}
                    style={{
                        padding: isAIMessage ? '2.5rem 1rem 1rem 1rem' : '1rem',
                        width: 'fit-content',
                        maxWidth: '90%',
                        overflowX: 'auto'
                    }}
                >

                    {isAIMessage && (
                        <button
                            type="button"
                            onClick={handleCopy}
                            className="absolute top-2 right-2 bg-slate-700 hover:bg-slate-600 text-white p-1 rounded transition"
                            aria-label="Copy"
                        >
                            <Copy size={16} />
                            {copied && (
                                <span className="absolute left-1/2 -translate-x-1/2 top-8 text-xs bg-slate-800 px-2 py-1 rounded text-green-400 whitespace-nowrap">
                                    Copied!
                                </span>
                            )}
                        </button>
                    )}

                    <ReactMarkdown rehypePlugins={[rehypeHighlight]}>
                        {message.content}
                    </ReactMarkdown>
                </div>
            </div>
        </div>
    );
}
