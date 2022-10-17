import request from '@/utils/request'

// 督学列表
export function apiSuperintendentList(data) {
  return request({
    url: '/admittance/business/superintendentList/superintendentList',
    method: 'post',
    data
  })
}
