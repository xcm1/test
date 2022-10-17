import request from '@/utils/request'

// 通过编号删除用户信息
export function apiDeleteUser(data) {
  return request({
    url: '/admittance/business/common/deleteUser',
    method: 'delete',
    data
  })
}

// 通过编号批量删除用户信息
export function apiDeleteUserBath(data) {
  return request({
    url: '/admittance/business/common/deleteUserBath',
    method: 'delete',
    data
  })
}

// 查询所有区
export function apiSysRegionList(query) {
  return request({
    url: '/admittance/business/configuring/sysRegionList',
    method: 'get',
    params: query
  })
}
// 查询所有的学历
export function apiJobEducationalList(query) {
  return request({
    url: '/admittance/business/configuring/jobEducationalList',
    method: 'get',
    params: query
  })
}
// 查询所有的任教学科 执教学科
export function apiJobTeachingSectionList(query) {
  return request({
    url: '/admittance/business/configuring/jobTeachingSectionList',
    method: 'get',
    params: query
  })
}
// 申请审核类型列表
export function apiVerificationRequestTypeList(query) {
  return request({
    url: '/admittance/business/configuring/verificationRequestTypeList',
    method: 'get',
    params: query
  })
}
// 查询所有的其他荣誉
export function apiOtherHonorsList(query) {
  return request({
    url: '/admittance/business/configuring/otherHonorsList',
    method: 'get',
    params: query
  })
}
// 督学类别 专职 兼职未聘任
export function apiSuperintendentListCategoryList(query) {
  return request({
    url: '/admittance/business/configuring/supervisionClassList',
    method: 'get',
    params: query
  })
}

// 查询所有的职称
export function apiJobTitleList(query) {
  return request({
    url: '/admittance/business/configuring/jobTitleList',
    method: 'get',
    params: query
  })
}
// 查询所有的编制情况
export function apiCompilingList(query) {
  return request({
    url: '/admittance/business/configuring/compilingList',
    method: 'get',
    params: query
  })
}
// 查询所有的专业类别
export function apiProfessionalCategoryList(query) {
  return request({
    url: '/admittance/business/configuring/professionalCategoryList',
    method: 'get',
    params: query
  })
}

// 复检审核类 未考核 未通过 退回修改 完成
export function apiReviewAuditTypeList(query) {
  return request({
    url: '/admittance/business/configuring/reviewAuditTypeList',
    method: 'get',
    params: query
  })
}
