import React, {PropTypes} from 'react';
import styles from '../App.scss';
// NOTE: for historical reasons this is the login form but is called 'existingLogin'
// whereas the signup form is called loginForm. idk

export default class FbButton extends React.Component {

  render() {
    return (

      <div>
      <a className="btn btn-primary" href={'/auth/facebook'}><button style={{height:'50px', width:'auto', backgroundColor: 'lightblue', borderRadius:'2px', border:'1px solid black'}} className="fa fa-facebook"> Facebook Login</button></a>
      </div>
    )
  }
}