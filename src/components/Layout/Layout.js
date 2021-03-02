import React from 'react';
import Auxiliary from '../../higher-order/Auxiliary';
import classes from './Layout.css'
import Toolbar from '../Navigation/Toolbar/Toolbar'

const layout = (props) => {
	return (
		<Auxiliary>
			<Toolbar />
			<main className={classes.Content}>{props.children}</main>
		</Auxiliary>
	)
}

export default layout;