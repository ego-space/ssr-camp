import path from 'path'
import React from 'react'
import { renderToString } from 'react-dom/server'
import { StaticRouter, matchPath, Route } from 'react-router-dom'
import Koa from 'koa'
import serve from 'koa-static'
import routes from '../src/App'
import { Provider } from 'react-redux'
import { getServerStore } from '../src/store/store'
import Header from '../src/components/Header'

// 初始化store
const store = getServerStore()
const app = new Koa()

app.use(serve(path.join(process.cwd() + "/public")))

app.use(async ctx => {
  const promises = []

  routes.some(route => {
    const match = matchPath(ctx.path, route)
    if(match) {
      const { loadData } = route.component
      if (loadData) {
        promises.push(loadData(store))
      }
    }
  })

  try {
    // 等待所有网络请求
    await Promise.all(promises)
  } catch (error) {
    console.log(error)
  }
  
  const content = renderToString(
    <Provider store={store}>
      <StaticRouter location={ctx.path}>
        <Header />
        { routes.map(route => <Route {...route}></Route>)}
      </StaticRouter>
    </Provider>
  )

  ctx.body = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <meta http-equiv="X-UA-Compatible" content="ie=edge">
      <title>react+koa->ssr</title>
    </head>
    <body>
      <div id="root">${content}</div>
      <script>
        window.__context=${JSON.stringify(store.getState())}
      </script>
      <script src="/bundle.js"></script>
    </body>
    </html>
  `
})

function start(port) {
  app.listen(port, () => {
    console.log(`start: listen on port:${port}`)
  })
}
start(9090)
