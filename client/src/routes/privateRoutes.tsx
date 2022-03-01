import React from 'react'
import { Navigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';


import Dashboard from '../components/Dashboard/Dashboard';

const PrivateRoutes = () => {
    const accessToken = useAuth();

    return accessToken ? <Dashboard /> : <Navigate to="/login" />;
}

export default PrivateRoutes;