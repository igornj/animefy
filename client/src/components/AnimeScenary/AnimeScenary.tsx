import React, { useEffect, useState, useContext } from 'react';
import styled from 'styled-components';
import FastAverageColor from 'fast-average-color';
import { DataContext } from '../../context/dataContext';

const complementaryColors = require('complementary-colors');
const giphy = require('giphy-api')(process.env.REACT_APP_GIPHY_KEY);

const AnimeScenary = (uri: any) => {
    const [searchResults, setsearchResults] = useState<any[]>([]);
    const [randomNumber, setRandomNumber] = useState<number>(0);
    const { musicChanged, setgifAverageColor, setcomplementaryColor } = useContext(DataContext);
    const fac = new FastAverageColor();

    const randomizer = (min = 0, max = 25): number => {
        return Math.floor(Math.random() * (max - min)) + min;
    }

    useEffect(() => {
        giphy.search('anime aesthetic', function (err: any, res: any) {
            //console.log(res);
            setsearchResults(res.data?.map((gif: { images: { original: { url: any; }; }; id: any; }) => {
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


    useEffect(() => {
        fac.getColorAsync(searchResults[randomNumber]?.url, { algorithm: 'simple' })
            .then(color => {
                setgifAverageColor(color.rgb);
                const compColor = new complementaryColors(color.rgb);
                setcomplementaryColor(compColor.analogous());
            })
            .catch(e => {
                //console.error(e);
            });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [uri]);


    // const getAverageColor = (): void => {
    //     fac.getColorAsync(searchResults[randomNumber]?.url, { algorithm: 'simple' })
    //         .then(color => {
    //             setgifAverageColor(color.rgb);
    //             const compColor = new complementaryColors(color.rgb);
    //             setcomplementaryColor(compColor.analogous());
    //         })
    //         .catch(e => {
    //             console.error(e);
    //         });
    // }


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

    @media screen and (min-width: 1000px){
        img{
            object-fit: fill;
        }
    }
`;

export default AnimeScenary;