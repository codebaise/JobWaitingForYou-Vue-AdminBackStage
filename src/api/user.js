import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/login',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: '/vue-admin-template/user/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/vue-admin-template/user/logout',
    method: 'post'
  })
}

export function changeUserAccountStatus(accountId) {
  return request({
    url: `/backStageManagement/account/${accountId}`,
    method: 'put'
  })
}

export function changePositionStatus(positionId, params) {
  return request({
    url: `/backStageManagement/position/${positionId}`,
    method: 'put',
    params
  })
}

export function getPositionComments(userId, positionId) {
  return request({
    url: `/seeker/${userId}/positions`,
    method: 'get',
    params: { positionId }
  })
}
