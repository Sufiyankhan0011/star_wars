import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

// import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { withStyles } from "@material-ui/core/styles";
// import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
// import MenuIcon from '@material-ui/icons/Menu';
// import axios from 'axios';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

class Login extends Component {
constructor(props){
  super(props);
  this.state={
  username:'',
  password:'',
  usernameArray:[],
  userBirthArray:[],
  flag: 1,
  }
 }


 componentDidMount(){
  const apiBaseUrl= "https://swapi.co/api/people/";
  const peopleApi1= fetch(apiBaseUrl + '?page=1&format=json');
  const peopleApi2= fetch(apiBaseUrl + '?page=2&format=json');
  const peopleApi3= fetch(apiBaseUrl + '?page=3&format=json');
  const peopleApi4= fetch(apiBaseUrl + '?page=4&format=json');
  const peopleApi5= fetch(apiBaseUrl + '?page=5&format=json');
  const peopleApi6= fetch(apiBaseUrl + '?page=6&format=json');
  const peopleApi7= fetch(apiBaseUrl + '?page=7&format=json');
  const peopleApi8= fetch(apiBaseUrl + '?page=8&format=json');
  const peopleApi9= fetch(apiBaseUrl + '?page=9&format=json');
  
  
  Promise.all([peopleApi1,peopleApi2,peopleApi3,peopleApi4,peopleApi5,peopleApi6,peopleApi7,peopleApi8,peopleApi9])
  .then(responses => Promise.all(responses.map(r => r.json())))
  // all JSON answers are parsed: "users" is the array of them
  .then(users => {
        // console.log("user",users)
        let usersArray=[];
        let usersBirthArray=[];
        for(let i=0,k=0;i<users.length;i++)
        {
          for(let j=0;j<users[i].results.length;j++){
           usersArray[k]=users[i].results[j].name;
           usersBirthArray[k++]=users[i].results[j].birth_year;
          }
           
          //  console.log("CDMusersArray",usersArray);
          //  console.log("CDMusersBirthArray",usersBirthArray); 
        }
      this.setState({usernameArray:[...usersArray]});
      this.setState({userBirthArray:[...usersBirthArray]});
    }
  )
  .catch(err=>console.log("Err",err));
 }
 handleClick(event){
    // console.log("handleClick",this.state.usernameArray);
    // console.log("handleClickuserBirthArray",this.state.userBirthArray);
    // console.log("Event",this.state.username);
    // console.log("EventbirthPWD",this.state.password);
    // if()
    // {

    // }
    if(this.state.username===''){
      this.setState({flag:4});
    }
    else if(this.state.password===''){
      this.setState({flag:5});
    }
    
    else{
    let usernameArray = [...this.state.usernameArray];
    let userBirthArray = [...this.state.userBirthArray];
    let user = '';
    for(let i=0;i<usernameArray.length;i++){
      if(usernameArray[i].localeCompare(this.state.username)===0){
        if(userBirthArray[i].localeCompare(this.state.password)===0){
          // console.log("loggedIn Successfully");
          user = {'name':this.state.username};
          sessionStorage.setItem('user', JSON.stringify(user));
          this.props.history.push("/home");
          break;
        }
        else{
          // console.log("Either Username or password is incorrect");
          this.setState({flag:2});
          break;
        }
      }
      else if(i===usernameArray.length-1){
        // console.log("Invalid User");
        this.setState({flag:3});
      }
     }
    }
  }

render() {
    return (
      <div>
        
       <MuiThemeProvider>
          <div>
              
          <AppBar>
          <Typography variant="h6" style ={{align: 'justify',color:"white"}}>Star Wars</Typography>
              <Toolbar>
              
                <Typography style ={{fontSize:"15px",color:"white"}}>Login to continue</Typography>
              </Toolbar>
          </AppBar>
           { this.state.flag === 2 && <p style={{color: 'red'}}>Your login credentials could not be verified, please try again!</p>}
           { this.state.flag === 3 && <p style={{color: 'red'}}>User does not exist!</p>}
           { this.state.flag === 4 && <p style={{color: 'red'}}>Please Enter username!</p>}
           { this.state.flag === 5 && <p style={{color: 'red'}}>Please Enter password!</p>}
           <TextField
             hintText="Enter your Username"
             floatingLabelText="Username"
             onChange = {(event,newValue) => this.setState({username:newValue})}
             />
           <br/>
             <TextField
               type="password"
               hintText="Enter your Password"
               floatingLabelText="Password"
               onChange = {(event,newValue) => this.setState({password:newValue})}
               />
             <br/>
             <RaisedButton label="Submit" primary={true} style={style} onClick={(event) => this.handleClick(event)}/>
         </div>
         </MuiThemeProvider>
      </div>
    );
  }
}
const style = {
 margin: 15,
};
export default Login;