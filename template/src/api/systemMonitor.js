import request from './request'
const path = 'fims.system.'

function reportApi(data) {
  data.method = `${path}report`
  return request(data)
}

export {
  reportApi
}
