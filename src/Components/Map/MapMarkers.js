import React from 'react';
import { Marker } from "react-google-maps"


const MapMarker = (props) => {
	return (
		<>
		{props.places && props.places.map((place, index) =>
			<Marker key={index} position={{ lat: place.lat, lng: place.lng }} />
		)}
		</>
	);
}

export default MapMarker;
