import React, { useState } from 'react';
import { List, ListSubheader, ListItem, ListItemText, Paper, ListItemIcon } from '@material-ui/core';


const SideBar = (props) => {

	const [selectedItem, setSelectedItem] = useState([]);

	const handleListItemClick = (event, index) => {
		setSelectedItem(index);
	};

	return (
		<Paper>
			<List style={{ maxHeight: '100vh', overflow: 'auto' }} component='nav'
				subheader={<ListSubheader disableSticky={true} component='div'>Restaurantes próximos</ListSubheader>}
			>
			 	{props.places && props.places.map( (place, index) => (
					<ListItem key={index} button
						selected={selectedItem === index}
						onClick = {(e) => handleListItemClick(e, index)}
					>
						<ListItemIcon>
							  <img src={`${place.venue.categories[0].icon.prefix}bg_32.png`} alt={place.venue.name} />
						</ListItemIcon>
						<ListItemText inset primary={place.venue.name} />
					</ListItem>
				 ))}
			</List>
		</Paper>
	);
}

export default SideBar;
