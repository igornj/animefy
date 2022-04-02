import { Navigate } from 'react-router-dom';
import {code} from '../pages/Dashboard/Dashboard';


import Dashboard from '../pages/Dashboard/Dashboard';

const PrivateRoutes = () => {
    return code ? <Dashboard /> : <Navigate to="/login" />;
}

export default PrivateRoutes;