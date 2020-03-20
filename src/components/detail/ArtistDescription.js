import React from 'react';
import './ArtistDescription.css';
import urls from './data/urls';

export default function ArtistDescription({artist}) {
    return (
        <div>
            <span>
                {artist?.dbp_abstract}
            </span>
            <nav className="ArtistDescription-externalLinks">
                {
                    urls.map((url,index) => {
                        return (
                            <a className={(artist[url.urlName] === '') ? 'ArtistDescription-hiddenLink' : ''} key={index} title={url.urlAlt} onClick={() => window.open(artist[url.urlName], '_blank')}>
                                <div>
                                    <img src={url.imageUrl} alt={url.urlAlt}/>
                                </div>
                            </a>
                        )
                    })
                }
            </nav>
        </div>
    );
}
