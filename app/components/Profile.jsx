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
   console.log('1')
   this.props.dispatch({type:'FETCH_PROFILE', profile: null});
   console.log('2')
 }

 renderProfile() {
  console.log('this.props', this.props)
  return this.props.profile ? (
    <span>
    {this.props.profile.username}
    </span>
    ) : (
    <span>
    {this.props.profile}
    </span>
    );
  }

  render(){

    return (
      <div>
      <div> {this.renderProfile.call(this)} </div>
      </div>
      );
  }
}

const mapStateToProps = function(state) {
  return  {
    profile: state.profile
  };
}

export default connect(mapStateToProps)(Profile);
