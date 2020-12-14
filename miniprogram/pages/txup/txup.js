// pages/tx/tx.js
const app = getApp()
const db = wx.cloud.database()



Page({
  /**
   * 页面的初始数据
   */
  data: {
    a:'',
    needSearch:'',
    time1:'21:00',
    openid:''
  },
  bindTimeChange1: function (e) {
    this.setData({
      time1: e.detail.value
    })
  },


  // 跳过 go搜索页
  tg: function (e) {
    wx.setStorageSync("ble_deviceId", "1")
    wx.reLaunch({
      url: '../search/search'
    })
  },



  // 填写签到时间
  qd: function (e) {
    if(this.data.time1 ==""||this.data.time1==null){
      wx.showToast({
        icon: 'none',
        title: '请选择时间',
      })
      return;
    }
    // 调用获取下发权限
    wx.requestSubscribeMessage({
      tmplIds: ['ZlZJM5aIow3_SBNKVKwOFNkNw1o49BQX44ba3EMrKH8'],
      success :(res)=>{
        console.log("订阅消息 成功 "+res);
        console.log("openid---"+this.data.openid);
      },
      fail :(errCode,errMessage) =>{
        console.log("订阅消息 失败 "+errCode+" message "+errMessage);
      },
      complete:(errMsg)=>{
        console.log("订阅消息 完成 "+errMsg);
        // 存储定时时间
        db.collection('ds').add({
          data: {
            due: this.data.time1,
          },
          success: function(res) {
            // res 是一个对象，其中有 _id 字段标记刚创建的记录的 id
            console.log(res)
            wx.reLaunch({
              url: '../my/my'
            })
          }
        })

      }
    });

  },




// 定义调用云函数获取openid
  /*  getOpenid(){
      let page = this;
      wx.cloud.callFunction({
        name:'getopenid',
        complete:res=>{
          console.log('openid--**',res.result)
          var openid = res.result.openid
          page.setData({
            openid:openid
          })
        }
      })
    },*/

  /**
   * 生命周期函数--监听页面显示  判断是否首次进入
   */
  /*
    onShow: function(){
      this.isNeedSearch()
    },
    isNeedSearch() {
      this.data.needSearch = wx.getStorageSync("ble_deviceId");
      if (!this.data.needSearch) {
        this.data.a = true

      }else {
        this.data.a = false
      }
      console.log(   this.data.a )

    },
  */

  /*  wx.cloud.callFunction({
      name:'sends',
      data:{openid:this.data.openid},
      success :(res)=>{
        console.log("发送 ");
        console.log(res);
      },
      fail :() =>{
      },
    })*/


})
