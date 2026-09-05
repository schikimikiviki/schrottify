# YT-DLP Usage

Using cmd: 

```
 yt-dlp -x --audio-format mp3 'https://www.youtube.com/watch?v=Jklg-ivTHYQ&start_radio=1'
```

Important: when the URL has "&list" a whole ass playlist/ shuffle is downloaded so pay attention. 


# Spotify APi

First you need to get the access token. With the token the rest can be fetched. 

Try: 
```
curl -X POST 'https://accounts.spotify.com/api/token' \
  -H 'Authorization: Basic '$(printf '%s' 'client_ID:client_secret' | base64) \
  -H 'Content-Type: application/x-www-form-urlencoded' \
  -d 'grant_type=client_credentials'
```

This is the request for a playlist: 

```
curl 'https://api.spotify.com/v1/playlists/5ATbARi8XEvqgvxdUZldFb' \
  -H 'Authorization: Bearer token'
```


# Youtube API
the song and artist names are used for querying the youtube API. 

# TODO 
- rewrite vanilla js into express server
- serve frontend