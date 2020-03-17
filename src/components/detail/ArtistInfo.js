import React from 'react';
import './ArtistInfo.css';

import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Button from '@material-ui/core/Button';
import CakeIcon from '@material-ui/icons/Cake';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import MusicNoteIcon from '@material-ui/icons/MusicNote';
import LabelIcon from '@material-ui/icons/Label';
import FavoriteIcon from '@material-ui/icons/Favorite';
import GroupIcon from '@material-ui/icons/Group';

export default function ArtistInfo({artist}) {
    return (
        <div>
            <div className="ArtistInfo">
                <img alt="Artist" src={artist?.picture?.medium} />
                <span>{artist?.name}</span>
            </div>
            <div>
                <List>
                    <ListItem>
                        <ListItemAvatar>
                            <Avatar>
                                <CakeIcon />
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary="Date de naissance" secondary={artist?.lifeSpan?.begin} />
                    </ListItem>
                    <Divider variant="inset" component="li" />
                    <ListItem>
                        <ListItemAvatar>
                            <Avatar>
                                <LocationOnIcon />
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary="Localisation" secondary={artist?.locationInfo?.join(', ')} />
                    </ListItem>
                    <Divider variant="inset" component="li" />
                    <ListItem>
                        <ListItemAvatar>
                            <Avatar>
                                <MusicNoteIcon />
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary="Genre" secondary={artist?.genres?.join(', ')} />
                    </ListItem>
                    <Divider variant="inset" component="li" />
                    <ListItem>
                        <ListItemAvatar>
                            <Avatar>
                                <LabelIcon />
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary="Label" secondary={artist?.labels?.join(', ')} />
                    </ListItem>
                    <Divider variant="inset" component="li" />
                    <ListItem>
                        <ListItemAvatar>
                            <Avatar>
                                <FavoriteIcon />
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary="Deezer fans" secondary={artist?.deezerFans} />
                    </ListItem>
                    <Divider variant="inset" component="li" />
                </List>
                <div className="ArtistInfo-members-button">
                    <Button
                        variant="contained"
                        color="default"
                        startIcon={<GroupIcon />}
                    >
                        Voir les membres
                    </Button>
                </div>
            </div>
        </div>
    );
}
