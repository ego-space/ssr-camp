import React, { useState } from 'react'

function App() {
  const [ count, setCount ] = useState(1)
  return <div>
    <h1>Hello Word！{count}</h1>
    <button onClick={() => setCount(count + 1)}>累加</button>
  </div>
  
}

export default <App></App>