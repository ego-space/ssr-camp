// 模拟接口
const Koa = require('koa')
const app = new Koa()

const start = (port) => {
  app.listen(port, () => {
    console.log('启动成功:' + port)
  })
}

start(8888)

app.use((ctx) => {
  if (ctx.path === '/api/course/list') {
    ctx.set("Access-Control-Allow-Origin", "*");
    ctx.set("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE");
    ctx.set("Content-Type", "application/json;charset=utf-8");
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
})