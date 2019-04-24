import React from 'react';
import { Marker } from "react-google-maps"


const MapMarker = (props) => {
	return (
		<>
		{props.places && props.places.map((place, index) =>
			<Marker key={index} position={{ lat: place.venue.location.lat, lng: place.venue.location.lng }} />
		)}
		</>
	);
}

export default MapMarker;
