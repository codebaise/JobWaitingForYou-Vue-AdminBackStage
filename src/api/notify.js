import request from '@/utils/request'

export function sendMessage(data) {
  return request({
    url: `/message`,
    method: 'post',
    data
  })
}
