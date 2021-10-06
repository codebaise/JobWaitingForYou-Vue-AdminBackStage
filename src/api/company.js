import request from '@/utils/request'

export function accessCompany(companyId) {
  return request({
    url: `/backStageManagement/company/${companyId}`,
    method: 'put',
  })
}

export function banCompany(companyId, comment) {
  return request({
    url: `/backStageManagement/company`,
    method: 'delete',
    data: { companyId, comment }
  })
}
export function getReviewHistory(companyId) {
  return request({
    url: `/backStageManagement/company/${companyId}/reviewHistory`,
    method: 'get',
  })
}


