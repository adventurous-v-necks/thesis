import React from 'react';
import styles from '../App.scss';
import { connect } from 'react-redux';
import ReactDOM from 'react-dom';

class Profile extends React.Component {
  constructor(props){
    super(props);

  }

  componentDidMount() {
    console.log('this.state', this.state);
    console.log('this.props', this.props);    
    this.props.dispatch({type:'FETCH_PROFILE'});

 }

 render() {

  return (
    <div>
    <h4></h4>
    <h4></h4>
    <h4></h4>
    <h4></h4>
    <h4></h4>
    </div>

    )
}
}

function mapStateToProps(state) {
  return {
    user: state.user
  };
}

export default connect(mapStateToProps)(Profile);
