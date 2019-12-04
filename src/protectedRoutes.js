import React from 'react';
import Dashboard from './Dashboard';
import { Redirect } from 'react-router';

const protectedRoutes = [
	{
		name: 'reports',
		exact: true,
		path: '/dashboard',
		main: props => <Dashboard {...props} />,
		public: false,
	},
];

const dasher = <Redirect push to="/dashboard" />;

export default protectedRoutes;
