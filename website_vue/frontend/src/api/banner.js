import request from './request'

export const getBanners = (params) => request.get('/banners', { params })
export const getBanner = (id) => request.get(`/banners/${id}`)
export const createBanner = (data) => request.post('/banners', data)
export const updateBanner = (id, data) => request.put(`/banners/${id}`, data)
export const deleteBanner = (id) => request.delete(`/banners/${id}`)
