import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Main from './components/Main';
import Dashboard from './components/Dashboard';
import Register from './components/Dashboard/Register';

export default function App() {
	return (
		<div>
			<BrowserRouter>
				<Switch>
					<Route path="/" exact component={Main} />
					<Route path="/dashboard" component={Dashboard} />
					<Route path="/register" exact component={Register} />
					<Route path="/register/:id" component={Register} />
				</Switch>
			</BrowserRouter>
		</div>
	);
}
