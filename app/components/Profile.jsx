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
   let theHeaders = new Headers({ "Content-Type": "application/json" });
   fetch('/profile', {credentials: 'include', method: 'GET', headers: theHeaders}).then(resp => {
    resp.json().then(r => {
     this.props.dispatch({type:'FETCH_PROFILE', profile: r.user});
   });
  });
 }

 renderSets() {
  
  return this.props.profile.sets.map((set,i) => (
    <h4 key={'set'+i} value={i}>{set.state.name}</h4>
    ))
 }

 renderProfile() {
    const buttonStyle = {
      backgroundColor: "rgba(11,11,11,0.8)",
      borderRadius: "2px",
      marginRight: "1em",
      padding: "0 1em",
      height: "80%",
      top: "10%",
      position: "relative",
      color:'#FFF',
      }
  
  return this.props.profile ? (
    <div>
    <br/>
    <span>
        <div style={{padding: '0em 3em', height:'10em'}}>
          <h1 style={{height: '1em', display:'block', marginLeft:'auto', marginRight:'auto', width:'15em', marginTop:'4em'}}>Your ReJuicy Profile</h1>
          <div style={{padding:'0em 2em', lineHeight:'2em', height:'14em',overflow:'hidden',border:'1px solid black'}}>
            <div style={{height:'auto', display:'inline-block'}}>
          <br/><h3 style={{height:'auto'}}>Username: {this.props.profile.username}</h3><br/>
              <h3 style={{paddingRight:'1em'}}>Email: {this.props.profile.email}</h3>
              <div style={{height:'auto'}}>
              </div>
            </div><br/>
            <div style={{height:'1em', display:'inline-block'}}>
              <h3 style={{paddingRight:'1em'}}>Saved Sets: {this.renderSets()}</h3>
              <div style={{height:'auto'}}>
              </div>
            </div><br/>
            <div style={{height:'auto'}}>
              <div style={{height:'auto'}}>
              </div>
            </div>
            <Link className="menu-item" style={{color:'#fff', fontFamily: 'Permanent Marker'}}to="/player">Back to the music!</Link>
            </div><br/>
          </div>
    </span>
    </div>
    ) : (
    <span>
    <h3>No profile available</h3>
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
