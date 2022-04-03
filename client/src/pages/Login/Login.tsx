/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState, useContext } from 'react'
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
        <Info>
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
        </Info>
        <img src={igor} alt="igornj logo" />
      </LoginInfo>
    </LoginContainer>
  )
}

const LoginContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  height: 100vh;

  img{
    width: 100%;
    height: 100vh;
  }

`;

const LoginInfo = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 500px;
  height: 75%;
  position: absolute; 
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 10px;
  background: white;

  img{
    width: 35px;
    height: 35px;
    border-radius: 50%;
    position: absolute;
    bottom: -5rem;
  }

  @media screen and (max-width: 500px){
    width: 85%;
    height: 70%;
    position: absolute; 
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 10px;
    background: white;

    img{
      width: 30px;
      height: 30px;
      border-radius: 50%;
      bottom: -5rem;
    }
  }

  @media screen and (max-height: 650px){
    height: 85%;

    img{
      width: 30px;
      height: 30px;
      border-radius: 50%;
      bottom: -2.5rem;
      left: 50%;
      transform: translate(-50%, 0);
    }
  }
`;

const Info = styled.div`
    margin-top: 4rem;
    text-align: center;
    max-width: 90%;
    height: 100%;

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
    text-align: center;
  }

  p:nth-child(5){
    font-size: 0.9rem;
    font-weight: 800;
    border-radius: 40px;
    color: #1cb954;
    margin-bottom: 2rem;
    margin-top: 0;
    text-align: center;
  }

  h3{
    font-size: 0.8rem;
    text-align: center;
    font-weight: 800;
  }

  @media screen and (max-width: 500px){
    margin-top: 1.5rem;

    h1{
      font-size: 1rem;
    }

    h2{
      font-size: 0.8rem;
    }

    p{
      font-size: 0.7rem;
      text-align: justify;
      line-height: 1.2rem;
      margin: 1rem 1rem 0 1rem;
    }

    p:nth-child(4){
      font-size: 0.8rem;
      text-align: center;
    }

    p:nth-child(5){
      font-size: 0.8rem;
      font-weight: 800;
      border-radius: 40px;
      color: #1cb954;
      margin-bottom: 1rem;
      margin-top: 0;
      text-align: center;
    }

    h3{
      font-size: 0.7rem;
      margin: 0 0.5rem;
    }
  }

  @media screen and (max-height: 650px){
    h1{
      font-size: 1.5rem;
    }

    h2{
      font-size: 0.8rem;
    }

    p{
      font-size: 0.8rem;
      text-align: justify;
      line-height: 1.2rem;
      margin: 1rem 1rem 0 1rem;
    }

    p:nth-child(4){
      font-size: 0.8rem;
      text-align: center;
    }

    p:nth-child(5){
      font-size: 0.8rem;
      font-weight: 800;
      border-radius: 40px;
      color: #1cb954;
      margin-bottom: 1rem;
      margin-top: 0;
      text-align: center;
    }

    h3{
      font-size: 0.7rem;
      margin: 0 0.5rem;
    }
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

  @media screen and (max-width: 500px){
    margin-top: 1.5rem;

    a{
      padding: 0.8rem;
      font-size: 0.8rem;
    }
  }

  @media screen and (max-height: 650px){
    margin-top: 2.5rem;
  }
`;


const Socials = styled.div`
  margin-top: 1.5rem;
  text-align: center;

  a{
    margin: 10px;
  }

  @media screen and (max-width: 500px){
    margin-top: 0.7rem;

  }
`;

export default Login;