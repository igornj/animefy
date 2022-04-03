import React, { useContext } from 'react'
import styled from 'styled-components';
import { RiCloseLine, RiLogoutBoxRLine } from 'react-icons/ri'
import { DataContext } from '../../context/dataContext';
import { flag } from 'country-emoji';

type TUser = {
  email?: string,
  image?: string,
  url?: string,
  display_name?: string,
  country?: string,
  id?: string,
  followers?: number,
  user: any,
}


function ProfileDetails({ user }: TUser) {
  const { accountURL, setOpenProfile } = useContext(DataContext);

  const handleLogout = (): void => {

  }

  return (
    <ProfileContainer>
      <Profile onClick={() => setOpenProfile(false)}>
        <CloseIcon onClick={() => setOpenProfile(false)} />
        <a href={`${accountURL}${user?.id}`} target="_blank" rel="noreferrer">
          <img src={user?.image} alt="user-img" />
        </a>
        <h1>{user?.display_name}</h1>
        <Info>
          <p>{user?.email} •</p>
          <p>{flag(user?.country)} •</p>
          <p>{user?.followers} Followers </p>
        </Info>

        <LogoutIcon onClick={handleLogout} />
      </Profile>
    </ProfileContainer>
  )
}


const ProfileContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,0.8);
  position: absolute;
  z-index: 11;
`;


const Profile = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 60%;
  height: 60%;
  background: #252525;
  color: white;
  border-radius: 10px;
  position: relative;
  text-align: center;


  img{
    width: 40%;
    border-radius: 50%;
    margin-bottom: 1rem;
    transition: filter 0.3s ease;
    :hover{
      filter: invert(0%) sepia(8%) saturate(2000%) hue-rotate(101deg) brightness(70%) contrast(100%);
    }
  }

  h1{
    font-size: 1.8rem;
    margin-bottom: 1rem;
  }


  @media screen and (min-width: 1000px){

    h1{
      font-size: 4rem;
      margin: 0 0 1rem 15rem;
      white-space: nowrap;
    }


    img{
      position: absolute;
      top: 50%;
      left: 1rem;
      transform: translate(0, -50%);
      width: 35%;
    }
  }
`;

const Info = styled.div`
  p{
    margin-bottom: 1rem;
  }

  @media screen and (min-width: 1000px){
    display: flex;
    justify-content: center;
    align-items: center;
    column-gap: 10px;
    margin-left: 12rem;

    p{
      font-size: 1rem;
      margin: 0;
    }
  }


`;


const CloseIcon = styled(RiCloseLine)`
  cursor: pointer;
  color: #707070;
  font-size: 3rem;
  position: absolute;
  top: 0;
  right: 0;
  margin: 1rem;
  transition: color 0.3s ease;

  :hover{
      color: #1cb954;
  }
`;

const LogoutIcon = styled(RiLogoutBoxRLine)`
  cursor: pointer;
  color: #707070;
  font-size: 3rem;
  transition: color 0.3s ease;
  margin-top: 2rem;
  :hover{
      color: #1cb954;
  }

  @media screen and (min-width: 1000px){
    position: absolute;
    top: 80%;
`;





export default ProfileDetails;