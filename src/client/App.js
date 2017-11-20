import React, {Component} from 'react'
import {connect} from 'react-redux'
import Button from 'material-ui/Button'
import {withStyles} from 'material-ui/styles'

import Wrapper from './components/Wrapper'
import {fetchItems, fetchItemsServer} from './actions/index'


const styles = theme => ({
  root: {
    background: theme.palette.primary[500]
  }
});

class App extends Component {
  componentDidMount = () => {
    this.props.fetchItems();
  };
  handleClick = () => {
    alert('clicked')
  };

  render() {
    let {classes, items} = this.props;
    return (
      <Wrapper>
        <div style={{margin: 40}}>
          <Button className={classes.root} onClick={this.handleClick}>Home Page Button</Button>
        </div>
      </Wrapper>
    )
  }
}

function mapStateToProps({items}) {
  return {
    items
  }
}

const loadData = async (Item) => {
  let data = await Item.find({});
  return {
    data,
    func: fetchItemsServer
  }
};

export default {
  component: connect(mapStateToProps, {fetchItems})(withStyles(styles)(App)),
  loadData
};