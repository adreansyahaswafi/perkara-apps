import { Navigate } from 'react-router-dom';

import { isLoggedIn } from './Auth';

export const PublicRoute = ({ children }) => {
    return isLoggedIn()
        ? <Navigate to='/' />
        : children;
};

export const PrivateRoute = ({ children }) => {
    return isLoggedIn()
        ? children
        : <Navigate to='/login' />;
};
