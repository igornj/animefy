/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from 'react'
import SpotifyWebApi from 'spotify-web-api-node';

import useAuth from '../../hooks/useAuth'

//Components
import UserProfile from '../UserProfile/UserProfile';
import Playlist from '../Playlist/Playlist';
import LikedSongs from '../LikedSongs/LikedSongs';
import Player from '../Player/Player';
import TrackSearchResult from '../TrackSearchResult/TrackSearchResult';

// type TData = {
//     artist: string,
//     title: string
//     uri: string
//     albumUrl: string
//     tracks?: SpotifyApi.PagingObject<SpotifyApi.TrackObjectFull> | undefined
// }


export const code = new URLSearchParams(window.location.search).get("code") as string

const Dashboard: React.FC = () => {
    const [search, setSearch] = useState<string>('');
    const [searchResults, setSearchResults] = useState<any>([]);
    const [playingTrack, setPlayingTrack] = useState<any>();

    //const accessToken = useAuth();
    const accessToken = localStorage.getItem('accessToken');

    const chooseTrack = (track: any) => {
        setPlayingTrack(track);
        setSearch("");
    }

    useEffect(() => {
        const spotifyApi = new SpotifyWebApi({
            clientId: 'd76d730f48874bc0ac6119312471f2fd',
        });

        if (!accessToken) return;

        spotifyApi.setAccessToken(accessToken);

        spotifyApi.searchTracks(search, { limit: 5, offset: 1 })
            .then(function (data) {
                console.log('Search by', search, data.body);
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
            <Player accessToken={accessToken} uri={playingTrack?.uri} searchResults={searchResults} />
        </div>
    )
}

export default Dashboard