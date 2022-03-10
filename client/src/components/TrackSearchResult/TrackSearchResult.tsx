import React from 'react';
import styled from 'styled-components';

type props = {
    track: any,
    chooseTrack: (track: any) => void;
}

const TrackSearchResult = ({ track, chooseTrack }: props) => {

    function handlePlay() {
        chooseTrack(track.uri)
    }

    return (
        <Container onClick={handlePlay}>
            <MusicDetails>
                <img src={track.albumUrl.url} alt="album" />
                <h1>{track.title}</h1>
                <p>{track.artist}</p>
            </MusicDetails>
        </Container>
    )
}

const Container = styled.div`
    cursor: pointer;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
`;


const MusicDetails = styled.div`
    width: 60%;
    margin: 1rem 1rem;

    img{
        width: 100%;
    }

    h1{
        color: #EBEBEB;
        font-size: 1.2rem;
    }

    p{
        color: #C2C2C2;
        font-size: 0.9rem;
    }
`;

export default TrackSearchResult;