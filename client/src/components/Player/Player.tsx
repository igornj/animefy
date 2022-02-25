/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from 'react'
import SpotifyPlayer from 'react-spotify-web-playback';

function Player({ accessToken }: any) {
    const [play, setPlay] = useState<boolean>(false);

    if (!accessToken) return null;
    return (
        <>
            <SpotifyPlayer
                token={accessToken}
                uris={['spotify:track:54yT3t8hSaJUvdHer3ZaB1']}
                callback={state => {
                    if (!state.isPlaying) setPlay(false)
                }}
                play={play}
                showSaveIcon={true}
            />

        </>
    )
}

export default Player