import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import styles from '../App.scss';
import FbButton from './FbButton.jsx';

class loginForm extends React.Component {

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
      email: e.target.email.value,
      password: e.target.password.value});
    this.setState({submitted: true});
    fetch('/signup', {method:'POST', headers: theHeaders, body: stringyForm}).then(resp => {
      resp.json().then(r => {
        if (r.status === 'ok') {
          window.localStorage.setItem('com.rejuicy.user',JSON.stringify({
            username: r.username
          }));
          this.props.dispatch({type:'USER_LOGIN'});
          this.context.router.push('/player');
        } else {
          alert('Sign up failed!');
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
        <div style={{padding: '0em 3em', height:'10em'}}>
          <h1 style={{height: '1em', display:'block', marginLeft:'auto', marginRight:'auto', width:'15em', marginTop:'4em'}}>Signup for an account at ReJuicy</h1>
          <br/><p style={{height:'auto'}}>Signing up has many benefits, it's just awesome.</p><br/>
          <div style={{padding:'2em 2em', lineHeight:'2em', height:'14em',overflow:'hidden',border:'1px solid black'}}>
          <form onSubmit={this.handleSubmit.bind(this)}>
            <div style={{height:'auto', display:'inline-block'}}>
              <label style={{paddingRight:'1em'}}>Username</label>
              <div style={{height:'auto'}}>
                <input name="username" type="text" placeholder="Username" style={{borderBottom:'1px solid black'}}/>
              </div>
            </div><br/>
            <div style={{height:'1em', display:'inline-block'}}>
              <label style={{paddingRight:'1em'}}>Email</label>
              <div style={{height:'auto'}}>
                <input name="email" type="email" placeholder="Email Address" style={{borderBottom:'1px solid black'}}/>
              </div>
            </div><br/>
            <div style={{height:'auto'}}>
              <label style={{paddingRight:'1em'}}>Password</label>
              <div style={{height:'auto'}}>
                <input name="password" type="text" placeholder="Password" style={{borderBottom:'1px solid black'}}/>
              </div>
            </div><br/>
            <div style={{height:'auto', backgroundColor: 'green', borderRadius:'2px', border:'1px solid black', padding:'0.5em 1em'}}>
              <button type="submit">Submit</button>
            </div>
          </form>
          <FbButton />
          </div>
        </div>
      )
    }
  }

}

const mapStateToProps = function(state) {
  return {};
}

export default connect(mapStateToProps)(loginForm);
