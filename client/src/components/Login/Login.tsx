/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom';
import axios from 'axios';
import useAuth from '../../hooks/useAuth';



const Login: React.FC = () => {

  const [authURL, setauthURL] = useState<string>('');
  //https://accounts.spotify.com/authorize?client_id=d76d730f48874bc0ac6119312471f2fd&response_type=code&redirect_uri=http://localhost:3000/&scope=user-read-private%20user-read-email%20user-read-playback-state%20user-modify-playback-state%20user-read-currently-playing%20user-library-read%20user-library-modify%20streaming%20user-library-read%20user-library-modify&state=aqASTOBUmSUm2FBA


  useEffect(() => {
    axios.get('http://localhost:3001/login')
      .then(res => {
        setauthURL(res.data.authurl);
      }).catch(e => console.log(e));

  }, []);

  const accessToken = useAuth();
  if (accessToken) {
    return <Navigate to="/" />;
  }



  return (
    <div>
      <a href={authURL}>Logue com o Spotify</a>
    </div>
  )
}

export default Login