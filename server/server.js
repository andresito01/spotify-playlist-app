require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const SpotifyWebApi = require("spotify-web-api-node");

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post("/refresh", (req, res) => {
  const refreshToken = req.body.refreshToken;
  const spotifyApi = new SpotifyWebApi({
    redirectUri: process.env.REDIRECT_URI,
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    refreshToken,
  });

  spotifyApi
    .refreshAccessToken()
    .then((data) => {
      res.json({
        accessToken: data.body.access_token,
        expiresIn: data.body.expires_in,
      });
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(400);
    });
});

app.post("/login", (req, res) => {
  const code = req.body.code;
  const spotifyApi = new SpotifyWebApi({
    redirectUri: process.env.REDIRECT_URI,
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
  });

  spotifyApi
    .authorizationCodeGrant(code)
    .then((data) => {
      res.json({
        accessToken: data.body.access_token,
        refreshToken: data.body.refresh_token,
        expiresIn: data.body.expires_in,
      });
    })
    .catch((err) => {
      res.sendStatus(err);
    });
});

// //hydrate params
// const tokenAuthEndpoint = "https://accounts.spotify.com/api/token";
// const combotoBuffer = Buffer.from(client_id + ":" + client_secret).toString(
//   "base64"
// );
// const headerHandle = {
//   headers: {
//     Authorization: "Basic " + combotoBuffer,
//     "content-type": "application/x-www-form-urlencoded",
//   },
// };

// app.post("/refresh", (req, res) => {
//   const refreshToken = req.body.refreshToken;
//   //query params for refreshing
//   const queryS = new url.URLSearchParams();
//   queryS.append("grant_type", "refresh_token");
//   queryS.append("refresh_token", refreshToken);
//   queryS.append("redirect_uri", redirect_uri);

//   axios
//     .post(tokenAuthEndpoint, queryS.toString(), headerHandle)
//     .then((data) => {
//       console.log("refresh complete token parity: ", data.body.accessToken);
//       res.json({
//         accessToken: data.body.accessToken,
//         expiresIn: data.body.expiresIn,
//       });
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// });

// app.post("/login", (req, res) => {
//   const code = req.body.code;
//   //query params for logging in
//   const queryS = new url.URLSearchParams();
//   queryS.append("grant_type", "authorization_code");
//   queryS.append("code", code);
//   queryS.append("redirect_uri", redirect_uri);
//   console.log(queryS);
//   console.log(headerHandle);
//   //###post request using axios and manually setting headers
//   axios
//     .post(tokenAuthEndpoint, queryS.toString(), headerHandle)
//     .then((response) => {
//       console.log(response.data);
//       res.json({
//         accessToken: response.data.access_token,
//         token_type: response.data.token_type,
//         expiresIn: response.data.expires_in,
//         refreshToken: response.data.refresh_token,
//       });
//     })
//     .catch((err) => {
//       console.log("error: ", err);
//     });
// });
app.listen(3001, (err) => {
  if (err) console.log(err);
  console.log("listening on port 3001");
});
