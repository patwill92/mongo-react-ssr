import React, {Component} from 'react'
import Navbar from './Navbar'

class Wrapper extends Component {
  componentDidMount = () => {
    const jssStyles = document.getElementById('server-side-styles');
    if (jssStyles && jssStyles.parentNode) {
      jssStyles.parentNode.removeChild(jssStyles);
    }
  };
  render() {
    return (
      <div>
        <Navbar/>
        {this.props.children}
      </div>
    )
  }
}

export default Wrapper