/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from 'react'
import SpotifyWebApi from 'spotify-web-api-node';

//import useAuth from '../../hooks/useAuth';


type TUser = {
    email?: string | undefined,
    image?: string | undefined,
    url?: string | undefined,
    display_name?: string | undefined,
}

const UserProfile = ({ accessToken }: any) => {
    const [user, setUser] = useState<TUser>({});
    //const accessToken = useAuth();

    // if (!accessToken) {
    //     console.log('sem token meu parça / userprofile');
    // }

    useEffect(() => {
        // const spotifyApi = new SpotifyWebApi({
        //     accessToken: accessToken,
        // });
        const spotifyApi = new SpotifyWebApi({
            clientId: 'd76d730f48874bc0ac6119312471f2fd',
        });

        if (!accessToken) return;
        spotifyApi.setAccessToken(accessToken);


        spotifyApi.getMe()
            .then(function (data) {
                setUser({
                    email: data.body.email,
                    image: data.body.images[0].url,
                    display_name: data.body.display_name,
                })
                console.log('Some information about the authenticated user', data.body);
            }, function (err) {
                console.log('Something went wrong!', err);
            });

    }, [accessToken]);


    return (
        <div>
            {user.display_name}
            <img src={user.image} alt="user" />
        </div>
    )
}


export default UserProfile;