import React from 'react';
import Profile from './Profile';
import { Redirect } from 'react-router';

const protectedRoutes4 = [
	{
		name: 'reports',
		exact: true,
		path: '/profile',
		main: props => <Profile {...props} />,
		public: false,
	},
];

const dasher = <Redirect push to="/profile" />;

export default protectedRoutes4;
