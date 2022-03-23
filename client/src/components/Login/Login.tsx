/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom';
import axios from '../../utils/axios';
import useAuth from '../../hooks/useAuth';
import styled from 'styled-components';
import { BsTwitter, BsInstagram, BsGithub } from 'react-icons/bs';
import { AUTH_URL } from '../../utils/authurl';


import gif01 from './01.gif';
import igor from './igor.jpg';

const Login: React.FC = () => {

  const [authURL, setauthURL] = useState<string>('');



  useEffect(() => {
    axios.get('/login')
      .then(res => {
        setauthURL(res.data.authurl);
      }).catch(e => console.log(e));

  }, []);

  const accessToken = useAuth();
  if (accessToken) {
    return <Navigate to="/" />;
  }



  return (
    <LoginContainer>
      <img src={gif01} alt="gif" />
      <LoginInfo>
        <h1>animeFy</h1>
        <h2>"Web app para ouvir suas músicas do Spotify com cenários de anime maravilhosos ao fundo"</h2>
        <p>Esse é um projeto que utiliza a API do Spotify para músicas e uma API para geração de Gifs de cenários de anime. Nele você consegue ouvir suas músicas da sua conta do Spotify enquanto gifs de Cenários animados são mostrados ao fundo, gerados aleátoriamente a cada mudança de música.</p>
        <p>Basta logar com a sua conta Spotify abaixo e curtir a vibe 😎</p>
        <p>*lembrando que só funciona para contas premium*</p>
        <h3>As atualizações sobre novas features do animeFy serão informadas principalmente no repositório do projeto.</h3>
        <Socials>
          <a href="https://twitter.com/fosade_" target="_blank" rel="noreferrer"><BsTwitter color={'black'} size={30} /></a>
          <a href="https://github.com/igornj/animefy" target="_blank" rel="noreferrer"><BsGithub color={'black'} size={30} /></a>
          <a href="https://www.instagram.com/igor_nj/" target="_blank" rel="noreferrer"><BsInstagram color={'black'} size={30} /></a>
        </Socials>

        <LoginBtn>
          <a href={AUTH_URL}>Logue com o Spotify</a>
        </LoginBtn>
        <img src={igor} alt="igor logo" />
      </LoginInfo>
    </LoginContainer>
  )
}

const LoginContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  img{
    width: 100vw;
    height: 100vh;
  }

`;

const LoginInfo = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 500px;
  height: 750px;
  background: white;
  z-index: 2;
  position: absolute;
  border-radius: 10px;
  overflow: auto;


  h1{
    font-weight: 800;
    letter-spacing: 8px;
  }

  h2{
    margin: 1rem;
    font-size: 1rem;
    text-align: center;
    font-weight: 400;
    font-style: italic;
  }

  p{
    font-size: 0.8rem;
    text-align: justify;
    line-height: 1.5rem;
    margin: 1.5rem 1.5rem 0 1.5rem;
  }

  p:nth-child(4){
    font-size: 0.9rem;
  }

  p:nth-child(5){
    font-size: 0.9rem;
    font-weight: 800;
    border-radius: 40px;
    color: #1cb954;
    margin-bottom: 3rem;
    margin-top: 0;
  }

  h3{
    font-size: 0.8rem;
    text-align: center;
    font-weight: 800;
  }

  img{
    width: 45px;
    height: 45px;
    border-radius: 50%;
    position: absolute;
    bottom: 1rem;
  }
`;

const LoginBtn = styled.div`
  margin-top: 4rem;
  cursor: pointer;

  a{
    text-decoration: none;
    color: white;
    background: #1cb954;
    padding: 1rem;
    border-radius: 40px;
    transition: background 0.4s ease;
  } 
  a:hover{
      background: #0f6e31;
  }
`;


const Socials = styled.div`
  display: flex;
  column-gap: 1.5rem;
  margin-top: 1.5rem;
`;

export default Login;