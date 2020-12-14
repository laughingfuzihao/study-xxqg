const cloud = require('wx-server-sdk')
// 每分钟执行一次 去跑ds定时数据表 并发送消息
cloud.init({
    env: cloud.DYNAMIC_CURRENT_ENV
})
exports.main = async (event, context) => {


    var timestamp = Date.parse(new Date());
    var date = new Date(timestamp);
    var hour = date.getHours();
    var minute = date.getMinutes();
    hour = hour > 10 ? hour : "0" + hour;
    minute = minute > 10 ? minute : "0" + minute;
    var month = (date.getMonth() + 1) > 9 ? (date.getMonth() + 1) : "0" + (date.getMonth() + 1);
    var day = (date.getDate()) > 9 ? (date.getDate()) : "0" + (date.getDate());
    var now = hour + ":" + minute;
    var showday = date.getFullYear() + '-' + month + '-' + day + ' ' + now;


    const db = cloud.database()
    db.collection('ds').where({
        due: now,
    }).get().then(res => {

        if (res.data.length > 0) {
            for (var i = 0; i < res.data.length; i++) {
                // 删除时间
                db.collection('ds').where({
                    _id: res.data[i]._id,
                }).remove();
                try {
                    const result = cloud.openapi.subscribeMessage.send({
                        touser: res.data[i]._openid,
                        page: 'pages/search/search',
                        data: {
                            thing1: {
                                value: '今天记得学习强国呀！'
                            },
                            time4: {
                                value: showday
                            },
                            thing9: {
                                value: "进入小程序搜索挑战答题答案！"
                            }
                        },
                        templateId: 'ZlZJM5aIow3_SBNKVKwOFNkNw1o49BQX44ba3EMrKH8'
                    })
                    return result
                } catch (err) {
                    return err
                }
            }

        }
    })

}


