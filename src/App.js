import React, { Component } from 'react';
import { Link, Switch, Route, Redirect } from "react-router-dom";
import axios from 'axios';

import './App.css';
import Home from './Components/Home';
import AllBeers from './Components/AllBeers';
import BeerDetails from './Components/BeerDetails';
import RandomBeer from './Components/RandomBeer';
import NewBeer from './Components/NewBeer';




class App extends React.Component{
  state={
    allBeers:[]
  }
  componentDidMount(){
    axios
      .get("https://ih-beers-api2.herokuapp.com/beers")
      .then((result) => {
        this.setState({allBeers: result.data});
      })
      .catch((err) => {
        console.log(err);
      });
    }
  render(){

  return (
    <div className="App">
      <Switch>
      <Route path={`/beers/allbeers`} exact component={()=><AllBeers beers={this.state.allBeers}/>}/>
      <Route path={`/beers/randombeer`} exact component={()=><RandomBeer />}/>
      <Route path={`/beers/newbeer`} exact component={()=><NewBeer />}/>
      <Route path={`/beers/:beer`} exact component={routeProps=> <BeerDetails {...routeProps} beers={this.state.allBeers}/>}/>
      <Route path={``} exact component={()=><Home />}/>
      </Switch>
      
    </div>
  );}
}

export default App;
