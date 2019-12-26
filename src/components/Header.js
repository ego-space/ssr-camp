import React from 'react';
import { Link } from 'react-router-dom'

export default () => {
  return <div>
    <Link to="/">首页</Link>
    <span> | </span>
    <Link to="/about">关于</Link>
    <span> | </span>
    <Link to="/user">用户</Link>
    <span> | </span>
    <Link to="/login">登录</Link>
    <span> | </span>
    <Link to="/abcd">不存在</Link>
  </div>
}