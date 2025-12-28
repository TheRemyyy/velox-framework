import { Link, useLocation } from '@remyyy/velox';

export function Header() {
    const location = useLocation();

    const isActive = (path) => location.pathname === path;

    return (
        <header style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '6rem',
            paddingBottom: '2.5rem',
            borderBottom: '2px solid var(--color-primary)',
        }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{
                    width: '32px', height: '32px',
                    backgroundColor: 'var(--color-primary)',
                    borderRadius: '6px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 900,
                    color: 'var(--color-bg)',
                    fontSize: '1.2rem'
                }}>V</div>
                <span style={{ fontSize: '1.25rem', fontWeight: 800, letterSpacing: '-0.04em' }}>
                    VELOX<span style={{ color: 'var(--color-primary)' }}>_</span>CORE
                </span>
            </div>

            <nav style={{ display: 'flex', gap: '3rem' }}>
                <Link to="/" style={{
                    color: isActive('/') ? 'var(--color-primary)' : 'var(--color-text-primary)',
                    fontWeight: isActive('/') ? '700' : '600',
                    transition: 'all 0.2s ease'
                }}>Terminal</Link>
                <Link to="/features" style={{
                    color: isActive('/features') ? 'var(--color-primary)' : 'var(--color-text-secondary)',
                    fontWeight: isActive('/features') ? '700' : '600',
                    transition: 'all 0.2s ease'
                }}>Library</Link>
            </nav>
        </header>
    );
}
