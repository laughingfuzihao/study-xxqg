
const cloud = require('wx-server-sdk')
cloud.init()
exports.main = async (event, context) => {
  try {


    const result = await cloud.openapi.subscribeMessage.send({
      touser: event.openid,
      page: 'pages/search/search',
      data: {
        thing1: {
          value: '今天记得学习强国呀！'
        },
        time4: {
          value: '2020-12-09 10:50'
        },
        thing9: {
          value: "进入小程序搜索挑战答题答案！"
        }
      },
      templateId: 'ZlZJM5aIow3_SBNKVKwOFNkNw1o49BQX44ba3EMrKH8'
    })
    console.log(result)
    return result
  } catch (err) {
    console.log(err)
    return err
  }
}
