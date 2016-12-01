// you need these two imports minimum
import React from 'react';
import styles from '../App.scss';
import {connect} from 'react-redux';

// To get the leaveHook for React Router, links must be <Link to=> not <a href=>
import {Link} from 'react-router';

class Profile extends React.Component {
  static contextTypes = {
    router: React.PropTypes.object
  };
  constructor(props) {
    super(props);
  }

  componentWillMount() {
     this.props.dispatch({type:'FETCH_PROFILE'});
  }



  customNavbar() {
    return this.props.profile ? (
      <span>
      The newest stuff on the block
      </span>
      ) : (
      <span>
      The oldest stuff on earth
      </span>
      );
  }

  render(){

    return (
      <div>
        <div> {this.customNavbar.call(this)} </div>
        </div>
    );
  }
}

const mapStateToProps = function(state) {
  return  {};
}

export default connect(mapStateToProps)(Profile);
