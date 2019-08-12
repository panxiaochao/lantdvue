import axios from '@/utils/request'

export function getListBankTree(params) {
  return axios({
    url: '/fundbank/listBankTree',
    method: 'get',
    params
  })
}

export function getListSalaryTable(params) {
  return axios({
    url: '/fundsalary/list',
    method: 'get',
    params
  })
}

export function addOrupdate(params) {
  return axios({
    url: '/fundsalary/addOrupdate',
    method: 'post',
    params
  })
}

export function deleteById(params) {
  return axios({
    url: '/fundsalary/delete',
    method: 'post',
    params
  })
}

export function getSalarySortTree(params) {
  return axios({
    url: '/fundsort/getSalarySortTree',
    method: 'get',
    params
  })
}

export function getSortGroupBy(params) {
  return axios({
    url: '/fundsalary/selectSortGroupBy',
    method: 'get',
    params
  })
}