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
        <div className="flex-1 pt-32 pb-20 px-6 max-w-4xl mx-auto w-full">
            <div className="mb-16 text-center">
                <h1 className="text-5xl md:text-6xl font-bold text-text-primary mb-6 tracking-tighter">Changelog</h1>
                <p className="text-lg text-text-secondary font-medium max-w-2xl mx-auto">Keep track of the latest updates and improvements across the Velox ecosystem.</p>
            </div>

            <div className="flex flex-wrap justify-center gap-2 mb-16">
                {PACKAGES.map(pkg => (
                    <button
                        key={pkg.id}
                        onClick={() => setSelected(pkg.id)}
                        className={`px-5 py-2 rounded-xl text-xs font-bold transition-all border ${selected === pkg.id
                                ? 'bg-primary text-background border-primary shadow-lg shadow-primary/20'
                                : 'bg-surface text-text-secondary border-border hover:text-text-primary hover:border-border-bright'
                            }`}
                    >
                        {pkg.name}
                    </button>
                ))}
            </div>

            <motion.div
                key={selected}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-surface/30 border border-border/40 rounded-2xl p-8 md:p-12 max-w-3xl mx-auto shadow-xl"
            >
                <div className="prose prose-invert prose-zinc max-w-none">
                    <div dangerouslySetInnerHTML={{ __html: html }} />
                </div>
            </motion.div>
        </div>
    );
}
