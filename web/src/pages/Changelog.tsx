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
        <div className="flex-1 pt-32 pb-20 px-6 max-w-5xl mx-auto w-full">
            <div className="mb-16 text-center">
                <h1 className="text-5xl font-black text-text-primary mb-6 tracking-tight">Changelog</h1>
                <p className="text-lg text-text-secondary font-medium">Keep track of the latest updates and improvements across the Velox ecosystem.</p>
            </div>

            <div className="flex flex-wrap justify-center gap-3 mb-16">
                {PACKAGES.map(pkg => (
                    <button
                        key={pkg.id}
                        onClick={() => setSelected(pkg.id)}
                        className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all border ${selected === pkg.id
                                ? 'bg-primary/10 text-primary border-primary/20 shadow-lg shadow-primary/5'
                                : 'bg-surface text-text-secondary border-border hover:text-text-primary hover:border-border-bright hover:shadow-xl'
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
                className="prose prose-invert prose-zinc max-w-none"
            >
                <div dangerouslySetInnerHTML={{ __html: html }} />
            </motion.div>
        </div>
    );
}
