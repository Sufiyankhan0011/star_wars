import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';


// import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import Paper from '@material-ui/core/Paper';

// import React from 'react';
// import { makeStyles } from '@material-ui/core/styles';
import { withStyles } from "@material-ui/core/styles";
import { fade, makeStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
// import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import SearchAppBar from './CustomAppbar';

import InputBase from '@material-ui/core/InputBase';
import AlertDialogSlide from './SinglePlanet';
// import MenuIcon from '@material-ui/icons/Menu';
// import axios from 'axios';

const useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      height: 140,
      width: 100,
    },
    control: {
      padding: theme.spacing(2),
    },
  }));

class Login extends Component {
constructor(props){
  super(props);
  this.state={
    planetsArray:[],
    newList:[],
    planet:'',
    flag:0
  }
 }


 componentDidMount(){
  
  // console.log("SessionStorage",JSON.parse(sessionStorage.getItem('user')))
  const apiBaseUrl= "https://swapi.co/api/planets/?format=json&page=";
  const planetApi1= fetch(apiBaseUrl + '1');
  const planetApi2= fetch(apiBaseUrl + '2');
  const planetApi3= fetch(apiBaseUrl + '3');
  const planetApi4= fetch(apiBaseUrl + '4');
  const planetApi5= fetch(apiBaseUrl + '5');
  const planetApi6= fetch(apiBaseUrl + '6');
  const planetApi7= fetch(apiBaseUrl + '7');
  
  
  Promise.all([planetApi1,planetApi2,planetApi3,planetApi4,planetApi5,planetApi6,planetApi7])
  .then(responses => Promise.all(responses.map(r => r.json())))
  // all JSON answers are parsed: "planets" is the array of them
  .then(planets => {
        
        let combinedArray = [];
        
        for(let i=0;i<planets.length;i++){
          combinedArray.push(...planets[i].results);
        }
        // console.log("combinedArray",combinedArray);
        // console.log("combinedArray",combinedArray[0].population);
        this.setState({planetsArray:[...combinedArray]});
      }
  )
  .catch(err=>console.log("Err",err));
 }

 clearSessionHandler=()=>{
  sessionStorage.clear();
  this.props.history.push("/");
 }

 handleChange=(event)=>
 {  
     console.log("Clicked");
     this.setState({flag:1});
     console.log("Clicked2222",event.target.value);
     const list =[];
     const oldlist= [...this.state.planetsArray]
     for(let i=0;i<this.state.planetsArray.length;i++){
       if(oldlist[i].name.toLowerCase().includes(event.target.value.toLowerCase()))
       {
        list.push({...oldlist[i]});
        console.log("true");
       }
     }
    //  let list = this.state.planetsArray.filter(item => item.name == event.target.value).map(item => item);
     console.log("list",list);
    //  this.setState({flag:1});
     this.setState({newList:[...list]});
}

// const classes = useStyles();
render() {
    // const classes = useStyles();
    const { classes } = this.props;
    let user =null;
    user = JSON.parse(sessionStorage.getItem('user'));
    let planetsArray=[];
    if(this.state.flag)
    {
      planetsArray = [...this.state.newList]
    }
    else
     planetsArray = this.state.planetsArray;

    let planets =<p>Loading...</p>;
    if(planetsArray.length>0)
    {
      planets = (
        <Grid container justify="center" spacing={12} >
          
          {planetsArray.map(planet =>{
            return( 
            <Grid item key ={planet.name}  xs={12} sm={12} md={6} lg={2} >
              
              <AlertDialogSlide planet={planet}/>
  
           </Grid>
          )})}
        </Grid>
      )
    }
    return (
      <div>
        <MuiThemeProvider>
         <SearchAppBar user ={user} click={this.handleChange} clearSessionHandler={this.clearSessionHandler}/>
           <Grid container  spacing={12}>
            <Grid item xs={12}>
              {planets}
            </Grid>
           
            </Grid>
         </MuiThemeProvider>
      </div>
    );
  }
}
const style = {
 margin: 15,
};
export default Login;