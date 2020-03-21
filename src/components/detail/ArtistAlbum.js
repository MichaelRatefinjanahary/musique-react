import React from 'react';
import './ArtistAlbum.css';

import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import { red } from '@material-ui/core/colors';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

const useStyles = makeStyles(theme => ({
  root: {
    width: 340,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  avatar: {
    backgroundColor: red[500],
  },
  content: {
    height: 200,
    overflowY: 'auto'
  }
}));

export default function ArtistAlbum({artist, album}) {
  const classes = useStyles();
  const defaultAlbumImage = '/img/album.png';
  return (
    <div className="ArtistAlbum">
      <Card className={classes.root} variant="outlined">
        <CardHeader
          avatar={
            <Avatar aria-label="recipe" className={classes.avatar}>
              {artist?.name[0]?.toUpperCase()}
            </Avatar>
          }
          title={album?.title}
          subheader={album?.publicationDate}
        />
        <CardMedia
          className={classes.media}
          image={
            ('cover' in album) ? album?.cover?.medium : defaultAlbumImage
          }
          title={album?.title}
        />
        <CardContent className={classes.content}>
          <List component="nav" aria-label="secondary mailbox folders">
            {
              album?.songs?.map(song => {
                return <ListItem button key={song.position}><ListItemText primary={(song.position + 1) + '. ' + song.title} /></ListItem>
              })
            }
          </List>
        </CardContent>
      </Card>
    </div>
  );
}
