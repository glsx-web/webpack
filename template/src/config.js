export default{
  app: {
    axios: {
      baseURL: 'http://192.168.3.171:7300/mock/5b0ed7dbf189006180803286/standard',
      'whiteList': ['user/login', 'user/info', 'user/logout', 'user/getInfo'],
      'timeout': 15000
    }
  }
}
