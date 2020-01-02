import React, { Component } from 'react';
import { withRouter, Route, Switch, Redirect } from 'react-router-dom';
import './App.css';
import Login from './Login';
import Home from './Home';

class Appwrapper extends Component {
  
  render() {
    let user =null;
    user = JSON.parse(sessionStorage.getItem('user'));
    if(user == null)
    {
      return <Redirect to='/'  />
    }
    return (
      <div className="App">
        <Switch>
            <Route path="/home" exact render = {props => <Home {...props} /> } />
        </Switch>
        {/* <Login parentContext={this}/> */}
      </div>
    );
  }
}
const style = {
  margin: 15,
};
export default withRouter(Appwrapper);