import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const useStyles = makeStyles({
    card: {
      maxWidth: 345,
    },
    media: {
      height: 540,
    },
  });

export default function AlertDialogSlide(props) {
    const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  let pSize = props.planet.population;
  // console.log("pop",pSize)
  let size=0;

  if(pSize>=100000000000)
  {
    size = 15;
  }
  else if(pSize>=10000000000)
  {
    size = 12;
  }
  else if(pSize>=1000000000)
  {
    size = 10;
  }
  else if(pSize>=500000000)
  {
    size = 8;
  }
  else if(pSize>=100000000)
  {
    size = 6;
  }
  else if(pSize>=50000000)
  {
    size = 4;
  }
  else if(pSize>=10000000)
  {
    size = 2;
  }
  else if(pSize>=5000000)
  {
    size = 1;
  }
  else if(pSize>=1000000)
  {
    size = -1;
  }
  else if(pSize>=100000)
  {
    size = -2;
  }
  else if(pSize>=10000)
  {
    size = -3;
  }
  else if(pSize>=1000)
  {
    size = -4;
  }
  else if(pSize.localeCompare('unknown')===0)
  {
    size = 0;
  }
  size = 10 + size + 'px';
  return (
    <div>
      <Button  onClick={handleClickOpen} style={{padding:10}}>
        <Card className={classes.card} >
        <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
                <span style={{fontSize: size, margin:10, padding:10}} ><b>{props.planet.name}</b></span>
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
                This planet comprises of {props.planet.population} residents of which mostly
                live in {props.planet.terrain}
            </Typography>
            </CardContent>
        </Card>
      </Button>
      <Dialog
        maxWidth={'md'}
        fullWidth={true}
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">Some Facts About <b>{props.planet.name}</b></DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
          <Typography variant="body2" color="textSecondary" component="p">
                This planet comprises of {props.planet.population} residents of which mostly
                live in {props.planet.terrain}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
                Below are some of the facts for <b>{props.planet.name} :-</b>
                <br/> 
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
            <b> Population:</b> {props.planet.population} <br/>
            <b> Climate: </b>{props.planet.climate} <br/>
            <b> Created On:</b> {props.planet.created} <br/>
            <b> Diameter:</b> {props.planet.diameter} <br/>
            <b> gravity: </b>{props.planet.gravity} <br/>
            <b> Orbital Period:</b> {props.planet.orbital_period} <br/>
            <b> Landscape:</b> {props.planet.terrain} <br/>
            </Typography>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}