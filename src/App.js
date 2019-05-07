import React from 'react';
import { Route, Switch } from 'react-router-dom';
import ListPlaces from './pages/ListPlaces';
import Page404 from './pages/Page404';
import Page500 from './pages/Page500';


const App = () => {

	return (
		<Switch>
			<Route exact path='/' component={ListPlaces} />
			<Route exact path='/500' component={Page500} />
			<Route component={Page404} />
		</Switch>
	);
}

export default App;
