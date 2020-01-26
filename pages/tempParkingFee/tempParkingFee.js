const context = require("../../context/Java110Context.js");
const constant = context.constant;
const util = context.util;
Page({
  data: {
    isKeyboard: !1,
    isNumberKB: !1,
    tapNum: !1,
    disableKey: "1234567890港澳学",
    keyboardNumber: "1234567890ABCDEFGHJKLMNPQRSTUVWXYZ港澳学",
    keyboard1: "京沪粤津冀晋蒙辽吉黑苏浙皖闽赣鲁豫鄂湘桂琼渝川贵云藏陕甘青宁新",
    inputPlates: {
      index0: "青",
      index1: "A",
      index2: "",
      index3: "",
      index4: "",
      index5: "",
      index6: "",
      index7: ""
    },
    inputOnFocusIndex: "",
    flag: true,
    communityName: '',
    communityId: '',
    carNumBtn: '新能源车牌',
    carNum: '',
    carNumBtnDisable: true
  },
  onLoad: function(options) {
    this.setData({
      communityId: '7020181217000001',
      communityName: "万博家博园（城西区）"
    })
  },
  //切换车牌
  changeplate: function(e) {
    var that = this;
    let _flag = this.data.flag;
    let _carNumBtn = '新能源车牌';
    if (_flag) {
      _flag = false;
      _carNumBtn = '普通车牌';
    } else {
      _flag = true;
      _carNumBtn = '新能源车牌';
    }
    console.log(e);
    that.setData({
      flag: _flag,
      carNumBtn: _carNumBtn,
      inputPlates: {
        index0: "青",
        index1: "A",
        index2: "",
        index3: "",
        index4: "",
        index5: "",
        index6: "",
        index7: ""
      },
    })
  },
  //切换车牌
  changeplate1: function() {
    var that = this;
    let _flag = this.data.flag;
    if (_flag) {
      _flag = false;
    } else {
      _flag = true;
    }
    that.setData({
      flag: _flag,
      inputPlates: {
        index0: "青",
        index1: "A",
        index2: "",
        index3: "",
        index4: "",
        index5: "",
        index6: "",
        index7: ""
      },
    })
  },

  inputClick: function(t) {
    var that = this;
    console.log('输入框:', t)
    that.setData({
      inputOnFocusIndex: t.target.dataset.id,
      isKeyboard: !0
    })
    "0" == this.data.inputOnFocusIndex ? that.setData({
      tapNum: !1,
      isNumberKB: !1
    }) : "1" == this.data.inputOnFocusIndex ? that.setData({
      tapNum: !1,
      isNumberKB: !0
    }) : that.setData({
      tapNum: !0,
      isNumberKB: !0
    });

  },

  //键盘点击事件
  tapKeyboard: function(t) {
    t.target.dataset.index;
    var a = t.target.dataset.val;
    console.log('键盘:', a)
    switch (this.data.inputOnFocusIndex) {
      case "0":
        this.setData({
          "inputPlates.index0": a,
          inputOnFocusIndex: "1"
        });
        break;

      case "1":
        this.setData({
          "inputPlates.index1": a,
          inputOnFocusIndex: "2"
        });
        break;

      case "2":
        this.setData({
          "inputPlates.index2": a,
          inputOnFocusIndex: "3"
        });
        break;

      case "3":
        this.setData({
          "inputPlates.index3": a,
          inputOnFocusIndex: "4"
        });
        break;

      case "4":
        this.setData({
          "inputPlates.index4": a,
          inputOnFocusIndex: "5"
        });
        break;

      case "5":
        this.setData({
          "inputPlates.index5": a,
          inputOnFocusIndex: "6"
        });
        break;

      case "6":
        this.setData({
          "inputPlates.index6": a,
          inputOnFocusIndex: "7"
        });
        break;

      case "7":
        this.setData({
          "inputPlates.index7": a,
          inputOnFocusIndex: "7"
        });

    }
    var n = this.data.inputPlates.index0 + this.data.inputPlates.index1 + this.data.inputPlates.index2 + this.data.inputPlates.index3 + this.data.inputPlates.index4 + this.data.inputPlates.index5 + this.data.inputPlates.index6 + this.data.inputPlates.index7
    console.log('车牌号:', n);
    this.setData({
      carNum: n
    })
    this.checkedSubmitButtonEnabled();
  },
  //键盘关闭按钮点击事件
  tapSpecBtn: function(t) {
    var a = this,
      e = t.target.dataset.index;
    if (0 == e) {
      switch (parseInt(this.data.inputOnFocusIndex)) {
        case 0:
          this.setData({
            "inputPlates.index0": "",
            inputOnFocusIndex: "0"
          });
          break;

        case 1:
          this.setData({
            "inputPlates.index1": "",
            inputOnFocusIndex: "0"
          });
          break;

        case 2:
          this.setData({
            "inputPlates.index2": "",
            inputOnFocusIndex: "1"
          });
          break;

        case 3:
          this.setData({
            "inputPlates.index3": "",
            inputOnFocusIndex: "2"
          });
          break;

        case 4:
          this.setData({
            "inputPlates.index4": "",
            inputOnFocusIndex: "3"
          });
          break;

        case 5:
          this.setData({
            "inputPlates.index5": "",
            inputOnFocusIndex: "4"
          });
          break;

        case 6:
          this.setData({
            "inputPlates.index6": "",
            inputOnFocusIndex: "5"
          });
          break;

        case 7:
          this.setData({
            "inputPlates.index7": "",
            inputOnFocusIndex: "6"
          });
      }

    } else 1 == e && a.setData({
      isKeyboard: !1,
      isNumberKB: !1,
      inputOnFocusIndex: ""
    });
    this.checkedSubmitButtonEnabled();
  },
  //键盘切换
  checkedKeyboard: function() {
    var t = this;
    "0" == this.data.inputOnFocusIndex ? t.setData({
      tapNum: !1,
      isNumberKB: !1
    }) : "1" == this.data.inputOnFocusIndex ? t.setData({
      tapNum: !1,
      isNumberKB: !0
    }) : this.data.inputOnFocusIndex.length > 0 && t.setData({
      tapNum: !0,
      isNumberKB: !0
    });
  },

  checkedSubmitButtonEnabled: function() {
    this.checkedKeyboard();
    var t = !0;
    for (var a in this.data.inputPlates)
      if ("index7" != a && this.data.inputPlates[a].length < 1) {
        this.setData({
          carNumBtnDisable: true
        })
        t = !1;
        break;
      }
    if (t) {
      this.setData({
        carNumBtnDisable: false
      })
    }
 
  },
  queryCarNum: function() {
    let carNum = this.data.carNum;
    let _that = this;
    if (carNum == '') {
      wx.showToast({
        title: '请重新输入车牌号',
      });
      return;
    }

    //查询车辆是否在该 小区停车场中
    let _objData = {
      communityId: this.data.communityId,
      carNum: carNum,
      state: '100300,100600',
      page:1,
      row:1
    }

    context.request({
      url: constant.url.listCarIn,
      header: context.getHeaders(),
      method: "GET",
      data: _objData, //动态数据
      success: function(res) {
        console.log("请求返回信息：", res);
        if (res.statusCode == 200) {
          let _carInouts = res.data.carInouts;
          if (_carInouts == null || _carInouts.length == 0){
            wx.showToast({
              title: "未查询到在场车辆或已支付",
              icon: 'none',
              duration: 2000
            });
            return;
          }
          let _tmpCarInout = _carInouts[0];
          _tmpCarInout['communityId'] = _that.data.communityId;
          _tmpCarInout['communityName'] = _that.data.communityName;

          wx.navigateTo({
            url: '/pages/tempParkingFeePay/tempParkingFeePay?carInfo=' + JSON.stringify(_carInouts[0]),
          });
          return ;
        }
        wx.showToast({
          title: "服务器异常了",
          icon: 'none',
          duration: 2000
        })
      },
      fail: function(e) {
        wx.showToast({
          title: "服务器异常了",
          icon: 'none',
          duration: 2000
        })
      }
    })
  }
})