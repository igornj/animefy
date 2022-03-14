import React, { useEffect, useState, useContext } from 'react';
import styled from 'styled-components';
import FastAverageColor from 'fast-average-color';

import { DataContext } from '../../context/dataContext';
const giphy = require('giphy-api')();

const AnimeScenary = () => {
    const [searchResults, setsearchResults] = useState<any[]>([]);
    const [randomNumber, setRandomNumber] = useState<number>(0);
    const { musicChanged, setgifAverageColor } = useContext(DataContext);
    const fac = new FastAverageColor();

    useEffect(() => {
        giphy.search('anime aesthetic', function (err: any, res: any) {
            //console.log(res);
            setsearchResults(res.data.map((gif: { images: { original: { url: any; }; }; id: any; }) => {
                return {
                    url: gif.images.original.url,
                    id: gif.id
                }
            }));

        });

    }, []);

    useEffect(() => {
        setRandomNumber(randomizer());
    }, [musicChanged]);


    const randomizer = (min = 0, max = 25): number => {
        return Math.floor(Math.random() * (max - min)) + min;
    }


    fac.getColorAsync(searchResults[randomNumber]?.url, { algorithm: 'dominant' })
        .then(color => {
            setgifAverageColor(color.value);
        })
        .catch(e => {
            console.error(e);
        });




    return (
        <AnimeScenaryContainer>
            <img src={searchResults[randomNumber]?.url} alt="gif" />
        </AnimeScenaryContainer>
    )
}

const AnimeScenaryContainer = styled.div`
    width: 100%;
    height: 100%;
    position: absolute;

    img{
        width: 100vw;
        height: 100vh;
        object-fit: cover;
    }
`;

export default AnimeScenary;