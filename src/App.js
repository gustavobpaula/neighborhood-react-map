import React, { useState, useEffect } from 'react';
import Map from "./Components/Map";
import Config from './Config';
import { CssBaseline, Grid } from '@material-ui/core';
import SideBar from './Components/SideBar';


const App = () => {

	const [listOfPlaces, setListOfPlaces] = useState([]);

	const [defaultPosition, setDefaultPosition] = useState({});


	useEffect( () => {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(handlePositionReceived);
		}
	}, []);

	const handlePositionReceived = ({coords}) => {
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

			if (data && data.response && data.response.groups) {
				setListOfPlaces(data.response.groups[0].items);
			}
		})();




	}, [defaultPosition]);

	return (
		<>
			{console.log('teste', listOfPlaces)}
			<CssBaseline />
			<Grid container spacing={0}>
				<Grid item xs={3}>
					<SideBar places={listOfPlaces} />
				</Grid>
				<Grid item xs={9}>
					<Map defaultPosition={defaultPosition} places={listOfPlaces} />
				</Grid>
			</Grid>
		</>
	);
}

export default App;
