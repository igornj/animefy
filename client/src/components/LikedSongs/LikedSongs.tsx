/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react'
//import { useDispatch } from 'react-redux'
import SpotifyWebApi from 'spotify-web-api-node';
import { ErrorCallback } from 'typescript';


type TData = {
    name?: string | undefined,
    image?: string | undefined,
    //images?: string | undefined,
    images?: { url: string | undefined; }
    description?: string | undefined,
    track?: any,
    added_at?: string | undefined,
}

const LikedSongs = ({ accessToken }: any) => {
    const [likedSongsData, setlikedSongsData] = useState<Array<TData> | any>([]);

    //const dispatch = useDispatch();

    const spotifyApi = new SpotifyWebApi({
        clientId: 'd76d730f48874bc0ac6119312471f2fd',
    });

    useEffect(() => {
        if (!accessToken) return;
        spotifyApi.setAccessToken(accessToken);

        spotifyApi.getMySavedTracks({
            limit: 5,
            offset: 1
        })
            .then(function (data : any) {
                console.log('Saved tracks', data.body);

                setlikedSongsData(data.body.items)
            }, function (err : ErrorCallback) {
                console.log('Something went wrong!', err);
            });

    }, [accessToken]);




    // const grabUri = (uri: string): any => {
    //     dispatch(uri);
    // } onClick={grabUri(data.track.uri)}



    return (
        <div>
            {likedSongsData?.map((data: { track: { name: boolean | React.ReactChild | React.ReactFragment | React.ReactPortal | null | undefined; artists: { name: boolean | React.ReactChild | React.ReactFragment | React.ReactPortal | null | undefined; }[]; }; }) => {
                return (
                    <>
                        <h1 key={'1'}>{data?.track.name}</h1>
                        <p key={'2'}>{data?.track.artists[0].name}</p>
                        {/* <img key={data.added_at} src={data.images[0].url} alt="playlistinfo" /> */}
                    </>
                )
            })}
        </div>
    )
}

export default LikedSongs;