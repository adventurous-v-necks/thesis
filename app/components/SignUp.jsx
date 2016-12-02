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
    fetch('/signup', {credentials:'include', method:'POST', headers: theHeaders, body: stringyForm}).then(resp => {
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
        <div style={{fontSize:'2em', textAlign:'center', top:'50%', position:'relative',display:'block', transform:'translateY(-50%)', padding: '0em 3em', height:'auto'}}>
          PLEASE WAIT, LOGGING YOU IN...
        </div>
      );
    }
    else {
      return (
        <div style={{width:'100%',padding: '0em 3em', height:'auto', display: 'block', textAlign:'center',overflow:'hidden', position:'absolute',marginLeft:'auto',marginRight:'auto'}} >
          <h1 style={{height: '1em', display:'block', marginLeft:'auto', marginRight:'auto', width:'15em', marginTop:'4em'}}>Welcome to ReactorSound!</h1>
          <p style={{height:'auto', display:'block',fontSize:'1.4em',marginTop:'2em', marginBottom:'2em'}}>
            Sign up for a ReactorSound Account</p>
          <div style={{border:'2px solid black', borderRadius:'2px', padding:'1em 1em', fontSize:'1.2em'}}>
          <form onSubmit={this.handleSubmit.bind(this)} style={{paddingTop:'2em', height:'auto'}}>
            <div style={{height:'3em', display:'inline-block'}}>
              <label style={{paddingRight:'1em'}}>Username</label>
              <div style={{height:'auto'}}>
                <input name="username" type="text" placeholder="Username" style={{borderBottom:'1px solid black', fontSize:'1.2em'}}/>
              </div>
            </div><br/>
            <div style={{height:'auto'}}>
              <label style={{paddingRight:'3em'}}>Email</label>
              <div style={{height:'auto', marginBottom:'2em'}}>
                <input name="password" type="text" placeholder="Email" style={{borderBottom:'1px solid black', fontSize:'1.2em'}}/>
              </div>
            </div><br/>            
            <div style={{height:'auto'}}>
              <label style={{paddingRight:'1em'}}>Password</label>
              <div style={{height:'auto', marginBottom:'2em'}}>
                <input name="password" type="text" placeholder="Password" style={{borderBottom:'1px solid black', fontSize:'1.2em'}}/>
              </div>
            </div><br/>
          <div className="login-button" style={{marginBottom:'1.4em', height:'auto', backgroundColor: 'rgba(249,63,25,1)', width:'100%', borderRadius:'2px', border:'1px solid black', padding:'0.5em 1em'}}>
              <button type="submit" style={{fontSize:'1.4em', color:'white', fontWeight:'900'}}>GO</button>
            </div>
          </form>
            <FbButton/>
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
