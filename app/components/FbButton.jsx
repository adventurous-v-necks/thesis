import React, {PropTypes} from 'react';
import styles from '../App.scss';
// NOTE: for historical reasons this is the login form but is called 'existingLogin'
// whereas the signup form is called loginForm. idk

export default class FbButton extends React.Component {

  render() {
    return (

      <div className="login-button" style={{display:'block',height:'auto'}}>
      <a href={'/auth/facebook'} style={{width:'100%'}}>
        <button style={{height:'2.1em', lineHeight:'2.1em', fontSize:'1.4em', color:'white', width:'100%', backgroundColor: '#3b5998', borderRadius:'2px', border:'1px solid black'}}>
          <i className="fa fa-facebook" style={{color: 'white', marginRight:'1em'}}></i>Login with facebook
        </button></a>
      </div>
    )
  }
}
