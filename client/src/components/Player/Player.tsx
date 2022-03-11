/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useContext } from 'react';
import styled from 'styled-components';
import SpotifyPlayer from 'react-spotify-web-playback';
import { DataContext } from '../../context/dataContext';

function Player({ accessToken, uri, searchUris }: any) {
    const [play, setPlay] = useState<boolean>(false);
    const { musicChanged, setmusicChanged } = useContext(DataContext);
    //const [urisPlaylist, seturisPlaylist] = useState<string | string[]>([]);
    // console.log('search uris aqui irmão: ', searchUris);
    // console.log('uri aqui irmão: ', uri);
    //console.log('uris playlist variable', urisPlaylist);


    // const removeDuplicates = (searchUris: any): [] => {
    //     return searchUris.filter((item: string,
    //         index: number) => searchUris.indexOf(item) === index);
    // }


    // useEffect(() => {
    //     if (uri !== undefined) {
    //         searchUris.unshift(uri);
    //         seturisPlaylist(searchUris);
    //         removeDuplicates(searchUris);
    //     }
    // }, [uri, searchUris]);



    useEffect(() => {
        setPlay(true);
        setmusicChanged(!musicChanged);
    }, [uri]);

    if (!accessToken) return null;


    return (
        <PlayerContainer>
            <SpotifyPlayer
                token={accessToken}
                uris={uri}
                callback={state => {
                    if (!state.isPlaying) setPlay(false)
                }}
                play={play}
                showSaveIcon={true}
                initialVolume={0.1}
                styles={{
                    activeColor: '#fff',
                    bgColor: 'rgba(0,0,0,0.1)',
                    color: '#fff',
                    loaderColor: '#fff',
                    sliderColor: '#1cb954',
                    trackArtistColor: 'white',
                    trackNameColor: 'white',
                }}
            />

        </PlayerContainer>
    )
}

const PlayerContainer = styled.div`
    z-index: 8;
`;

export default Player