import React, { useState, useEffect } from 'react';
import Map from "../Components/Map";
import Config from '../Config';
import { CssBaseline, Grid, Snackbar, IconButton } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import SideBar from '../Components/SideBar';
import sortBy from 'sort-by';


const ListPlaces = (props) => {

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

	const handleListItemClick = (index) => {
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
		<>
			<CssBaseline />
			<Grid container spacing={0}>
				<Grid item xs={3}>
					<SideBar
						searchTerm={searchTerm}
						filterPlaces={filterPlaces}
						places={filteredPlaces}
						infoWindowControls={infoWindowControls}
						sideBarControls={sideBarControls}
					/>
				</Grid>
				<Grid item xs={9}>
					<Map
						defaultPosition={defaultPosition}
						places={filteredPlaces}
						infoWindowControls={infoWindowControls}
						sideBarControls={sideBarControls}
					/>
				</Grid>
			</Grid>
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
		</>
	);
}

export default ListPlaces;
