import { createSignal, createEffect, Router, Route, For } from '@remyyy/velox';
import { Header } from './components/Header';
import { Card } from './components/Card';
import './style.css';

function Dashboard() {
    const [count, setCount] = createSignal(0);
    const [logs, setLogs] = createSignal([]);

    createEffect(() => {
        const c = count();
        setLogs(prev => [`Counter updated to: ${c}`, ...prev].slice(0, 5));
    });

    return (
        <div className="layout">
            <Header />

            <section>
                <h1 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '1rem' }}>
                    Welcome to <span style={{ color: 'var(--color-primary)' }}>Velox</span>
                </h1>
                <p style={{ color: 'var(--color-text-secondary)', fontSize: '1.1rem', maxWidth: '600px' }}>
                    You are running a production-ready template optimized for speed.
                    Start editing <code>src/App.js</code> to build your next big idea.
                </p>
            </section>

            <div className="grid">
                <Card title="Interactive Signal">
                    <div style={{
                        fontSize: '3rem',
                        fontWeight: 700,
                        color: 'var(--color-primary)',
                        fontVariantNumeric: 'tabular-nums'
                    }}>
                        {count}
                    </div>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                        <button onClick={() => setCount(c => c + 1)}>Increment</button>
                        <button onClick={() => setCount(c => c - 1)}>Decrement</button>
                    </div>
                </Card>

                <Card title="Reactive Logs">
                    <div style={{
                        background: '#111',
                        padding: '1rem',
                        borderRadius: '8px',
                        fontFamily: 'monospace',
                        fontSize: '0.875rem',
                        height: '150px',
                        overflow: 'hidden'
                    }}>
                        <For each={logs}>
                            {(log) => <div style={{ color: '#0f0', marginBottom: '0.25rem' }}>➜ {log}</div>}
                        </For>
                    </div>
                </Card>

                <Card title="Performance Stats">
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        <div>Bundle Size: <span style={{ color: 'var(--color-primary)' }}>&lt; 5kb</span></div>
                        <div>Reactivity: <span style={{ color: 'var(--color-primary)' }}>Fine-Grained</span></div>
                        <div>Virtual DOM: <span style={{ color: 'var(--color-primary)' }}>None</span></div>
                        <div>Hydration: <span style={{ color: 'var(--color-primary)' }}>Instant</span></div>
                    </div>
                </Card>
            </div>
        </div>
    );
}

function Features() {
    const features = [
        { name: "Zero Virtual DOM", desc: "Compiles directly to surgical DOM operations." },
        { name: "Fine-Grained Reactivity", desc: "Only updates what needs to change." },
        { name: "Tiny Footprint", desc: "Entire runtime is under 3kb min+gzip." },
        { name: "JavaScript First", desc: "Simple API for modern JS." }
    ];

    return (
        <div className="layout">
            <Header />
            <h2 style={{ fontSize: '2rem', marginBottom: '2rem' }}>Core Features</h2>
            <div className="grid">
                <For each={() => features}>
                    {(item) => (
                        <Card title={item.name}>
                            <p style={{ color: 'var(--color-text-secondary)' }}>{item.desc}</p>
                        </Card>
                    )}
                </For>
            </div>
        </div>
    );
}

export default function App() {
    return (
        <Router>
            <Route path="/" component={Dashboard} />
            <Route path="/features" component={Features} />
        </Router>
    );
}
