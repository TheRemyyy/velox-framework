export default function Footer() {
    return (
        <footer className="mt-auto py-16 px-6 border-t border-border/40">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-12">
                <div>
                    <div className="font-bold text-xl mb-4 tracking-tighter text-text-primary">
                        Velox
                    </div>
                    <p className="text-sm text-text-secondary max-w-sm leading-relaxed font-medium">
                        A high-performance, zero-VDOM reactive framework designed for surgical DOM operations and developer productivity.
                    </p>
                </div>

                <div className="grid grid-cols-2 gap-32 text-sm">
                    <div className="flex flex-col gap-3">
                        <h4 className="font-bold text-text-primary mb-2 uppercase tracking-widest text-[10px]">Documentation</h4>
                        <a href="/docs/velox/overview" className="text-text-secondary hover:text-text-primary transition-colors font-medium">Core API</a>
                        <a href="/docs/create-velox/overview" className="text-text-secondary hover:text-text-primary transition-colors font-medium">Tooling</a>
                    </div>
                    <div className="flex flex-col gap-3">
                        <h4 className="font-bold text-text-primary mb-2 uppercase tracking-widest text-[10px]">Ecosystem</h4>
                        <a href="https://github.com/TheRemyyy/velox-framework" className="text-text-secondary hover:text-text-primary transition-colors font-medium">GitHub</a>
                    </div>
                </div>
            </div>
            <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-border/40 text-[11px] font-bold text-text-dim uppercase tracking-[0.2em]">
                &copy; {new Date().getFullYear()} Velox &bull; Created by TheRemyyy &bull; MIT License
            </div>
        </footer>
    );
}
