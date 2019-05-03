import React, { useState, useEffect } from 'react';
import { InfoWindow } from "react-google-maps";
import Config from "../../Config";
import { Card, CardActionArea, CardMedia, withStyles } from '@material-ui/core';



const styles = {
	card: {
		maxWidth: 345,
	},
	media: {
		width: 345,
		height: 200,
	},
};


const PlaceInfoWindow = (props) => {

	const { classes } = props;
	const [photos, setPhotos] = useState([]);

	useEffect(() => {

		(async () => {

			const response = await fetch(`https://api.foursquare.com/v2/venues/${props.place.venue.id}/photos
			?client_id=${Config.Foursquare.clientId}
			&client_secret=${Config.Foursquare.clientSecret}
			&v=${Config.Foursquare.version}
			`);
			const data = await response.json();

			if(data && data.response && data.response.photos) {
				setPhotos(data.response.photos);
			}
		})();

	},[])

	return (
		<>
		{photos.items && console.log('photos', `${photos.items[0].prefix}345x200${photos.items[0].suffix}`)}
		<InfoWindow onCloseClick={props.closeInfoWindow}>
		<Card className={classes.card}>
		<CardActionArea>
		<CardMedia className={classes.media} image={photos.items && `${photos.items[0].prefix}345x200${photos.items[0].suffix}`}
		title="teste"
		/>
		</CardActionArea>
		</Card>

		</InfoWindow>
		</>
		);
	}

	export default withStyles(styles)(PlaceInfoWindow);
