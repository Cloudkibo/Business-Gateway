/**
 * Created by sojharo on 20/07/2017.
 */

import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { Router, browserHistory } from 'react-router'

import { configureStore } from './redux/store/store'
import routes from './routes'
import { initiateSocket } from './utility/socketio'

import {setBrowserName, setBrowserVersion} from './redux/actions/basicinfo.actions'
import {BROWSER_NAME, BROWSER_VERSION} from './utility/browser.utility'

const history = browserHistory

const store = configureStore(window.__INITIAL_STATE__)
const rootElement = document.getElementById('content')

store.dispatch(setBrowserName(BROWSER_NAME))
store.dispatch(setBrowserVersion(BROWSER_VERSION))

initiateSocket(store)

console.log(store.getState())

ReactDOM.render((
  <Provider store={store}>
    <Router history={history} routes={routes} />
  </Provider>
), rootElement)
