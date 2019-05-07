import React from "react"
import { compose, withProps } from "recompose"
import { withScriptjs, withGoogleMap, GoogleMap } from "react-google-maps"
import MapMarkers from "./Map/MapMarkers";
import mapStyle from "../utils/mapStyle";

const Map = compose(
	withProps({
		googleMapURL: "https://maps.googleapis.com/maps/api/js?v=3&key=AIzaSyB54QDkpQG5RFu_G1JQiHSWAghsKlYnDgg",
		loadingElement: <div style={{ height: '100%' }} />,
		containerElement: <div style={{
			height: 'calc(100vh - 64px)',
			marginTop: '64px'
		}} />,
		mapElement: <div style={{ height: '100%' }} />,
	}),
	withScriptjs,
	withGoogleMap
)( props => (
	props.defaultPosition.latitude ?
		<GoogleMap
			defaultZoom={14}
			defaultOptions={{ styles: mapStyle }}
			center={{
				lat: props.defaultPosition.latitude,
				lng: props.defaultPosition.longitude
			}}
		>
			<MapMarkers places={props.places} infoWindowControls={props.infoWindowControls} sideBarControls={props.sideBarControls}/>
		</GoogleMap>
	: null

));

export default Map;