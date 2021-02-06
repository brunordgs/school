import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from './pages/home';
import Dashboard from './pages/dashboard';
import Register from './pages/dashboard/register';

export default function App() {
	return (
		<div>
			<BrowserRouter>
				<Switch>
					<Route path="/" exact component={Home} />
					<Route path="/dashboard" component={Dashboard} />
					<Route path="/register" exact component={Register} />
					<Route path="/register/:id" component={Register} />
				</Switch>
			</BrowserRouter>
		</div>
	);
}
