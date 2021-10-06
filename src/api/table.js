import request from '@/utils/request'

export function getList(url, params) {
  return request({
    // url: '/backStageManagement/seekers',
    url,
    method: 'get',
    params
  })
}
