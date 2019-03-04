import axios from '@/utils/request'

export function getListBankTree(params) {
  return axios({
    url: '/fundbank/listBankTree',
    method: 'get',
    params
  })
}

export function getListBankTable(params) {
  return axios({
    url: '/fundbank/listBankTable',
    method: 'get',
    params
  })
}

export function addOrupdate(params) {
  return axios({
    url: '/fundbank/addOrupdate',
    method: 'post',
    params
  })
}

export function getBank(params) {
  return axios({
    url: '/fundbank/getBank',
    method: 'get',
    params
  })
}

export function deleteById(params) {
  return axios({
    url: '/fundbank/delete',
    method: 'post',
    params
  })
}