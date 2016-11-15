import React from 'react';
import styles from '../App.scss';
import { connect } from 'react-redux';
import Knob from './Knob.jsx';

export default class Volume extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {

    return (
      <div style={{cursor:'crosshair'}}>
      <Knob id="volume"/>
      </div>
      );
  }
}
