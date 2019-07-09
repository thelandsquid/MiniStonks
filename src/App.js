import React from 'react';
import './App.css';
import { BrowserRouter, Route } from "react-router-dom";
import { NavigationBar } from './pages/NavigationBar'
import {HomePage} from './pages/homepage/HomePage.js';

function App() {
  return (
    <div>
      <body className="App">
        <BrowserRouter>
          <NavigationBar />
          <Route exact path="/" component={HomePage} />
          <Route path="/find-stock" component={HomePage} />
          <Route path="/settings" component={HomePage} />
        </BrowserRouter>
      </body>
    </div>
  );
}

export default App;
