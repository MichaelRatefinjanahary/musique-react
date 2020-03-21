import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useHistory } from 'react-router-dom';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import './SearchAutocomplete.css'

function sleep(delay = 0) {
  return new Promise(resolve => {
    setTimeout(resolve, delay);
  });
}

export default function SearchAutocomplete() {
  const [open, setOpen] = React.useState(false);
  const [options, setOptions] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const history = useHistory();
  const defaultPicture = '/img/artist.png';

  const handleChange = async (e) => {
    setLoading(true);
    const value = e.target.value;
    if (value !== '') {
      // let url = new URL('https://wasabi.i3s.unice.fr/search/fulltext/' + value);
      const response = await fetch('/api/fulltext/' + value);
      await sleep(1e3);
      const artists = await response.json();
      setOptions(artists.map(artist => {
        return {
          name: artist.name,
          picture: artist.picture
        }
      }));

      setLoading(false);
      setOpen(true);
      return;
    }
    setLoading(false);
    setOpen(false);
    setOptions([]);
  }

  return (
    <Autocomplete
      id="asynchronous-demo"
      style={{ width: 450 }}
      open={open}
      onChange={(e, value) => {
        if (value !== null) {
          history.push('/artist/' + value.name);
        }
      }}
      onClose={() => {
        setOpen(false);
      }}
      getOptionSelected={(option, value) => option.name === value.name}
      getOptionLabel={option => option.name}
      options={options}
      loading={loading}
      renderOption={(option) => (
        <ListItem>
          <ListItemAvatar className="SearchAutocomplete-list">
            <img src={(option.picture === '' ? defaultPicture : option.picture)} alt=""/>
          </ListItemAvatar>
          <ListItemText primary={option.name} />
        </ListItem>
      )}
      renderInput={params => (
        <TextField
          {...params}
          variant="outlined"
          placeholder="Rechercher un artiste ..."
          onChange={handleChange}
          InputProps={{
            ...params.InputProps,
            style: {
              paddingLeft: 50,
              color: 'white'
            },
            endAdornment: (
              <React.Fragment>
                {loading ? <CircularProgress color="inherit" size={20} /> : null}
                {params.InputProps.endAdornment}
              </React.Fragment>
            ),
          }}
        />
      )}
    />
  );
}