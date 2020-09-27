let app = require('express')()
let http = require('http').Server(app)
let router = require('./router')
let appManageRouter = require('./router/app-manage')
// let io = require('socket.io')(http)
let cors = require('cors')
let bodyParser = require('body-parser') // post请求体相关

// app.all('*', function (req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Token, Accept,X-Requested-With");
//   res.header('Access-Control-Allow-Headers', 'Content-Type');
//   console.log(res.method)
//   if (req.method == 'OPTIONS') {
//     res.status(200).end()
//   } else {
//     next()
//   }
// })

app.use(cors())
app.use(bodyParser.json())

app.use(router)
app.use('/app/manage', appManageRouter)

http.listen('3000', () => {
  console.log('模拟数据服务已启用，端口:3000')
})
