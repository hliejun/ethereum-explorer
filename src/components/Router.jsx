import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

const RouterContext = React.createContext({});

const Router = ({ children }) => (
	<BrowserRouter>
		<Route>
			{routeProps => (
				<RouterContext.Provider value={routeProps}>
					{children}
				</RouterContext.Provider>
			)}
		</Route>
	</BrowserRouter>
);

export { Router, RouterContext };
