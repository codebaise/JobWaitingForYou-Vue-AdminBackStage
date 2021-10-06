import request from '@/utils/request'

export function changeUserAccountStatus(accountId) {
  return request({
    url: `/backStageManagement/account/${accountId}`,
    method: 'put'
  })
}
