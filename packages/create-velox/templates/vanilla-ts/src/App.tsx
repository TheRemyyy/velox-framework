import { createSignal } from 'velox';
import './style.css';

export default function App() {
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
