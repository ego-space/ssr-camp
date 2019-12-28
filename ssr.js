const path = require('path')
const fs = require('fs')
const Koa = require('koa')
const app = new Koa()
const router = require('koa-router')()
const axios = require('axios')
const puppeteer = require('puppeteer')



const start = (port) => {
  app.listen(port, () => {
    console.log('启动成功:' + port)
  })
}

start(9000)

async function test() {
  console.log('截图')
  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  await page.goto('http://www.baidu.com')
  await page.screenshot({path: 'baidu.png'})
  await browser.close()
}
// test()
router.get('*', async ctx => {
  if (ctx.path === '/favicon.ico') {
    const filename = path.resolve(__dirname, './public/favicon.ico')
    const data = fs.readFileSync(filename)
    return ctx.body = data
  }
  
  const url = 'http://localhost:8887'+ ctx.url
  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  await page.goto(url, {
    waitUntil: ['networkidle0']
  })
  const html = await page.content()
  ctx.body = html
})

app.use(router.routes())
