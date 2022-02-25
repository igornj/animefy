/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import SpotifyWebApi from 'spotify-web-api-node';

import useAuth from '../../hooks/useAuth'

//Components
import UserProfile from '../UserProfile/UserProfile';
import Playlist from '../Playlist/Playlist';
import LikedSongs from '../LikedSongs/LikedSongs';
import Player from '../Player/Player';


export const code = new URLSearchParams(window.location.search).get("code") as string

const Dashboard: React.FC = () => {
    const navigate = useNavigate();
    const accessToken = useAuth();

    useEffect(() => {
        const spotifyApi = new SpotifyWebApi({
            clientId: 'd76d730f48874bc0ac6119312471f2fd',
        });

        if (!accessToken) return;
        spotifyApi.setAccessToken(accessToken)
    }, [accessToken]);


    return (
        <div>
            DASHADA
            <UserProfile accessToken={accessToken} />
            <Playlist accessToken={accessToken} />
            <LikedSongs accessToken={accessToken} />
            <Player accessToken={accessToken} />
        </div>
    )
}

export default Dashboard