import request from './request'

export const getCompanyList = () => request.get('/company')
export const getCompany = (id) => request.get(`/company/${id}`)
export const createCompany = (data) => request.post('/company', data)
export const updateCompany = (id, data) => request.put(`/company/${id}`, data)
export const deleteCompany = (id) => request.delete(`/company/${id}`)
