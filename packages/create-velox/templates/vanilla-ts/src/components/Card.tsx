import { Component } from '@remyyy/velox';

export const Card: Component = (props) => {
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
            onMouseEnter={(e: any) => e.currentTarget.style.borderColor = 'var(--color-border-bright)'}
            onMouseLeave={(e: any) => e.currentTarget.style.borderColor = 'var(--color-border)'}
        >
            {props.title && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <div style={{ width: '2px', height: '12px', background: 'var(--color-primary)' }} />
                    <h3 style={{
                        fontSize: '0.9rem',
                        fontWeight: 700,
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
