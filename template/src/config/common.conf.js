export default{
  axios: {
    baseURL: 'http://192.168.3.171:7300/mock/5b0ed7dbf189006180803286/standard',
    whiteList: ['user/login', 'user/info', 'user/logout', 'user/getInfo', 'vue/lt', 'vue/login', 'auth/checkLogin', 'vue/logout'],
    timeout: 15000,
    result: {
      data_key: 'data', // 返回值数据实体存放对象
      message_key: 'message', // 返回信息字段名
      code_key: 'returnCode', // 返回结果字段名
      code_success_value: '0', // 返回成功值 注意类型 (字符串与数字)
      code_message_map: { // 错误码 错误信息 映射表
      }
    }
  }
}
