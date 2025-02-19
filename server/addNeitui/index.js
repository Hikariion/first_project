// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database()
// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const company = event.company
  const introduce = event.introduce
  const img_path = event.img_path
  await db.collection('Neitui').add({
    data:{
      company: company,
      introduce: introduce,
      img_path: img_path
    }
  })
  return {
    event,
    openid: wxContext.OPENID,
    appid: wxContext.APPID,
    unionid: wxContext.UNIONID,
  }
}