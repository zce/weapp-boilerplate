function login () {
  return new Promise((resolve, reject) => {
    wx.login({
      success: () => {
        console.log('logined')
        resolve()
      },
      fail: () => {
        console.log('fail')
        reject()
      }
    })
  })
}

function getUserInfo () {
  return new Promise((resolve, reject) => {
    wx.getUserInfo({ success: resolve, fail: reject })
  })
}

module.exports = { login, getUserInfo }
