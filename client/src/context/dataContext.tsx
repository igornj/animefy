/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { createContext, useEffect, useState } from 'react';
//import { code } from '../App';
import axios from 'axios';

type DataContextType = {
    uri: string
}

export const DataContext = createContext<DataContextType | any>(null);

export const DataContextProvider: React.FC = ({ children }) => {
    const [uri, setUri] = useState<string>('');


    return (
        <DataContext.Provider
            value={{ uri }}
        >
            {children}
        </DataContext.Provider>
    );
}














// const [accessToken, setAccessToken] = useState<TokenContextType>();
// const [refreshToken, setRefreshToken] = useState<TokenContextType>();
// const [expiresIn, setExpiresIn] = useState<TokenContextType>();

//const code = new URLSearchParams(window.location.search).get("code") as string
// //erro ta aqui

// if (code) {
//     useEffect(() => {
//         axios
//             .post("http://localhost:3001/", {
//                 code,
//             })
//             .then(res => {
//                 setAccessToken(res.data.accessToken)
//                 setRefreshToken(res.data.refreshToken)
//                 setExpiresIn(res.data.expiresIn)
//                 //window.history.pushState({}, null, "/")
//             })
//             .catch((e) => {
//                 console.log(e);
//                 //window.location.href = "/";
//             });
//     }, [accessToken, refreshToken, expiresIn]);
// } else {
//     console.log('não tenho código no context');
// }


// useEffect(() => {
//     if (!refreshToken || !expiresIn) return
//     const interval = setInterval(() => {
//         axios
//             .post("http://localhost:3001/refresh", {
//                 refreshToken,
//             })
//             .then(res => {
//                 setAccessToken(res.data.accessToken)
//                 setExpiresIn(res.data.expiresIn)
//             })
//             .catch((err: any) => {
//                 //window.location = "/"
//                 console.log(err);
//             })
//     }, (expiresIn - 60) * 1000)

//     return () => clearInterval(interval)
// }, [refreshToken, expiresIn])