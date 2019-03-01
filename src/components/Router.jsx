import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

export const RouterContext = React.createContext({});

const BrowserRouter = ({ children }) => (
	<Router>
		<Route>
			{routeProps => (
				<RouterContext.Provider value={routeProps}>
					{children}
				</RouterContext.Provider>
			)}
		</Route>
	</Router>
);

export default BrowserRouter;
