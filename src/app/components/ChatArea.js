import React, { useRef, useState, useEffect } from 'react';
import ChatMessage from './ChatMessage';
import { LoaderCircle, Send, Maximize2 } from 'lucide-react';

export default function ChatArea({ messages, handleSubmit, isLoading }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [prompt, setPrompt] = useState('');
    const [showFullscreenBtn, setShowFullscreenBtn] = useState(false);
    const textareaRef = useRef(null);
    const modalRef = useRef(null);

    // Cek jumlah baris textarea
    const handleInput = (e) => {
        setPrompt(e.target.value);
        const lines = e.target.value.split('\n').length;
        setShowFullscreenBtn(lines > 3);
    };

    // Submit dari modal
    const handleModalDone = () => {
        setIsModalOpen(false);
        setTimeout(() => textareaRef.current && textareaRef.current.focus(), 0);
    };

    // Submit form utama
    const onFormSubmit = (e) => {
        e.preventDefault();
        if (!prompt.trim()) return;
        handleSubmit(prompt);
        setPrompt('');
        setShowFullscreenBtn(false);
    };


    // Enter kirim pesan, Shift+Enter untuk baris baru
    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            onFormSubmit(e);
        }
    };


    // Esc atau klik luar untuk tutup modal
    useEffect(() => {
        if (!isModalOpen) return;

        const handleEsc = (e) => {
            if (e.key === 'Escape') {
                setIsModalOpen(false);
            }
        };

        document.addEventListener('keydown', handleEsc);
        return () => document.removeEventListener('keydown', handleEsc);
    }, [isModalOpen]);

    const handleClickOutside = (e) => {
        if (modalRef.current && !modalRef.current.contains(e.target)) {
            setIsModalOpen(false);
        }
    };

    return (
        <div className="flex flex-col h-full w-full bg-slate-900">
            {/* --- Area Pesan --- */}
            <div className="flex-1 min-h-0 overflow-y-auto p-6">
                <div className="max-w-3xl mx-auto space-y-8">
                    {messages.length === 0 && !isLoading && (
                        <div className="text-center text-slate-400 pt-20">
                            <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-emerald-400">
                                Granite Chat AI
                            </h1>
                            <p className="mt-2">Start the conversation by typing below.</p>
                        </div>
                    )}
                    {messages.map((msg, index) => (
                        <ChatMessage key={index} message={msg} />
                    ))}
                    {isLoading && (
                        <div className="flex items-center gap-4">
                            <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center bg-slate-700">
                                <LoaderCircle size={20} className="text-slate-300 animate-spin" />
                            </div>
                            <div className="text-slate-400">
                                AI is thinking...
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* --- Form Input Fixed di Bawah --- */}
            <div className="sticky bottom-0 left-0 w-full bg-slate-900 border-t border-slate-700 z-10">
                <div className="p-4 max-w-3xl mx-auto">
                    <form onSubmit={onFormSubmit} className="flex items-center gap-3 relative">
                        <div className="relative w-full flex items-center">
                            <textarea
                                ref={textareaRef}
                                name="prompt"
                                className="w-full p-4 bg-slate-800 border border-slate-700 rounded-lg text-slate-200 placeholder:text-slate-500 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-shadow resize-none"
                                placeholder="Type your message here..."
                                disabled={isLoading}
                                autoComplete="off"
                                rows={2}
                                style={{ minHeight: '48px', maxHeight: '160px' }}
                                value={prompt}
                                onInput={handleInput}
                                onChange={handleInput}
                                onKeyDown={handleKeyDown}
                            />
                            {showFullscreenBtn && !isModalOpen && (
                                <button
                                    type="button"
                                    className="absolute right-2 bottom-2 bg-slate-700 hover:bg-slate-600 text-white p-2 rounded-lg transition"
                                    onClick={() => setIsModalOpen(true)}
                                    tabIndex={-1}
                                    aria-label="Fullscreen"
                                >
                                    <Maximize2 size={18} />
                                </button>
                            )}
                        </div>
                        <button
                            type="submit"
                            className="p-4 rounded-lg bg-blue-600 text-white hover:bg-blue-700 disabled:bg-blue-600/50 disabled:cursor-not-allowed flex items-center justify-center"
                            disabled={isLoading}
                        >
                            <Send size={20} />
                        </button>
                    </form>
                </div>
            </div>

            {/* --- Modal Fullscreen --- */}
            {isModalOpen && (
                <div
                    className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50"
                    onClick={handleClickOutside}
                >
                    <div
                        ref={modalRef}
                        className="bg-gray-800 rounded-2xl w-full max-w-3xl h-[80vh] flex flex-col border border-gray-700"
                    >
                        <div className="flex justify-between items-center p-4 border-b border-gray-700 flex-shrink-0">
                            <h2 className="text-xl font-semibold">
                                Edit Prompt
                            </h2>
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="p-2 rounded-full hover:bg-gray-700"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                    className="w-6 h-6"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                        </div>
                        <div className="p-4 flex-grow overflow-y-auto no-scrollbar">
                            <textarea
                                className="w-full h-full bg-transparent text-gray-200 text-lg resize-none focus:outline-none"
                                value={prompt}
                                onChange={(e) => setPrompt(e.target.value)}
                            />
                        </div>
                        <div className="p-4 border-t border-gray-700 flex-shrink-0">
                            <button
                                onClick={handleModalDone}
                                className="w-full py-2 px-4 bg-indigo-600 hover:bg-indigo-700 rounded-lg font-semibold"
                            >
                                Selesai
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
