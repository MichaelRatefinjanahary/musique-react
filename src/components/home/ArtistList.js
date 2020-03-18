import React from 'react';
import { useState } from 'react';
import './ArtistList.css';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import NavigateNext from '@material-ui/icons/NavigateNext'
import NavigateBefore from '@material-ui/icons/NavigateBefore'
import ArtistListFilter from './ArtistListFilter';
import { useHistory } from 'react-router-dom';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
}));

let currentPage = 0;
function sleep(delay = 0) {
    return new Promise(resolve => {
        setTimeout(resolve, delay);
    });
}

export default function ArtistList() {
    const classes = useStyles();
    const [artists, setArtists] = useState([]);
    const [classHidden, setClassHidden] = useState('ArtistList-hidden');
    const [currentAlphabet, setCurrentAlphabet] = useState('');
    const history = useHistory();
    const [open, setOpen] = useState(false);

    const fetchData = async (alphabet, page) => {
        let url = new URL('https://wasabi.i3s.unice.fr/search/categorie/Artists/lettre/' + alphabet + '/page/' + page);
        const response = await fetch(url);
        const responseJson = await response.json();

        return responseJson;
    }

    const filterArtistList = async (alphabet) => {
        setOpen(true);
        currentPage = 0;
        const listArtist = await fetchData(alphabet, currentPage);
        setArtists(listArtist.artists);
        setClassHidden('');
        setCurrentAlphabet(alphabet);
        setOpen(false);
    }

    const toDetailArtist = (artistName) => {
        history.push('/artist/' + artistName);
    }

    const navigate = async (next) => {
        setOpen(true);
        if (next) {
            currentPage += 1;
        }
        else {
            if (currentPage !== 0) {
                currentPage -= 1;
            }
        }
        await sleep(1e1);
        const listArtist = await fetchData(currentAlphabet, currentPage);
        setArtists(listArtist.artists);
        setClassHidden('');
        setOpen(false);
    }

    return (
        <div>
            <ArtistListFilter filterArtistListHandler={filterArtistList} />

            <div className={'ArtistList ' + classHidden}>
                <nav className="ArtistList-pagination-nav">
                    <IconButton className="ArtistList-iconButton" color="primary" aria-label="before" onClick={() => navigate(false)}>
                        <NavigateBefore />
                    </IconButton>
                    <IconButton className="ArtistList-iconButton" color="primary" aria-label="next" onClick={() => navigate(true)}>
                        <NavigateNext />
                    </IconButton>
                </nav>
                <Grid className="ArtistList-button-container" container spacing={3}>
                    {artists.map((artist, index) => {
                        return (
                            <Grid item md='auto' key={index}>
                                <Button className="ArtistList-button" variant="contained" onClick={() => toDetailArtist(artist.name)}>{artist.name}</Button>
                            </Grid>
                        )
                    })}
                </Grid>
            </div>
            <Backdrop className={classes.backdrop} open={open}>
                <CircularProgress color="inherit" />
            </Backdrop>
        </div>
    );
}
