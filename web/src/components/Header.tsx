import { Github } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Header() {
    const [scrolled, setScrolled] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const isDocs = location.pathname.startsWith('/docs');

    return (
        <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled || isDocs ? "bg-background" : "bg-transparent"
            }`}>
            <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
                <Link to="/" className="font-bold text-xl tracking-tighter text-text-primary">
                    Velox
                </Link>

                <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
                    <Link to="/docs" className="text-text-secondary hover:text-text-primary transition-colors">Documentation</Link>
                    <Link to="/changelog" className="text-text-secondary hover:text-text-primary transition-colors">Changelog</Link>
                </nav>

                <div className="flex items-center gap-4">
                    <a
                        href="https://github.com/TheRemyyy/velox-framework"
                        target="_blank"
                        rel="noreferrer"
                        className="text-text-secondary hover:text-text-primary transition-colors"
                    >
                        <Github className="w-5 h-5" />
                    </a>
                </div>
            </div>
        </header>
    );
}
