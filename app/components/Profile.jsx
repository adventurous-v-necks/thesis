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
    this.state = {
      e: null,
    }
  }

  componentWillMount() {
   let theHeaders = new Headers({ "Content-Type": "application/json" });
   fetch('/profile', {credentials: 'include', method: 'GET', headers: theHeaders}).then(resp => {
    resp.json().then(r => {
     this.props.dispatch({type:'FETCH_PROFILE', profile: r.user});
   });
  });
 }

 setClick(e) {
  this.setState({e: this.props.profile.sets[e.target.value]})
  this.forceUpdate()
 }

renderDetails(e) {
  return (
    <div>
    <br/>
    <h2>Your Set Details</h2> <br/>
    <br/>
    <h3>Date/Time Saved: {e.name}</h3><br/>
    <br/>
    <h3>BPM: {e.bpm}</h3><br/><br/>
    <h3>Active Effects: {e.activeEffects.map( effect => ' - '+effect.name.toString())}</h3><br/><br/>
    <h3>Active Samples: {e.samples[e.samples.length -1].map( tune => ' - '+ tune.sampleName)}</h3><br/>
    <br/>
    </div>
  )

}

 renderSets() {
  return this.props.profile.sets.map((set,i) => (
    <h1><button style={{fontSize:'60%'}} key={'set'+i} onClick={this.setClick.bind(this)} value={i}> Set # {(i+1)}, </button></h1>
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
        <div style={{padding: '0em 3em', height:'1em'}}>
          <h1 style={{height: '1em', display:'block', marginLeft:'auto', marginRight:'auto', width:'15em', marginTop:'2em'}}>Your ReactorSound Profile</h1><br/>
          <div style={{padding:'0em 2em', lineHeight:'2em', height:'auto',overflow:'hidden',border:'1px solid black'}}><br/>
            <div style={{height:'auto', display:'inline-block'}}>
          <br/><h3 style={{height:'auto'}}>Username: {this.props.profile.username}</h3><br/>
              <h3 style={{paddingRight:'1em'}}>Email: {this.props.profile.email}</h3>
              <div style={{height:'auto'}}>
              </div><br/>
              <h3 style={{paddingRight:'1em'}}>Saved Sets: {this.renderSets()}</h3>
            </div><br/>
            <div style={{height:'1em', display:'inline-block'}}>
              <div style={{height:'auto'}}>
              </div>
            </div>
            <div style={{height:'auto'}}><br/>
            <Link className="menu-item" style={{color:'#fff', fontFamily: 'Permanent Marker'}}to="/player">Back to the music!</Link>
            <br/>
            <div>{(this.state.e) ? this.renderDetails(this.state.e.state) : <h2>Select a set to see it's details</h2>}</div>
            </div>
            </div>
          </div>
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
        <div> {this.renderProfile.call(this)} 
        </div>
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
