import Vue from 'vue'

import { Message, MessageBox, Loading } from 'element-ui';
import moment from 'moment'
let loadingInstance = ''
export const Util = {

  /**
   * 简单alert
   * title 标题
   * message 内容
   * className 自定义class
   * showCancelButton 是否展示取消按钮
   * confirmButtonText 确认按钮文案
   * cancelButtonText 取消按钮文案
   * confirmButtonColor 确认按钮颜色
   * cancelButtonColor 取消按钮颜色
   */
  msg: function(options) {
    MessageBox({
      title: options.title || '',
      type: options.type || 'error',
      message: options.message || '',
      className: options.className || '',
      showCancelButton: options.showCancelButton || false,
      confirmButtonText: options.confirmButtonText || '确认',
      cancelButtonText: options.cancelButtonText || '取消',
      confirmButtonColor: options.confirmButtonColor || '#1989fa',
      cancelButtonColor: options.cancelButtonColor || '#000',
      dangerouslyUseHTMLString: true,
      callback: function(action, done) {
        if (action == 'confirm') {
          if (options.success) {
            (options.success)(done)
          }
        } else {
        console.log(done);
          // done()
        }
      }
    });

    /* Vue.$vux.alert.show({
    	title: options.title||'',
    	content: options.message||'',
    	onShow() {
    		options.onShow?(options.onShow)():'';
    	},
    	onHide() {
    		options.onHide?(options.onHide)():'';
    	}
    }) */
  },

  /**
   * 提示框
   */
  Info: function(options) {
    Message({
      message: options.message || '提示',
      type: options.type || 'error',
      duration: options.time || 2000,
      onClose: options.onClose || ''
    });

  },

  /**
   * 轻提示
   */
  Tips: function(options) {
    Message({
      message: options.message || '提示',
      duration: options.duration || 3000,
      type: options.type || 'text',
      icon: options.icon || ''
    })
  },

  /**
   * loading
   */
  loading: function(message) {
    loadingInstance = Loading.service({
      text: message || '加载中...'
    });

  },

  /**
   * 关闭loading
   */
  closeLoading: function() {
    loadingInstance.close();
  },

  /**
   * 校验手机号码格式
   */
  checkPhone: function(mobile) {
    let myreg = /^(13[0-9]|15[0-9]|16[0-9]|17[0-9]|18[0-9]|19[0-9]|14[0-9])[0-9]{8}$/;
    return myreg.test(mobile);
  },

  /**
   * 校验固定电话
   */
  validationTel: function(tel) {
    let reg = /^0[\d]{2,3}-[\d]{7,8}$/;
    return reg.test(tel);
  },

  /**
   * 是否特殊字符
   */
  isSpecialLetter: function(str) {
    let reg = new RegExp("[`~!@#$^&*=|{}':;',\\[\\]<>?~！@#￥……&*——|{}【】‘；：”“'。，、？ ]");
    return reg.test(str);
  },

  /**
   * 只能输入英文字母和数字,不能输入中文
   */
  validationInput: function(str) {
    let reg = /[^\w\.\/]/ig;
    return reg.test(str);
  },

  /**
   * 获取当前时间
   */
  getCurrentDate: function() {
    let time = new Date();
    let y = time.getFullYear();
    let m = time.getMonth() + 1;
    let d = time.getDate();

    return {
      date: y + '/' + m + '/' + d
    }

  },

  /**
   * 获取浏览器参数
   */
  getUrlParams: function(name) {
      let vars = [],
        hash;
        let oParams = {};
      let hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
      for (let i = 0; i < hashes.length; i++) {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        oParams[hash[0]] = hash[1];
      }
      console.log(vars);
      if(name){
        return oParams[name];
      }else{
        return oParams;
      }
    },

  /**
   * 根据当前时间，计算往后30天的日期
   */
  getAfterDate: function(day) {
    let date1 = new Date();
    let date2 = new Date(date1);
    let time = 30;
    if (day) {
      time = day;
    }
    date2.setDate(date1.getDate() + time);

    let _date = date2.getFullYear() + '-' + (date2.getMonth() + 1) + '-' + date2.getDate();

    return {
      date: _date,
      year: date2.getFullYear(),
      month: date2.getMonth() + 1,
      day: date2.getDate()
    };
  },


  /**
   * 日期格式转换
   */
  dateFormate: function(str, type) {
    let txt = 'YYYY-MM-DD'
    if (type) {
      txt = type
    }
    const m = moment(str).format(txt)
    return m
  },

  /**
   * 字段截取
   */
  cutStr: function(str, num) {
    if (!str) {
      return ''
    }

    let m = 10
    let n = str
    if (num) {
      m = num
    }
    if (str.length > m) {
      n = str.slice(0, m) + '...'
    }
    
    return n
  }

}
