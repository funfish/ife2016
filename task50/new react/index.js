import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, browserHistory } from "react-router";
import { syncHistoryWithStore } from "react-router-redux";
import configureStore from './src/store/configureStore';

const store = configureStore();
const history = syncHistoryWithStore(browserHistory, store);

render(
	<Provider store={store}>
		<Router history={history}>
			<Route path="/" component={}>
				<IndexRoute component={} />
				<Route path="edit/:id" component={Edit}/>	
			</Route>
		</Router>
	</Provider>,
	document.getElementById('root')
)