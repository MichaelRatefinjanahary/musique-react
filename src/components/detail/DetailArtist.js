import React from 'react';
import { useState, useEffect } from 'react';
import './DetailArtist.css';
import Grid from '@material-ui/core/Grid';

import ArtistInfo from './ArtistInfo';
import ArtistDescription from './ArtistDescription';
import ArtistAlbum from './ArtistAlbum';

export default function DetailArtist(props) {

  const artistName = props.match.params.artistName;
  const [artist, setArtist] = useState({});

  const fetchData = async (artistName) => {
    let url = new URL('https://wasabi.i3s.unice.fr/search/artist/' + artistName);
    const response = await fetch(url);
    const responseJson = await response.json();

    return responseJson;
  }

  useEffect(() => {
    fetchData(artistName).then(artist => {
      setArtist(artist);
    });
  }, [artistName]);

  return (
    <div className="DetailArtist">
      <Grid className="DetailArtist-general-info" container>
        <Grid className="DetailArtist-info-container" item md={5} xs={12}>
          <ArtistInfo artist={artist} />
        </Grid>
        <Grid className="DetailArtist-description" item md={7} xs={12}>
          <ArtistDescription artist={artist} />
        </Grid>
      </Grid>
      <Grid className="DetailArtist-albums" container spacing={3}>
        {
          artist?.albums?.map((album, index) => {
            return <Grid item md="auto" key={index} ><ArtistAlbum artist={artist} album={album} /></Grid>
          })
        }
      </Grid>
    </div>
  );
}
