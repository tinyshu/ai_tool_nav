import request from './request'

export const getNewsList = (params) => request.get('/news', { params })
export const getNews = (id) => request.get(`/news/${id}`)
export const createNews = (data) => request.post('/news', data)
export const updateNews = (id, data) => request.put(`/news/${id}`, data)
export const deleteNews = (id) => request.delete(`/news/${id}`)
