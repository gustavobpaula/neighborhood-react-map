import React, { useState, useEffect } from 'react';
import Map from "./Components/Map";
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Config from './Config';


const App = () => {

	const [listOfPlaces, setListOfPlaces] = useState([]);

	const [defaultPosition, setDefaultPosition] = useState({});

	useEffect( () => {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(handlePositionReceived);
		}
	}, []);

	function handlePositionReceived({coords}) {
		const {latitude, longitude} = coords;

		setDefaultPosition({latitude, longitude});
	}

	useEffect(() => {

		if (!defaultPosition.latitude) {
			return;
		}

		(async () => {

			const position = `${defaultPosition.latitude},${defaultPosition.longitude}`;

			const response = await fetch(`https://api.foursquare.com/v2/venues/explore
			?client_id=${Config.Foursquare.clientId}
			&client_secret=${Config.Foursquare.clientSecret}
			&v=${Config.Foursquare.version}
			&limit=20
			&ll=${position}
			&section=food
			`);

			const data = await response.json();

			setListOfPlaces(data.response.groups[0].items);
		})();




	}, [defaultPosition]);

	return (
		<>
			{console.log('teste', listOfPlaces)}
			<CssBaseline />
			<Grid container spacing={0}>
				<Grid item xs={3}>
					<Paper className='teste'><h1>Sidebar</h1></Paper>
				</Grid>
				<Grid item xs={9}>
					{defaultPosition.latitude &&
						<Map defaultPosition={defaultPosition} places={listOfPlaces}></Map>
					}

				</Grid>
			</Grid>
		</>
	);
}

export default App;
