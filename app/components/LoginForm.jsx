import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import styles from '../App.scss';
import FbButton from './FbButton.jsx';
// NOTE: for historical reasons this is the login form but is called 'existingLogin'
// whereas the signup form is called loginForm. idk

class existingLogin extends React.Component {

  static contextTypes = {
    router: React.PropTypes.object
  };

  constructor(props) {
    super(props);
    this.state = {
      submitted: false
    };
  }

  handleSubmit(e) {
    e.preventDefault();
    let theHeaders = new Headers({ "Content-Type":"application/json" });
    let stringyForm = JSON.stringify({
      username: e.target.username.value,
      password: e.target.password.value});
    this.setState({submitted: true});
    fetch('/login', {credentials:'include',method:'POST', headers: theHeaders, body: stringyForm}).then(resp => {
      resp.json().then(r => {
        if (r.status === 'ok') {
          window.localStorage.setItem('com.rejuicy.user',JSON.stringify({
            username: r.username
          }));
          this.props.dispatch({type:'USER_LOGIN'});
          this.context.router.replace('/player');
        } else {
          alert('Sign in failed!');
          this.setState({submitted: false});
        }
      });
    });

  }

  render() {
    if (this.state.submitted) {
      return (
        <div style={{padding: '0em 3em', height:'10em', marginTop: '8em'}}>
          PLEASE WAIT LOGGING YOU IN
        </div>
      );
    }
    else {
      return (
        <div style={{padding: '0em 3em', height:'10em'}} >
          <h1 style={{height: '1em', display:'block', marginLeft:'auto', marginRight:'auto', width:'15em', marginTop:'4em'}}>Sign in to your ReJuicy account</h1>
          <br/><p style={{height:'5em'}}>Welcome back, n00b</p><br/>
          <div style={{border:'1px solid black'}}>
          <form style={{paddingTop:'2em'}}>
            <div style={{height:'3em', width:'250px', display:'inline-block'}}>
              <label style={{paddingRight:'1em'}}>Username</label>
              <div style={{height:'auto'}}>
                <input name="username" type="text" placeholder="Username" style={{borderBottom:'1px solid black'}}/>
              </div>
            </div><br/>
            <div style={{height:'auto'}}>
              <label style={{paddingRight:'1em'}}>Password</label>
              <div style={{height:'auto'}}>
                <input name="password" type="text" placeholder="Password" style={{borderBottom:'1px solid black'}}/>
              </div>
            </div><br/>
            <div style={{height:'auto', backgroundColor: 'green', borderRadius:'2px', border:'1px solid black', padding:'0.5em 1em'}}>
              <button type="click" onClick={this.handleSubmit.bind(this)}>Submit</button>
            </div>
          </form>
            <FbButton style={{paddingTop:'3em'}}/>
            </div>
        </div>
      )
    }
  }

}

const mapStateToProps = function(state) {
  return {};
}

export default connect(mapStateToProps)(existingLogin);
