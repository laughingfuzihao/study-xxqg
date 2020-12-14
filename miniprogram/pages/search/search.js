//index.js
const app = getApp()
const db = wx.cloud.database()

Page({
  data: {
      page: true,
      page2: false,
    openid:'',
    textLists:'',
    search:'',
    text:''
  },
    mrtxxg: function () {
        wx.navigateTo ({
            url: '../txup/txup'
        })
    },
    gosearch: function (e) {
        this.setData({
            page: true,
            page2: false,
        })
    },

  gomy: function (e) {
      this.setData({
          page2: true,
          page: false,
      })
  },


    cancel: function (e) {
        this.setData({
            search: '',
        })
    },

    searchInput: function (e) {
    this.setData({
      search: e.detail.value,
    })
  },

  goSearch:function (){

    var that = this;
    var search =that.data.search;
    console.log("aaaa");
    console.log(search);
    if(search==''||search==null){
      wx.showToast({
        icon: 'none',
        title: '请输入关键字',
      })
      return;
    }


    var arr = search.split(/[ ]+/);//以空格分开
    for(var i = 0; i < search.length; ++i){
    }

    var a0 = arr[0];
    var a1 = arr[1];
    var a2 = arr[2];
    var a3 = arr[3];


    if(a1 == undefined){
      a1='';
    }
    if(a2 == undefined){
      a2='';
    }
    if(a3 == undefined){
      a3='';
    }


    db.collection('study').where({
      text: db.RegExp({
        regexp: a0,
      })
    }).where({
      text: db.RegExp({
        regexp: a1,
      })
    })
        .where({
          text: db.RegExp({
            regexp: a2,
          })
        })
        .where({
          text: db.RegExp({
            regexp: a3,
          })
        })
        .orderBy('id', 'desc').get({
      success: res => {
          if(arr.length==2){
              for (let i = 0; i < res.data.length; i++) {
                  res.data[i].text = that.hilight_word2(a0,a1, res.data[i].text);
              }
          }else {
              for (let i = 0; i < res.data.length; i++) {
                  res.data[i].text = that.hilight_word1(a0, res.data[i].text);
              }
          }
          that.setData({
          textLists: res.data,
        })

      }

    })


  },



    hilight_word1: function (key, word) {
        let idx = word.indexOf(key), t = [];

        if (idx > -1) {
            if (idx == 0) {
                t =this.hilight_word1(key, word.substr(key.length));
                t.unshift({ key: true, str: key });
                return t;
            }

            if (idx > 0) {
                t =this.hilight_word1(key, word.substr(idx));
                t.unshift({ key: false, str: word.substring(0, idx) });
                return t;
            }
        }
        return [{ key: false, str: word }];
    },



    hilight_word2: function (key,key1, word) {
        let idx = word.indexOf(key), t = [];
        let idx1 = word.indexOf(key1), t1 = [];
        if (idx > -1 || idx1 > -1) {
            if (idx == 0) {
                t =this.hilight_word2(key,key1, word.substr(key.length));
                t.unshift({ key: true, str: key });
                return t;
            }
            if (idx > 0) {
                t =this.hilight_word2(key, key1,word.substr(idx));
                t.unshift({ key: false, str: word.substring(0, idx) });
                return t;
            }
            if (idx1 == 0) {
                t1 =this.hilight_word2(key, key1, word.substr(key1.length));
                t1.unshift({ key: true, str: key1 });
                return t1;
            }
            if (idx1 > 0) {
                t1 =this.hilight_word2(key, key1, word.substr(idx1));
                t1.unshift({ key: false, str: word.substring(0, idx1) });
                return t1;
            }
        }
        return [{ key: false, str: word }];
    },




})
