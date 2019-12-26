import path from 'path'
import React from 'react'
import { renderToString } from 'react-dom/server'
import { StaticRouter, matchPath, Route, Switch } from 'react-router-dom'
import Koa from 'koa'
import serve from 'koa-static'
import routes from '../src/App'
import { Provider } from 'react-redux'
import { getServerStore } from '../src/store/store'
import Header from '../src/components/Header'
import { clientPort } from '../config'
import proxy from 'koa2-proxy-middleware'

// 初始化store
const store = getServerStore()
const app = new Koa()

app.use(serve(path.join(process.cwd() + "/public")))

// 接口转发代理配置
const options = {
  target: {
    '/api': {
      target: 'http://localhost:8888',
      changeOrigin: true
    }
  },
}

// 注册接口代理
app.use(proxy(options))

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
  
  const context = {}
  const content = renderToString(
    <Provider store={store}>
      <StaticRouter location={ctx.path} context={context}>
        <Header />
        <Switch>
          { routes.map(route => <Route {...route}></Route>)}
        </Switch>
      </StaticRouter>
    </Provider>
  )
  // console.log(context)
  if (context.statusCode) {
    ctx.status = context.statusCode
  }
  if (context.action === 'REPLACE') {
    // 重定向 回选正确状态码
    ctx.redirect(context.url, '301')
  }

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
start(clientPort)
