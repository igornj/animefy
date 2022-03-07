import React, { useEffect, useState } from 'react'
const giphy = require('giphy-api')();

const AnimeScenary = () => {

    const [searchResults, setsearchResults] = useState<any[]>([])

    useEffect(() => {
        giphy.search('anime aesthetic', function (err: any, res: any) {
            //console.log(res);
            setsearchResults(res.data.map(gif => {
                return {
                    url: gif.images.original.url,
                    id: gif.id
                }
            }));

        });

    }, []);

    console.log(searchResults);

    return (
        <div>
            <img src={searchResults[10].url} alt="gif" /> 
        </div>
    )
}

export default AnimeScenary