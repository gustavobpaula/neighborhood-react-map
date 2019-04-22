import React from 'react';
import Map from "./Components/Map";
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';


const App = () => {
	return (
		<>
			<CssBaseline />
			<Grid container spacing={0}>
				<Grid item xs={3}>
					<Paper className='teste'><h1>Sidebar</h1></Paper>
				</Grid>
				<Grid item xs={9}>
					<Map></Map>
				</Grid>
			</Grid>
		</>
	);
}

export default App;
