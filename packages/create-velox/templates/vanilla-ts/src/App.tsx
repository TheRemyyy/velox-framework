import { createSignal, Router, Route, Link } from '@remyyy/velox';
import './style.css';

function Home() {
    const [count, setCount] = createSignal(0);

    return (
        <div className="card">
            <h1>Velox Framework</h1>
            <div className="card-body">
                <button onClick={() => setCount(c => c + 1)}>
                    Count is {count}
                </button>
                <p>
                    Edit <code>src/App.tsx</code> and save to test HMR
                </p>
            </div>
            <p className="read-the-docs">
                Click on the Velox logo to learn more
            </p>
        </div>
    );
}

function About() {
    return (
        <div className="card">
            <h1>About Page</h1>
            <p>This is a demonstration of Velox Routing.</p>
        </div>
    );
}

export default function App() {
    return (
        <div className="app-container">
            <Router>
                <nav style="margin-bottom: 2rem;">
                    <Link to="/">Home</Link> | <Link to="/about">About</Link>
                </nav>
                <Route path="/" component={Home} />
                <Route path="/about" component={About} />
            </Router>
        </div>
    );
}
