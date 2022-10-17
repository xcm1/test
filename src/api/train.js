import request from '@/utils/request'

// 培训课程
export function selectDxPxkcPageCommon(data) {
  return request({
    url: '/admittance/business/trainingCourse/selectDxPxkcPageCommon',
    method: 'post',
    data
  })
}

// 报名参加
export function apply(data) {
  return request({
    url: '/admittance/business/common/apply',
    method: 'post',
    data
  })
}

// 我的培训记录
export function selectDxPxjlPage(data) {
  return request({
    url: '/admittance/business/myTrainingRecord/selectDxPxjlPage',
    method: 'post',
    data
  })
}
// 培训记录总学时和复检学时
export function selectBasicByUserId(query) {
  return request({
    url: '/admittance/business/myTrainingRecord/selectBasicByUserId',
    method: 'get',
    params: query
  })
}

// 学时记录
export function schoolRecord(data) {
  return request({
    url: '/admittance/business/schoolRecord/schoolRecord',
    method: 'post',
    data
  })
}

// 学时记录详情
export function recordDetails(data) {
  return request({
    url: '/admittance/business/schoolRecord/recordDetails',
    method: 'post',
    data
  })
}

// 个人学时统计
export function statisticRecord(id) {
  return request({
    url: `/admittance/business/schoolRecord/statisticRecord/${id}`,
    method: 'get'
  })
}

// 课程列表
export function selectDxPxkcPageAdministration(data) {
  return request({
    url: '/admittance/business/curriculumsTable/selectDxPxkcPageAdministration',
    method: 'post',
    data
  })
}

// 创建课程
export function establish(data) {
  return request({
    url: '/admittance/business/curriculumsTable/establish',
    method: 'post',
    data
  })
}

// 修改课程
export function update(data) {
  return request({
    url: '/admittance/business/curriculumsTable/update',
    method: 'post',
    data
  })
}

// 签到饼图统计
export function statisticSign(id) {
  return request({
    url: `/admittance/business/curriculumsTable/statisticSign/${id}`,
    method: 'get'
  })
}

// 课程详情签到列表
export function selectKcSign(data) {
  return request({
    url: '/admittance/business/curriculumsTable/selectKcSign',
    method: 'post',
    data
  })
}

// 培训区域级别
export function courseLevelList(query) {
  return request({
    url: '/admittance/business/configuring/courseLevelList',
    method: 'get',
    params: query
  })
}

// 上海所有区
export function sysRegionList(query) {
  return request({
    url: '/admittance/business/configuring/sysRegionList',
    method: 'get',
    params: query
  })
}

// 上海所有区不包含上海市
export function quList(query) {
  return request({
    url: '/admittance/business/curriculumsTable/quList',
    method: 'get',
    params: query
  })
}

// 不通过
export function noPass(data) {
  return request({
    url: '/admittance/business/curriculumsTable/noPass',
    method: 'post',
    data
  })
}

// 通过
export function pass(data) {
  return request({
    url: '/admittance/business/curriculumsTable/pass',
    method: 'post',
    data
  })
}

// 退回修改
export function returnToModify(data) {
  return request({
    url: '/admittance/business/curriculumsTable/returnToModify',
    method: 'post',
    data
  })
}

// 单个删除
export function deletet(data) {
  return request({
    url: '/admittance/business/curriculumsTable/delete',
    method: 'delete',
    data
  })
}

// 批量删除
export function deleteBath(data) {
  return request({
    url: '/admittance/business/curriculumsTable/deleteBath',
    method: 'delete',
    data
  })
}

// 课程状态
export function auditStatusStates(query) {
  return request({
    url: '/admittance/business/curriculumsTable/auditStatusStates',
    method: 'get',
    params: query
  })
}

// 回收站督学
export function educational(data) {
  return request({
    url: '/admittance/business/recycle/educational',
    method: 'post',
    data
  })
}

// 回收站课程
export function recycleTrainingCourse(data) {
  return request({
    url: '/admittance/business/recycle/recycleTrainingCourse',
    method: 'post',
    data
  })
}

// 回收站单个恢复督导
export function recoverUser(id) {
  return request({
    url: `/admittance/business/recycle/recoverUser/${id}`,
    method: 'delete'
  })
}

// 回收站批量恢复督导
export function recoverBathUser(data) {
  return request({
    url: '/admittance/business/recycle/recoverBathUser',
    method: 'delete',
    data
  })
}

// 回收站单个恢复课程
export function recoverCourse(id) {
  return request({
    url: `/admittance/business/recycle/recoverCourse/${id}`,
    method: 'delete'
  })
}

// 回收站批量恢复课程
export function recoverBathCourse(data) {
  return request({
    url: '/admittance/business/recycle/recoverBathCourse',
    method: 'delete',
    data
  })
}

// 分类统计图
export function statisticalData(query) {
  return request({
    url: '/admittance/business/classifiedStatistic/statisticalData',
    method: 'get',
    params: query
  })
}

// 自定义统计列表框
export function listBox(query) {
  return request({
    url: '/admittance/business/customStatistics/listBox',
    method: 'get',
    params: query
  })
}

// 自定义统计扇形数据
export function statisticalDatah(data) {
  return request({
    url: '/admittance/business/customStatistics/statisticalData',
    method: 'post',
    data
  })
}

// 自定义统计列表数据
export function categoryDistributionDetails(page, size) {
  return request({
    url: `/admittance/business/customStatistics/customDistributionDetails/${page}/${size}`,
    method: 'get'
  })
}

// 培训统计
export function statisticalDatat(data) {
  return request({
    url: '/admittance/business/trainingStatistics/statisticalData',
    method: 'post',
    data
  })
}

// 用户角色
export function thirdLogin(query) {
  return request({
    url: '/login/sysSumUser/thirdLogin',
    method: 'get',
    params: query
  })
}

// 年龄详情列表
export function ageReleaseDistributionDetails(page, size) {
  return request({
    url: `/admittance/business/classifiedStatistic/ageReleaseDistributionDetails/${page}/${size}`,
    method: 'get'
  })
}

// 职称详情列表
export function postTitleDistributionDetails(page, size) {
  return request({
    url: `/admittance/business/classifiedStatistic/postTitleDistributionDetails/${page}/${size}`,
    method: 'get'
  })
}

// 学历详情列表
export function educationDistributionDetails(page, size) {
  return request({
    url: `/admittance/business/classifiedStatistic/educationDistributionDetails/${page}/${size}`,
    method: 'get'
  })
}

// 学段详情列表
export function studyingDistributionDetails(page, size) {
  return request({
    url: `/admittance/business/classifiedStatistic/studyingDistributionDetails/${page}/${size}`,
    method: 'get'
  })
}

// 工作性质详情列表
export function jobNatureDistributionDetails(page, size) {
  return request({
    url: `/admittance/business/classifiedStatistic/jobNatureDistributionDetails/${page}/${size}`,
    method: 'get'
  })
}

// 督学类别详情列表
export function categoryDistributionDetailst(page, size) {
  return request({
    url: `/admittance/business/classifiedStatistic/categoryDistributionDetails/${page}/${size}`,
    method: 'get'
  })
}
