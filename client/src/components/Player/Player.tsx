/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useContext } from 'react'
import SpotifyPlayer from 'react-spotify-web-playback';
import { DataContext } from '../../context/dataContext';

function Player({ accessToken, uri, searchUris }: any) {
    const [play, setPlay] = useState<boolean>(false);
    const { musicChanged, setmusicChanged } = useContext(DataContext);
    const [uris, setUris] = useState<any[]>(searchUris);

    // searchResults.map((el: any) => {
    //     return setUris(el.uri);
    // });

    // console.log(uris);

    // // useEffect(() => {
    // //     if (searchResults) {


    // //         const searchArray = uris.filter((value: string): boolean => {
    // //             return value !== uri;
    // //         })

    // //         console.log(searchArray);
    // //     }

    // //     return
    // // }, [])


    useEffect(() => {
        setPlay(true);
        setmusicChanged(!musicChanged);
    }, [uri]);

    if (!accessToken) return null;

    console.log('musicas que chegaram pra o play', uris)




    return (
        <>
            <SpotifyPlayer
                token={accessToken}
                uris={[uris]}
                callback={state => {
                    if (!state.isPlaying) setPlay(false)
                }}
                play={play}
                showSaveIcon={true}
                initialVolume={0.1}
            />

        </>
    )
}

export default Player