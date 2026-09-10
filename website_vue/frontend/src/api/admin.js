import request from './request'

export const getAdmins = (params) => request.get('/admin', { params })
export const getAdmin = (id) => request.get(`/admin/${id}`)
export const createAdmin = (data) => request.post('/admin', data)
export const updateAdmin = (id, data) => request.put(`/admin/${id}`, data)
export const deleteAdmin = (id) => request.delete(`/admin/${id}`)
