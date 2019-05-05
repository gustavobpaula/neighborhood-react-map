import React from 'react';
import { Marker } from "react-google-maps"
import PlaceInfoWindow from './PlaceInfoWindow';


const MapMarker = (props) => {

	return (
		<>
			{props.places && props.places.map((place, index) =>
				<Marker key={index} onClick={() => {
					props.infoWindowControls.openInfoWindow(index);
					props.sideBarControls.handleListItemClick(index);
				} } position={ { lat: place.venue.location.lat, lng: place.venue.location.lng } }>
					{props.infoWindowControls.infoWindowIsOpen === index && <PlaceInfoWindow closeInfoWindow={props.infoWindowControls.closeInfoWindow} place={place} />}
				</Marker>
			)}
		</>
	);
}

export default MapMarker;
