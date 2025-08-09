import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Navbar({ settings, setSettings }) {
    const [open, setOpen] = useState(false);
    const [showSettings, setShowSettings] = useState(false);
    const [showReadme, setShowReadme] = useState(false);

    // Local state for settings form
    const [localSettings, setLocalSettings] = useState(settings);

    const handleSettingsSave = () => {
        setSettings(localSettings);
        setShowSettings(false);
    };

    return (
        <>
            <nav className="w-full bg-slate-900 border-b border-slate-700 px-4 py-3 flex items-center justify-between z-20">
                <span className="text-xl font-bold text-white tracking-wide select-none">
                    Granite Chat AI
                </span>
                <button
                    className="p-2 rounded-lg hover:bg-slate-800 transition"
                    onClick={() => setOpen(!open)}
                    aria-label="Menu"
                >
                    {open ? <X size={24} /> : <Menu size={24} />}
                </button>
                {/* Dropdown */}
                {open && (
                    <div className="absolute right-4 top-16 bg-slate-800 rounded-lg shadow-lg py-2 w-48 border border-slate-700 z-30">
                        <button
                            className="w-full text-left px-4 py-2 hover:bg-slate-700 text-white"
                            onClick={() => { setShowSettings(true); setOpen(false); }}
                        >
                            Settings
                        </button>
                        <button
                            className="w-full text-left px-4 py-2 hover:bg-slate-700 text-white"
                            onClick={() => { setShowReadme(true); setOpen(false); }}
                        >
                            Readme
                        </button>
                    </div>
                )}
            </nav>

            {/* Settings Modal */}
            {showSettings && (
                <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
                    <div className="bg-slate-800 rounded-xl p-6 w-full max-w-md border border-slate-700">
                        <h2 className="text-lg font-bold mb-4 text-white">Settings</h2>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-slate-300 mb-1">Min Token</label>
                                <input
                                    type="number"
                                    min={1}
                                    max={localSettings.max_token}
                                    className="w-full p-2 rounded bg-slate-700 text-white"
                                    value={localSettings.min_token}
                                    onChange={e => setLocalSettings(s => ({ ...s, min_token: Number(e.target.value) }))}
                                />
                            </div>
                            <div>
                                <label className="block text-slate-300 mb-1">Max Token</label>
                                <input
                                    type="number"
                                    min={localSettings.min_token}
                                    className="w-full p-2 rounded bg-slate-700 text-white"
                                    value={localSettings.max_token}
                                    onChange={e => setLocalSettings(s => ({ ...s, max_token: Number(e.target.value) }))}
                                />
                            </div>
                            <div>
                                <label className="block text-slate-300 mb-1">Temperature</label>
                                <input
                                    type="number"
                                    min={0}
                                    max={2}
                                    step={0.01}
                                    className="w-full p-2 rounded bg-slate-700 text-white"
                                    value={localSettings.temperature}
                                    onChange={e => setLocalSettings(s => ({ ...s, temperature: Number(e.target.value) }))}
                                />
                            </div>
                        </div>
                        <div className="flex justify-end gap-2 mt-6">
                            <button
                                className="px-4 py-2 rounded bg-slate-600 text-white hover:bg-slate-700"
                                onClick={() => setShowSettings(false)}
                            >
                                Cancel
                            </button>
                            <button
                                className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
                                onClick={handleSettingsSave}
                            >
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Readme Modal */}
            {showReadme && (
                <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
                    <div className="bg-slate-800 rounded-xl p-6 w-full max-w-lg border border-slate-700">
                        <h2 className="text-lg font-bold mb-4 text-white">Readme</h2>
                        <div className="prose prose-invert text-slate-200 max-w-none">
                            <p>
                                <b>Granite Chat AI</b> adalah aplikasi chat AI berbasis model <a href="https://replicate.com/ibm-granite/granite-3.3-8b-instruct" target="_blank" rel="noopener noreferrer" className="underline text-blue-400">IBM Granite 3.3-8B Instruct</a>.
                            </p>
                            <ul>
                                <li>Ketik pesan di bawah untuk memulai percakapan.</li>
                                <li>Gunakan tombol <b>Settings</b> untuk mengatur parameter AI (min token, max token, temperature).</li>
                                <li>Riwayat chat akan tersimpan otomatis di browser.</li>
                            </ul>
                            <p>
                                <b>Pembuat:</b> Nanang Marvin Kurniawan
                            </p>
                        </div>
                        <div className="flex justify-end mt-6">
                            <button
                                className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
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