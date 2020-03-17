import React from 'react';
import './ArtistDescription.css';
import Divider from '@material-ui/core/Divider';

export default function ArtistDescription({artist}) {
    return (
        <div>
            <span>
                {artist?.dbp_abstract}
            </span>
            <Divider className="DetailArtist-divider" variant="middle" component="div" />
        </div>
    );
}
