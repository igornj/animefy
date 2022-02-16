/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from 'react'
import axios from 'axios';


const Login: React.FC = () => {

  const [authURL, setauthURL] = useState<string>('');
  //https://accounts.spotify.com/authorize?client_id=d76d730f48874bc0ac6119312471f2fd&response_type=code&redirect_uri=http://localhost:3000/&scope=user-read-private%20user-read-email%20user-read-playback-state%20user-modify-playback-state%20user-read-currently-playing%20user-library-read%20user-library-modify&state=aqASTOBUmSUm2FBA
  //?code=AQAJmD123Ijeg8FWHfdn4VvTJgRS6YwXGIX5JTJ3T9S2hUEwnWfQU9BraE5qJDpetD19jotyp6VqWIJ-cqCwn7d2Qp0jA8TvoOsgJH3iwWdCZuC5AlEkKUFrlKBRQ8aDH83r1prOArAKwYdkfGeAlVPGfRoqkfEtvLDMqjvkDrAUBVlD06c_Vff2RVqhzpv2k6fo7n275OZ48BMyCvDqOFt9Hp3FPtbCSth3aWNkG2h6S9II4PAD-VY_AfqVE0a-ccFx3PoZxlGScwl768Y6XQ_mjUzyxaMH03pKO3XIT8uTR68sdG5aL6KbaeC-FoiME212xu7Z_cjIDTDQGXs6v5NQjn8dAxrKelcxUBuCoDtfRTcZvi3j8Es&state=aqASTOBUmSUm2FBA

  useEffect(() => {
    axios.get('http://localhost:3001/')
      .then(res => {
        setauthURL(res.data.authurl);
      }).catch(e => console.log(e));
  }, []);


  return (
    <div>
      <a href={authURL}>Logue com o Spotify</a>
    </div>
  )
}

export default Login