import React from 'react';
import './App.css';

import Navbar from './components/Navbar'
import Home from './pages/Home'
import Rooms from './pages/Rooms'
import SingleRoom from './pages/SingleRoom'
import Error from './pages/error'
import { Route, Switch } from 'react-router-dom'

//Route gets the diff pages for each app based on html app- exact path for just showing THAT page
//slug is like :id- just to show diff pages of the same type
//switch goes to the first path that matches- route with no path always matches (error page)
function App() {
  return (
    <div className="App">
      <Navbar />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/rooms/" component={Rooms} />
        <Route exact path="/rooms/:slug" component={SingleRoom} />
        <Route component={Error} />
      </Switch>

    </div>
  );
}

export default App;
