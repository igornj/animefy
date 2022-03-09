import React from 'react'

type props = {
    track: any,
    chooseTrack: (track: any) => void;
}

const TrackSearchResult = ({ track, chooseTrack }: props) => {

    function handlePlay() {
        chooseTrack(track.uri)
    }

    return (
        <div style={{ cursor: "pointer" }} onClick={handlePlay}>
            <img src={track.albumUrl.url} alt="album" />
            <div>{track.title}</div>
            <div>{track.artist}</div>
        </div>
    )
}

export default TrackSearchResult