import React from 'react';
import image404 from "../images/500.gif";


const Page404 = () => {

	const divStyle = {
		width: '100vw',
		height: '100vh',
	};
	const image = {
		position: 'absolute',
		top: '50%',
		left: '50%',
		transform: 'translate(-50%, -50%)'
	};


	return (
		<div style={divStyle}>
			<img style={image} src={image404} alt="500" />
		</div>
	);
}

export default Page404;