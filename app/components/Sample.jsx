import React from 'react';
import styles from '../App.scss';
import {connect} from 'react-redux';

class Sample extends React.Component {
  // We should avoid local component state, except where we don't
  state = {
    buffer: null,
    storedSample: null,
    playing: false,
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
    let fileName = e.dataTransfer.files[0].name; //store cos react will destroy it
    fetch('/upload', {method: 'POST', body: data, credentials: 'include'}).then(resp => {
      resp.json().then(r => {
        if (r.status === 'ok') {
          this.props.dispatch({type: 'SAMPLE_UPLOADED',
                                col: this.props.sample.column,
                                index: this.props.sample.index,
                                url: r.filename,
                                name: fileName});
        } else {
          alert('Sample upload failed');
        }
      });
    });
  }
  componentWillMount() {
    //load sample
    this.lazyLoad.call(this);
  }
  lazyLoad(cb) {
    let request = new XMLHttpRequest();
    request.open('GET', this.props.sample.sampleUrl, true);
    request.responseType = 'arraybuffer';
    request.onload = () => {
        this.props.audioContext.decodeAudioData(request.response, (buffer) => {
            this.setState({buffer: buffer, storedSample: this.props.sample.sampleUrl});
            this.props.dispatch({type: 'STORE_REF_TO_SAMPLE', col: this.props.sample.column, idx: this.props.sample.index, buffer: buffer});
            if (cb) cb();
        });
    }
    request.send();
  }
  componentWillUpdate() {
    if (this.props.sample.sampleUrl != this.state.storedSample) {
      this.lazyLoad.call(this);
    }
  }
  componentDidUpdate() {
    if (this.state.storedSample !== this.props.sample.sampleUrl) {
      this.lazyLoad.call(this, () => {
        if (this.props.sample.playing && !this.state.playing) {
          //means the user must have loaded a saved set
          this.props.dispatch({type: 'PLAY_SAMPLE', sample: this.props.sample, buffer: this.state.buffer, loadedFromASavedSet:true});
        }
      });
    } else if (this.props.sample.playing && !this.state.playing) {
      this.props.dispatch({type: 'PLAY_SAMPLE', sample: this.props.sample, buffer: this.state.buffer, loadedFromASavedSet:true});
    }
  }
  playSample(e) {
    this.setState({playing: !this.state.playing});
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
      <div onDragOver={this.preventDefault} onDrop={this.onDrop.bind(this)} title="Click to Play Loop or Drop a New Sample" ref={'1loop'} key={this.props.sample.sampleName} id={`sample${this.props.sample.column}-${this.props.sample.index}`} style={style} onClick={this.playSample.bind(this)}><span style={{userSelect:'none',height:'auto',maxHeight:'1em', cursor:'text',fontSize:'1.8em'}} contentEditable suppressContentEditableWarning>{this.props.sampleName}</span><br/>
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
