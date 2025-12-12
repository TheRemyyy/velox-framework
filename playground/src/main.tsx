import { mount, createSignal } from 'velox';
import { Router, Route, Link } from 'velox';

function Counter() {
  const [count, setCount] = createSignal(0);

  return (
    <div>
      <h2>High Performance Counter</h2>
      <p>Count: {count}</p>
      <button onClick={() => setCount(c => c + 1)}>Increment</button>
      <button onClick={() => setCount(c => c - 1)}>Decrement</button>
    </div>
  );
}

function Home() {
    return (
        <div>
            <h1>Welcome to Velox</h1>
            <p>The fastest framework in the universe.</p>
            <Counter />
        </div>
    );
}

function About() {
    return (
        <div>
            <h1>About Velox</h1>
            <p>Built for speed. Zero Virtual DOM.</p>
        </div>
    );
}

function App() {
  return (
    <div>
        <nav>
            <Link to="/" style={{ marginRight: '10px' }}>Home</Link>
            <Link to="/about">About</Link>
        </nav>
        <hr />
        <Router>
            <Route path="/" component={Home} />
            <Route path="/about" component={About} />
        </Router>
    </div>
  );
}

const root = document.getElementById('root');
if (root) {
    mount(App, root);
}
