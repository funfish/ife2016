import 'babel-polyfill'
import React, { Component } from 'react'
import { Provider } from 'react-redux'
import { Router } from 'react-router'
import createBrowserHistory from 'history/lib/createBrowserHistory'
import configureStore from './store/configureStore'
import routes from './routes'

const store = configureStore()
console.log(store.getState())
export default class Root extends Component {
	render() {
		return (
			<Provider store={store}>
				<Router history={createBrowserHistory()} routes={routes} />
			</Provider>
		)
	}
}