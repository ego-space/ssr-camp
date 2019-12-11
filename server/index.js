import path from 'path'
import React from 'react'
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom'
import Koa from 'koa'
import serve from 'koa-static'
import App from '../src/App'

const app = new Koa()

app.use(serve(path.join(process.cwd() + "/public")))

app.use(ctx => {
  
  const content = renderToString(
    <StaticRouter location={ctx.path}>
      {App}
    </StaticRouter>
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
start(8080)
