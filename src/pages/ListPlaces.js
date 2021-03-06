import React, { useState, useEffect } from 'react';
import Map from "../Components/Map";
import Config from '../utils/Config';
import { CssBaseline, Snackbar, IconButton, withStyles, AppBar, Toolbar, Typography } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import CloseIcon from '@material-ui/icons/Close';
import SideBar from '../Components/SideBar';
import sortBy from 'sort-by';
import styles from "../utils/materialStyle";


const ListPlaces = (props) => {

	const { classes } = props;

	/**
	 * Create States
	 */
	const [mobileOpen, setMobileOpen] = useState(false);
	const [infoWindowIsOpen, setInfoWindowIsOpen] = useState([]);
	const [selectedItem, setSelectedItem] = useState([]);
	const [defaultPosition, setDefaultPosition] = useState({});
	const [listOfPlaces, setListOfPlaces] = useState([]);
	const [filteredPlaces, setFilteredPlaces] = useState([]);
	const [searchTerm, setSearchTerm] = useState([]);
	const [openSnackBar, setOpenSnackBar] = useState(false);

	/**
	 * Open InfoWindow
	 *
	 * @param {Number} index index of place
	 */
	const openInfoWindow = index => setInfoWindowIsOpen(index);

	/**
	 * Close InfoWindow
	 */
	const closeInfoWindow = () => setInfoWindowIsOpen([]);

	/**
	 * Create object of InfoWindow Controls
	 */
	const infoWindowControls = {
		infoWindowIsOpen,
		setInfoWindowIsOpen,
		openInfoWindow,
		closeInfoWindow
	}

	/**
	 * Handles list item when clicked
	 *
	 * @param {Number} index index of place
	 */
	const handleListItemClick = (index) => {
		setSelectedItem(index);
		openInfoWindow(index);
	};

	/**
	 * Handles drawer when toggle
	 */
	const handleDrawerToggle = () => {
		setMobileOpen(!mobileOpen);
	}

	/**
	 * Handles drawer when close
	 */
	const handleDrawerClose = () => {
		setMobileOpen(false);
	}

	/**
	 * Create object of SideBar Controls
	 */
	const sideBarControls = {
		selectedItem,
		handleListItemClick,
		handleDrawerToggle,
		handleDrawerClose
	}

	/**
	 * Handles position received from request
	 *
	 * @param {Object} param0 Object of coords
	 */
	const handlePositionReceived = ({ coords }) => {
		const { latitude, longitude } = coords;

		setDefaultPosition({ latitude, longitude });
	}

	/**
	 * Get current position when component render
	 */
	useEffect( () => {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(handlePositionReceived);
		}
	}, []);

	/**
	 * Get recomendations from foursquare api
	 * and set places when position change
	 */
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
			`).catch(() => {
				props.history.push(`/500`);
			});

			const data = await response.json();

			if (data && data.response && data.response.groups) {
				setListOfPlaces(data.response.groups[0].items);
				setFilteredPlaces(data.response.groups[0].items);
			}else {
				props.history.push(`/500`);
			}
		})();


	}, [defaultPosition]);

	/**
	 * Filter places when input search change
	 *
	 * @param {Object} event input object event
	 */
	const filterPlaces = event => {


		const term = event.target.value.toLowerCase();

		setSearchTerm(term);

		const newPlaces = listOfPlaces.filter(place => place.venue.name.toLowerCase().includes(term) || place.venue.categories[0].shortName.toLowerCase().includes(term) );

		setFilteredPlaces(newPlaces.sort(sortBy('venue.name')));

		if (newPlaces.length === 0) {
			setOpenSnackBar(true);
		}
	};

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
						Mapa do Bairro
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
			/>

			<main className={classes.content}>
				<Map
					defaultPosition={defaultPosition}
					places={filteredPlaces}
					infoWindowControls={infoWindowControls}
					sideBarControls={sideBarControls}
					history={props.history}
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
