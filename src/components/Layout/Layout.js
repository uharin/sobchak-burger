import React from 'react';
import Auxiliary from '../../higher-order/Auxiliary';
import classes from './Layout.css'

const layout = (props) => {
	return (
		<Auxiliary>
			<div>Toolbar, SideDrawer, Backdrop</div>
			<main className={classes.Content}>{props.children}</main>
		</Auxiliary>
	)
}

export default layout;