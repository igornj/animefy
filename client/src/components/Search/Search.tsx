import React, { useContext, useEffect, useState } from 'react'
import styled from 'styled-components';
import { RiHome2Line } from 'react-icons/ri';
import { DataContext } from '../../context/dataContext';
import SpotifyWebApi from 'spotify-web-api-node';


//components
import TrackSearchResult from '../TrackSearchResult/TrackSearchResult';


interface Props {
    accessToken: string
}


const spotifyApi = new SpotifyWebApi({
    clientId: 'd76d730f48874bc0ac6119312471f2fd',
});


function Search({ accessToken }: Props) {
    const [search, setSearch] = useState<string>('');
    const [searchResults, setSearchResults] = useState<any>([]);
    const { setisOpen, setPlayingTrack, setsearchUris } = useContext(DataContext);


    const chooseTrack = (track: any) => {
        setPlayingTrack(track);
    }


    useEffect(() => {
        if (!accessToken) return;
        spotifyApi.setAccessToken(accessToken);
    }, [accessToken]);


    useEffect(() => {
        searchResults.map((music: string[] | any) => {
            return setsearchUris([music.uri]);
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [search, searchResults]);



    useEffect(() => {
        if (!search) return;

        spotifyApi.searchTracks(search, { limit: 20, offset: 1 })
            .then(function (data: any) {
                setSearchResults(
                    data?.body?.tracks?.items.map((track: any) => {
                        return {
                            artist: track.artists[0].name,
                            title: track.name,
                            uri: track.uri,
                            albumUrl: track.album.images[1],
                        }
                    })
                )

            }, function (err: ErrorCallback) {
                console.error(err);
            });


        // spotifyApi.getMyCurrentPlaybackState()
        //     .then(function (data) {
        //         // Output items
        //         if (data.body && data.body.is_playing) {
        //             console.log(data.body.item?.artists[0].uri);
        //         } else {
        //             //console.log("User is not playing anything, or doing so in private.");
        //         }
        //     }, function (err) {
        //         console.log('Something went wrong!', err);
        //     });

    }, [search]);

    return (
        <SearchContainer>
            <SearchItems>
                <HomeButton onClick={() => setisOpen(false)} />
                <input type="search" placeholder='Procure uma música' value={search} onChange={(e) => setSearch(e.target.value)} />
                {search ? '' : <h1 style={{ color: 'white', fontSize: '1rem', marginTop: '1rem' }}>Procure uma música/artista</h1>}
                <Tracks>
                    {searchResults.map((track: any) => (
                        <TrackSearchResult
                            track={track}
                            key={track.uri}
                            chooseTrack={chooseTrack}
                            search={search}
                        />
                    ))}
                </Tracks>
            </SearchItems>
        </SearchContainer>
    )
}


const SearchItems = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    z-index: 10;
    height: 100vh;
    opacity: 0;
    transition: opacity 0.3s ease;
    background: rgba(0,0,0,0.8);
    position: absolute;
    top: 0; 

    input {
         border-radius: 15px;
         border: none;
         width: 60%;
         height: 40px;
         padding: 20px;
         background: #2C2C2C;
         position: absolute;
         top: 8rem;
    }

    input:focus{
        outline: 1px solid #1cb954;
    }
     
    input::placeholder{
        color: #585858;
    }

    input, select, textarea{
         color: #7D7D7D;
    }   

    @media screen and (max-height: 650px){
        input{
            top: 6rem;
        }
    }
 
`;


const SearchContainer = styled.div`
    width: 100vw;
    height: 100vh;
    transition: opacity 0.3s ease;
    position: absolute;
    z-index: 10;

    :hover{
        ${SearchItems}{
            opacity: 1;
        }
    }
   
`;


const HomeButton = styled(RiHome2Line)`
    cursor: pointer;
    color: #707070;
    font-size: 2.2rem;
    transition: color 0.3s ease;
    :hover{
        color: #1cb954;
    }
    z-index: 11;
    position: absolute;
    top: 8rem;
    right: 3rem;

    @media screen and (max-height: 650px){
        top: 6.2rem;
        
    }
`;


const Tracks = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    width: 100vw;
    height: 65vh;
    margin-top: 4rem;
    overflow-y: scroll;

    /* width */
    ::-webkit-scrollbar {
        width: 10px;
    }

    /* Track */
    ::-webkit-scrollbar-track {
        background: rgba(0,0,0,0.8);
        border-radius: 20px;
    }

    /* Handle */
    ::-webkit-scrollbar-thumb {
        background: #1cb954;
        border-radius: 20px;
    }

    /* Handle on hover */
    ::-webkit-scrollbar-thumb:hover {
        background: #127a37;
    }

    @media screen and (min-width: 1000px){
        margin-top: 8rem;
        width: 50vw;
        height: 70vh;
    }
`;


export default Search