// 模拟接口
const Koa = require('koa')
const app = new Koa()
const { mockPort } = require('./config')

const start = (port) => {
  app.listen(port, () => {
    console.log('启动成功:' + port)
  })
}

start(mockPort)

// logger
app.use(async (ctx, next) => {
  const reqDate = Date.now()
  const method = ctx.method
  const path = ctx.path
  await next()
  const resDate = Date.now()
  console.log(`${method} - ${path} - ${resDate - reqDate}ms`)

})

app.use((ctx) => {
  // 处理同源策略请求 请求头
  ctx.set("Access-Control-Allow-Origin", "*");
  ctx.set("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE");
  ctx.set("Content-Type", "application/json;charset=utf-8");

  if (ctx.path === '/api/course/list') {
    ctx.body = {
      code: 0, 
      list: [
        {
          name: '小明',
          id: 1,
        },
        {
          name: '小蓝',
          id: 2,
        },
        {
          name: '小黑',
          id: 3,
        },
        {
          name: '小红',
          id: 4,
        }
      ]
    }
  }
  if (ctx.path === '/api/user/list') {
    ctx.body = {
      code: 0,
      data: {
        name: '小明',
        id: 1
      }
    }
  }
})