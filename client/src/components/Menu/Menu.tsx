import React, { useContext } from 'react';
import styled from 'styled-components';
import { DataContext } from '../../context/dataContext';
import { BiSearch } from 'react-icons/bi';
import { BsFillHeartFill } from 'react-icons/bs';
import { RiPlayListFill } from 'react-icons/ri';

const Menu = () => {
    const { setisOpen } = useContext(DataContext);


    return (
        <MenuContainer>
            <Search onClick={() => setisOpen(true)}>
                <SearchIcon />
            </Search>

            <FavSongs>
                <HeartIcon />
            </FavSongs>


            <Playlists>
                <PlaylistIcon />
            </Playlists>
        </MenuContainer>
    )
}


const MenuContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    row-gap: 1rem;
    width: 100vw;
    height: 100vh;
    z-index: 11;
    background:  rgba(0,0,0,0.8);
    position: absolute;
    opacity: 0;
    transition: opacity 0.3s ease;

    :hover{
        opacity: 1;
    }

`;

const Search = styled.div`
    cursor: pointer;
    padding: 1rem;
`;

const FavSongs = styled.div`
    cursor: pointer;
    padding: 1rem;
`;

const Playlists = styled.div`
    cursor: pointer;
    padding: 1rem;
`;


const SearchIcon = styled(BiSearch)`
    color: #707070;
    font-size: 3rem;
    transition: color 0.3s ease;
    :hover{
        color: #1cb954;
    }
`;

const HeartIcon = styled(BsFillHeartFill)`
    color: #707070;
    font-size: 3rem;
    transition: color 0.3s ease;
    :hover{
        color: #1cb954;
    }
`;



const PlaylistIcon = styled(RiPlayListFill)`
    color: #707070;
    font-size: 3rem;
    transition: color 0.3s ease;
    :hover{
        color: #1cb954;
    }
`;







export default Menu