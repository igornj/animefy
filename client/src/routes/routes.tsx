import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';

//components
import Login from '../pages/Login/Login';
import Page404 from '../pages/Page404/Page404';
import PrivateRoutes from './privateRoutes';



const Router: React.FC = () => {

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/" element={<PrivateRoutes />} />
                {/* <Route path="/" element={<Dashboard />} /> */}
                <Route path="*" element={<Page404 />} />
            </Routes>
        </BrowserRouter>
    )
}

export default Router;