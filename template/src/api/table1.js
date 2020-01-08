import request from './request'

const path = 'fims.order.'

function getListApi(data) {
  data.method = `${path}search`
  return request(data)
}

function editApi(data) {
  data.method = `${path}edit`
  return request(data)
}

function removeApi(data) {
  data.method = `${path}delete`
  return request(data)
}

export {
  getListApi,
  editApi,
  removeApi
}
