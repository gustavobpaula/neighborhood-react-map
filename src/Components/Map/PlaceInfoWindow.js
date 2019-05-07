import React, { useState, useEffect } from 'react';
import { InfoWindow } from "react-google-maps";
import Config from "../../utils/Config";
import { Card, CardActionArea, CardMedia, withStyles, CardContent, Typography, CardActions, Button } from '@material-ui/core';
import styles from "../../utils/materialStyle";


const PlaceInfoWindow = (props) => {

	const { classes } = props;
	const [details, setDetails] = useState([]);

	useEffect(() => {

		(async () => {

			const response = await fetch(`https://api.foursquare.com/v2/venues/${props.place.venue.id}
				?client_id=${Config.Foursquare.clientId}
				&client_secret=${Config.Foursquare.clientSecret}
				&v=${Config.Foursquare.version}
			`);
			const data = await response.json();

			if(data && data.response && data.response.venue) {
				setDetails(data.response.venue);
			}
		})();

	},[])

	return (
		<InfoWindow onCloseClick={props.closeInfoWindow}>
			<Card className={classes.card}>
				<CardActionArea href={details.url || details.canonicalUrl || '#'}>
					{details.bestPhoto && (
						<CardMedia
							className={classes.media}
							image={`${details.bestPhoto.prefix}345x200${details.bestPhoto.suffix}`}
							title={props.place.venue.name}
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
						{details.hours && (
							<Typography component="p">
								<br />
								{details.hours.status}
							</Typography>
						)}

					</CardContent>
				</CardActionArea>

				{details.contact && (
					<CardActions>
						{details.contact.facebook && (
							<Button size="small" color="primary" href={`https://www.facebook.com/${details.contact.facebook}`} target="_blank">
								Facebook
							</Button>
						)}
						{details.contact.instagram && (
							<Button size="small" color="primary" href={`https://www.instagram.com/${details.contact.instagram}`} target="_blank">
								Instagram
							</Button>
						)}
						{details.contact.formattedPhone && (
							<Button size="small" color="primary" href={`tel:${details.contact.phone}`} target="_blank" >
								{details.contact.formattedPhone}
							</Button>
						)}
					</CardActions>
				)}
			</Card>
		</InfoWindow>
		);
	}

	export default withStyles(styles)(PlaceInfoWindow);
