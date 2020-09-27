const express = require('express')
const router = express.Router()

// 主页路由
router.get('/', (req, res) => {
  res.send('主页')
})

// “关于页面”路由
router.get('/about', (req, res) => {
  res.send('关于')
})

module.exports = router