import { createSignal } from '@remyyy/velox'

export default function App() {
    const [count, setCount] = createSignal(0)

    return (
        <div>
            <h1>Hello Velox! </h1>
            < div class="card" >
                <button onclick={() => setCount(c => c + 1)}>
                    count is {count}
                </button>
                <p>
                    Edit < code > src / App.ts </code> and save to test HMR
                </p>
            </div>
            < p class="read-the-docs" >
                Click on the Velox logo to learn more
            </p>
        </div>
    )
}
