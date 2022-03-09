import React, { useEffect, useState, useContext } from 'react'
import { DataContext } from '../../context/dataContext';
const giphy = require('giphy-api')();

const AnimeScenary = () => {
    const [searchResults, setsearchResults] = useState<any[]>([]);
    const [randomNumber, setRandomNumber] = useState<number>(0);
    const { musicChanged } = useContext(DataContext);

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

    useEffect(() =>{
        setRandomNumber(randomizer());
    },[musicChanged]);


    const randomizer = (min = 0, max = 25) : number => {
        return Math.floor(Math.random() * (max - min)) + min;
    }

    return (
        <div>
            <img key="dale" src={searchResults[randomNumber]} style={{ width: '100%', height: '100%' }} alt="gif" />
        </div>
    )
}

export default AnimeScenary