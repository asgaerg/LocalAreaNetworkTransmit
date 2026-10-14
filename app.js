const express = require("express")
const os = require('os')
const path = require("path")

const port = 3000
const app = express()

//获取计算机用户信息
const userInfo = os.userInfo()
app.use('/soure/', express.static(`C:/Users/${userInfo.username}/Desktop`));

app.listen(port, () => {
  const osType = os.type(); //系统类型
  const netInfo = os.networkInterfaces(); //网络信息
  let ip = '';
  if (osType === 'Windows_NT') {
    for (let dev in netInfo) {
      //win7的网络信息中显示为本地连接，win10显示为以太网，win11显示WLAN
      if (dev === '本地连接' || dev === 'WLAN' || dev === '以太网') {
        for (let j = 0; j < netInfo[dev].length; j++) {
          if (netInfo[dev][j].family === 'IPv4') {
            ip = netInfo[dev][j].address;
            break;
          }
        }
      }
    }
  }
  console.log("服务开启在 " + ip + ":" + port)
  console.log("静态资源默认地址 在桌面文件夹访问 " + ip + ":" + port + "/soure/ 地址查看")

  console.log("小说默认地址在桌面小说客户端文件夹 访问 " + ip + ":" + port + "/book?name= 地址下载")

  console.log("文件资源默认地址在桌面文件夹 访问 " + ip + ":" + port + "/download?name= 地址下载")
})

// 下载小说路径
app.get('/book', (req, res) => {
  const name = req.query.name
  try {
    // 小说路径
    let filePath = `C:/Users/${userInfo.username}/Desktop/小说后端服务器/book/static/book/` + name
    let fileName = name
    res.download(filePath, fileName)  //express框架的下载api
    console.log("下载 " + name + " 已完成");
  } catch (error) {
    return res.status(500).send({
      result: 'error',
      message: `${name} 文件下载失败: ${error.message}`
    })
  }
})

// 下载文件路径
app.get('/download', (req, res) => {
  const name = req.query.name
  console.log(name);
  try {
    // 小说路径
    let filePath = `C:/Users/${userInfo.username}/Desktop/` + name
    let fileName = name
    console.log(filePath, fileName)
    res.download(filePath, fileName)  //express框架的下载api
  } catch (error) {
    return res.status(500).send({
      result: 'error',
      message: `文件下载失败: ${error.message}`
    })
  }
})