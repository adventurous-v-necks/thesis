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
  preventDefault(e) {
    // according to React docs we need this bound to onDragOver due to Chrome bug
    e.preventDefault();
  }
  onDrop(e) {
    e.preventDefault();
    if (e.dataTransfer.files[0].type.substr(0,5)!=='audio') {
      alert('Wrong file type! You have to drag an audio file');
    }
    let data = new FormData();
    data.append('file', e.dataTransfer.files[0]);
    fetch('/upload', {method: 'POST', body: data, credentials: 'include'}).then(resp => {
      console.log(resp);
      resp.json().then(r => {
        console.log(r);
      });
    });
  }
  componentWillMount() {
    //load sample
    let request = new XMLHttpRequest();
    request.open('GET', this.props.sample.sampleUrl, true);
    request.responseType = 'arraybuffer';
    request.onload = () => {
        this.props.audioContext.decodeAudioData(request.response, (buffer) => {
            this.setState({buffer: buffer});
            this.props.dispatch({type: 'STORE_REF_TO_SAMPLE', col: this.props.sample.column, idx: this.props.sample.index, buffer: buffer});
        });
    }
    request.send();
  }
  playSample(e) {
    this.props.dispatch({type: 'PLAY_SAMPLE', sample: this.props.sample, buffer: this.state.buffer});
  }
  render() {
    let style = {
      backgroundColor: `hsl(${(((this.props.sample.column+1)*8)*8)%500},${60-(this.props.sample.index*10)}%,80%)`,
      cursor: 'pointer',
      height:'calc(20% - 0.6em)',
      borderBottom: '2px solid white',
      width:'100%',
      animation: this.props.playing ? 'play-anim 1s infinite' : 'none',
    };
    return (
      <div onDragOver={this.preventDefault} onDrop={this.onDrop.bind(this)} title="Click to Play Loop" ref={'1loop'} key={this.props.sample.sampleName} id={`sample${this.props.sample.column}-${this.props.sample.index}`} style={style} onClick={this.playSample.bind(this)}><span style={{userSelect:'none',height:'auto',maxHeight:'1em', cursor:'text'}} contentEditable suppressContentEditableWarning>{this.props.sample.sampleName}</span><br/>
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
