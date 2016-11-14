import React from 'react';
import styles from '../App.scss';
import {connect} from 'react-redux';
import Transport from './Transport.jsx';
import Synth from './Synth.jsx';

class Player extends React.Component {
  constructor(props) {
    super(props);
  }
  rec(e) {
    this.props.dispatch({type:'TIME_ZERO'});
  }
  play(e) {
    this.props.dispatch({type:'PLAY'});
  }
  render() {
    return (
      <div className="player">
        <Transport />
        <Synth />
        <div className="sampler-placeholder" style={{border: '2px solid black', width: '100%', height: '40%', position:'relative',top:'4em'}}></div>
        <div className="fxrack-placeholder" style={{border: '2px solid red', width: '100%', height:'20%', position:'relative', top:'4em'}}></div>
        <div className="synth-placeholder" style={{border: '2px solid blue', width: '100%', height:'calc(40% - 4em)', position:'relative', top:'4em'}}></div>
        <Fader id="globalVolume" vertical width="8em"/>
        <button onClick={this.rec.bind(this)} style={{position:'relative',top:'30%', height:'2em',border:'1px solid black'}}>REC</button>
        <button onClick={this.play.bind(this)} style={{position:'relative',top:'35%', height:'2em',border:'1px solid black'}}>PLAY</button>
      </div>
    );
  }
}


const mapStateToProps = function(state) {
  return {};
}

export default connect(mapStateToProps)(Player);
