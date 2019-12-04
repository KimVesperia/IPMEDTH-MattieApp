import React from 'react';
import Logout from './Logout';
import { Redirect } from 'react-router';

const protectedRoutes3 = [
	{
		name: 'reports',
		exact: true,
		path: '/logout',
		main: props => <Logout {...props} />,
		public: false,
	},
];

const dasher = <Redirect push to="/curriculum" />;

export default protectedRoutes3;
