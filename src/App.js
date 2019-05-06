import React from 'react';
import { Route, Switch } from 'react-router-dom';
import ListPlaces from './pages/ListPlaces';
import Page404 from './pages/Page404';


const App = () => {

	return (
		<Switch>
			<Route exact path='/' component={ListPlaces} />
			<Route component={Page404} />
		</Switch>
	);
}

export default App;
