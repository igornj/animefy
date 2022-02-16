/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState, useContext } from 'react'
//import useAuth from '../../hooks/useAuth'
import { TokenContext } from '../../context/tokenContext';
import Login from '../Login/Login';

import SpotifyWebApi from 'spotify-web-api-node';

// type Props = {
//     code: string
// }

type TUser = {
    email?: string,
    image?: string | undefined,
}

const Dashboard: React.FC = () => {

    const [user, setUser] = useState<TUser>({});
    const [playlistImg, setPlaylistImg] = useState<string | undefined>();
    const { accessToken, refreshToken, expiresIn } = useContext(TokenContext);


    const spotifyApi = new SpotifyWebApi({
        accessToken: accessToken,
    });


    // const codeFromAuthURL = code.code;
    // const accessToken = useAuth(codeFromAuthURL);


    useEffect(() => {
        if (!accessToken) return;

        spotifyApi.setAccessToken(accessToken);

        if (expiresIn === 0) {
            spotifyApi.refreshAccessToken().then(
                function (data) {
                    console.log('The access token has been refreshed!');

                    // Save the access token so that it's used in future calls
                    spotifyApi.setAccessToken(data.body['access_token']);
                },
                function (err) {
                    console.log('Could not refresh access token', err);
                }
            );
        }



        // spotifyApi.getMe()
        //     .then(function (data) {
        //         setUser({
        //             email: data.body.email,
        //             image: data.body.images[0].url,
        //         })
        //         console.log('Some information about the authenticated user', data.body);
        //     }, function (err) {
        //         console.log('Something went wrong!', err);
        //     });


        spotifyApi.getUserPlaylists('12151958760')
            .then(function (data) {
                console.log('Retrieved playlists', data.body);
                setPlaylistImg(data.body.items[0].images[0].url);
            }, function (err) {
                console.log('Something went wrong!', err);
            });

        // spotifyApi.getMySavedTracks({
        //     limit: 2,
        //     offset: 1
        // })
        //     .then(function (data) {
        //         console.log('Done!', data);
        //     }, function (err) {
        //         console.log('Something went wrong!', err);
        //     });
    }, [accessToken, expiresIn]);


    return (
        <>
            {accessToken ? <div>
                dash
                {/* {user.email}
                <img src={user.image} alt="user" /> */}
                <img src={playlistImg} alt="user" />
            </div> : <Login />}
        </>

    )
}

export default Dashboard