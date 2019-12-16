import React from 'react'
import { connect } from 'react-redux'
import { getUserInfo } from '../store/user'

function User(props) {
  return <div>
    <h1>
      Hello Word!!! My name is {props.userInfo.name}
    </h1>
  </div>
}
// 注入方法
User.loadData = (store) => {
  return store.dispatch(getUserInfo())
}
export default connect(
  state => ({ userInfo: state.user.userInfo }),
  // { getUserInfo }
)(User)
