import React from 'react';
import Favorites from '../Favorites/Favorites';
import Search from '../Search/Search';
import '../App/app.css';

function App(props) {
  return (
    <div>
      <h1>Giphy Search!</h1>
      {/* GET ME COFFEE JAMES */}
      <Search />
      <Favorites />
    </div>
  );
}

export default App;
