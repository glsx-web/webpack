import request from './request'
const path = 'fims.system.'

function getListApi(data) {
  data.method = `${path}list`
  return request(data)
}

function reportApi(data) {
  data.method = `${path}report`
  return request(data)
}

function exportApi(data) {
  data.method = `${path}export`
  return request(data)
}

export {
  getListApi,
  reportApi,
  exportApi
}
