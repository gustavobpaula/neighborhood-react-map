import React, { useState, useEffect } from 'react';
import Map from "../Components/Map";
import Config from '../Config';
import { CssBaseline, Snackbar, IconButton, withStyles, AppBar, Toolbar, Typography } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import CloseIcon from '@material-ui/icons/Close';
import SideBar from '../Components/SideBar';
import sortBy from 'sort-by';
import styles from "../style";


const ListPlaces = (props) => {

	const { classes } = props;

	const [mobileOpen, setMobileOpen] = useState(false);
	const handleDrawerToggle = () => {
		setMobileOpen(!mobileOpen);
	}

	const [infoWindowIsOpen, setInfoWindowIsOpen] = useState([]);

	const openInfoWindow = index => setInfoWindowIsOpen(index);
	const closeInfoWindow = () => setInfoWindowIsOpen([]);

	const infoWindowControls = {
		infoWindowIsOpen,
		setInfoWindowIsOpen,
		openInfoWindow,
		closeInfoWindow
	}

	const [selectedItem, setSelectedItem] = useState([]);

	const handleListItemClick = (index, place) => {
		console.log('place', place);
		handleDrawerToggle();
		setSelectedItem(index);
		openInfoWindow(index);
	};

	const sideBarControls = {
		selectedItem,
		handleListItemClick
	}

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

	const [listOfPlaces, setListOfPlaces] = useState([]);
	const [filteredPlaces, setFilteredPlaces] = useState([]);
	const [searchTerm, setSearchTerm] = useState([]);

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
				&limit=50
				&ll=${position}
				&section=food
			`);

			const data = await response.json();

			if (data && data.response && data.response.groups) {
				setListOfPlaces(data.response.groups[0].items);
				setFilteredPlaces(data.response.groups[0].items);
			}else {
				props.history.push(`/404`);
			}
		})();


	}, [defaultPosition]);


	const filterPlaces = event => {


		const term = event.target.value.toLowerCase();

		setSearchTerm(term);

		const newPlaces = listOfPlaces.filter(place => place.venue.name.toLowerCase().includes(term) || place.venue.categories[0].shortName.toLowerCase().includes(term) );

		setFilteredPlaces(newPlaces.sort(sortBy('venue.name')));

		if (newPlaces.length === 0) {
			setOpenSnackBar(true);
		}
	};

	const [openSnackBar, setOpenSnackBar] = useState(false);

	return (
		<div className={classes.root}>
			<CssBaseline />

			<AppBar position="fixed" className={classes.appBar}>
				<Toolbar>
					<IconButton
						color="inherit"
						aria-label="Open drawer"
						onClick={handleDrawerToggle}
						className={classes.menuButton}
					>
						<MenuIcon />
					</IconButton>
					<Typography variant="h6" color="inherit" noWrap>
						Responsive drawer
					</Typography>
				</Toolbar>
			</AppBar>

			<SideBar
				searchTerm={searchTerm}
				filterPlaces={filterPlaces}
				places={filteredPlaces}
				infoWindowControls={infoWindowControls}
				sideBarControls={sideBarControls}
				mobileOpen={mobileOpen}
				handleDrawerToggle={handleDrawerToggle}
			/>

			<main className={classes.content}>
				<Map
					defaultPosition={defaultPosition}
					places={filteredPlaces}
					infoWindowControls={infoWindowControls}
					sideBarControls={sideBarControls}
				/>
			</main>

			<Snackbar
				anchorOrigin={{
					vertical: 'top',
					horizontal: 'left',
				}}
				open={openSnackBar}
				autoHideDuration={6000}
				onClose={() => setOpenSnackBar(false)}
				ContentProps={{
					'aria-describedby': 'message-id',
				}}
				message={<span id="message-id">Busca não encontrada</span>}
				action={[
					<IconButton
						key="close"
						aria-label="Close"
						color="inherit"
						onClick={() => setOpenSnackBar(false)}
					>
						<CloseIcon />
					</IconButton>
				]}
			/>
		</div>
	);
}

export default withStyles(styles, { withTheme: true })(ListPlaces);
