import React from 'react';
import styles from '../App.scss';

import {Link} from 'react-router';

export default class Contact extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let heroStyle = {
      height:'100%',
      width: '100%',
    }
    let helloStyle = {
      width: '70%',
      textAlign: 'center',
      top: '14%',
      color: 'white',
    }
    let linkToPlayerStyle = {
      transform: 'translateY(20%)'
    }

    return (      
      <div style={{height:'100em'}}>
        <div className="hero" style={heroStyle}>
          <span className="contact-email" style={helloStyle}>Email us at<br/><span className="group-email">adventurousvnecks@gmail.com</span></span>
        </div>
      </div>
    );
  }

}