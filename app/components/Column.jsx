import React from 'react';
import styles from '../App.scss';
import Sample from './Sample.jsx';
import Knob from './Knob.jsx';
import Fader from './Fader.jsx';
import {connect} from 'react-redux';

class Column extends React.Component {

  mySamples() {
    return this.props.samples[this.props.colNum];
  }

  render() {
    return (
      <div className="samplerColumn" key={this.props.colNum} style={{overflow:'hidden',height:'100%', width:'calc(20% - 0.2em)', border:'1px solid black', textAlign:'center', marginRight:'0.2em'}}>
        {this.mySamples().map(sample => <Sample key={sample.column+sample.index} sample={sample} playing={sample.playing}/>) }
      <Knob title="Adjust Channel Volume" key={'knob'+this.props.colNum} id={this.props.colNum+1} />
      <span><Fader id="speed" vertical width="20px"/></span>
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
