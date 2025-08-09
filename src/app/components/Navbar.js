import { useRef, useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

export default function Navbar({ settings, setSettings, showSettings, setShowSettings,
    showReadme, setShowReadme }) {
    const [open, setOpen] = useState(false);
    const settingsModalRef = useRef(null);
    const readmeModalRef = useRef(null);

    const [localSettings, setLocalSettings] = useState(settings);

    const handleSettingsSave = () => {
        setSettings(localSettings);
        setShowSettings(false);
    };

    useEffect(() => {
        if (!showSettings && !showReadme) return;

        const handleClickOutside = (e) => {
            if (showSettings && settingsModalRef.current && !settingsModalRef.current.contains(e.target)) {
                setShowSettings(false);
            }
            if (showReadme && readmeModalRef.current && !readmeModalRef.current.contains(e.target)) {
                setShowReadme(false);
            }
        };

        const handleEsc = (e) => {
            if (e.key === "Escape") {
                setShowSettings(false);
                setShowReadme(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        document.addEventListener("keydown", handleEsc);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
            document.removeEventListener("keydown", handleEsc);
        };
    }, [showSettings, showReadme]);

    return (
        <>
            <nav className="w-full bg-slate-900 border-b border-slate-700 px-4 py-3 flex items-center justify-between z-20">
                <span className="text-xl font-bold text-white tracking-wide select-none text-center w-full block">
                    Granite Chat AI
                </span>
                <button
                    className="p-2 rounded-lg hover:bg-slate-800 transition hover:cursor-pointer"
                    onClick={() => setOpen(!open)}
                    aria-label="Menu"
                >
                    {open ? <X size={24} /> : <Menu size={24} />}
                </button>

                {open && (
                    <div className="absolute right-4 top-16 bg-slate-800 rounded-lg shadow-lg py-2 w-48 border border-slate-700 z-30">
                        <button
                            className="w-full text-left px-4 py-2 hover:bg-slate-700 text-white hover:cursor-pointer"
                            onClick={() => { setShowSettings(true); setOpen(false); }}
                        >
                            Settings
                        </button>
                        <button
                            className="w-full text-left px-4 py-2 hover:bg-slate-700 text-white hover:cursor-pointer"
                            onClick={() => { setShowReadme(true); setOpen(false); }}
                        >
                            Readme
                        </button>
                    </div>
                )}
            </nav>

            {showSettings && (
                <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
                    <div
                        className="bg-slate-800 rounded-xl p-6 w-full max-w-md border border-slate-700"
                        ref={settingsModalRef}
                    >
                        <h2 className="text-lg font-bold mb-4 text-white">Settings</h2>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-slate-300 mb-1">Min Token <span className="text-sm text-red-500">(Return to default upon refresh)</span></label>
                                <input
                                    type="number"
                                    min={1}
                                    max={localSettings.max_token}
                                    className="w-full p-2 rounded bg-slate-700 text-white"
                                    value={localSettings.min_token === 0 ? '' : localSettings.min_token}
                                    onChange={e => {
                                        const val = e.target.value;
                                        setLocalSettings(s => ({
                                            ...s,
                                            min_token: val === '' ? 0 : Number(val)
                                        }));
                                    }}
                                />
                            </div>
                            <div>
                                <label className="block text-slate-300 mb-1">Max Token <span className="text-sm text-red-500">(Return to default upon refresh)</span></label>
                                <input
                                    type="number"
                                    min={localSettings.min_token}
                                    className="w-full p-2 rounded bg-slate-700 text-white"
                                    value={localSettings.max_token === 0 ? '' : localSettings.max_token}
                                    onChange={e => {
                                        const val = e.target.value;
                                        setLocalSettings(s => ({
                                            ...s,
                                            max_token: val === '' ? 0 : Number(val)
                                        }));
                                    }}
                                />
                            </div>
                            <div>
                                <label className="block text-slate-300 mb-1">Temperature <span className="text-sm text-red-500">(Return to default upon refresh)</span></label>
                                <input
                                    type="number"
                                    min={0}
                                    max={2}
                                    step={0.01}
                                    className="w-full p-2 rounded bg-slate-700 text-white"
                                    value={localSettings.temperature === 0 ? '' : localSettings.temperature}
                                    onChange={e => {
                                        const val = e.target.value;
                                        setLocalSettings(s => ({
                                            ...s,
                                            temperature: val === '' ? 0 : Number(val)
                                        }));
                                    }}
                                />
                            </div>
                            <div className="text-sm text-slate-400 mt-2 space-y-2">
                                <p><span className="font-bold text-slate-300">Min Token: </span>
                                    Definition: Smallest token unit for tasks or operations.
                                    Increase: Limits token usage to larger minimums.
                                    Decrease: Allows use of even smallest token amounts.</p>
                                <p><span className="font-bold text-slate-300">Max Token: </span>
                                    Definition: Maximum tokens for a task or process.
                                    Increase: Sets a stricter upper token limit.
                                    Decrease: Caps maximum token usage for tasks.</p>
                                <p><span className="font-bold text-slate-300">Temperature: </span>
                                    Definition: Parameter scaling logits in language models.
                                    Higher Temperature: Introduces randomness, diverse outputs.
                                    Lower Temperature: Makes predictions more deterministic, less variation.</p>
                            </div>
                        </div>
                        <div className="flex justify-end gap-2 mt-6">
                            <button
                                className="px-4 py-2 rounded bg-slate-600 text-white hover:bg-slate-700 hover:cursor-pointer"
                                onClick={() => setShowSettings(false)}
                            >
                                Cancel
                            </button>
                            <button
                                className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 hover:cursor-pointer"
                                onClick={handleSettingsSave}
                            >
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {showReadme && (
                <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
                    <div
                        className="bg-slate-800 rounded-xl p-6 w-full max-w-lg border border-slate-700"
                        ref={readmeModalRef}
                    >
                        <h2 className="text-lg font-bold mb-4 text-white">Readme</h2>
                        <div className="prose prose-invert text-slate-200 max-w-none">
                            <p>
                                <b>Granite Chat AI</b> is a chat AI application based on the{" "}
                                <a href="https://replicate.com/ibm-granite/granite-3.3-8b-instruct"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="underline text-blue-400">
                                    IBM Granite 3.3-8B Instruct
                                </a>
                                {" "}model.
                            </p>
                            <ul>
                                <li>Type your message below to start the conversation.</li>
                                <li>Use the <b>Settings</b> button to customize AI parameters (min token, max token, temperature).</li>
                                <li>The chat history will be saved automatically in your browser.</li>
                            </ul>
                            <p>
                                <b>Creator:</b> Nanang Marvin Kurniawan
                            </p>
                            <ul className="mt-2">
                                <li>My GitHub: <a href="https://github.com/slashMK303" target="_blank" rel="noopener noreferrer" className="underline text-blue-400">slashMK303</a></li>
                                <li>GitHub Project: <a href="https://github.com/slashMK303/granite-chat-app.git" target="_blank" rel="noopener noreferrer" className="underline text-blue-400">slashMK303/granite-chat-ai</a></li>
                            </ul>
                        </div>
                        <div className="flex justify-end mt-6">
                            <button
                                className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 hover:cursor-pointer"
                                onClick={() => setShowReadme(false)}
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}