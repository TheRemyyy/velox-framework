import React from 'react';
import { ArrowRight, Cpu, Sparkles, ZapOff, Scale, Wind, MousePointer2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function Home() {
    return (
        <main className="flex-1 flex flex-col font-sans bg-[#050505] text-white">
            {/* Hero Section - Light & Airy */}
            <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 px-6 overflow-hidden text-center">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

                <div className="max-w-5xl mx-auto relative z-10">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 text-white/60 text-[11px] font-medium uppercase tracking-[0.2em] border border-white/10 mb-10"
                    >
                        v0.0.8 — The Swift Evolution
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="text-6xl md:text-8xl font-bold tracking-tight mb-8 leading-[1.1]"
                    >
                        Web development, <br />
                        <span className="text-primary font-medium italic">unburdened.</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="text-xl md:text-2xl text-neutral-400 max-w-3xl mx-auto mb-12 leading-relaxed"
                    >
                        Velox is a high-performance framework that bypasses the Virtual DOM. 
                        It compiles JSX into direct, atomic updates for the fastest apps on earth.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="flex flex-col sm:flex-row items-center justify-center gap-6" 
                    >
                        <Link to="/docs/velox/overview" className="h-14 px-10 rounded-full bg-white text-black font-semibold hover:bg-neutral-200 transition-all flex items-center gap-3 text-lg">     
                            Get Started <ArrowRight className="w-5 h-5" />
                        </Link>
                        <div className="flex items-center gap-3 px-5 py-3 rounded-full bg-white/5 border border-white/10 group">
                            <code className="text-sm font-mono text-neutral-400">npm create @remyyy/velox</code>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Unique Manifesto Section - Vertical Surgical Flow */}
            <section className="py-32 px-6 border-y border-white/5 bg-[#080808]">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-20 space-y-4">
                        <h2 className="text-3xl md:text-5xl font-bold tracking-tight italic">The Zero-VDOM Architecture.</h2>
                        <p className="text-neutral-500 text-lg">Why wait for a diffing algorithm when you can just react?</p>
                    </div>

                    <div className="space-y-12">
                        <ManifestoStep 
                            icon={<ZapOff className="w-6 h-6" />}
                            title="Direct Engagement"
                            text="Traditional frameworks build a shadow tree. Velox engages the DOM directly. We don't guess what changed; we know because the signal told us."
                        />
                        <ManifestoStep 
                            icon={<Scale className="w-6 h-6" />}
                            title="Bundle Weight: Ignored"
                            text="With a core runtime under 3KB, the framework essentially disappears in production. Your users download your logic, not our library."
                        />
                        <ManifestoStep 
                            icon={<MousePointer2 className="w-6 h-6" />}
                            title="Surgical Precision"
                            text="Updates are O(1). When a signal fires, only the specific text node or attribute linked to it is touched. No component re-renders. Ever."
                        />
                    </div>
                </div>
            </section>

            {/* Features Grid - Minimalist Circles */}
            <section className="py-32 px-6">
                <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-16">
                    <FeatureItem 
                        icon={<Wind />} 
                        title="Instant HMR" 
                        desc="Built-in Vite integration ensures your development flow is as fast as your production apps." 
                    />
                    <FeatureItem 
                        icon={<Sparkles />} 
                        title="Pure Reactivity" 
                        desc="No dependency arrays or manual optimizations. Signals automatically track their own relationships." 
                    />
                    <FeatureItem 
                        icon={<Cpu />} 
                        title="Native Speed" 
                        desc="Compiled components run at the speed of raw JavaScript, without the boilerplate of manual DOM manipulation." 
                    />
                </div>
            </section>

            {/* Code Section - Full Width Technical Reveal */}
            <section className="py-32 px-6 bg-white/[0.02] border-t border-white/5">
                <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-20 items-center">
                    <div className="flex-1 space-y-8">
                        <h2 className="text-4xl font-bold tracking-tight italic">Write JSX. <br/> Feel the Performance.</h2>
                        <div className="space-y-6 text-neutral-400 text-lg leading-relaxed font-medium">
                            <p>Velox keeps the developer experience you love from React but strips away the runtime overhead. It’s the perfect tool for performance-critical web apps.</p>
                            <ul className="space-y-3">
                                <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-primary" /> Signal-based state</li>
                                <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-primary" /> Built-in Routing & SSR</li>
                                <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-primary" /> Universal Hydration</li>
                            </ul>
                        </div>
                    </div>
                    <div className="flex-1 w-full max-w-2xl">
                        <div className="rounded-2xl bg-black border border-white/10 shadow-2xl overflow-hidden">
                            <div className="px-6 py-4 border-b border-white/5 bg-white/5 flex items-center justify-between">
                                <div className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest font-bold">Counter.tsx</div>
                                <div className="flex gap-1.5">
                                    <div className="w-2 h-2 rounded-full bg-white/10" />
                                    <div className="w-2 h-2 rounded-full bg-white/10" />
                                </div>
                            </div>
                            <div className="p-10 font-mono text-sm leading-relaxed text-neutral-300 overflow-x-auto">
                                <pre>
                                    <code>
                                        <span className="text-primary font-bold">const</span> [count, setCount] = <span className="text-white font-medium">createSignal</span>(0);<br /><br />
                                        <span className="text-neutral-600">// No virtual DOM reconciliation</span><br />
                                        <span className="text-primary font-bold">return</span> (<br />
                                        &nbsp;&nbsp;&lt;<span className="text-primary">button</span> <span className="text-white/70">onClick</span>={"{"}() =&gt; setCount(c =&gt; c + 1){"}"}&gt;<br />
                                        &nbsp;&nbsp;&nbsp;&nbsp;Count: {"{"}count(){"}"}<br />
                                        &nbsp;&nbsp;&lt;/<span className="text-primary">button</span>&gt;<br />
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

function ManifestoStep({ icon, title, text }: { icon: React.ReactNode, title: string, text: string }) {
    return (
        <div className="flex gap-8 items-start group">
            <div className="w-12 h-12 rounded-full border border-white/10 bg-white/5 flex items-center justify-center shrink-0 group-hover:border-primary/50 transition-colors">
                <div className="text-primary">{icon}</div>
            </div>
            <div className="space-y-2">
                <h3 className="text-xl font-bold tracking-tight">{title}</h3>
                <p className="text-neutral-400 leading-relaxed font-medium">{text}</p>
            </div>
        </div>
    );
}

function FeatureItem({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) {
    return (
        <div className="space-y-6 text-center group">
            <div className="mx-auto w-16 h-16 rounded-full border border-white/5 bg-white/[0.02] flex items-center justify-center group-hover:bg-primary/5 group-hover:border-primary/20 transition-all scale-110">
                <div className="text-neutral-500 group-hover:text-primary transition-colors">{icon}</div>
            </div>
            <div className="space-y-3">
                <h3 className="text-xl font-bold uppercase tracking-wider italic text-primary/80">{title}</h3>
                <p className="text-neutral-500 leading-relaxed font-medium">{desc}</p>
            </div>
        </div>
    );
}


