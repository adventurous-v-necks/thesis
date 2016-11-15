import React from 'react';
import styles from '../App.scss';
import {connect} from 'react-redux';

class Sample extends React.Component {
  // We should avoid local component state, except where we don't
  state = {
    buffer: null
  };
  constructor(props) {
    super(props);
  }
  componentWillMount() {
    //load sample
    let request = new XMLHttpRequest();
    request.open('GET', this.props.sample.sampleUrl, true);
    request.responseType = 'arraybuffer';
    request.onload = () => {
        this.props.audioContext.decodeAudioData(request.response, (buffer) => {
            this.setState({buffer: buffer});
        });
    }
    request.send();
  }
  playSample(e) {
    this.props.dispatch({type: 'PLAY_SAMPLE', sample: this.props.sample, buffer: this.state.buffer});
  }
  render() {
    return (
      <div key={this.props.sample.sampleName} id={`sample${this.props.sample.column}-${this.props.sample.index}`} style={{
          backgroundColor: `hsl(${(((this.props.sample.column+1)*8)*8)%500},${100-(this.props.sample.index*10)}%,50%)`,
          cursor: 'pointer',
          height:'calc(20% - 0.6em)',
          borderBottom: '2px solid white',
          width:'100%'}} onClick={this.playSample.bind(this)}><span style={{userSelect:'none',height:'auto',maxHeight:'1em', cursor:'text'}} contentEditable>{this.props.sample.sampleName}</span><br/>
        {!this.props.playing ? (<i className="fa fa-play" id={`sample${this.props.sample.column}-${this.props.sample.index}`}></i>) : (<i id={`playbt${this.props.sample.column}-${this.props.sample.index}`}className="fa fa-square"></i>)}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    audioContext: state.audioContext
  };
}

export default connect(mapStateToProps)(Sample);
