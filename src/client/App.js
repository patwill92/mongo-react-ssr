import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withStyles} from 'material-ui/styles'
import List, {
  ListItem,
  ListItemAvatar,
  ListItemText,
} from 'material-ui/List';
import Paper from 'material-ui/Paper'
import Grid from 'material-ui/Grid';
import Avatar from 'material-ui/Avatar';
import Typography from 'material-ui/Typography';
import MenuItemIcon from 'material-ui-icons/RestaurantMenu';

import Wrapper from './components/Wrapper'
import {fetchItems, fetchItemsServer} from './actions/index'


const styles = theme => ({
  root: {
    flexGrow: 1,
    maxWidth: 752,
  },
  demo: {
    background: '#fff',
  },
  title: {
    padding: 16
  },
  paper: {
    padding: 30
  }
});

class App extends Component {
  componentDidMount = () => {
    this.props.items.length === 0 && this.props.fetchItems();
  };
  renderUsers() {
    return this.props.items.map(item => {
      return (
        <ListItem key={item._id} button>
          <ListItemAvatar>
            <Avatar>
              <MenuItemIcon/>
            </Avatar>
          </ListItemAvatar>
          <ListItemText
            primary={item.name}
          />
        </ListItem>
      )
    })
  };

  render() {
    let {classes} = this.props;
    return (
      <Wrapper>
        <div style={{marginTop: 50}}>
          <Grid container justify={'center'}>
            <Grid item xs={11} md={6}>
              <Paper className={classes.paper}>
                <Typography type="display1" className={classes.title}
                            style={{paddingTop: 0}}>
                  Menu
                </Typography>
                <div className={classes.demo}>
                  <List dense>
                    {this.renderUsers()}
                  </List>
                </div>
              </Paper>
            </Grid>
          </Grid>
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

const dbInstance = () => {
  return 'Item'
};

export default {
  component: connect(mapStateToProps, {fetchItems})(withStyles(styles)(App)),
  loadData,
  dbInstance
};