import React from 'react';
import styled from 'styled-components';

type props = {
    track: any,
    chooseTrack: (track: any) => void;
    search: string
}

const TrackSearchResult = ({ track, chooseTrack, search }: props) => {

    function handlePlay() {
        chooseTrack(track)
    }

    return (
        <Container onClick={handlePlay}>
            {search ?
                <MusicDetails>
                    <img src={track.albumUrl.url} alt="album" />
                    <h1>{track.title}</h1>
                    <p>{track.artist}</p>
                </MusicDetails>
                :

                <></>
            }
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

    :hover{
        img{
            transform: scale(1.1);
            filter: grayscale(80%) contrast(120%);
        }
    }

    img{
        width: 100%;
        transition: all 0.3s ease
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