import request from './request'

const path = 'fims.order.'

function getListApi(data) {
  data.method = `${path}search`
  return request(data)
}

function detailApi(data) {
  data.method = `${path}detail`
  return request(data)
}

function removeApi(data) {
  data.refreshTable = true
  data.method = `${path}delete`
  return request(data)
}

function exportApi(data) {
  data.method = `${path}exportPdf`
  return request(data)
}

// function downloadApi(data) {
//   data.method = `${path}download`
//   return request(data)
// }

export {
  getListApi,
  detailApi,
  removeApi,
  exportApi
}
