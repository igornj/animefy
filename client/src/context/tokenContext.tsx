/* eslint-disable react-hooks/exhaustive-deps */
import React, { createContext, useEffect, useState } from 'react';
import { code } from '../App';
import axios from 'axios';

type TokenContextType = {
    accessToken: string
    refreshToken: string
    expiresIn: number
}

export const TokenContext = createContext<TokenContextType | any>(null);


export const TokenContextProvider: React.FC = ({ children }) => {
    const [accessToken, setAccessToken] = useState<TokenContextType>();
    const [refreshToken, setRefreshToken] = useState<TokenContextType>();
    const [expiresIn, setExpiresIn] = useState<TokenContextType>();

    //erro ta aqui
    useEffect(() => {
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

    }, [accessToken]);



    return (
        <TokenContext.Provider
            value={{ accessToken, refreshToken, expiresIn }}
        >
            {children}
        </TokenContext.Provider>
    );
}
