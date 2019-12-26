import React from 'react'
import {Route} from 'react-router-dom'

function Status({code, children}) {
  return <Route render={({ staticContext }) => {
    if(staticContext) {
      staticContext.statusCode = code
    }
    return children
  }}></Route>
}

function Notfound(props) {
  // console.log('not-found', props)
  // props中可以获取staticContext上下文进行赋值，比如传递状态码
  return <Status code={404}>
    <h1>404 Notfound</h1>
  </Status>
}

export default Notfound