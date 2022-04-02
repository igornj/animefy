import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

import gif from './gif01.gif';


const Page404 = () => {

    const navigate = useNavigate();

    const goToLogin = () => {
        navigate('/login');
    }

    return (
        <Page404Container>
            <img src={gif} alt="gif" />
            <div>
                <h1>404</h1>
                <h2>Essa página não existe</h2>
                <button onClick={() => goToLogin()} type="button">Voltar ao Login</button>
            </div>
        </Page404Container>
    )
}

export const Page404Container = styled.div`
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;

    img{
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    div{
        width: 400px;
        height: 200px;
        background: white;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        border-radius: 10px;
        text-align: center;
    }

    h1{
        margin-top: 2rem;
        color: #1cb954;
    }

    h2{
        font-weight: 400;
    }

    button{
        border: none;
        background:  #1cb954;
        color: white;
        padding: 1rem 3rem; 
        border-radius: 10px;
        font-weight: 400;
        margin-top: 2rem;
        cursor: pointer;
        transition: all 0.2s ease;
    }
    :hover{
        background:  #0f6e31;
    }


`;


export default Page404;