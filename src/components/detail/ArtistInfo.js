import React from 'react';
import { useState } from 'react';
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
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Grid from '@material-ui/core/Grid';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

export default function ArtistInfo({ artist }) {
    const [open, setOpen] = useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const formerMembers = artist?.members?.filter(member => {
        return member.ended === true
    });

    const members = artist?.members?.filter(member => {
        return member.ended === false
    });

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
                        onClick={handleClickOpen}
                    >
                        Voir les membres
                    </Button>
                    <Dialog
                        fullWidth={true}
                        maxWidth='lg'
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="max-width-dialog-title"
                    >
                        <DialogTitle id="max-width-dialog-title">{artist.name} membres</DialogTitle>
                        <DialogContent>
                            <Grid container spacing={2}>
                                <Grid item md={6} xs={12}>
                                    <h4>Membres</h4>
                                    <Table aria-label="simple table">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>Nom</TableCell>
                                                <TableCell>Instruments</TableCell>
                                                <TableCell>Debut</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {members?.map((member, index) => (
                                                <TableRow key={index}>
                                                    <TableCell component="th" scope="row">
                                                        {member.name}
                                                    </TableCell>
                                                    <TableCell>{member.instruments.join(', ')}</TableCell>
                                                    <TableCell>{member.begin}</TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </Grid>
                                <Grid item md={6} xs={12}>
                                    <h4>Anciens membres</h4>
                                    <Table aria-label="simple table">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>Nom</TableCell>
                                                <TableCell>Instruments</TableCell>
                                                <TableCell>Debut</TableCell>
                                                <TableCell>Fin</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {formerMembers?.map((member, index) => (
                                                <TableRow key={index}>
                                                    <TableCell component="th" scope="row">
                                                        {member.name}
                                                    </TableCell>
                                                    <TableCell>{member.instruments.join(', ')}</TableCell>
                                                    <TableCell>{member.begin}</TableCell>
                                                    <TableCell>{member.end}</TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </Grid>
                            </Grid>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleClose} color="primary">
                                Close
                            </Button>
                        </DialogActions>
                    </Dialog>
                </div>
            </div>
        </div>
    );
}
