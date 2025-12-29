import React from 'react';
import { ArrowRight, Zap, Box, Layers, Cpu, Terminal } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function Home() {
    return (
        <main className="flex-1 flex flex-col">
            {/* Hero Section */}
            <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 px-6 overflow-hidden">
                {/* Background Glow */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-primary/15 rounded-full blur-[140px] pointer-events-none" />

                <div className="max-w-5xl mx-auto text-center relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4 }}
                        className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-widest mb-10 shadow-[0_0_20px_rgba(59,130,246,0.2)] border border-primary/20"
                    >
                        v0.0.8 is now available
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="text-5xl md:text-8xl font-bold tracking-tighter text-text-primary mb-8"
                    >
                        The Reactive Framework
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="text-lg md:text-xl text-text-secondary max-w-2xl mx-auto mb-12 leading-relaxed"
                    >
                        Zero-VDOM, fine-grained reactivity, and atomic updates. 
                        Velox transforms your JSX into direct DOM operations.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className="flex flex-col sm:flex-row items-center justify-center gap-4"
                    >
                        <Link to="/docs/velox/overview" className="h-12 px-8 rounded-lg bg-text-primary text-background font-bold hover:opacity-90 transition-all flex items-center gap-2">
                            Get Started <ArrowRight className="w-4 h-4" />
                        </Link>
                        <div className="bg-surface p-1 rounded-lg flex items-center gap-3 pl-4 group border border-border">
                            <code className="text-xs font-mono text-text-secondary">npm create @remyyy/velox</code>
                            <button 
                                onClick={() => {
                                    navigator.clipboard.writeText('npm create @remyyy/velox');
                                }}
                                className="h-8 px-3 rounded-md bg-primary/10 text-primary hover:bg-primary/20 transition-colors text-[10px] font-bold uppercase tracking-wider border border-primary/20"
                            >
                                Copy
                            </button>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Features Grid */}
            <section className="py-24 px-6">
                <div className="max-w-6xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <FeatureCard
                            icon={<Zap className="w-5 h-5" />}
                            title="No VDOM"
                            description="Direct DOM manipulation without the overhead of diffing. Performance that scales with app complexity."
                        />
                        <FeatureCard
                            icon={<Cpu className="w-5 h-5" />}
                            title="Fine-Grained"
                            description="State updates are atomic. Only the specific text node needing change is updated."
                        />
                        <FeatureCard
                            icon={<Box className="w-5 h-5" />}
                            title="Ultra Light"
                            description="Core runtime is under 3KB gzipped. Load faster, parse less, and execute immediately."
                        />
                    </div>
                </div>
            </section>

            {/* Code Preview Section */}
            <section className="py-24 px-6 bg-surface/40">
                <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-16">
                    <div className="flex-1">
                        <h2 className="text-4xl font-bold mb-6 text-text-primary tracking-tighter">Familiar syntax. Radical performance.</h2>
                        <p className="text-text-secondary mb-10 leading-relaxed font-medium">
                            Write standard JSX components. Velox compiles them into efficient instruction sets.
                            No manually managed dependency arrays.
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <BenefitItem icon={<Terminal className="w-4 h-4" />} text="Auto-dependency tracking" />
                            <BenefitItem icon={<Layers className="w-4 h-4" />} text="Built-in SSR & Hydration" />
                            <BenefitItem icon={<Box className="w-4 h-4" />} text="Zero boilerplate state" />
                            <BenefitItem icon={<Cpu className="w-4 h-4" />} text="Surgical DOM updates" />
                        </div>
                    </div>
                    <div className="flex-1 w-full lg:w-auto">
                        <div className="relative rounded-xl bg-[#0c0c0e] border border-border/60 shadow-2xl overflow-hidden">
                            <div className="flex items-center gap-2 px-5 py-4 border-b border-border/60 bg-surface/30">
                                <div className="text-[10px] font-bold font-mono text-text-dim uppercase tracking-[0.2em]">Counter.tsx</div>
                            </div>
                            <div className="p-8 font-mono text-sm leading-relaxed overflow-x-auto">
                                <pre>
                                    <code className="text-text-secondary">
                                        <span className="text-primary font-bold">import</span> {"{ createSignal }"} <span className="text-primary font-bold">from</span> <span className="text-green-500/80">'@remyyy/velox'</span>;<br /><br />
                                        <span className="text-primary font-bold">function</span> <span className="text-text-primary">Counter</span>() {"{"}<br />
                                        &nbsp;&nbsp;<span className="text-text-dim italic">const</span> [count, setCount] = <span className="text-text-primary">createSignal</span>(<span className="text-primary">0</span>);<br /><br />
                                        &nbsp;&nbsp;<span className="text-primary font-bold">return</span> (<br />
                                        &nbsp;&nbsp;&nbsp;&nbsp;&lt;<span className="text-text-primary">button</span> <span className="text-primary font-medium">onClick</span>={"{"}() =&gt; setCount(c =&gt; c + <span className="text-primary">1</span>){"}"}&gt;<br />
                                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Count is: {"{"}count(){"}"}<br />
                                        &nbsp;&nbsp;&nbsp;&nbsp;&lt;/<span className="text-text-primary">button</span>&gt;<br />
                                        &nbsp;&nbsp;);<br />
                                        {"}"}
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

function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
    return (
        <div className="p-8 rounded-2xl hover:bg-surface/50 border border-transparent hover:border-border transition-all group">
            <div className="w-11 h-11 rounded-xl bg-surface flex items-center justify-center mb-6 text-primary border border-border/60">
                {icon}
            </div>
            <h3 className="text-xl font-bold text-text-primary mb-3 tracking-tight">{title}</h3>
            <p className="text-sm text-text-secondary leading-relaxed font-medium">
                {description}
            </p>
        </div>
    );
}

function BenefitItem({ icon, text }: { icon: React.ReactNode, text: string }) {
    return (
        <div className="flex items-center gap-3 text-text-secondary">
            <div className="w-9 h-9 rounded-lg bg-surface flex items-center justify-center text-primary shrink-0 border border-border/40">
                {icon}
            </div>
            <span className="text-xs font-bold tracking-tight">{text}</span>
        </div>
    );
}