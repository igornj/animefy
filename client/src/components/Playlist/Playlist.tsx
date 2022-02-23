/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import SpotifyWebApi from 'spotify-web-api-node';

//import useAuth from '../../hooks/useAuth';


type TData = {
    name?: string | undefined,
    image?: string | undefined,
    //images?: string | undefined,
    images?: { url: string | undefined; }
    description?: string | undefined,
    id?: React.Key,
}

const Playlist = ({ accessToken }: any) => {
    const [playlistData, setPlaylistData] = useState<Array<TData> | any>([]);
    //const [likedSongsData, setlikedSongsData] = useState<Array<TData> | undefined>([]);
    //const accessToken = useAuth();

    console.log(playlistData);

    const spotifyApi = new SpotifyWebApi({
        clientId: 'd76d730f48874bc0ac6119312471f2fd',
    });

    useEffect(() => {
        if (!accessToken) return;
        spotifyApi.setAccessToken(accessToken);

        spotifyApi.getUserPlaylists('12151958760')
            .then(function (data) {
                console.log('Retrieved playlists', data.body);
                setPlaylistData(data.body.items);
            }, function (err) {
                console.log('Something went wrong!', err);
            });


        spotifyApi.getPlaylistTracks('2JFd6qBDd9kTIFukQ5NDzo', {
            offset: 1,
            limit: 5,
            fields: 'items'
        })
            .then(
                function (data) {
                    console.log('The playlist contains these tracks', data.body);
                },
                function (err) {
                    console.log('Something went wrong!', err);
                }
            );


        spotifyApi.getMySavedTracks({
            limit: 5,
            offset: 1
        })
            .then(function (data) {
                console.log('Saved tracks', data.body);
                //setlikedSongsData(data.body.items)
            }, function (err) {
                console.log('Something went wrong!', err);
            });



    }, [accessToken]);


    return (
        <div>
            {playlistData?.map((data: { name: boolean | React.ReactChild | React.ReactFragment | React.ReactPortal | null | undefined; description: boolean | React.ReactChild | React.ReactFragment | React.ReactPortal | null | undefined; id: React.Key | null | undefined; images: { url: string | undefined; }[]; }) => {
                return (
                    <>
                        <h1>{data.name}</h1>
                        <p>{data.description}</p>
                        <img key={data.id} src={data.images[0].url} alt="playlistinfo" />
                    </>
                )
            })}
        </div>
    )
}

export default Playlist