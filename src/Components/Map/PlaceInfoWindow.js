import React, { useState, useEffect } from 'react';
import { InfoWindow } from "react-google-maps";
import Config from "../../Config";
import { Card, CardActionArea, CardMedia, withStyles, CardContent, Typography } from '@material-ui/core';



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
	const [photo, setPhoto] = useState([]);

	useEffect(() => {

		(async () => {

			const response = await fetch(`https://api.foursquare.com/v2/venues/${props.place.venue.id}
				?client_id=${Config.Foursquare.clientId}
				&client_secret=${Config.Foursquare.clientSecret}
				&v=${Config.Foursquare.version}
			`);
			const data = await response.json();

			console.log('place', props.place);
			console.log('data', data);

			if(data && data.response && data.response.venue) {
				setPhoto(data.response.venue.bestPhoto);
			}
		})();

	},[])

	return (
		<InfoWindow onCloseClick={props.closeInfoWindow}>
			<Card className={classes.card}>
				<CardActionArea>
					{photo.prefix && (
						<CardMedia className={classes.media} image={`${photo.prefix}345x200${photo.suffix}`}
						title="teste"
						/>
					)}
					<CardContent>
						<Typography gutterBottom variant="h5" component="h2">
							{props.place.venue.name}
						</Typography>
						<Typography component="p">
							{props.place.venue.location.formattedAddress.map((item, index) => {
								return props.place.venue.location.formattedAddress.length === index + 1 ?
									<span key={index}>{item}</span>
								:
									<span key={index}>{item} - </span>;

							})}
						</Typography>
					</CardContent>
				</CardActionArea>
			</Card>
		</InfoWindow>
		);
	}

	export default withStyles(styles)(PlaceInfoWindow);
