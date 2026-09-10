import request from './request'

export const getJobs = (params) => request.get('/jobs', { params })
export const getJob = (id) => request.get(`/jobs/${id}`)
export const createJob = (data) => request.post('/jobs', data)
export const updateJob = (id, data) => request.put(`/jobs/${id}`, data)
export const deleteJob = (id) => request.delete(`/jobs/${id}`)
