import request from '@/utils/request'

// 审批流程
export function apiApprovalProcess(query) {
  return request({
    url: '/admittance/business/applicationForRegistration/approvalProcess',
    method: 'get',
    params: query
  })
}

// 申请注册
export function apiRegiste(data) {
  return request({
    url: '/login/sysUser/applicationRegistration',
    method: 'post',
    data
  })
}

// 申请注册
export function apiTemporaryStorage(data) {
  return request({
    url: '/login/sysUser/temporaryStorage',
    method: 'post',
    data
  })
}
