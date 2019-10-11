import request from './request'
const path = 'fims.'

export function searchReportLog(data) {
  data.method = `${path}reportlog.search`
  return request(data)
}
export function searchDepot(data) {
  data.method = 'fims.configuration.from.conftype'
  return request(data)
}
