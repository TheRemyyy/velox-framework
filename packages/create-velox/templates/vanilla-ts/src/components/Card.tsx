import { Component } from '@remyyy/velox';

export const Card: Component = (props) => {
    return (
        <div style={{
            background: 'var(--color-surface)',
            border: '1px solid var(--color-border)',
            borderRadius: '12px',
            padding: '1.5rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
        }}>
            {props.title && <h3 style={{ fontSize: '1.25rem', fontWeight: 600 }}>{props.title}</h3>}
            {props.children}
        </div>
    );
};
