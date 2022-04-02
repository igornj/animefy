import React, { useContext } from 'react'
import styled from 'styled-components';
import { DataContext } from '../../context/dataContext';


function MusicPlaying() {
    const { gifAverageColor, playingTrack } = useContext(DataContext);



    return (
        <Container style={{ background: `${gifAverageColor}` }}>
            <TrackInfo>
                <img src={playingTrack?.albumUrl?.url} alt="album" />
                <h1 >{playingTrack?.title}</h1>
                <p>{playingTrack?.artist}</p>
            </TrackInfo>
        </Container>
    )
}


const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 250px;
    height: 250px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border: 1px solid white;  
    z-index: 8;

    @media screen and (min-width: 1000px){
        width: 340px;
        height: 340px;
        top: 50%;
        left: 80%;
        z-index: 1;
    }

    @media screen and (max-height: 650px){
        width: 250px;
        height: 250px;
    }
`;


const TrackInfo = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 100%;
    height: 100%;
    text-align: center;


    img{ 
        width: 160px;
    }

    h1{
        font-size: 0.9rem;
        color: white;
        margin: 5px 8px;
    }

    p{
        font-size: 0.8rem;
        font-weight: 500;
        color: #e3e3e3;
        margin-bottom: 5px;
    } 

    @media screen and (min-width: 1000px){
        img{ 
            width: 260px;
        }

        h1{
            font-size: 1rem;
            margin: 10px 0 0 0;
        }

        p{
            margin-top: 2px;
        } 
    }

    @media screen and (max-height: 650px){
        img{ 
            width: 175px;
        }
    }

   
`;

export default MusicPlaying;