import React from "react"
import { compose, withProps } from "recompose"
import { withScriptjs, withGoogleMap, GoogleMap } from "react-google-maps"
import MapMarkers from "./Map/MapMarkers";

const Map = compose(
	withProps({
		googleMapURL: "https://maps.googleapis.com/maps/api/js?v=3&key=AIzaSyB54QDkpQG5RFu_G1JQiHSWAghsKlYnDgg",
		loadingElement: <div style={{ height: `100%` }} />,
		containerElement: <div style={{ height: `100vh` }} />,
		mapElement: <div style={{ height: `100%` }} />,
	}),
	withScriptjs,
	withGoogleMap
)( props => (
	<GoogleMap
		defaultZoom={8}
		defaultCenter={{ lat: -10.3333333, lng: -53.2 }}
	>
		<MapMarkers places={props.places}/>

	</GoogleMap>

));

export default Map;