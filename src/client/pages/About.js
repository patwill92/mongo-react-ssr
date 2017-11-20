import React, {Component} from 'react'
import Button from 'material-ui/Button'
import {withStyles} from 'material-ui/styles'

import Wrapper from '../components/Wrapper'

const styles = theme => ({
  root: {
    background: theme.palette.primary[700]
  }
});

class About extends Component {
  handleClick = () => {
    alert('clicked')
  };
  render() {
    let {classes} = this.props;
    return (
      <Wrapper>
        <div style={{margin: 40}}>
          <Button raised className={classes.root} onClick={this.handleClick} >About Page Button</Button>
        </div>
      </Wrapper>
    )
  }
}

export default {
  component: withStyles(styles)(About)
};