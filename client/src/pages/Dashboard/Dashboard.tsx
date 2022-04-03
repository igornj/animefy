/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import SpotifyWebApi from 'spotify-web-api-node';
import { RiFullscreenFill, RiFullscreenExitFill } from 'react-icons/ri';
import { Navigate } from 'react-router-dom';
import screenfull from 'screenfull';
import useAuth from '../../hooks/useAuth'
import { DataContext } from '../../context/dataContext';

//Components
import UserProfile from '../../components/UserProfile/UserProfile';
import Playlist from '../../components/Playlist/Playlist';
import LikedSongs from '../../components/LikedSongs/LikedSongs';
import Player from '../../components/Player/Player';
import AnimeScenary from '../../components/AnimeScenary/AnimeScenary';
import Menu from '../../components/Menu/Menu';
import Loading from '../../components/Loading/Loading';
import Search from '../../components/Search/Search';
import MusicPlaying from '../../components/MusicPlaying/MusicPlaying';

type Types = {
    onClick?: React.MouseEventHandler<SVGElement> | undefined
}

export const code = new URLSearchParams(window.location.search).get("code") as string;
window.history.pushState({}, '', "/");

const spotifyApi = new SpotifyWebApi({
    clientId: 'd76d730f48874bc0ac6119312471f2fd',
});


const Dashboard: React.FC = () => {
    const accessToken = useAuth() as string;
    const [isFullScreen, setisFullScreen] = useState<boolean>(false);
    const { authUrl, isOpen, isLoading, setIsLoading, playingTrack, searchUris } = useContext(DataContext);


    useEffect(() => {
        setIsLoading(true);
        setTimeout(() => setIsLoading(false), 2300);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    useEffect(() => {
        if (performance.navigation.type === 1) {
            window.location.replace(authUrl);
        }
    }, [authUrl]);


    useEffect(() => {
        if (!accessToken) {
            <Navigate to="/login" />
        }
        // spotifyApi.setAccessToken(accessToken);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleScreen = (): void => {
        if (screenfull.isEnabled) {
            screenfull.request();
            setisFullScreen(true);
        }

        if (isFullScreen) {
            screenfull.exit();
            setisFullScreen(false);
        }
    }



    return (
        <DashboardContainer>
            {isFullScreen ? <DeactivateFullScreen onClick={handleScreen} /> : <ActivateFullScreen onClick={handleScreen} />}
            <Loading isLoading={isLoading} />
            <UserProfile accessToken={accessToken} />
            <AnimeScenary uri={playingTrack?.uri} />

            {isOpen ? <Search accessToken={accessToken} /> : <Menu />}
            {playingTrack ? <MusicPlaying /> : <></>}
            {/* <Playlist accessToken={accessToken} />
            <LikedSongs accessToken={accessToken} /> */}
            <PlayerContainer>
                <Player accessToken={accessToken} uri={playingTrack?.uri} searchUris={searchUris} />
            </PlayerContainer>
        </DashboardContainer>
    )
}


const PlayerContainer = styled.div`
    opacity: 0;
`;

const ActivateFullScreen = styled(RiFullscreenFill)`
    position: absolute;
    bottom: 8rem;
    right: 1rem;
    font-size: 3rem;
    z-index: 12;
    color: white;
    cursor: pointer;
    transition: all 0.3s ease;
    opacity: 0;
    :hover{
        color: #1cb954;
    }

    @media screen and (min-width: 1000px){
        bottom: 5rem;
        right: 1rem;
    }
`;

const DeactivateFullScreen = styled(RiFullscreenExitFill)`
    position: absolute;
    bottom: 8rem;
    right: 1rem;
    font-size: 3rem;
    z-index: 12;
    color: white;
    cursor: pointer;
    transition: all 0.3s ease;
    opacity: 0;
    :hover{
        color: #1cb954;
    }

    @media screen and (min-width: 1000px){
        bottom: 5rem;
        right: 1rem;
    }

`;


const DashboardContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 100vw;
    height: 100vh;
    overflow: hidden;

    :hover{
        ${PlayerContainer}{
            opacity: 1;
        }

        ${ActivateFullScreen}{
            opacity: 1;
        }

        ${DeactivateFullScreen}{
            opacity: 1;
        }
    }

`;




export default Dashboard;