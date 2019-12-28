import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { getIndexList } from '../store/index'
import styles from './Index.css'

function Index(props) {
  if (props.staticContext) {
    props.staticContext.css.push(styles._getCss())
  }
  const [count, setCount] = useState(1)
  useEffect(() => {
    if (!props.list.length) {
      // 判断数据是否存在
      props.getIndexList()
    }
  }, [])
  return <div>
    <h1 className={styles.title}>首页</h1>
    <div>{count}</div>
    <button onClick={() => setCount(count + 1)}>累加</button>
    <ul>
      {
        props.list.map(item => {
          return <li key={item.id}>{item.name}</li>
        })
      }
    </ul>
  </div>
}
// 注入方法
Index.loadData = (store) => {
  return store.dispatch(getIndexList())
}
export default connect(
  state => ({list: state.index.list}),
  {getIndexList}
)(Index)