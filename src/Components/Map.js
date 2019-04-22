import React from "react"
import { compose, withProps } from "recompose"
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"

const Map = compose(
	withProps({
		googleMapURL: "https://maps.googleapis.com/maps/api/js?v=3&key=AIzaSyB54QDkpQG5RFu_G1JQiHSWAghsKlYnDgg&callback=initMap",
		loadingElement: <div style={{ height: `100%` }} />,
		containerElement: <div style={{ height: `100vh` }} />,
		mapElement: <div style={{ height: `100%` }} />,
	}),
	withScriptjs,
	withGoogleMap
)( props => (
	<GoogleMap
		defaultZoom={8}
		defaultCenter={{ lat: -34.397, lng: 150.644 }}
	>
		<Marker position={{ lat: -34.397, lng: 150.644 }} onClick={props.onMarkerClick} />
	</GoogleMap>
));

export default Map;