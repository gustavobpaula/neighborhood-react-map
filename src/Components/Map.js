import React from "react"
import { compose, withProps, lifecycle } from "recompose"
import { withScriptjs, withGoogleMap, GoogleMap } from "react-google-maps"
import MapMarkers from "./Map/MapMarkers";
import mapStyle from "../utils/mapStyle";
import Config from "../utils/Config";

const Map = compose(
	lifecycle({
		componentDidCatch(error, errorInfo) {
			console.error(error, errorInfo);
			this.props.history.push(`/500`);
		},
	}),
	withProps({
		googleMapURL: `https://maps.googleapis.com/maps/api/js?v=${Config.GoogleMap.version}&key=${Config.GoogleMap.key}`,
		loadingElement: <div style={{ height: '100%' }} />,
		containerElement: <div style={{
			height: 'calc(100vh - 56px)',
			marginTop: '56px'
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