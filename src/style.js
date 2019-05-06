const drawerWidth = 350;

const styles = theme => ({
	form: {
		padding: 15
	},
	card: {
		maxWidth: 345,
	},
	map: {
		padding: 30
	},
	media: {
		width: 345,
		height: 200,
	},
	search: {
		width: '100%'
	},
	root: {
		display: 'flex',
	},
	drawer: {
		[theme.breakpoints.up('lg')]: {
			width: drawerWidth,
			flexShrink: 0,
		},
	},
	appBar: {
		marginLeft: drawerWidth,
		[theme.breakpoints.up('lg')]: {
			width: `calc(100% - ${drawerWidth}px)`,
		},
	},
	menuButton: {
		marginRight: 20,
		[theme.breakpoints.up('lg')]: {
			display: 'none',
		},
	},
	toolbar: theme.mixins.toolbar,
	drawerPaper: {
		width: drawerWidth,
	},
	content: {
		flexGrow: 1
	}
});

export default styles;
