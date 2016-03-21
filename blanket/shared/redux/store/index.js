import { createStore, combineReducers, applyMiddleware } from 'redux'
import { browserHistory, hashHistory, createMemoryHistory } from 'react-router'
import { syncHistory, routeReducer } from 'react-router-redux'
import reducers from '../reducers'
import thunk from 'redux-thunk'

const reducer = combineReducers(Object.assign({}, reducers, {
  routing: routeReducer
}))

const reduxRouter = syncHistory(browserHistory)

var middlewares = [reduxRouter, thunk]

if(NODE_ENV === 'development') {
  const createLogger = require('redux-logger')
  middlewares.push(createLogger())
}

const createStoreWithMiddleware = applyMiddleware(...middlewares)(createStore)

const store = createStoreWithMiddleware(reducer)

reduxRouter.listenForReplays(store)

export default store
