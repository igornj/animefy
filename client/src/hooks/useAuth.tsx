/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect, EffectCallback } from 'react'
import axios from 'axios';

import { code } from '../components/Dashboard/Dashboard';



const useAuth = (): string | undefined => {
    const [accessToken, setAccessToken] = useState<string | undefined>()
    const [refreshToken, setRefreshToken] = useState<string | undefined>()
    const [expiresIn, setExpiresIn] = useState<number | undefined>()

    useEffect(() => {
        let cancel = false
        axios
            .post("http://localhost:3001/", {
                code,
            })
            .then(res => {
                if (cancel) return
                setAccessToken(res.data.accessToken)
                setRefreshToken(res.data.refreshToken)
                setExpiresIn(res.data.expiresIn)
                //window.history.pushState({}, null, "/") 

            })
            .catch((e) => {
                console.log(e);
                //window.location.href = "/";
            })

        return () => { (cancel = true) };
    }, [code]);



    useEffect(() => {
        if (!refreshToken || !expiresIn) return
        const interval = setInterval(() => {
            axios
                .post("http://localhost:3001/refresh", {
                    refreshToken,
                })
                .then(res => {
                    setAccessToken(res.data.accessToken)
                    setExpiresIn(res.data.expiresIn)
                })
                .catch((err: any) => {
                    //window.location = "/"
                    console.log(err);
                })
        }, (expiresIn - 60) * 1000)

        return () => clearInterval(interval)
    }, [refreshToken, expiresIn])

    return accessToken;
}

export default useAuth;