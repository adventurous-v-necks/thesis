import React from 'react';
import styles from '../App.scss';
import Sample from './Sample.jsx';
import Volume from './Volume.jsx';
import {connect} from 'react-redux';

class Column extends React.Component {

  mySamples() {
    return this.props.samples[this.props.colNum];
  }

  render() {
    return (
      <div className="samplerColumn" style={{overflow:'hidden',height:'100%', width:'calc(20% - 0.2em)', border:'1px solid black', textAlign:'center', marginRight:'0.2em'}}>
        {this.mySamples().map(sample => <Sample sample={sample} playing={sample.playing}/>) }
      <Volume />
      </div>
      )
  }
}

function mapStateToProps(state) {
  return {
    samples: state.samples
  };
}

export default connect(mapStateToProps)(Column);
