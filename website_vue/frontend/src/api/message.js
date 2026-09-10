import request from './request'

export const getMessages = (params) => request.get('/messages', { params })
export const createMessage = (data) => request.post('/messages', data)
export const replyMessage = (id, data) => request.put(`/messages/${id}`, data)
export const deleteMessage = (id) => request.delete(`/messages/${id}`)
