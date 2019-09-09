/**
 * token操作
 */

const tokenKey = 'token'

const local = window.localStorage

export const getToken = () => local.getItem(tokenKey)

export const setToken = token => local.setItem(tokenKey, token)

export const removeToken = () => local.removeItem(tokenKey)
