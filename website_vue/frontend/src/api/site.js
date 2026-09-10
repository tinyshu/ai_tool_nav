import request from './request'

export const getSettings = () => request.get('/site')
export const updateSettings = (data) => request.put('/site', data)
