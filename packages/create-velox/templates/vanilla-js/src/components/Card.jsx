export const Card = (props) => {
    return (
        <div style={{
            background: 'var(--color-surface)',
            border: '1px solid var(--color-border)',
            borderRadius: '6px',
            padding: '2rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
            height: '100%',
            transition: 'border-color 0.15s ease'
        }}
            onMouseEnter={(e) => e.currentTarget.style.borderColor = 'var(--color-border-bright)'}
            onMouseLeave={(e) => e.currentTarget.style.borderColor = 'var(--color-border)'}
        >
            {props.title && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <div style={{ width: '4px', height: '16px', background: 'var(--color-primary)' }} />
                    <h3 style={{
                        fontSize: '1rem',
                        fontWeight: 800,
                        color: 'white',
                    }}>
                        {props.title}
                    </h3>
                </div>
            )}
            <div style={{ color: 'var(--color-text-secondary)', fontSize: '0.9rem', lineHeight: 1.6 }}>
                {props.children}
            </div>
        </div>
    );
};
