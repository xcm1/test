import request from '@/utils/request'

// 首页统计一些数据 管理 今年新注册督学 现有督学
export function apiGetHomeStatisticData(query) {
  return request({
    url: '/admittance/business/home/statisticData',
    method: 'get',
    params: query
  })
}

// 通过用户编号查询用户首页的重要信息 复检时间，我的总学时
export function apiGetHomeBasicByUserId(query) {
  return request({
    url: '/admittance/business/home/selectHomeBasicByUserId',
    method: 'get',
    params: query
  })
}

// 查询用户去年以及今年每一个月新增的用户数
export function apiUserCreateYearMonthStatistic(query) {
  return request({
    url: '/admittance/business/home/selectUserCreateYearMonthStatistic',
    method: 'get',
    params: query
  })
}

// 通过用户编号分页查询培训课程8管理
export function apiDxPxkcPageAdministrationById(data) {
  return request({
    url: '/admittance/business/home/selectDxPxkcPageAdministrationById',
    method: 'post',
    data
  })
}

// 通过用户编号分页查询培训课程8普通
export function apiDxPxkcPageCommonById(data) {
  return request({
    url: '/admittance/business/home/selectDxPxkcPageCommonById',
    method: 'post',
    data
  })
}

