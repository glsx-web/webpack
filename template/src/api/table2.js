import request from './request'

const path = 'fims.material.'

function getListApi(data) {
  data.method = `${path}list`
  return request(data)
}

export {
  getListApi
}
