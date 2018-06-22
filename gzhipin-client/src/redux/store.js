/*
* redux核心管理对象：store
* */

import {createStore,applyMiddleware} from 'redux'
//默认暴露不需要加大括号
import reducers from './reducers'
import thunk from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'

export default createStore(reducers,composeWithDevTools(applyMiddleware(thunk)))