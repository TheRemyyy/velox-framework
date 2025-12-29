import { Github, Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Header() {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        setMobileMenuOpen(false);
    }, [location]);

    const isDocs = location.pathname.startsWith('/docs');

    return (
        <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled || isDocs ? "bg-background border-b border-border/40" : "bg-transparent border-b border-transparent"
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
                        className="hidden sm:block text-text-secondary hover:text-text-primary transition-colors"
                    >
                        <Github className="w-5 h-5" />
                    </a>
                    <button 
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="md:hidden text-text-primary p-2 -mr-2"
                    >
                        {mobileMenuOpen ? <X /> : <Menu />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {mobileMenuOpen && (
                <div className="md:hidden absolute top-16 left-0 right-0 bg-background border-b border-border p-6 flex flex-col gap-4 animate-in fade-in slide-in-from-top-4">
                    <Link to="/docs" className="text-lg font-semibold text-text-primary">Documentation</Link>
                    <Link to="/changelog" className="text-lg font-semibold text-text-primary">Changelog</Link>
                    <a href="https://github.com/TheRemyyy/velox-framework" className="text-lg font-semibold text-text-primary">GitHub</a>
                </div>
            )}
        </header>
    );
}
