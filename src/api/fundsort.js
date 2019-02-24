import axios from '@/utils/request'

export function getListSortTree(params) {
  return axios({
    url: '/fundsort/listSortTree',
    method: 'get',
    params
  })
}