import React, { useState } from 'react';
import { Marker } from "react-google-maps"
import PlaceInfoWindow from './PlaceInfoWindow';


const MapMarker = (props) => {

	const [infoWindowIsOpen, setInfoWindowIsOpen] = useState([]);

	const openInfoWindow = markerIndex => setInfoWindowIsOpen(markerIndex);
	const closeInfoWindow = () => 	setInfoWindowIsOpen([]);


	return (
		<>
		{props.places && props.places.map((place, index) =>
			<Marker key={index} onClick={() => openInfoWindow(index) } position={ { lat: place.venue.location.lat, lng: place.venue.location.lng } }>
				{infoWindowIsOpen === index && <PlaceInfoWindow closeInfoWindow={closeInfoWindow} place={place} />}
			</Marker>
		)}
		</>
	);
}

export default MapMarker;
