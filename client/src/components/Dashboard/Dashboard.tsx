/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import SpotifyWebApi from 'spotify-web-api-node';
import { RiHome2Line } from 'react-icons/ri';
import { Navigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth'
import { DataContext } from '../../context/dataContext';

//Components
import UserProfile from '../UserProfile/UserProfile';
import Playlist from '../Playlist/Playlist';
import LikedSongs from '../LikedSongs/LikedSongs';
import Player from '../Player/Player';
import TrackSearchResult from '../TrackSearchResult/TrackSearchResult';
import AnimeScenary from '../AnimeScenary/AnimeScenary';
import Menu from '../Menu/Menu';
import { ErrorCallback } from 'typescript';

// type TData = {
//     artist: string,
//     title: string
//     uri: string
//     albumUrl: string
//     tracks?: SpotifyApi.PagingObject<SpotifyApi.TrackObjectFull> | undefined
// }

// interface Data {
//     artist: 'string',
//     title: 'string',
//     uri: 'string',
//     albumUrl: 'string',
// }


export const code = new URLSearchParams(window.location.search).get("code") as string

const spotifyApi = new SpotifyWebApi({
    clientId: 'd76d730f48874bc0ac6119312471f2fd',
});


const Dashboard: React.FC = () => {
    const [search, setSearch] = useState<string>('');
    const [searchResults, setSearchResults] = useState<any>([]);
    const [playingTrack, setPlayingTrack] = useState<any>();
    const accessToken = useAuth() as string;
    const { authUrl, gifAverageColor, isOpen, setisOpen } = useContext(DataContext);
    const searchUris: string[] = [];


    const chooseTrack = (track: any) => {
        setPlayingTrack(track);
    }

    useEffect(() => {
        searchResults.map((music: string[] | any) => {
            return searchUris.push(music.uri)
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [search, searchResults]);



    useEffect(() => {
        if (performance.navigation.type === 1) {
            window.location.replace(authUrl);
        }
    }, [authUrl]);

    useEffect(() => {
        if (!accessToken) {
            <Navigate to="/login" />
        }
        spotifyApi.setAccessToken(accessToken);
    }, [accessToken]);


    useEffect(() => {
        if (!search) return;
        if (!accessToken) return;

        spotifyApi.searchTracks(search, { limit: 20, offset: 1 })
            .then(function (data: any) {
                setSearchResults(
                    data?.body?.tracks?.items.map((track: any) => {
                        return {
                            artist: track.artists[0].name,
                            title: track.name,
                            uri: track.uri,
                            albumUrl: track.album.images[1],
                        }
                    })
                )

            }, function (err: ErrorCallback) {
                console.error(err);
            });


        // spotifyApi.getMyCurrentPlaybackState()
        //     .then(function (data) {
        //         // Output items
        //         if (data.body && data.body.is_playing) {
        //             console.log(data.body.item?.artists[0].uri);
        //         } else {
        //             //console.log("User is not playing anything, or doing so in private.");
        //         }
        //     }, function (err) {
        //         console.log('Something went wrong!', err);
        //     });

    }, [accessToken, search]);





    return (
        <DashboardContainer>
            <UserProfile accessToken={accessToken} />
            <AnimeScenary uri={playingTrack?.uri} />

            {isOpen ? (
                <SearchContainer>
                    <HomeButton onClick={() => setisOpen(false)} />
                    <input type="search" placeholder='Procure uma música' value={search} onChange={(e) => setSearch(e.target.value)} />
                    {search ? '' : <h1 style={{ color: 'white', fontSize: '1rem', marginTop: '1rem' }}>Procure uma música/artista</h1>}
                    <Tracks>
                        {searchResults.map((track: any) => (
                            <TrackSearchResult
                                track={track}
                                key={track.uri}
                                chooseTrack={chooseTrack}
                                search={search}
                            />
                        ))}
                    </Tracks>
                </SearchContainer>) : (
                <Menu />
            )}

            {playingTrack ?
                <MusicPlaying style={{ background: `${gifAverageColor}` }}>
                    <TrackInfo>
                        <img src={playingTrack?.albumUrl?.url} alt="album" />
                        <h1 >{playingTrack?.title}</h1>
                        <p>{playingTrack?.artist}</p>
                    </TrackInfo>
                </MusicPlaying> : ''}
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

const SearchContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    z-index: 10;
    height: 100vh;
    opacity: 0;
    transition: opacity 0.3s ease;
    background: rgba(0,0,0,0.8);
    position: absolute; 

    :hover{
        opacity: 1;
    }
    

    input {
         border-radius: 15px;
         border: none;
         width: 60%;
         height: 40px;
         padding: 20px;
         background: #2C2C2C;
         position: absolute;
         top: 8rem;
    }

    input:focus{
        outline: 1px solid #1cb954;
    }
     
    input::placeholder{
        color: #585858;
    }

    input, select, textarea{
         color: #7D7D7D;
    }   

    @media screen and (min-width: 1000px){
        input{
            
        }
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
            opacity: 1
        }

        ${SearchContainer}{
            opacity: 1
        }
    }

`;





const HomeButton = styled(RiHome2Line)`
    cursor: pointer;
    color: #707070;
    font-size: 2.2rem;
    transition: color 0.3s ease;
    :hover{
        color: #1cb954;
    }
    z-index: 11;
    position: absolute;
    top: 8rem;
    right: 3rem;
`;

const Tracks = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    width: 100vw;
    height: 65vh;
    margin-top: 4rem;
    overflow-y: scroll;

    /* width */
    ::-webkit-scrollbar {
        width: 10px;
    }

    /* Track */
    ::-webkit-scrollbar-track {
        background: rgba(0,0,0,0.8);
        border-radius: 20px;
    }

    /* Handle */
    ::-webkit-scrollbar-thumb {
        background: #1cb954;
        border-radius: 20px;
    }

    /* Handle on hover */
    ::-webkit-scrollbar-thumb:hover {
        background: #127a37;
    }

    @media screen and (min-width: 1000px){
        margin-top: 8rem;
        width: 50vw;
        height: 70vh;
    }
`;


const MusicPlaying = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 250px;
    height: 250px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border: 1px solid white;  

    @media screen and (min-width: 1000px){
        width: 340px;
        height: 340px;
        top: 50%;
        left: 80%;
        z-index: 1;
    }
`;


const TrackInfo = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 100%;
    height: 100%;
    text-align: center;


    img{ 
        width: 160px;
    }

    h1{
        font-size: 0.9rem;
        color: white;
        margin: 5px 8px;
    }

    p{
        font-size: 0.8rem;
        font-weight: 500;
        color: #e3e3e3;
        margin-bottom: 5px;
    } 

    @media screen and (min-width: 1000px){
        img{ 
            width: 260px;
        }

        h1{
            font-size: 1rem;
            margin: 10px 0 0 0;
        }

        p{
            margin-top: 2px;
        } 
    }
`;



export default Dashboard;