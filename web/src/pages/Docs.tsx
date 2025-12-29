import { useState, useEffect } from 'react';
import { marked } from 'marked';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { Menu, X, ArrowLeft, ArrowRight } from 'lucide-react';

const NAV_ITEMS = [
    {
        title: 'Core', items: [
            { title: 'Overview', path: '/docs/velox/overview' },
            { title: 'Reactivity', path: '/docs/velox/reactivity' },
            { title: 'DOM & Rendering', path: '/docs/velox/dom' },
            { title: 'Routing', path: '/docs/velox/routing' },
            { title: 'SSR & Hydration', path: '/docs/velox/ssr' },
            { title: 'Advanced', path: '/docs/velox/advanced' },
        ]
    },
    {
        title: 'Tooling', items: [
            { title: 'Vite Plugin', path: '/docs/vite-plugin-velox/overview' },
            { title: 'Setup', path: '/docs/vite-plugin-velox/setup' },
            { title: 'Integration', path: '/docs/vite-plugin-velox/integration' },
            { title: 'Compilation', path: '/docs/vite-plugin-velox/compilation' },
            { title: 'Transformation', path: '/docs/vite-plugin-velox/transformation' },
        ]
    },
    {
        title: 'CLI', items: [
            { title: 'Overview', path: '/docs/create-velox/overview' },
            { title: 'Commands', path: '/docs/create-velox/cli' },
            { title: 'Templates', path: '/docs/create-velox/templates' },
        ]
    }
];

const FLATTENED_DOCS = NAV_ITEMS.flatMap(section => section.items);

export default function Docs() {
    const location = useLocation();
    const navigate = useNavigate();
    const [html, setHtml] = useState('');
    const [loading, setLoading] = useState(true);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const normalizedPath = (location.pathname === "/docs" || location.pathname === "/docs/") ? "/docs/velox/overview" : location.pathname;
    const currentIndex = FLATTENED_DOCS.findIndex(item => item.path === normalizedPath);
    const prev = currentIndex > 0 ? FLATTENED_DOCS[currentIndex - 1] : null;
    const next = currentIndex < FLATTENED_DOCS.length - 1 ? FLATTENED_DOCS[currentIndex + 1] : null;

    useEffect(() => {
        const fetchDoc = async () => {
            setLoading(true);
            try {
                const res = await fetch(`${normalizedPath}.md`);
                if (res.ok) {
                    const text = await res.text();
                    marked.use({ gfm: true, breaks: true });
                    const parsed = await marked.parse(text);
                    setHtml(parsed);
                } else {
                    setHtml("<h1>Document not found</h1>");
                }
            } catch (e) {
                setHtml("<h1>Error loading document</h1>");
            }
            setLoading(false);
            window.scrollTo(0, 0);
        };
        fetchDoc();
        setIsSidebarOpen(false);
    }, [normalizedPath]);

    return (
        <div className="flex min-h-screen bg-[#050505] text-white font-sans antialiased">
            {/* Mobile Header */}
            <div className="lg:hidden fixed top-0 left-0 right-0 h-14 border-b border-white/5 bg-black/80 backdrop-blur-md z-40 flex items-center px-6 justify-between">
                <div className="text-sm font-bold uppercase tracking-[0.2em] italic text-primary">Velox Docs</div>
                <button onClick={() => setIsSidebarOpen(true)} className="p-2 text-neutral-400"><Menu size={20} /></button>
            </div>

            {/* Sidebar */}
            <nav className={`fixed inset-y-0 left-0 z-50 w-72 border-r border-white/5 bg-[#050505] transform transition-transform duration-300 lg:translate-x-0 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                <div className="flex flex-col h-full">
                    <div className="p-8 border-b border-white/5 flex items-center justify-between">
                        <Link to="/" className="text-xl font-bold tracking-tighter italic uppercase group flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-primary" /> Velox
                        </Link>
                        <button onClick={() => setIsSidebarOpen(false)} className="lg:hidden text-neutral-500"><X size={20} /></button>
                    </div>
                    <div className="flex-1 overflow-y-auto p-8 space-y-10 custom-scrollbar">
                        {NAV_ITEMS.map((section, i) => (
                            <div key={i} className="space-y-4">
                                <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-neutral-600 pl-4">{section.title}</h4>
                                <div className="space-y-1">
                                    {section.items.map((item, j) => (
                                        <button
                                            key={j}
                                            onClick={() => navigate(item.path)}
                                            className={`w-full text-left px-4 py-2 rounded-xl text-sm font-medium transition-all ${normalizedPath === item.path ? 'bg-white/5 text-primary border-l-2 border-primary pl-5' : 'text-neutral-500 hover:text-neutral-200'}`}
                                        >
                                            {item.title}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </nav>

            {/* Main Content */}
            <main className="flex-1 lg:pl-72 pt-14 lg:pt-0">
                <div className="max-w-4xl mx-auto px-8 md:px-16 py-16 lg:py-24">
                    {loading ? (
                        <div className="animate-pulse space-y-8 pt-10">
                            <div className="h-12 bg-white/5 rounded-2xl w-1/2"></div>
                            <div className="space-y-4">
                                <div className="h-4 bg-white/5 rounded-full w-full"></div>
                                <div className="h-4 bg-white/5 rounded-full w-5/6"></div>
                            </div>
                        </div>
                    ) : (
                        <>
                            <article className="prose prose-invert prose-zinc max-w-none 
                                prose-h1:text-4xl md:prose-h1:text-5xl prose-h1:font-bold prose-h1:tracking-tighter prose-h1:uppercase prose-h1:italic prose-h1:mb-12
                                prose-h2:text-2xl prose-h2:font-bold prose-h2:tracking-tight prose-h2:mt-16 prose-h2:mb-6 prose-h2:border-b prose-h2:border-white/5 prose-h2:pb-4
                                prose-p:text-lg prose-p:text-neutral-400 prose-p:leading-relaxed
                                prose-li:text-neutral-400 prose-li:text-lg
                                prose-code:text-primary prose-code:bg-white/5 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-md
                                prose-pre:bg-black prose-pre:border prose-pre:border-white/10 prose-pre:rounded-2xl"
                                dangerouslySetInnerHTML={{ __html: html }}
                            />

                            {/* Footer Nav */}
                            <div className="mt-24 pt-12 border-t border-white/5 grid grid-cols-1 sm:grid-cols-2 gap-6">
                                {prev ? (
                                    <button onClick={() => navigate(prev.path)} className="p-6 rounded-2xl border border-white/5 bg-white/[0.02] hover:border-primary/30 transition-all group flex flex-col gap-2">
                                        <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-600 group-hover:text-primary transition-colors flex items-center gap-2"><ArrowLeft size={12}/> Previous</span>
                                        <span className="text-lg font-bold tracking-tight">{prev.title}</span>
                                    </button>
                                ) : <div/>}
                                {next ? (
                                    <button onClick={() => navigate(next.path)} className="p-6 rounded-2xl border border-white/5 bg-white/[0.02] hover:border-primary/30 transition-all group flex flex-col gap-2 items-end text-right">
                                        <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-600 group-hover:text-primary transition-colors flex items-center gap-2">Next <ArrowRight size={12}/></span>
                                        <span className="text-lg font-bold tracking-tight">{next.title}</span>
                                    </button>
                                ) : <div/>}
                            </div>
                        </>
                    )}
                </div>
            </main>
        </div>
    );
}



