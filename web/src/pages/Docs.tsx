import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { marked } from 'marked';
import hljs from 'highlight.js';
import 'highlight.js/styles/github-dark.css';
import { ChevronRight, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Manual mapping of the docs structure since we are static
const DOCS_MAP = {
    "velox": [
        { title: "Overview", path: "overview" },
        { title: "Reactivity", path: "reactivity" },
        { title: "DOM & Rendering", path: "dom" },
        { title: "Routing", path: "routing" },
        { title: "Advanced", path: "advanced" },
        { title: "SSR", path: "ssr" }
    ],
    "create-velox": [
        { title: "Overview", path: "overview" },
        { title: "CLI Reference", path: "cli" },
        { title: "Templates", path: "templates" }
    ],
    "vite-plugin-velox": [
        { title: "Overview", path: "overview" },
        { title: "Integration", path: "integration" },
        { title: "Transformation", path: "transformation" }
    ]
};

export default function Docs() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    return (
        <div className="flex-1 flex w-full pt-16">
            <div className="flex w-full max-w-[1600px] mx-auto relative">
                {/* Mobile Sidebar Toggle */}
                <button 
                    onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                    className="md:hidden fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full bg-primary text-background shadow-lg flex items-center justify-center"
                >
                    {isSidebarOpen ? <X /> : <Menu />}
                </button>

                <AnimatePresence>
                    {(isSidebarOpen) && (
                        <motion.aside 
                            initial={{ x: -300, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            exit={{ x: -300, opacity: 0 }}
                            className="fixed inset-y-0 left-0 z-40 w-72 border-r border-border/40 bg-background overflow-y-auto py-10 px-6 shrink-0 md:hidden"
                        >
                            <SidebarContent onSelect={() => setIsSidebarOpen(false)} />
                        </motion.aside>
                    )}
                </AnimatePresence>

                {/* Desktop Sidebar */}
                <aside className="hidden md:block w-64 border-r border-border/40 h-[calc(100vh-4rem)] sticky top-16 overflow-y-auto py-10 px-6 shrink-0">
                    <SidebarContent />
                </aside>

                {isSidebarOpen && (
                    <div 
                        className="fixed inset-0 bg-background/80 backdrop-blur-sm z-30 md:hidden"
                        onClick={() => setIsSidebarOpen(false)}
                    />
                )}

                <Content />
            </div>
        </div>
    );
}

function SidebarContent({ onSelect }: { onSelect?: () => void }) {
    const { "*": splat } = useParams();
    const currentPath = splat || "overview";

    return (
        <>
            <div className="mb-8">
                <Link 
                    to="/docs/overview" 
                    onClick={onSelect}
                    className={`flex items-center px-3 py-2 rounded-xl text-sm font-semibold transition-all ${currentPath === "overview" || currentPath === "" ? "bg-primary/10 text-primary border border-primary/20 shadow-sm shadow-primary/5" : "text-text-secondary hover:text-text-primary hover:bg-surface border border-transparent"
                    }`}
                >
                    Introduction
                </Link>
            </div>

            <div className="space-y-8">
                {Object.entries(DOCS_MAP).map(([pkg, items]) => (
                    <div key={pkg}>
                        <h4 className="px-3 text-[10px] font-black text-text-dim uppercase tracking-[0.2em] mb-3">
                            @{pkg === 'velox' ? 'remyyy/velox' : pkg}
                        </h4>
                        <ul className="space-y-1">
                            {items.map(item => {
                                const fullPath = `${pkg}/${item.path}`;
                                const isActive = currentPath === fullPath;

                                return (
                                    <li key={fullPath}>
                                        <Link
                                            to={`/docs/${fullPath}`}
                                            onClick={onSelect}
                                            className={`flex items-center justify-between px-3 py-2 rounded-xl text-sm font-medium transition-all group ${isActive
                                                ? "bg-primary/10 text-primary border border-primary/20 shadow-sm shadow-primary/5"
                                                : "text-text-secondary hover:text-text-primary hover:bg-surface border border-transparent"
                                                }`}
                                        >
                                            {item.title}
                                            <ChevronRight className={`w-3 h-3 transition-transform ${isActive ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-1 group-hover:opacity-50 group-hover:translate-x-0"}`} />
                                        </Link>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                ))}
            </div>
        </>
    );
}

function Content() {
    const { "*": splat } = useParams();
    const navigate = useNavigate();
    const [html, setHtml] = useState<string>("");
    const [loading, setLoading] = useState(false);

    // Flatten DOCS_MAP for navigation
    const flatDocs = [
        { title: "Introduction", path: "overview" },
        ...Object.entries(DOCS_MAP).flatMap(([pkg, items]) => 
            items.map(item => ({ title: item.title, path: `${pkg}/${item.path}` }))
        )
    ];

    const currentPath = splat || "overview";
    const currentIndex = flatDocs.findIndex(d => d.path === currentPath);
    const prevDoc = currentIndex > 0 ? flatDocs[currentIndex - 1] : null;
    const nextDoc = currentIndex < flatDocs.length - 1 ? flatDocs[currentIndex + 1] : null;

    useEffect(() => {
        const path = currentPath;
        const fetchDoc = async () => {
            setLoading(true);
            try {
                const url = (path === "overview" || path === "")
                    ? "/docs/overview.md"
                    : `/docs/${path}.md`;

                const res = await fetch(url);
                if (!res.ok) throw new Error("Not found");
                const text = await res.text();

                marked.use({
                    gfm: true,
                    breaks: true,
                });

                const parsed = await marked.parse(text);
                setHtml(parsed);
                window.scrollTo(0, 0);
            } catch (e) {
                setHtml("<h1>404 Not Found</h1><p>This document does not exist.</p>");
            } finally {
                setLoading(false);
            }
        };

        fetchDoc();
    }, [currentPath]);

    useEffect(() => {
        if (html) {
            hljs.highlightAll();
        }
    }, [html]);

    return (
        <main className="flex-1 min-w-0 py-10 px-6 md:px-16 lg:px-24">
            {loading ? (
                <div className="animate-pulse space-y-6 max-w-4xl">
                    <div className="h-10 bg-surface rounded-xl w-3/4"></div>
                    <div className="space-y-3">
                        <div className="h-4 bg-surface/60 rounded-lg w-full"></div>
                        <div className="h-4 bg-surface/60 rounded-lg w-full"></div>
                        <div className="h-4 bg-surface/60 rounded-lg w-5/6"></div>
                    </div>
                </div>
            ) : (
                <>
                    <motion.div
                        key={splat}
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3 }}
                        className="prose prose-invert prose-zinc max-w-none"
                    >
                        <div dangerouslySetInnerHTML={{ __html: html }} />
                    </motion.div>

                    {/* Navigation Footer */}
                    <div className="mt-16 pt-8 border-t border-border/40 flex flex-col sm:flex-row justify-between gap-4">
                        {prevDoc ? (
                            <button
                                onClick={() => navigate(`/docs/${prevDoc.path}`)}
                                className="group flex flex-col items-start gap-1 p-4 rounded-xl border border-border/40 hover:border-primary/30 hover:bg-surface/50 transition-all text-left min-w-[140px]"
                            >
                                <span className="text-[10px] text-text-dim font-bold uppercase tracking-widest">Previous</span>
                                <span className="text-text-primary font-bold group-hover:text-primary transition-colors">{prevDoc.title}</span>
                            </button>
                        ) : <div />}

                        {nextDoc ? (
                            <button
                                onClick={() => navigate(`/docs/${nextDoc.path}`)}
                                className="group flex flex-col items-end gap-1 p-4 rounded-xl border border-border/40 hover:border-primary/30 hover:bg-surface/50 transition-all text-right min-w-[140px]"
                            >
                                <span className="text-[10px] text-text-dim font-bold uppercase tracking-widest">Next</span>
                                <span className="text-text-primary font-bold group-hover:text-primary transition-colors">{nextDoc.title}</span>
                            </button>
                        ) : <div />}
                    </div>
                </>
            )}
        </main>
    );
}