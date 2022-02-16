import React, { createContext, useState } from 'react';
import { code } from '../App';
import axios from 'axios';

type ContextType = {
    code?: string
    accessToken: string
    refreshToken: string
    expiresIn: number | null
}

export const TokenContext = createContext<ContextType>();


export const TokenContextProvider: React.FC = ({ children }) => {
    const [accessToken, setAccessToken] = useState('');
    const [refreshToken, setRefreshToken] = useState('');
    const [expiresIn, setExpiresIn] = useState(null);

    axios
        .post("http://localhost:3001/login", {
            code,
        })
        .then(res => {
            setAccessToken(res.data.accessToken)
            setRefreshToken(res.data.refreshToken)
            setExpiresIn(res.data.expiresIn)
            //window.history.pushState({}, null, "/") 
        })
        .catch((e) => {
            console.log(e);
            //window.location.href = "/";
        })


    return (
        <TokenContext.Provider
            value={{ accessToken, refreshToken, expiresIn }}
        >
            {children}
        </TokenContext.Provider>
    );
}
