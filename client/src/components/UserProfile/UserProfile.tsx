/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import SpotifyWebApi from 'spotify-web-api-node';
import { ErrorCallback } from 'typescript';

//import useAuth from '../../hooks/useAuth';


type TUser = {
    email?: string | undefined,
    image?: string | undefined,
    url?: string | undefined,
    display_name?: string | undefined,
}

const spotifyApi = new SpotifyWebApi({
    clientId: 'd76d730f48874bc0ac6119312471f2fd',
});

const UserProfile = ({ accessToken }: any) => {
    const [user, setUser] = useState<TUser>({});
    //const accessToken = useAuth();

    // if (!accessToken) {
    //     console.log('sem token meu parça / userprofile');
    // }

    useEffect(() => {
        if (!accessToken) return;
        spotifyApi.setAccessToken(accessToken);

        spotifyApi.getMe()
            .then(function (data: any) {
                setUser({
                    email: data.body.email,
                    //@ts-ignore
                    image: data.body.images[0].url,
                    display_name: data.body.display_name,
                })
            }, function (err: ErrorCallback) {
                console.log('Something went wrong!', err);
            });

    }, [accessToken]);


    return (
        <UserProfileContainer>
            <User>
                <img src={user.image} alt="user" />
                <p>{user.display_name}</p>
            </User>
        </UserProfileContainer>
    )
}


const UserProfileContainer = styled.div`
    display: flex;
    justify-content: flex-end;
    width: 100%;
`


const User = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    width: 130px;
    border-radius: 50px;
    background: #252525;
    margin: 1rem 1rem;
    z-index: 12;
    cursor: pointer;

    :hover{
        background: #383838;
    }

    img{
        width: 35px;
        border-radius: 50%;
        margin: 4px;
    }

    p{
        color: #EBEBEB;
        font-weight: 400;
        font-size: 0.8rem;
        margin-left: 0.1rem;
    }

    @media screen and (min-width: 1000px){
        width: 160px;

        img{
            width: 45px;
        }

        p{
            color: #EBEBEB;
            font-weight: 400;
            font-size: 0.9rem;
            margin-left: 0.5rem;
        }
    }
`;


export default UserProfile;