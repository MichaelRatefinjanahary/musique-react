import React from 'react';
import './App.css';
import Header from './components/header/Header';
import ArtistList from './components/home/ArtistList';
import DetailArtist from './components/detail/DetailArtist';
import { BrowserRouter, Route } from "react-router-dom";

export default function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />

        <Route exact path="/" component={ArtistList}></Route>
        <Route path="/artist/:artistName" render={(props) => (
          <DetailArtist key={props.match.params.artistName} {...props} />)
        } />
      </BrowserRouter>
    </div>
  );
}
