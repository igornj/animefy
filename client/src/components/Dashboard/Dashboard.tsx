/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from 'react'
import useAuth from '../../hooks/useAuth'

import SpotifyWebApi from 'spotify-web-api-node';

type Props = {
    code: string
}

type TUser = {
    email?: string,
    image?: string | undefined,
}

const spotifyApi = new SpotifyWebApi({
    clientId: "d76d730f48874bc0ac6119312471f2fd",
})


const Dashboard: React.FC<Props> = (code) => {

    const [user, setUser] = useState<TUser>({});
    const [playlistImg, setPlaylistImg] = useState<string | undefined>();
    console.log(user);



    const codeFromAuthURL = code.code;
    const accessToken = useAuth(codeFromAuthURL);


    useEffect(() => {
        if (!accessToken) return
        spotifyApi.setAccessToken(accessToken)

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
    }, [accessToken])


    return (
        <div>
            dash
            {/* {user.email}
            <img src={user.image} alt="user" /> */}
            <img src={playlistImg} alt="user" />
        </div>
    )
}

export default Dashboard