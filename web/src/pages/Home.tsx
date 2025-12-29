import React from 'react';
import { ArrowRight, Cpu, Sparkles, ZapOff, Scale, Code } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function Home() {
    return (
        <main className="flex-1 flex flex-col font-sans bg-background text-text-primary">
            {/* Hero Section */}
            <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 px-6 overflow-hidden text-center">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-primary/10 rounded-full blur-[140px] pointer-events-none" />

                <div className="max-w-5xl mx-auto relative z-10 space-y-10">
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-[11px] font-bold uppercase tracking-[0.2em] shadow-lg border border-primary/20"
                    >
                        v0.0.8 — The Virtual DOM is dead
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-7xl md:text-9xl font-black tracking-tighter mb-8 leading-[0.85] uppercase italic"
                    >
                        Pure <br />
                        <span className="text-primary">Reactivity.</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-xl md:text-2xl text-text-secondary max-w-3xl mx-auto mb-12 leading-relaxed font-medium"
                    >
                        Velox is a surgical web framework that bypasses the Virtual DOM entirely. It compiles your declarative code into raw, high-performance DOM instructions.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="flex flex-col sm:flex-row items-center justify-center gap-6" 
                    >
                        <Link to="/docs/velox/overview" className="h-16 px-12 rounded-2xl bg-text-primary text-background font-black hover:opacity-90 transition-all flex items-center gap-3 text-xl uppercase tracking-tighter">     
                            Get Started <ArrowRight className="w-6 h-6" />
                        </Link>
                        <div className="bg-surface p-1.5 rounded-2xl flex items-center gap-4 pl-6 border border-border">
                            <code className="text-sm font-mono text-text-secondary italic">npm create @remyyy/velox</code>
                            <button
                                onClick={() => {
                                    navigator.clipboard.writeText('npm create @remyyy/velox');  
                                }}
                                className="h-12 px-6 rounded-xl bg-primary/10 text-primary hover:bg-primary/20 transition-colors text-[12px] font-bold uppercase tracking-widest border border-primary/20"
                            >
                                Copy
                            </button>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* About / Manifesto Section */}
            <section className="py-32 px-6 border-y border-border/40 bg-zinc-950/50">
                <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-24 items-center">
                    <div className="space-y-8">
                        <h2 className="text-5xl font-black tracking-tighter uppercase italic text-primary">The Disappearing Framework.</h2>
                        <div className="space-y-6 text-text-secondary text-xl leading-relaxed font-medium">
                            <p>
                                The modern web is drowning in abstraction. We've built Virtual DOMs to manage the Real DOM, adding megabytes of bloat to every project. **Velox is the cure.**
                            </p>
                            <p>
                                By utilizing <span className="text-white underline decoration-primary decoration-4 underline-offset-8">Surgical Reactivity</span>, Velox ensures your updates are O(1). No diffing algorithms, no tree reconciliation—just direct, atomic updates to the exact nodes that changed.
                            </p>
                            <p>
                                Once your app is built, Velox disappears. You're left with pure, high-performance machine-generated JavaScript that runs at the speed of the browser.
                            </p>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-6">
                        <FeatureTile icon={<ZapOff />} label="Zero VDOM" />
                        <FeatureTile icon={<Scale />} label="Tiny <3KB" />
                        <FeatureTile icon={<Sparkles />} label="Pure ESM" />
                        <FeatureTile icon={<Cpu />} label="Atomic" />
                    </div>
                </div>
            </section>

            {/* Features Detail */}
            <section className="py-32 px-6">
                <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-12 text-center md:text-left">
                    <DetailCard 
                        title="Fine-Grained" 
                        desc="Updates happen at the level of individual text nodes and attributes. The framework doesn't re-render components; it reacts to signals."
                    />
                    <DetailCard 
                        title="Built-in Power" 
                        desc="Integrated SSR, Hydration, and SPA Routing out of the box. Everything you need for an enterprise app, without the third-party debt."
                    />
                    <DetailCard 
                        title="No Magic" 
                        desc="Velox stays close to standard ESM and JSX. If you know React, you know Velox—but your apps will be 10x faster."
                    />
                </div>
            </section>

            {/* Code Section */}
            <section className="py-32 px-6 bg-surface/30 border-t border-border/40">
                <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-20 items-center">
                    <div className="flex-1 space-y-8 text-center lg:text-left">
                        <h2 className="text-5xl font-black tracking-tighter uppercase italic">Native Performance. <br/> Declarative Flow.</h2>
                        <p className="text-text-secondary text-xl font-medium leading-relaxed max-w-xl mx-auto lg:mx-0">
                            Write code that looks like standard modern React, but executes like raw manual DOM optimization. 
                        </p>
                        <div className="flex flex-wrap justify-center lg:justify-start gap-4">
                            <span className="px-4 py-2 rounded-lg bg-zinc-900 border border-border text-xs font-bold uppercase tracking-widest">No Ref Refs</span>
                            <span className="px-4 py-2 rounded-lg bg-zinc-900 border border-border text-xs font-bold uppercase tracking-widest">Signal Based</span>
                            <span className="px-4 py-2 rounded-lg bg-zinc-900 border border-border text-xs font-bold uppercase tracking-widest">Built-in HMR</span>
                        </div>
                    </div>
                    <div className="flex-1 w-full max-w-2xl">
                        <div className="relative rounded-3xl bg-[#0c0c0e] border border-border shadow-2xl overflow-hidden p-2">
                            <div className="flex items-center gap-2 px-6 py-4 border-b border-border/60 bg-zinc-900/50">
                                <Code className="w-4 h-4 text-primary" />
                                <div className="text-[10px] font-bold font-mono text-text-dim uppercase tracking-[0.3em]">ReactiveComponent.tsx</div>
                            </div>
                            <div className="p-10 font-mono text-base leading-relaxed overflow-x-auto text-text-secondary">
                                <pre>
                                    <code>
                                        <span className="text-primary font-bold">const</span> [name, setName] = <span className="text-text-primary">createSignal</span>(<span className="text-primary">"Velox"</span>);<br /><br />
                                        <span className="text-text-dim italic">// Updates are automatic & atomic</span><br />
                                        <span className="text-primary font-bold">return</span> (<br />
                                        &nbsp;&nbsp;&lt;<span className="text-text-primary">div</span>&gt;<br />
                                        &nbsp;&nbsp;&nbsp;&nbsp;&lt;<span className="text-text-primary">input</span> <span className="text-primary">onInput</span>={"{"}e =&gt; setName(e.target.value){"}"} /&gt;<br />
                                        &nbsp;&nbsp;&nbsp;&nbsp;&lt;<span className="text-text-primary">p</span>&gt;Hello, {"{"}name(){"}"}!&lt;/<span className="text-text-primary">p</span>&gt;<br />
                                        &nbsp;&nbsp;&lt;/<span className="text-text-primary">div</span>&gt;<br />
                                        );
                                    </code>
                                </pre>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}

function FeatureTile({ icon, label }: { icon: React.ReactNode, label: string }) {
    return (
        <div className="aspect-square rounded-3xl border border-border bg-background flex flex-col items-center justify-center text-center p-8 group hover:border-primary/50 transition-all shadow-xl shadow-black/50">
            <div className="text-primary mb-6 scale-150 transform transition-transform group-hover:scale-[1.7]">{icon}</div>
            <div className="text-xl font-black text-text-primary uppercase tracking-tighter italic">{label}</div>
        </div>
    );
}

function DetailCard({ title, desc }: { title: string, desc: string }) {
    return (
        <div className="space-y-6 p-4">
            <div className="h-1 w-12 bg-primary mx-auto md:mx-0 rounded-full" />
            <h3 className="text-3xl font-black tracking-tighter uppercase italic">{title}</h3>
            <p className="text-lg text-text-secondary leading-relaxed font-medium">{desc}</p>
        </div>
    );
}

