import React from 'react';
import image404 from "../images/404.gif";


const Page404 = () => {

	const divStyle = {
		width: '100vw',
		height: '100vh',
		background: '#000'
	};
	const image = {
		position: 'absolute',
		top: '50%',
		left: '50%',
		transform: 'translate(-50%, -50%)'
	};


	return (
		<div style={divStyle}>
			<img style={image} src={image404} alt="404" />
		</div>
	);
}

export default Page404;