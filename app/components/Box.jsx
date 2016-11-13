import React from 'react';
import styles from '../App.scss';

export default class Box extends React.Component {
  constructor(props) {
    super(props);
  }
  componentWillMount() {
    console.log('componentWillMount BOX, woot!')  
  }
  render() {
    return (
        <div className="samplerBox">Details for a Box</div>
    );
  }
}