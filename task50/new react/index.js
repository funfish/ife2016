import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, browserHistory } from "react-router";
import configureStore from './src/store/configureStore';
import Home from './src/containers/Home/Home';
import Main from './src/containers/Main/Main';
import Edit from './src/containers/Edit/Edit'

const store = configureStore();

render(
	<Provider store={store}>
		<Router history={browserHistory}>
			<Route path="/" component={Home}>
				<IndexRoute component={Main} />
				<Route path="edit" component={Edit} />
			</Route>
		</Router>
	</Provider>,
	document.getElementById('root')
)