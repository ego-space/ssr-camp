import React, { useState } from 'react'

function Index() {
  const [count, setCount] = useState(1)
  return <div>
    <h1>首页</h1>
    <div>{count}</div>
    <button onClick={() => setCount(count + 1)}>累加</button>
  </div>

}

export default Index