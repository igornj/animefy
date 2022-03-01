/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import SpotifyPlayer from 'react-spotify-web-playback';

function Player({ accessToken, uri, searchResults }: any) {
    const [play, setPlay] = useState<boolean>(false);
    //const [uris, setUris] = useState<any>();

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
    }, [uri]);

    if (!accessToken) return null;




    return (
        <>
            <SpotifyPlayer
                token={accessToken}
                uris={[uri]}
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