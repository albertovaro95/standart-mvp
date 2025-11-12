import { useState } from 'react'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <h1>Nuevo Proyecto</h1>
      <button onClick={() => setCount(count + 1)}>
        Contador: {count}
      </button>
    </div>
  )
}

export default App
