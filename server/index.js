import React from 'react'
import { renderToString } from 'react-dom/server'
import Koa from 'koa'
import App from '../src/App'

const app = new Koa()

app.use(ctx => {
  const Page = <App></App>
  const content = renderToString(Page)
  if(ctx.path === '/') {
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
      </body>
      </html>
    `
  }
})

function start(port) {
  app.listen(port, () => {
    console.log(`start: listen on port ${port}`)
  })
}
start(8080)
