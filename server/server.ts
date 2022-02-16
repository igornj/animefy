import { Request, Response } from "express";

const express = require('express');
const cors = require('cors');
require("dotenv").config()
const app = express();
const bodyParser = require('body-parser');

const SpotifyWebApi = require('spotify-web-api-node')

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post("/refresh", (req: Request, res: Response) => {
    //Here we refresh the token using the refreshToken generated on the login in
    const refreshToken = req.body.refreshToken as string
    const spotifyApi = new SpotifyWebApi({
        redirectUri: process.env.REDIRECT_URI,
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        refreshToken,
    })

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
})


app.post("/login", (req: Request, res: Response) => {
    //Here we create the tokens using the code genarated in the moment the user logged in
    const code = req.body.codeFromAuthURL as string;

    const spotifyApi = new SpotifyWebApi({
        redirectUri: process.env.REDIRECT_URI,
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
    })


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
        })
});



app.get('/', (req: any, res: any) => {
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
    ];

    const state = process.env.STATE;

    // Create the authorization URL
    const authorizeURL = spotifyApi.createAuthorizeURL(scopes, state);
    res.json({ authurl: authorizeURL });
});



app.listen(3001, () => {
    console.log('Server runnng on port: 3001');
});
















