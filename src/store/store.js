// 存储入口
import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunk from 'redux-thunk'
import indexReducer from './index'
import userReducer from './user'
import axios from 'axios'

const reducer = combineReducers({
  index: indexReducer,
  user: userReducer,
})

// 创建服务端axios
const serverAxios = axios.create({
  baseURL: '/'
})
// 创建客户端axios
const clientAxios = axios.create({
  baseURL: 'http://localhost:8888/'
})

// 创建store
// const store = createStore(reducer, applyMiddleware(thunk))

// export default store

export const getServerStore = () => {
  // 注入axios变量
  return createStore(reducer, applyMiddleware(thunk.withExtraArgument(serverAxios)))
}

export const getClientStore = () => {
  // 通过window.__context获取数据
  // 浏览器
  // 注入axios变量
  const defaultStore = window.__context ? window.__context : {}
  return createStore(reducer, defaultStore, applyMiddleware(thunk.withExtraArgument(clientAxios)))
}
