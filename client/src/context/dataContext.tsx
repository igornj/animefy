import React, { createContext, useState } from 'react';

type DataContextType = {
    url: string
}

export const DataContext = createContext<DataContextType | any>(null);

export const DataContextProvider: React.FC = ({ children }) => {
    const authUrl = "https://accounts.spotify.com/authorize?client_id=d76d730f48874bc0ac6119312471f2fd&response_type=code&redirect_uri=http://localhost:3000/&scope=user-read-private%20user-read-email%20user-read-playback-state%20user-modify-playback-state%20user-read-currently-playing%20user-library-read%20user-library-modify%20streaming%20user-library-read%20user-library-modify&state=aqASTOBUmSUm2FBA";
    const accountURL = "https://www.spotify.com/br/account/overview/?utm_source=spotify&utm_medium=menu&utm_campaign=12151958760";
    const [musicChanged, setmusicChanged] = useState<boolean>(false);
    const [gifAverageColor, setgifAverageColor] = useState<string>();
    const [complementaryColor, setcomplementaryColor] = useState<string | undefined>();
    const [isOpen, setisOpen] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [playingTrack, setPlayingTrack] = useState<any>();
    const [searchUris, setsearchUris] = useState<string[]>([]);
    const [openProfile, setOpenProfile] = useState<boolean>(false);

    //style={{ color: `rgb(${complementaryColor[1].r}, ${complementaryColor[1].g}, ${complementaryColor[1].b})` }}


    return (
        <DataContext.Provider
            value={{ authUrl: authUrl, musicChanged: musicChanged, setmusicChanged: setmusicChanged, gifAverageColor: gifAverageColor, setgifAverageColor: setgifAverageColor, complementaryColor: complementaryColor, setcomplementaryColor: setcomplementaryColor, isOpen: isOpen, setisOpen: setisOpen, isLoading: isLoading, setIsLoading: setIsLoading, playingTrack: playingTrack, setPlayingTrack: setPlayingTrack, searchUris: searchUris, setsearchUris: setsearchUris, accountURL: accountURL, openProfile: openProfile, setOpenProfile: setOpenProfile }}
        >
            {children}
        </DataContext.Provider>
    );
}














// const [accessToken, setAccessToken] = useState<TokenContextType>();
// const [refreshToken, setRefreshToken] = useState<TokenContextType>();
// const [expiresIn, setExpiresIn] = useState<TokenContextType>();

//const code = new URLSearchParams(window.location.search).get("code") as string
// //erro ta aqui

// if (code) {
//     useEffect(() => {
//         axios
//             .post("http://localhost:3001/", {
//                 code,
//             })
//             .then(res => {
//                 setAccessToken(res.data.accessToken)
//                 setRefreshToken(res.data.refreshToken)
//                 setExpiresIn(res.data.expiresIn)
//                 //window.history.pushState({}, null, "/")
//             })
//             .catch((e) => {
//                 console.log(e);
//                 //window.location.href = "/";
//             });
//     }, [accessToken, refreshToken, expiresIn]);
// } else {
//     console.log('não tenho código no context');
// }


// useEffect(() => {
//     if (!refreshToken || !expiresIn) return
//     const interval = setInterval(() => {
//         axios
//             .post("http://localhost:3001/refresh", {
//                 refreshToken,
//             })
//             .then(res => {
//                 setAccessToken(res.data.accessToken)
//                 setExpiresIn(res.data.expiresIn)
//             })
//             .catch((err: any) => {
//                 //window.location = "/"
//                 console.log(err);
//             })
//     }, (expiresIn - 60) * 1000)

//     return () => clearInterval(interval)
// }, [refreshToken, expiresIn])
