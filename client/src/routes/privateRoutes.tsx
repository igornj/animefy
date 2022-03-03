import { Navigate } from 'react-router-dom';
import {code} from '../components/Dashboard/Dashboard';


import Dashboard from '../components/Dashboard/Dashboard';

const PrivateRoutes = () => {
    return code ? <Dashboard /> : <Navigate to="/login" />;
}

export default PrivateRoutes;