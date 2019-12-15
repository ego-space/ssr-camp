import React from 'react'
import ReactDom from 'react-dom'
import { BrowserRouter, Route } from 'react-router-dom'
import routes from '../src/App'
import { Provider } from 'react-redux'
import { getClientStore } from '../src/store/store'


const Page = (<Provider store={getClientStore()}>
  <BrowserRouter>
    {routes.map(route => <Route {...route}></Route>)}
  </BrowserRouter>
</Provider>)
// 注水 客户端入口
ReactDom.hydrate(Page, document.getElementById('root'))