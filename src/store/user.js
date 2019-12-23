// 首页逻辑

// actionType
const GET_LIST = 'INDEX/USER_INFO'

// actionCreator
const changeUserInfo = data => ({
  type: GET_LIST,
  data
})


export const getUserInfo = server => {
  return (dispatch, getState, $axios) => {
    return $axios.get('/api/user/list').then(res => {
      const { data } = res.data
      dispatch(changeUserInfo(data))
    })
  }
}

const defaultState = {
  userInfo: {}
}

export default (state = defaultState, action) => {
  switch (action.type) {
    case GET_LIST:
      const newState = {
        ...state,
        userInfo: action.data
      }
      return newState
    default:
      return state
  }
}
