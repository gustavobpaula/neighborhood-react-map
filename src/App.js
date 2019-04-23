import React, { useState } from 'react';
import Map from "./Components/Map";
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';


const App = () => {

	const [listOfPlaces, setListOfPlaces] = useState([
		{ lat: -23.5506507, lng: -46.6333824},
		{ lat: -22.9110137, lng: -43.2093727},
		{ lat: -27.5973002, lng: -48.5496098}
	])

	return (
		<>
			<CssBaseline />
			<Grid container spacing={0}>
				<Grid item xs={3}>
					<Paper className='teste'><h1>Sidebar</h1></Paper>
				</Grid>
				<Grid item xs={9}>
					<Map places={listOfPlaces}></Map>
				</Grid>
			</Grid>
		</>
	);
}

export default App;
