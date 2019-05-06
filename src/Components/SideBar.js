import React from 'react';
import { List, ListSubheader, ListItem, ListItemText, ListItemIcon, TextField, withStyles, Hidden, Drawer } from '@material-ui/core';

import { DebounceInput } from 'react-debounce-input';
import styles from "../style";


const SideBar = (props) => {

	const { classes } = props;


	const drawer = (

		<List style={{ height: '100vh', overflow: 'auto' }} component='nav'
			subheader={<ListSubheader disableSticky={true} component='div'>Restaurantes próximos</ListSubheader>}
		>
			<form className={classes.form} noValidate autoComplete="off">
				<DebounceInput debounceTimeout={600} value={props.searchTerm} onChange={props.filterPlaces} className={classes.search} label="Pesquisar" placeholder="Pesquise pelo nome ou categoria" element={TextField} />
			</form>
			{props.places && props.places.map((place, index) => (
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

	)

	return (

		<nav className={classes.drawer}>
			<Hidden lgUp implementation="css">
				<Drawer
					container={props.container}
					variant="temporary"
					anchor={'left'}
					open={props.mobileOpen}
					onClose={props.handleDrawerToggle}
					classes={{
						paper: classes.drawerPaper,
					}}
				>
				{drawer}
				</Drawer>
			</Hidden>

			<Hidden mdDown implementation="css">
				<Drawer
					classes={{
						paper: classes.drawerPaper,
					}}
					variant="permanent"
					open
				>
					{drawer}
				</Drawer>
			</Hidden>
		</nav>

	);
}


export default withStyles(styles, { withTheme: true })(SideBar);
