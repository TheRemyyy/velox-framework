import { createSignal, createEffect, Router, Route, For } from '@remyyy/velox';
import { Header } from './components/Header';
import { Card } from './components/Card';
import './style.css';

function Dashboard() {
    const [count, setCount] = createSignal(0);
    const [logs, setLogs] = createSignal([]);

    createEffect(() => {
        const c = count();
        const timestamp = new Date().toLocaleTimeString('en-GB');
        setLogs(prev => [`[${timestamp}] Updated state to ${c}`, ...prev].slice(0, 6));
    });

    return (
        <div className="layout">
            <Header />

            <section style={{ marginBottom: '5rem' }}>
                <h1 style={{
                    fontSize: '4.5rem',
                    fontWeight: 900,
                    marginBottom: '1rem',
                    letterSpacing: '-0.05em',
                    lineHeight: 1,
                    color: 'white'
                }}>
                    Professional <br />
                    <span style={{ color: 'var(--color-primary)' }}>Reactive Engineering.</span>
                </h1>
                <p style={{
                    color: 'var(--color-text-secondary)',
                    fontSize: '1.2rem',
                    maxWidth: '600px',
                    fontWeight: 500
                }}>
                    High-performance interfaces powered by atomic reactivity.
                    Zero virtual DOM. Zero abstraction overhead. Pure excellence.
                </p>
            </section>

            <div className="grid">
                <Card title="Reactive Engine">
                    <div style={{
                        fontSize: '6rem',
                        fontWeight: 900,
                        color: 'white',
                        marginBottom: '1.5rem',
                        fontVariantNumeric: 'tabular-nums',
                        letterSpacing: '-0.06em'
                    }}>
                        {count}
                    </div>
                    <div style={{ display: 'flex', gap: '0.75rem' }}>
                        <button onClick={() => setCount(c => c + 1)}>Increment</button>
                        <button className="secondary" onClick={() => setCount(c => c - 1)}>Decrement</button>
                    </div>
                </Card>

                <Card title="Kernel Feed">
                    <div style={{
                        background: '#010409',
                        padding: '1.25rem',
                        borderRadius: '6px',
                        fontSize: '0.8rem',
                        height: '180px',
                        overflow: 'hidden',
                        fontFamily: 'var(--font-mono)',
                        border: '1px solid var(--color-border)',
                        color: 'var(--color-text-secondary)'
                    }}>
                        <For each={logs}>
                            {(log) => <div style={{ marginBottom: '0.4rem' }}> <span style={{ color: 'var(--color-primary)' }}>λ</span> {log}</div>}
                        </For>
                    </div>
                </Card>

                <Card title="Quick Stats">
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', fontSize: '0.9rem', fontWeight: 600 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--color-border)', paddingBottom: '0.6rem' }}>
                            <span style={{ color: 'var(--color-text-secondary)' }}>PACKAGE_SIZE</span>
                            <span style={{ color: 'var(--color-primary)' }}>&lt; 3KB</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--color-border)', paddingBottom: '0.6rem' }}>
                            <span style={{ color: 'var(--color-text-secondary)' }}>UPDATE_SPEED</span>
                            <span>O(1)</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--color-border)', paddingBottom: '0.6rem' }}>
                            <span style={{ color: 'var(--color-text-secondary)' }}>VIRTUAL_DOM</span>
                            <span style={{ color: '#ff7b72' }}>ZERO</span>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    );
}

function Features() {
    const features = [
        { name: "Direct Compilation", desc: "Velox templates compile directly to surgical DOM operations, skipping all intermediate diffing layers." },
        { name: "Fine-Grained Reactivity", desc: "Built with atomic signals. Only the exact parts of the UI that depend on data are updated." },
        { name: "Production Ready", desc: "Includes everything needed for scale: routing, state, and SSR support as standard." }
    ];

    return (
        <div className="layout">
            <Header />
            <h2 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '4rem', letterSpacing: '-0.04em' }}>Engineering Manifesto</h2>
            <div className="grid">
                <For each={() => features}>
                    {(item) => (
                        <Card title={item.name}>
                            <p>{item.desc}</p>
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
