/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useContext, useEffect, useState } from 'react'
import SpotifyWebApi from 'spotify-web-api-node';
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

// type TData = {
//     artist: string,
//     title: string
//     uri: string
//     albumUrl: string
//     tracks?: SpotifyApi.PagingObject<SpotifyApi.TrackObjectFull> | undefined
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
    const { authUrl } = useContext(DataContext);
    const searchUris: string[] = [];

    const chooseTrack = (track: any) => {
        setPlayingTrack(track);
        setSearch("");
    }


    useEffect(() => {
        searchResults.map((music: string[] | any) => {
            return searchUris.push(music.uri)
        })
    }, [search, searchResults, searchUris]);



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

        spotifyApi.searchTracks(search, { limit: 5, offset: 1 })
            .then(function (data) {
                setSearchResults(
                    data.body.tracks.items.map(track => {
                        return {
                            artist: track.artists[0].name,
                            title: track.name,
                            uri: track.uri,
                            albumUrl: track.album.images[1],
                        }
                    })
                )

            }, function (err) {
                console.error(err);
            });


        // spotifyApi.getMyCurrentPlaybackState()
        // .then(function(data) {
        // // Output items
        // if (data.body && data.body.is_playing) {
        //     console.log("User is currently playing something!");
        // } else {
        //     console.log("User is not playing anything, or doing so in private.");
        // }
        // }, function(err) {
        // console.log('Something went wrong!', err);
        // });

    }, [accessToken, search]);





    return (
        <div>
            <UserProfile accessToken={accessToken} />
            <form>
                <input type="search" placeholder='Search a song' value={search} onChange={(e) => setSearch(e.target.value)} />
            </form>
            <div>
                {searchResults.map((track: any) => (
                    <TrackSearchResult
                        track={track}
                        key={track.uri}
                        chooseTrack={chooseTrack}
                    />
                ))}
            </div>

            {/* <Playlist accessToken={accessToken} />
            <LikedSongs accessToken={accessToken} /> */}
            <Player accessToken={accessToken} uri={playingTrack} searchUris={searchUris} />
            <AnimeScenary />
        </div>
    )
}

export default Dashboard