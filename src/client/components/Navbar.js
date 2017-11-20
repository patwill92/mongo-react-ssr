import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';

import {withStyles} from 'material-ui/styles'


const styles = {
  root: {
    width: '100%',
    marginBottom: 30
  },
  flex: {
    flex: 1,
    '&:hover': {
      cursor: 'pointer',
      textDecoration: 'none !important'
    }
  },
  link: {
    textDecoration: 'none !important',
    color: '#fff'
  },
  toolbar: {
    justifyContent: 'space-between'
  },
  buttons: {
    '& a': {
      color: '#fff !important',
      textDecoration: 'none !important'
    }
  }
};


class Navbar extends Component {
  render() {
    let {classes} = this.props;
    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar className={classes.toolbar}>
            <Link className={classes.link} to='/'>
              <Typography type="title" color="inherit" className={classes.flex}>
                React SSR
              </Typography>
            </Link>
            <div className={classes.buttons}>
              <Button color="contrast">
                <Link to='/'>Home</Link>
              </Button>
              <Button color="contrast">
                <Link to='/about'>About</Link>
              </Button>
            </div>
          </Toolbar>
        </AppBar>
      </div>
    )
  }
}

export default withStyles(styles)(Navbar)