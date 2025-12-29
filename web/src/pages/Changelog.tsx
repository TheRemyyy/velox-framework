import { useState, useEffect } from 'react';
import { marked } from 'marked';
import hljs from 'highlight.js';
import 'highlight.js/styles/github-dark.css';
import { motion } from 'framer-motion';

const PACKAGES = [
    { id: 'velox', name: '@remyyy/velox' },
    { id: 'create-velox', name: '@remyyy/create-velox' },
    { id: 'vite-plugin-velox', name: '@remyyy/vite-plugin-velox' }
];

export default function Changelog() {
    const [selected, setSelected] = useState('velox');
    const [html, setHtml] = useState('');

    useEffect(() => {
        const fetchChangelog = async () => {
            try {
                const res = await fetch(`/changelogs/${selected}.md`);
                if (res.ok) {
                    const text = await res.text();
                    marked.use({ gfm: true, breaks: true });
                    const parsed = await marked.parse(text);
                    setHtml(parsed);
                } else {
                    setHtml("<h1>Changelog not found</h1>");
                }
            } catch (e) {
                setHtml("<h1>Error loading changelog</h1>");
            }
        };
        fetchChangelog();
    }, [selected]);

    useEffect(() => {
        if (html) {
            hljs.highlightAll();
        }
    }, [html]);

    return (
        <div className="flex-1 pt-32 pb-20 px-6 max-w-4xl mx-auto w-full font-sans">
            <div className="mb-20 text-center space-y-4">
                <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tighter italic uppercase">Changelog</h1>
                <p className="text-xl text-neutral-500 font-medium max-w-xl mx-auto">Tracking the evolution of the reactive web.</p>
            </div>

            <div className="flex flex-wrap justify-center gap-3 mb-20">
                {PACKAGES.map(pkg => (
                    <button
                        key={pkg.id}
                        onClick={() => setSelected(pkg.id)}
                        className={`px-6 py-2.5 rounded-full text-xs font-bold transition-all border uppercase tracking-widest ${selected === pkg.id
                                ? 'bg-white text-black border-white shadow-xl shadow-white/5'
                                : 'bg-white/5 text-neutral-500 border-white/10 hover:text-white hover:border-white/20'       
                            }`}
                    >
                        {pkg.name}
                    </button>
                ))}
            </div>

            <motion.div
                key={selected}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
                className="bg-white/[0.02] border border-white/5 rounded-3xl p-10 md:p-16 max-w-3xl mx-auto shadow-2xl"
            >
                <div className="prose prose-invert prose-zinc max-w-none 
                    prose-h1:text-3xl prose-h1:font-bold prose-h1:tracking-tighter prose-h1:uppercase prose-h1:italic
                    prose-h2:text-xl prose-h2:font-bold prose-h2:text-primary prose-h2:mt-12 prose-h2:mb-4
                    prose-p:text-neutral-400 prose-p:leading-relaxed
                    prose-li:text-neutral-400
                    prose-code:text-primary prose-code:bg-white/5 prose-code:px-1.5 prose-code:rounded">
                    <div dangerouslySetInnerHTML={{ __html: html }} />
                </div>
            </motion.div>
        </div>
    );
}
