import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, browserHistory } from "react-router";
import { syncHistoryWithStore } from "react-router-redux";
import configureStore from './src/store/configureStore';
import Home from './src/containers/Home/Home'

const store = configureStore();
const history = syncHistoryWithStore(browserHistory, store);

render(
	<Provider store={store}>
		<Router history={history}>
			<Route path="/" component={Home}>
			</Route>
		</Router>
	</Provider>,
	document.getElementById('root')
)