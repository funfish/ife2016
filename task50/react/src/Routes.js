import React from 'react'
import { Route, IndexRoute } from 'react-router'
import QN from './containers/Q'
import home from './component/home'
import Edit from './component/edit'


export default (
	<Route path="/" component={QN}>
		<IndexRoute component={home} />
		<Route path="edit/:id" component={Edit}/>
	</Route>
)