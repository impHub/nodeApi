const express = require('express')
// 文件上传
const multer = require('multer')
// 路由(接口地址)
const router = express.Router()

const MENU = [
  { id: 1, important: 1, label: '居民录入', icon: 'guest', dec: '来访人员登记', color: 'cyan', url: "/pages/user/add" },
  { id: 2, important: 1, label: '居民审核', icon: 'heart', dec: '便民缴费', color: 'blue', disabled: true },
  { id: 3, important: 1, label: '活动', icon: 'party', dec: '最新社区活动', color: 'purple', disabled: true },
  { id: 4, important: 1, label: '服务', icon: 'service', dec: '物业提供的便民服务', color: 'mauve', disabled: true },
  { id: 5, label: '民生服务', icon: 'handheart', dec: '', color: 'pink', disabled: true },
  { id: 6, label: '健康管家', icon: 'health', dec: '', color: 'brown', disabled: true },
  { id: 8, label: '报事报修', icon: 'repair', dec: '', color: 'red', disabled: true },
  { id: 7, label: '工具使用', icon: 'tools', dec: '', color: 'orange', disabled: true },
  { id: 9, label: '快递查询', icon: 'gift', dec: '', color: 'olive', disabled: true }
]
const HOUSE = [
  {
    id: 1, name: '第1栋1', children: [
      {
        id: 101, name: '第1单元', children: [
          {
            id: 10101, name: '第1层', children: [
              { id: 1010101, name: '0101' },
              { id: 1010102, name: '0102' }
            ]
          },
          {
            id: 10102, name: '第2层', children: [
              { id: 1010201, name: '0201' },
              { id: 1010202, name: '0202' }
            ]
          }
        ]
      },
      {
        id: 102, name: '第2单元', children: [
          {
            id: 10201, name: '第1层', children: [
              { id: 1020101, name: '0101' },
              { id: 1020102, name: '0102' }
            ]
          },
          {
            id: 10202, name: '第2层', children: [
              { id: 1020201, name: '0201' },
              { id: 1020202, name: '0202' }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 2, name: '第2栋', children: [
      {
        id: 201, name: '第1单元', children: [
          {
            id: 20101, name: '第1层', children: [
              { id: 2010101, name: '0101' },
              { id: 2010102, name: '0102' }
            ]
          },
          {
            id: 20102, name: '第2层', children: [
              { id: 2010201, name: '0201' },
              { id: 2010202, name: '0202' }
            ]
          }
        ]
      },
      {
        id: 202, name: '第2单元', children: [
          {
            id: 20201, name: '第1层', children: [
              { id: 2020101, name: '0101' },
              { id: 2020102, name: '0102' }
            ]
          },
          {
            id: 20202, name: '第2层', children: [
              { id: 2020201, name: '0201' },
              { id: 2020202, name: '0202' }
            ]
          }
        ]
      }
    ]
  }
]
const FRONT = [
  { id: 1, name: '一号大门一号大门' },
  { id: 2, name: '二号大门' },
  { id: 3, name: '三号大门' }
]
const UNIT = [
  { id: 4, name: '一栋一单元', buildId: 1, unitId: 101 },
  { id: 5, name: '一栋二单元', buildId: 1, unitId: 102 },
  { id: 6, name: '二栋一单元', buildId: 2, unitId: 201 },
  { id: 7, name: '二栋二单元', buildId: 2, unitId: 202 }
]
const storage = multer.diskStorage({
  destination: "./uploads",
  filename: function (req, file, cb) {
    //! 用 前端req中的 originalname 附带的文件名获取到其文件类型后缀
    // !随后 用这个后缀拼接服务器上的新文件名字。
    const originalnameAndSuffix = file.originalname.split(".");
    const suffixIndex = originalnameAndSuffix.length - 1;
    const suffix = originalnameAndSuffix[suffixIndex];
    cb(null, file.originalname.split(".")[0] + Date.now() + '.' + suffix);
  }
})
// ! 图片大小应该进行设置。
const upload = multer({
  storage: storage
  // limits: { fileSize: 2000000 }
}).single("file")

function responseJSON (data = {}, type = true, info = '') {
  return {
    code: !!type ? 0 : type,
    data: data,
    info: info
  }
}
const token = 'abc12312'

const noTokenRouter = ['/sendCaptcha', '/login']
// 第一个参数传要守卫的接口地址'/getAuthDoor',如果不传所有接口
router.use((req, res, next) => {
  // 每次请求接口都会触发
  console.log('gouzi')
  if (req.headers['token'] !== token && req.headers['authorization'] !== token && noTokenRouter.indexOf(req.url) < 0) {
    res.status(201).json(responseJSON(0, false, 'token已失效'))
  }
  // 通过,请求接口会超时
  next()
})
router.get('/getMenu', (req, res) => {
  res.json(responseJSON(MENU))
})
router.get('/infoVillage/tree', (req, res) => {
  res.json(responseJSON(HOUSE))
})
router.get('/resDeviceAddress/front/select', (req, res) => {
  res.json(responseJSON(FRONT))
})
router.get('/resDeviceAddress/unit/select', (req, res) => {
  res.json(responseJSON(UNIT))
})

router.post('/sendCaptcha', (req, res) => {
  res.json(responseJSON(1))
})
router.post('/addUser', (req, res) => {
  res.json(responseJSON(1))
})
router.get('/getAuthDoor', (req, res) => {
  // 前端传来的值
  console.log(req.query)
  // 返回的值
  res.json(responseJSON([
    { id: 1, label: '第2栋第1单元', dec: '恒大首府', icon: 'guest', bgcolor: 'bg-cyan' },
    { id: 2, label: '第3栋第2单元', dec: '恒大首府', icon: 'guest', bgcolor: 'bg-blue' },
    { id: 3, label: '第6栋第1单元', dec: '恒大首府', icon: 'guest', bgcolor: 'bg-purple' }
  ]))
})
router.post('/openDoor', (req, res) => {
  res.json(responseJSON(1))
})

router.post('/login', (req, res) => {
  // res.json(responseJSON(0, false, '验证码错误'))
  res.json(responseJSON({
    token: token,
    userId: 'fad13',
    userName: '明月',
    mobile: '18071018899'
  }))
})

router.post('/update', upload, (req, res) => {
  const params = JSON.parse(JSON.stringify(req.body))
  console.log('file', req.file)
  console.log('type', params.type)
  if (params.type === 'opposite') {
    res.json(responseJSON({
      name: '张三',
      sex: '男',
      nation: '汉',
      birth: '1988-08-12',
      address: '湖北省武汉市XX街XX号',
      idCard: '422000198808120123',
      path: req.file.path
    }))
  } else if (params.type === 'front') {
    res.json(responseJSON({
      cardOrg: '湖北省武汉市公安局',
      validStart: '2008-08-09',
      validEnd: '2028-08-09',
      path: req.file.path
    }))
  } else {
    res.json(responseJSON({
      path: req.file.path
    }))
  }
})

module.exports = router