import { Link } from '@remyyy/velox';

export function Header() {
    return (
        <header style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '3rem',
            borderBottom: '1px solid var(--color-border)',
            paddingBottom: '1.5rem'
        }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <div style={{
                    width: '32px', height: '32px',
                    background: 'var(--color-primary)',
                    borderRadius: '6px'
                }} />
                <span style={{ fontSize: '1.5rem', fontWeight: 700 }}>Velox App</span>
            </div>

            <nav style={{ display: 'flex', gap: '2rem' }}>
                <Link to="/">Dashboard</Link>
                <Link to="/features">Features</Link>
            </nav>
        </header>
    );
}
