import request from './request'

export const getLinks = (params) => request.get('/links', { params })
export const getLink = (id) => request.get(`/links/${id}`)
export const createLink = (data) => request.post('/links', data)
export const updateLink = (id, data) => request.put(`/links/${id}`, data)
export const deleteLink = (id) => request.delete(`/links/${id}`)
