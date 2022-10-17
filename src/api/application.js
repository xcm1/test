import request from '@/utils/request'

// 申请审核列表
export function apiVerificationRequest(data) {
  return request({
    url: '/admittance/business/verificationRequest/verificationRequest',
    method: 'post',
    data
  })
}

// 考核面试列表
export function apiTestInterviewList(data) {
  return request({
    url: '/admittance/business/assessmentInterview/testInterview',
    method: 'post',
    data
  })
}

// 查询考核面试时间段数据
export function apiGetInterviewTime(query) {
  return request({
    url: '/admittance/business/assessmentInterview/selectSet',
    method: 'get',
    params: query
  })
}

// 修改考核面试时间段数据
export function apiUpdateInterviewTime(data) {
  return request({
    url: '/admittance/business/assessmentInterview/updateSet',
    method: 'put',
    data
  })
}

// 复检审核列表
export function apiReviewAuditList(data) {
  return request({
    url: '/admittance/business/reviewAudit/reviewAudit',
    method: 'post',
    data
  })
}

// 查询复检面试时间段数据
export function apiGetReviewAuditTime(query) {
  return request({
    url: '/admittance/business/reviewAudit/selectSet',
    method: 'get',
    params: query
  })
}

// 修改复检面试时间段数据
export function apiUpdateReviewAuditTime(data) {
  return request({
    url: '/admittance/business/reviewAudit/updateSet',
    method: 'put',
    data
  })
}
