const express = require('express');
const cors = require('cors');
require("dotenv").config()
const app = express();
const bodyParser = require('body-parser');
const path = require('path');

const SpotifyWebApi = require('spotify-web-api-node')

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'client', 'build')));

app.get('*', (req: any, res: any) => {
    res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
});


app.get('/login', (req: any, res: any) => {
    //Here genarate a auth url to make the user login
    const spotifyApi = new SpotifyWebApi({
        redirectUri: process.env.REDIRECT_URI,
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
    })

    const scopes = [
        'user-read-private',
        'user-read-email',
        'user-read-playback-state',
        'user-modify-playback-state',
        'user-read-currently-playing',
        'user-library-read',
        'user-library-modify',
        'streaming',
        'user-library-read',
        'user-library-modify',
    ];

    const state = process.env.STATE;

    // Create the authorization URL
    const authorizeURL = spotifyApi.createAuthorizeURL(scopes, state);
    res.json({ authurl: authorizeURL });
});




app.post("/", (req: any, res: any) => {
    const code = req.body.code;

    const spotifyApi = new SpotifyWebApi({
        redirectUri: process.env.REDIRECT_URI,
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
    });

    if (code) {
        spotifyApi
            .authorizationCodeGrant(code)
            .then((data: { body: { access_token: string; refresh_token: string; expires_in: number; }; }) => {
                res.json({
                    accessToken: data.body.access_token,
                    refreshToken: data.body.refresh_token,
                    expiresIn: data.body.expires_in,
                })
            })
            .catch((err: any) => {
                console.log(err);
            });
    }

    return;

});



app.post("/refresh", (req: any, res: any) => {
    //Here we refresh the token using the refreshToken generated on the login in
    const refreshToken = req.body.refreshToken as string
    const spotifyApi = new SpotifyWebApi({
        redirectUri: process.env.REDIRECT_URI,
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        refreshToken,
    });

    spotifyApi
        .refreshAccessToken()
        .then((data: { body: { accessToken: any; expiresIn: any; }; }) => {
            res.json({
                accessToken: data.body.accessToken,
                expiresIn: data.body.expiresIn,
            })
        })
        .catch((err: any) => {
            console.log(err)
            res.sendStatus(400)
        })
});


//process.env.PORT || 
app.listen(process.env.PORT || 3001, () => {
    console.log('Server runnng on port: ', process.env.PORT);
});