import axios from '@/utils/request'

export function getListSortTree(params) {
  return axios({
    url: '/fundsort/listSortTree',
    method: 'get',
    params
  })
}

export function getListSortTable(params) {
  return axios({
    url: '/fundsort/listSortTable',
    method: 'get',
    params
  })
}