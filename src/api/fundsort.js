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

export function getSort(params) {
  return axios({
    url: '/fundsort/getSort',
    method: 'get',
    params
  })
}

export function addOrupdate(params) {
  return axios({
    url: '/fundsort/addOrupdate',
    method: 'post',
    params
  })
}

export function deleteById(params) {
  return axios({
    url: '/fundsort/delete',
    method: 'post',
    params
  })
}