import React, { Component } from 'react';
import './App.css';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';
import About from './components/About';
import Help from './components/Help';
import Terms from './components/Terms';
import Doi2Abstract from './components/Doi2Abstract';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <div className="container">
            <Switch>
              <Route path="/about" component={About} />
              <Route path="/terms" component={Terms} />
              <Route path="/help" component={Help} />
              <Route path="/abstract/*" component={Doi2Abstract} />
              <Route path="*" component={Doi2Abstract} />
            </Switch>
          </div>
          <footer className="text-center">
            &copy; 2020 doi2abstract
            &nbsp;&nbsp;
            <Link to="/"><i className="fa fa-home"></i></Link>
            &nbsp;&nbsp;
            <a href="https://twitter.com/doi2bib" target="_blank" rel="noopener noreferrer"><i className="fa fa-twitter fa-lg"></i></a>
            &nbsp;&nbsp;
            <a href="https://github.com/davidagraf/doi2bib2" target="_blank" rel="noopener noreferrer"><i className="fa fa-github fa-lg"></i></a>
            &nbsp;&nbsp;
            <Link to="/about">About</Link>
            &nbsp;&nbsp;
            <Link to="/about?donate=true">Donate</Link>
            &nbsp;&nbsp;
            <Link to="/help">Help</Link>
            &nbsp;&nbsp;
            <Link to="/terms">Terms</Link>
          </footer>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
