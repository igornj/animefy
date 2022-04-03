/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import SpotifyWebApi from 'spotify-web-api-node';
import { ErrorCallback } from 'typescript';
import ProfileDetails from '../ProfileDetails/ProfileDetails';
import { DataContext } from '../../context/dataContext';

//import useAuth from '../../hooks/useAuth';


type TUser = {
    email?: string,
    image?: string,
    url?: string,
    display_name?: string,
    country?: string,
    id?: string,
    followers?: number,
}

const spotifyApi = new SpotifyWebApi({
    clientId: 'd76d730f48874bc0ac6119312471f2fd',
});

const UserProfile = ({ accessToken }: any) => {
    const [user, setUser] = useState<TUser>({});
    const { setOpenProfile, openProfile } = useContext(DataContext);
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
                    url: data.body.external_urls.spotify,
                    country: data.body.country,
                    id: data.body.id,
                    followers: data.body.followers.total,
                })
            }, function (err: ErrorCallback) {
                console.log('Something went wrong!', err);
            });

    }, [accessToken]);


    return (
        <UserProfileContainer>
            <User onClick={() => setOpenProfile(!openProfile)}>
                <img src={user.image} alt="user" />
                <p>{user.display_name}</p>
            </User>

            {openProfile ? <ProfileDetails user={user} /> : <></>}
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