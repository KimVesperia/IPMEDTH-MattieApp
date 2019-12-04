import React from 'react';
import Curriculum from './Curriculum';
import { Redirect } from 'react-router';

const protectedRoutes2 = [
	{
		name: 'reports',
		exact: true,
		path: '/curriculum',
		main: props => <Curriculum {...props} />,
		public: false,
	},
];

const dasher = <Redirect push to="/curriculum" />;

export default protectedRoutes2;
