import React, { useState } from 'react'
import { Route } from 'react-router-dom'
import Index from './container/Index';
import About from './container/About';
import User from './container/user';
import Notfound from './container/Notfound'
import Login from './container/Login';
import './App.css'

// export default (
//   <div>
//     <Route path='/' exact component={Index}></Route>
//     <Route path='/about' exact component={About}></Route>
//   </div>
// )

// 配置路由
export default [
  {
    path: '/',
    component: Index,
    exact: true,
    key: 'index'
  },
  {
    path: '/about',
    component: About,
    exact: true,
    key: 'about'
  },
  {
    path: '/user',
    component: User,
    exact: true,
    key: 'user'
  },
  {
    path: '/login',
    component: Login,
    exact: true,
    key: 'login'
  },
  {
    component: Notfound,
    key: 'notFound'
  }
]
