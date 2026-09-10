import request from './request'

export const getProductCategories = () => request.get('/product-categories')
export const getProductCategory = (id) => request.get(`/product-categories/${id}`)
export const createProductCategory = (data) => request.post('/product-categories', data)
export const updateProductCategory = (id, data) => request.put(`/product-categories/${id}`, data)
export const deleteProductCategory = (id) => request.delete(`/product-categories/${id}`)
