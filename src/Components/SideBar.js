import React from 'react';
import { List, ListSubheader, ListItem, ListItemText, Paper, ListItemIcon, TextField, withStyles } from '@material-ui/core';
import { DebounceInput } from 'react-debounce-input'


const styles = {
	form: {
		padding: 15
	},
	search: {
		width: '100%'
	}
};

const SideBar = (props) => {

	const { classes } = props;

	return (
		<Paper>
			<List style={{ height: '100vh', overflow: 'auto' }} component='nav'
				subheader={<ListSubheader disableSticky={true} component='div'>Restaurantes próximos</ListSubheader>}
			>
				<form className={classes.form} noValidate autoComplete="off">
					<DebounceInput debounceTimeout={600} value={props.searchTerm} onChange={props.filterPlaces} className={classes.search} label="Pesquisar" placeholder="Pesquise pelo nome ou categoria" element={TextField} />
				</form>
			 	{props.places && props.places.map( (place, index) => (
					<ListItem key={index} button
						selected={props.sideBarControls.selectedItem === index}
						  onClick={(e) => props.sideBarControls.handleListItemClick(index)}
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

export default withStyles(styles)(SideBar);
